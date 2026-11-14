(() => {
  "use strict";

  const MAX_READING_AGE_MS = 48 * 60 * 60 * 1000;
  const limits = {
    "blood-pressure": { systolic: [50, 260], diastolic: [30, 160], unit: "mmHg" },
    "heart-rate": { value: [20, 250], unit: "bpm" },
    "blood-glucose": { value: [20, 600], unit: "mg/dL" },
    "core-temperature": { value: [30, 43], unit: "\u00b0C" },
    "sleep-hours": { value: [0, 24], unit: "hours" },
    mood: { value: [1, 5], unit: "points" }
  };
  for (const config of Object.values(limits)) {
    for (const value of Object.values(config)) if (Array.isArray(value)) Object.freeze(value);
    Object.freeze(config);
  }
  Object.freeze(limits);
  const relativeIndicators = new Set(["heart-rate", "blood-glucose", "sleep-hours"]);

  function hasValue(indicator, value) {
    if (indicator === "blood-pressure") {
      return value != null && Number.isFinite(value.systolic) && Number.isFinite(value.diastolic)
        && value.diastolic > 0 && value.systolic > value.diastolic;
    }
    if (indicator === "mood") {
      return Number.isInteger(value) && value >= 1 && value <= 5;
    }
    return Number.isFinite(value) && (indicator === "sleep-hours" ? value >= 0 : value > 0);
  }

  function hasBaseline(indicator, baseline) {
    if (!baseline || !hasValue(indicator, baseline.value)) return false;
    if (relativeIndicators.has(indicator) && baseline.value <= 0) return false;
    if (indicator === "heart-rate" && baseline.context !== "resting") return false;
    if (indicator === "blood-glucose" && !["fasting", "other"].includes(baseline.context)) return false;
    return true;
  }

  function atMost(value, boundary, scale) {
    // Account for floating-point roundoff, not a wider measurement tolerance.
    return value <= boundary || Math.abs(value - boundary) <= Number.EPSILON * 8 * Math.max(1, scale);
  }

  function evaluate(indicator, reading, baseline, now) {
    if (!Object.hasOwn(limits, indicator)) throw new RangeError(`Unknown indicator: ${indicator}`);
    const neutral = (label) => ({ state: "neutral", label, delta: null, percent: null });
    if (!reading || !hasValue(indicator, reading.value) || !Number.isFinite(reading.timestamp)
        || !Number.isFinite(now) || reading.timestamp > now
        || now - reading.timestamp > MAX_READING_AGE_MS) {
      return neutral("NO RECENT READING");
    }
    if (!hasBaseline(indicator, baseline)) return neutral("BASELINE NOT ESTABLISHED");
    if (["heart-rate", "blood-glucose"].includes(indicator) && reading.context !== baseline.context) {
      return neutral("NOT COMPARABLE (context differs)");
    }
    if (reading.unit && baseline.unit && reading.unit !== baseline.unit) {
      return neutral("NOT COMPARABLE (unit differs)");
    }

    let state;
    let delta;
    let percent = null;
    if (indicator === "blood-pressure") {
      delta = {
        systolic: reading.value.systolic - baseline.value.systolic,
        diastolic: reading.value.diastolic - baseline.value.diastolic
      };
      const worst = Math.max(Math.abs(delta.systolic), Math.abs(delta.diastolic));
      const scale = Math.max(reading.value.systolic, baseline.value.systolic);
      state = atMost(worst, 8, scale) ? "good" : atMost(worst, 15, scale) ? "warn" : "alert";
    } else {
      delta = reading.value - baseline.value;
      const magnitude = Math.abs(delta);
      const scale = Math.max(Math.abs(reading.value), Math.abs(baseline.value));
      if (relativeIndicators.has(indicator)) {
        percent = delta / baseline.value * 100;
        state = atMost(magnitude, baseline.value * 0.1, scale) ? "good"
          : atMost(magnitude, baseline.value * 0.2, scale) ? "warn" : "alert";
      } else if (indicator === "core-temperature") {
        const atRedBoundary = atMost(1, magnitude, scale);
        state = atMost(magnitude, 0.4, scale) ? "good" : atRedBoundary ? "alert" : "warn";
      } else {
        state = delta >= 0 ? "good" : delta === -1 ? "warn" : "alert";
      }
    }
    return { state, label: { good: "Green", warn: "Amber", alert: "Red" }[state], delta, percent };
  }

  function toleranceBands(indicator, baseline) {
    if (!hasBaseline(indicator, baseline)) return [];
    if (indicator === "blood-pressure") {
      return ["systolic", "diastolic"].map((key) => ({
        key, baseline: baseline.value[key], min: baseline.value[key] - 8, max: baseline.value[key] + 8
      }));
    }
    const value = baseline.value;
    const tolerance = relativeIndicators.has(indicator) ? value * 0.1 : 0.4;
    return [{
      key: "value", baseline: value,
      min: indicator === "mood" ? value : value - tolerance,
      max: indicator === "mood" ? 5 : value + tolerance
    }];
  }

  function validateReading(indicator, reading, now) {
    const config = limits[indicator];
    if (!config) throw new RangeError(`Unknown indicator: ${indicator}`);
    const issues = [];
    const fields = indicator === "blood-pressure" ? ["systolic", "diastolic"] : ["value"];
    for (const field of fields) {
      const value = field === "value" ? reading.value : reading.value?.[field];
      const [min, max] = config[field];
      if (!Number.isFinite(value) || value < min || value > max) {
        issues.push({ field, message: `${field === "value" ? "Reading" : field} must be between ${min} and ${max} ${config.unit}; entry limits, not clinical thresholds.` });
      } else if (indicator === "mood" && !Number.isInteger(value)) {
        issues.push({ field, message: "Choose one of the five anchored mood options." });
      }
    }
    if (indicator === "blood-pressure" && Number.isFinite(reading.value?.systolic)
        && Number.isFinite(reading.value?.diastolic) && reading.value.diastolic >= reading.value.systolic) {
      issues.push({ field: "diastolic", message: "Diastolic must be lower than systolic; entry limits, not clinical thresholds." });
    }
    if (!Number.isFinite(reading.timestamp) || !Number.isFinite(now)) {
      issues.push({ field: "timestamp", message: "Enter a valid measurement timestamp." });
    } else if (reading.timestamp > now) {
      issues.push({ field: "timestamp", message: "Future measurement timestamps are not allowed." });
    }
    if (indicator === "heart-rate" && !["resting", "other"].includes(reading.context)) {
      issues.push({ field: "context", message: "Choose resting or other context. Only resting matches this demo baseline." });
    }
    if (indicator === "blood-glucose" && !["fasting", "other"].includes(reading.context)) {
      issues.push({ field: "context", message: "Choose fasting or other glucose context." });
    }
    if (reading.unit !== config.unit) {
      issues.push({ field: "value", message: `Use the fixed demo unit: ${config.unit}.` });
    }
    if (typeof reading.source !== "string" || !reading.source.startsWith("SIMULATED ")) {
      issues.push({ field: "source", message: "Choose a simulated input source." });
    }
    return issues;
  }

  window.BASELINE = window.BASELINE || {};
  window.BASELINE.status = Object.freeze({ MAX_READING_AGE_MS, evaluate, toleranceBands, validateReading, limits });
})();
