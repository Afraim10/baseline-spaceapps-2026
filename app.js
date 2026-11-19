(() => {
  "use strict";

  const status = window.BASELINE.status;
  const { sources } = window.BASELINE;
  const claims = window.BASELINE.claims.map((claim) => claim && ({
    ...claim,
    hazard: claim.hazard === undefined ? null : claim.hazard,
    tier: claim.tier === undefined ? null : claim.tier,
    note: claim.note === undefined ? "" : claim.note
  }));
  const DAY_MS = 24 * 60 * 60 * 1000;
  const TREND_WINDOW_MS = 7 * DAY_MS;
  const STORAGE_KEY = "baseline.demo.v1";
  const DATA_VERSION = 1;
  const indicators = [
    {
      id: "blood-pressure", label: "Blood Pressure", unit: "mmHg",
      baseline: { value: { systolic: 118, diastolic: 76 }, unit: "mmHg" },
      demo: [[120, 77], [117, 75], [121, 78], [116, 75], [119, 76], [122, 79], [118, 76]],
      thresholds: "Worst channel governs: Green <=8 mmHg; Amber >8 to <=15; Red >15."
    },
    {
      id: "heart-rate", label: "Heart Rate", unit: "bpm",
      baseline: { value: 68, context: "resting", unit: "bpm" },
      demo: [66, 69, 67, 72, 70, 68, 68]
    },
    {
      id: "blood-glucose", label: "Blood Glucose", unit: "mg/dL",
      baseline: { value: 96, context: "fasting", unit: "mg/dL" },
      demo: [94, 98, 96, 101, 97, 95, 96]
    },
    {
      id: "core-temperature", label: "Body Temperature", unit: "\u00b0C",
      baseline: { value: 36.6, unit: "\u00b0C" },
      demo: [36.5, 36.6, 36.7, 36.6, 36.8, 36.6, 36.6],
      thresholds: "Green <=0.4 C; Amber >0.4 to <1.0 C; Red >=1.0 C."
    },
    {
      id: "sleep-hours", label: "Sleep Hours", unit: "hours",
      baseline: { value: 7.5, unit: "hours" },
      demo: [7.4, 7.8, 7.2, 7.0, 7.6, 7.3, 7.5]
    },
    {
      id: "mood", label: "Mood", unit: "points",
      baseline: { value: 4, unit: "points" },
      demo: [4, 4, 3, 4, 4, 5, 4],
      thresholds: "Green: delta >=0; Amber: -1; Red: <=-2 points."
    }
  ];
  const indicatorById = new Map(indicators.map((indicator) => [indicator.id, indicator]));
  const guidanceSections = [
    ["why", "Why measured"], ["how", "How measured in flight"],
    ["prevent", "Preventive actions"], ["escalate", "When to escalate"]
  ];
  const sections = new Set(["why", "how", "prevent", "escalate", "hazard-link", "reference"]);
  const hazards = new Set(["radiation", "isolation", "distance", "gravity", "closed-environment", "all"]);
  const tierLabels = {
    primary: "Primary physiological context",
    secondary: "Secondary/contextual association",
    operational: "Operational relevance"
  };
  const tiers = new Set(Object.keys(tierLabels));
  const bases = new Set(["source", "interpretation"]);
  const zones = {
    neuro: { label: "Head / Neuro", indicators: ["sleep-hours", "mood"] },
    cardio: { label: "Thorax / Cardio", indicators: ["blood-pressure", "heart-rate"] },
    systemic: { label: "Systemic / Metabolic", indicators: ["blood-glucose", "core-temperature"] }
  };
  const hazardButtons = [...document.querySelectorAll(".hazard-button")];
  const zoneControls = [...document.querySelectorAll("#body-schematic [data-zone], .zone-controls [data-zone]")];
  let selectedHazard = "all";
  let selectedZone = null;
  const sourceById = new Map();
  const duplicateSourceIds = new Set();
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    if (sourceById.has(source.source_id)) duplicateSourceIds.add(source.source_id);
    sourceById.set(source.source_id, source);
  }
  const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  const get = (id) => document.getElementById(id);
  const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;

  function element(tag, className = "", text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function svgElement(tag, attributes = {}) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
    return node;
  }

  function sourceHref(source) {
    if (!source || !nonEmpty(source.url)) return null;
    try {
      const url = new URL(source.url, window.location.href);
      return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function claimIssues(claim) {
    const issues = [];
    for (const field of ["text", "note", "locator"]) {
      if (typeof claim[field] === "string" && /CHECK|TBD|Draft:/i.test(claim[field])) {
        issues.push(`${field} contains a placeholder marker (CHECK, TBD, or Draft:).`);
      }
    }
    if (claim.verified !== true) return issues;
    if (!nonEmpty(claim.id)) issues.push("id is missing.");
    if (!nonEmpty(claim.text)) issues.push("text is missing.");
    if (!indicatorById.has(claim.indicator) && !["all", "none"].includes(claim.indicator)) {
      issues.push("indicator must be a configured card ID, all, or none.");
    }
    if (!sections.has(claim.section)) issues.push("section is not a supported claim section.");
    const source = sourceById.get(claim.source_id);
    if (!nonEmpty(claim.source_id) || !source) {
      issues.push("source_id does not reference a registered source.");
    } else {
      if (duplicateSourceIds.has(claim.source_id)) issues.push("source_id is ambiguous because it is duplicated.");
      if (!nonEmpty(source.title)) issues.push("source title is missing.");
      if (!sourceHref(source)) issues.push("source URL is missing or has an unsafe protocol.");
    }
    if (!nonEmpty(claim.locator)) issues.push("locator is missing or empty.");
    if (!nonEmpty(claim.verified_on) || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(claim.verified_on)
        || !Number.isFinite(Date.parse(claim.verified_on))) {
      issues.push("verified_on needs an ISO 8601 verification date.");
    }
    if (claim.hazard !== null && !hazards.has(claim.hazard)) issues.push("hazard must be a configured ID or null.");
    if (claim.tier !== null && !tiers.has(claim.tier)) issues.push("tier must be primary, secondary, operational, or null.");
    if (!bases.has(claim.basis)) issues.push("basis must be source or interpretation.");
    if (typeof claim.note !== "string") issues.push("note must be a string.");
    if (claim.basis === "interpretation" && !nonEmpty(claim.note)) {
      issues.push("interpretation claims require a non-empty note.");
    }
    if (claim.section === "hazard-link" && (!hazards.has(claim.hazard) || !tiers.has(claim.tier) || !bases.has(claim.basis))) {
      issues.push("hazard-link requires hazard, tier, and basis.");
    }
    return issues;
  }

  const verifiedClaims = claims.filter((claim) => claim && claim.verified === true);
  const metadataIssues = new Map(claims.filter(Boolean).map((claim) => [claim, claimIssues(claim)]));
  const displayClaims = verifiedClaims.filter((claim) => metadataIssues.get(claim).length === 0);

  function renderSources() {
    get("claims-total").textContent = String(claims.length);
    get("claims-verified").textContent = String(verifiedClaims.length);
    get("claims-unverified").textContent = String(claims.length - verifiedClaims.length);
    get("sources-total").textContent = String(sources.length);
    get("claims-status").textContent = displayClaims.length
      ? `${displayClaims.length} verified claim(s) have complete display metadata. Drafts never populate guidance, references, or hazard associations.`
      : "No verified claims available for display.";
    const usedIds = new Set(displayClaims.map((claim) => claim.source_id));
    const list = get("sources-used");
    list.replaceChildren();
    for (const id of usedIds) {
      const source = sourceById.get(id);
      const item = element("li");
      const link = element("a", "", source.title);
      link.href = sourceHref(source);
      link.rel = "noopener noreferrer";
      item.append(link);
      if (nonEmpty(source.publisher)) item.append(element("span", "metadata", `Publisher: ${source.publisher}`));
      if (nonEmpty(source.accessed)) item.append(element("span", "metadata", `Accessed: ${source.accessed}`));
      list.append(item);
    }
    list.hidden = usedIds.size === 0;
    get("sources-used-empty").hidden = usedIds.size > 0;
    const dev = new URLSearchParams(window.location.search).get("dev") === "1";
    get("dev-lint-panel").hidden = !dev;
    if (!dev) return;
    const issues = claims.filter(Boolean).flatMap((claim) => metadataIssues.get(claim).map((issue) => `Claim ${claim.id || "(missing id)"}: ${issue}`));
    get("dev-lint-status").textContent = issues.length
      ? `${issues.length} claim metadata issue(s) found. Affected verified claims are not displayed.`
      : "No claim metadata issues found. This is not scientific verification.";
    const issueList = get("dev-lint-issues");
    issueList.replaceChildren();
    issueList.hidden = issues.length === 0;
    for (const issue of issues) issueList.append(element("li", "", issue));
    const drafts = claims.filter((claim) => claim && claim.verified !== true);
    const draftList = get("dev-drafts");
    draftList.replaceChildren();
    draftList.hidden = drafts.length === 0;
    get("dev-drafts-status").textContent = drafts.length
      ? `${drafts.length} draft claim(s). Development preview only; not source-verified.`
      : "No draft claims loaded.";
    for (const claim of drafts) {
      const item = element("li");
      item.append(
        element("p", "draft-badge", "DRAFT - NOT VERIFIED"),
        element("p", "", nonEmpty(claim.text) ? claim.text : "(empty draft)"),
        element("p", "metadata", `ID: ${claim.id || "(missing)"}; indicator: ${claim.indicator || "(missing)"}; section: ${claim.section || "(missing)"}; hazard: ${claim.hazard || "(none)"}; tier: ${claim.tier || "(none)"}; basis: ${claim.basis || "(missing)"}.`),
        element("p", "metadata", `Source ID: ${claim.source_id || "(missing)"}; locator: ${claim.locator || "(missing)"}.`)
      );
      if (nonEmpty(claim.note)) item.append(element("p", "metadata", claim.note));
      draftList.append(item);
    }
  }

  function createDemo(now) {
    const seededAt = Math.floor(now / 1000) * 1000;
    return indicators.flatMap((indicator) => indicator.demo.map((value, index) => ({
      indicator: indicator.id,
      value: indicator.id === "blood-pressure" ? { systolic: value[0], diastolic: value[1] } : value,
      timestamp: seededAt - (6 - index) * DAY_MS,
      unit: indicator.unit, context: indicator.baseline.context || null,
      source: "SIMULATED seven-day fixture"
    })));
  }

  let storageWarning = "";
  function loadReadings(now) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        const saved = JSON.parse(raw);
        if (!saved || saved.version !== DATA_VERSION || !Array.isArray(saved.readings)
            || saved.readings.some((reading) => !reading || !indicatorById.has(reading.indicator)
              || status.validateReading(reading.indicator, reading, now).length > 0)) {
          throw new Error("Invalid saved demo");
        }
        return saved.readings;
      }
    } catch {
      storageWarning = "Saved demo data could not be loaded; a fresh SIMULATED fixture is in use. ";
    }
    return createDemo(now);
  }

  let readings = loadReadings(Date.now());
  const PREVIEW_SOURCE = "SIMULATED accelerated fixture replay";
  const REPLAY_INTERVAL_MS = 5000;
  const PREVIEW_LIMIT = indicators.length * 24;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let previewReadings = [];
  let previewFrame = 0;
  let streamRunning = false;
  let streamTimer = null;
  function saveReadings() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: DATA_VERSION, readings }));
      get("storage-status").textContent = `${storageWarning}SIMULATED demo is saved in this browser.`;
    } catch {
      get("storage-status").textContent = "Browser storage is unavailable. SIMULATED demo data stays in memory and will be lost on reload.";
    }
  }

  function historyFor(id) {
    return readings.concat(previewReadings).filter((reading) => reading.indicator === id).sort((a, b) => a.timestamp - b.timestamp);
  }

  function formatValue(indicator, value) {
    if (value == null) return "--";
    return indicator.id === "blood-pressure"
      ? `${numberFormat.format(value.systolic)} / ${numberFormat.format(value.diastolic)}`
      : numberFormat.format(value);
  }

  function formatDeviation(indicator, result) {
    if (result.state === "neutral") return "Deviation not evaluated.";
    const signed = (value) => `${value > 0 ? "+" : ""}${numberFormat.format(value)}`;
    if (indicator.id === "blood-pressure") {
      return `Deviation: SBP ${signed(result.delta.systolic)} / DBP ${signed(result.delta.diastolic)} mmHg.`;
    }
    return result.percent !== null ? `Deviation: ${signed(result.percent)}% from personal baseline.`
      : `Deviation: ${signed(result.delta)} ${indicator.unit} from personal baseline.`;
  }

  function statusIcon(state) {
    const paths = {
      good: "M2 8l4 4L14 3",
      warn: "M8 1L15 14H1Z M8 5v4 M8 11v1",
      alert: "M5 1h6l4 4v6l-4 4H5l-4-4V5Z M8 4v5 M8 11v1",
      neutral: "M2 8h12"
    };
    const icon = svgElement("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true", class: "status-icon" });
    icon.append(svgElement("path", { d: paths[state], fill: "none", stroke: "currentColor", "stroke-width": 1.5 }));
    return icon;
  }

  function updateCardStatus(indicator, reading, now) {
    const card = get(`card-${indicator.id}`);
    const result = status.evaluate(indicator.id, reading, indicator.baseline, now);
    card.dataset.state = result.state;
    const badge = card.querySelector(".card-status");
    badge.className = `status-badge card-status status-${result.state}`;
    badge.replaceChildren(statusIcon(result.state), element("span", "", result.label));
    card.querySelector(".deviation").textContent = formatDeviation(indicator, result);
  }

  function claimItem(claim, hazardWide = false) {
    const source = sourceById.get(claim.source_id);
    const item = element("li");
    if (claim.section === "hazard-link") {
      item.append(element("p", hazardWide ? "tier-badge" : "related-badge", hazardWide
        ? tierLabels[claim.tier]
        : `RELATED TO SELECTED HAZARD \u00b7 ${tierLabels[claim.tier]}`));
    }
    item.append(element("p", "", claim.text));
    if (claim.basis === "interpretation") {
      const note = element("div", "interpretation-note");
      note.setAttribute("role", "note");
      note.append(
        element("p", "interpretation-label", claim.section === "hazard-link"
          ? "Interface association \u2014 not stated by the cited source."
          : "Author interpretation \u2014 not stated by the cited source."),
        element("p", "", claim.note)
      );
      item.append(note);
    }
    const citation = element("p", "metadata claim-citation");
    const link = element("a", "", source.title);
    link.href = sourceHref(source);
    link.rel = "noopener noreferrer";
    citation.append(link, document.createTextNode(` \u00b7 ${claim.locator}`));
    item.append(citation);
    return item;
  }

  function claimSection(indicator, section, title, emptyText, openSections) {
    const details = element("details", "guidance-section");
    details.dataset.section = section;
    details.open = openSections.has(section);
    details.append(element("summary", "", title));
    const matches = displayClaims.filter((claim) => claim.indicator === indicator.id && claim.section === section);
    if (!matches.length) {
      details.append(element("p", "metadata", emptyText));
      return details;
    }
    const list = element("ul", "claim-list");
    for (const claim of matches) list.append(claimItem(claim));
    details.append(list);
    return details;
  }

  function renderHazardAssociations() {
    const links = displayClaims.filter((claim) => claim.section === "hazard-link" && claim.hazard === selectedHazard);
    for (const button of hazardButtons) button.setAttribute("aria-pressed", String(button.dataset.hazard === selectedHazard));
    const hazardName = hazardButtons.find((button) => button.dataset.hazard === selectedHazard).textContent;
    get("hazard-association-status").textContent = links.length
      ? `${links.length} verified association record(s) loaded for ${hazardName}.`
      : "No source-verified associations loaded for this hazard.";
    get("radiation-design-note").hidden = selectedHazard !== "radiation";
    const wideLinks = links.filter((claim) => ["all", "none"].includes(claim.indicator));
    get("hazard-association-status").classList.toggle("visually-hidden", links.length > 0 && wideLinks.length === links.length);
    get("hazard-wide-context").textContent = wideLinks.length
      ? `${wideLinks.length} verified record(s) \u00b7 ${[...new Set(wideLinks.map((claim) => tierLabels[claim.tier]))].join(" \u00b7 ")}`
      : "";
    const wideList = get("hazard-wide-claims");
    wideList.replaceChildren();
    get("hazard-wide-records").hidden = wideLinks.length === 0;
    for (const claim of wideLinks) wideList.append(claimItem(claim, true));
    for (const indicator of indicators) {
      const card = get(`card-${indicator.id}`);
      const matches = links.filter((claim) => claim.indicator === indicator.id || claim.indicator === "all");
      card.classList.toggle("is-hazard-related", matches.length > 0);
      const panel = card.querySelector(".hazard-links");
      panel.replaceChildren();
      panel.hidden = matches.length === 0;
      if (matches.length) {
        const list = element("ul", "claim-list");
        for (const claim of matches) {
          if (claim.indicator === "all") {
            const item = element("li");
            const badge = element("a", "related-badge", `RELATED TO SELECTED HAZARD \u00b7 ${tierLabels[claim.tier]}`);
            badge.href = "#hazard-wide-records";
            item.append(badge);
            list.append(item);
          } else {
            list.append(claimItem(claim));
          }
        }
        panel.append(list);
      }
    }
  }

  function updateZoneEmphasis() {
    const selected = selectedZone ? zones[selectedZone].indicators : [];
    for (const indicator of indicators) {
      get(`card-${indicator.id}`).classList.toggle("is-zone-selected", selected.includes(indicator.id));
    }
  }

  function selectZone(key) {
    if (!Object.hasOwn(zones, key)) return;
    selectedZone = selectedZone === key ? null : key;
    for (const control of zoneControls) {
      const active = control.dataset.zone === selectedZone;
      control.setAttribute("aria-pressed", String(active));
      control.classList.toggle("is-active", active);
    }
    updateZoneEmphasis();
    const actions = get("zone-indicator-actions");
    actions.replaceChildren();
    actions.hidden = selectedZone === null;
    get("zone-selection-status").textContent = selectedZone
      ? `${zones[selectedZone].label} grouping selected. Choose an indicator to view, or select the grouping again to clear.`
      : "All six indicator cards remain available. No grouping is emphasized.";
    if (!selectedZone) return;
    for (const id of zones[selectedZone].indicators) {
      const button = element("button", "", `View ${indicatorById.get(id).label}`);
      button.type = "button";
      button.dataset.indicator = id;
      button.addEventListener("click", () => {
        const card = get(`card-${id}`);
        card.scrollIntoView({ block: "start" });
        card.focus({ preventScroll: true });
      });
      actions.append(button);
    }
  }

  function trendFigure(indicator, history, now, recent = false) {
    const cutoff = now - TREND_WINDOW_MS;
    const eligible = history.filter((reading) => reading.timestamp >= cutoff && reading.timestamp <= now);
    const points = recent ? eligible.slice(-16) : eligible;
    const position = new Map(points.map((reading, index) => [reading, index]));
    const bands = status.toleranceBands(indicator.id, indicator.baseline);
    const keys = indicator.id === "blood-pressure" ? ["systolic", "diastolic"] : ["value"];
    const valueFor = (reading, key) => key === "value" ? reading.value : reading.value[key];
    const comparable = (reading) => status.evaluate(indicator.id, reading, indicator.baseline, reading.timestamp).state !== "neutral";
    const plotted = points.filter(comparable);
    const values = plotted.flatMap((reading) => keys.map((key) => valueFor(reading, key)));
    values.push(...bands.flatMap((band) => [band.min, band.max]));
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 1;
    const padding = (max - min || 1) * 0.15;
    const bottom = min - padding;
    const top = max + padding;
    const x = recent
      ? (reading) => 12 + position.get(reading) / Math.max(1, points.length - 1) * 296
      : (reading) => 12 + (reading.timestamp - cutoff) / TREND_WINDOW_MS * 296;
    const y = (value) => 98 - (value - bottom) / (top - bottom) * 86;
    const figure = element("figure", recent ? "trend-figure sample-figure" : "trend-figure history-figure");
    const titleId = `trend-title-${indicator.id}${recent ? "-recent" : ""}`;
    const descId = `trend-desc-${indicator.id}${recent ? "-recent" : ""}`;
    const svg = svgElement("svg", { viewBox: "0 0 320 110", role: "img", "aria-labelledby": `${titleId} ${descId}`, class: "sparkline" });
    const title = svgElement("title", { id: titleId });
    title.textContent = `${indicator.label}: ${recent ? "recent samples" : "seven-day trend"}, SIMULATED`;
    const desc = svgElement("desc", { id: descId });
    desc.textContent = recent
      ? "Recent SIMULATED readings use equally spaced sample positions, not a time axis. Only baseline-comparable contexts are drawn. Shading is configured demo tolerance, not clinical."
      : "Straight lines use actual timestamps and only baseline-comparable contexts. Shading is the fixed personal baseline's Green demo tolerance, not clinical. Other contexts remain in the collapsed data table.";
    svg.append(title, desc);
    for (const level of [12, 55, 98]) svg.append(svgElement("line", { x1: 12, x2: 308, y1: level, y2: level, class: "chart-gridline" }));
    for (const band of bands) {
      svg.append(svgElement("rect", { x: 12, y: y(band.max), width: 296, height: Math.max(1, y(band.min) - y(band.max)), class: "tolerance-band" }));
      svg.append(svgElement("line", { x1: 12, x2: 308, y1: y(band.baseline), y2: y(band.baseline), class: "baseline-line" }));
    }
    keys.forEach((key, index) => {
      let segment = [];
      const draw = () => {
        if (!segment.length) return;
        const className = index ? "trend-line trend-line-secondary" : "trend-line";
        svg.append(svgElement("polyline", { points: segment.map((reading) => `${x(reading)},${y(valueFor(reading, key))}`).join(" "), class: className }));
        for (const reading of segment) svg.append(svgElement("circle", { cx: x(reading), cy: y(valueFor(reading, key)), r: 2.5, class: index ? "trend-point trend-point-secondary" : "trend-point" }));
        segment = [];
      };
      for (const reading of points) {
        if (comparable(reading)) segment.push(reading);
        else draw();
      }
      draw();
    });
    const times = element("div", recent ? "sample-label" : "chart-times metadata");
    times.append(
      element("span", "", recent ? "RECENT SIMULATED SAMPLES" : new Date(cutoff).toLocaleDateString()),
      element("span", "", recent ? `${points.length} samples` : new Date(now).toLocaleDateString())
    );
    if (recent) figure.append(times);
    figure.append(svg);
    if (!recent) figure.append(times);
    figure.append(element("figcaption", "metadata", recent
      ? `${indicator.id === "blood-pressure" ? "Solid: systolic; dashed: diastolic. " : ""}Sample sequence, not a time axis. Shading: demo tolerance, not clinical.`
      : indicator.id === "blood-pressure"
        ? "SIMULATED. Solid: systolic; dashed: diastolic. Shading: demo tolerance."
        : "SIMULATED. Shading: configured demo tolerance, not clinical."));
    if (!plotted.length) figure.append(element("p", "metadata", "No comparable readings in this seven-day window."));
    return { figure, points };
  }

  function trendTable(indicator, points, openSections) {
    const details = element("details", "trend-data");
    details.dataset.section = "trend-data";
    details.open = openSections.has("trend-data");
    details.append(element("summary", "", "Seven-day data table"));
    if (!points.length) {
      details.append(element("p", "metadata", "No readings in the seven-day window."));
      return details;
    }
    const region = element("div", "table-scroll");
    region.tabIndex = 0;
    region.setAttribute("role", "region");
    region.setAttribute("aria-label", `${indicator.label} SIMULATED trend data`);
    const table = element("table");
    table.append(element("caption", "", `${indicator.label}: SIMULATED readings, including non-comparable contexts`));
    const head = element("thead");
    const heading = element("tr");
    for (const text of ["Timestamp (UTC)", `Reading (${indicator.unit})`, "Context", "Input source"]) {
      const cell = element("th", "", text);
      cell.scope = "col";
      heading.append(cell);
    }
    head.append(heading);
    const body = element("tbody");
    for (const reading of points) {
      const row = element("tr");
      const rawValue = indicator.id === "blood-pressure" ? `${reading.value.systolic} / ${reading.value.diastolic}` : String(reading.value);
      for (const value of [new Date(reading.timestamp).toISOString(), rawValue, reading.context || "Not applicable", reading.source]) {
        row.append(element("td", "", value));
      }
      body.append(row);
    }
    table.append(head, body);
    region.append(table);
    details.append(region);
    return details;
  }

  function readingProvenance(current) {
    const recorded = element("div", "reading-provenance");
    if (current) {
      const timestamp = element("p", "metadata recorded");
      const time = element("time", "", new Date(current.timestamp).toLocaleString(undefined, { timeZoneName: "short" }));
      time.dateTime = new Date(current.timestamp).toISOString();
      timestamp.append(element("span", "field-label", "Last recorded"), time);
      recorded.append(timestamp, element("p", "metadata", `Source: ${current.source}.${current.context ? ` Context: ${current.context}.` : ""}`));
    } else {
      recorded.append(element("p", "metadata", "No measurement timestamp or input source is available."));
    }
    return recorded;
  }

  function updateTelemetry(now) {
    for (const indicator of indicators) {
      const current = historyFor(indicator.id).at(-1) || null;
      const result = status.evaluate(indicator.id, current, indicator.baseline, now);
      get(`channel-value-${indicator.id}`).textContent = formatValue(indicator, current?.value);
      get(`channel-${indicator.id}`).dataset.state = result.state;
      get(`channel-state-${indicator.id}`).textContent = result.label;
    }
    const count = String(previewFrame).padStart(3, "0");
    get("hero-frame-count").textContent = count;
    get("orbit-frame").textContent = `FRAME ${count}`;
    get("stream-frame-count").textContent = `FRAME ${count} / ${previewReadings.length} PREVIEW SAMPLES`;
  }

  function updateReadings(now) {
    for (const indicator of indicators) {
      const card = get(`card-${indicator.id}`);
      const history = historyFor(indicator.id);
      const current = history.at(-1) || null;
      card.querySelector(".measurement-value").textContent = formatValue(indicator, current?.value);
      card.querySelector(".reading-provenance").replaceChildren(...readingProvenance(current).childNodes);
      card.querySelector(".sample-figure").replaceWith(trendFigure(indicator, history, now, true).figure);
      const timeline = trendFigure(indicator, history, now);
      card.querySelector(".history-figure").replaceWith(timeline.figure);
      const freshTable = trendTable(indicator, timeline.points, new Set());
      const details = card.querySelector(".trend-data");
      const oldBody = details.querySelector("tbody");
      const newBody = freshTable.querySelector("tbody");
      if (oldBody && newBody) oldBody.replaceChildren(...newBody.childNodes);
      else if (newBody) {
        details.querySelector("p")?.remove();
        details.append(freshTable.querySelector(".table-scroll"));
      }
      updateCardStatus(indicator, current, now);
    }
    updateTelemetry(now);
  }

  function replayFrame() {
    const now = Date.now();
    const batch = indicators.map((indicator) => {
      const value = indicator.demo[previewFrame % indicator.demo.length];
      const reading = {
        indicator: indicator.id,
        value: indicator.id === "blood-pressure" ? { systolic: value[0], diastolic: value[1] } : value,
        unit: indicator.unit, context: indicator.baseline.context || null,
        timestamp: now, source: PREVIEW_SOURCE
      };
      return status.validateReading(indicator.id, reading, now).length ? null : reading;
    }).filter(Boolean);
    if (!batch.length) return;
    previewFrame += 1;
    previewReadings = previewReadings.concat(batch).slice(-PREVIEW_LIMIT);
    updateReadings(now);
    const log = get("packet-log");
    log.querySelector(".packet-empty")?.remove();
    for (const reading of batch) {
      const indicator = indicatorById.get(reading.indicator);
      const item = element("li");
      item.dataset.indicator = indicator.id;
      const time = element("time", "", new Date(now).toLocaleTimeString());
      time.dateTime = new Date(now).toISOString();
      item.append(time, element("span", "", indicator.label), element("span", "packet-value", `${formatValue(indicator, reading.value)} ${indicator.unit}`));
      log.prepend(item);
    }
    while (log.children.length > indicators.length * 2) log.lastElementChild.remove();
    window.dispatchEvent(new CustomEvent("baseline:packet", { detail: { ids: batch.map((reading) => reading.indicator) } }));
  }

  function scheduleReplay(delay = REPLAY_INTERVAL_MS) {
    window.clearTimeout(streamTimer);
    streamTimer = null;
    if (!streamRunning || document.hidden) return;
    streamTimer = window.setTimeout(() => {
      streamTimer = null;
      replayFrame();
      scheduleReplay();
    }, delay);
  }

  function setStreamRunning(running, message = "") {
    const entering = !get("entry-panel").hidden;
    streamRunning = running && !entering;
    document.body.dataset.stream = streamRunning && !document.hidden ? "running" : "paused";
    for (const button of document.querySelectorAll("[data-stream-toggle]")) {
      button.disabled = entering;
      button.setAttribute("aria-pressed", String(streamRunning));
      button.textContent = streamRunning ? "Pause SIMULATED stream" : "Start SIMULATED stream";
    }
    get("step-stream").disabled = entering;
    get("stream-status").textContent = message || (streamRunning
      ? document.hidden ? "SIMULATED replay waits while this tab is hidden." : "SIMULATED preview running. A frame arrives every five seconds; samples are not saved."
      : "SIMULATED preview paused. Step a frame or start replay to receive new samples.");
    scheduleReplay();
  }

  function initializeTelemetry() {
    const manifest = get("channel-manifest");
    const orbit = get("orbit-channels");
    for (const indicator of indicators) {
      const chip = element("div", "channel-chip");
      chip.id = `channel-${indicator.id}`;
      chip.dataset.indicator = indicator.id;
      const label = element("dt");
      label.append(element("span", "channel-label", indicator.label), element("span", "", "SIMULATED"));
      const value = element("dd");
      const number = element("span", "channel-value", "--");
      number.id = `channel-value-${indicator.id}`;
      value.append(number, element("small", "", indicator.unit));
      const state = element("p", "metadata channel-state", "NO RECENT READING");
      state.id = `channel-state-${indicator.id}`;
      chip.append(label, value, state);
      manifest.append(chip);
      const beacon = element("button", "orbit-beacon", indicator.label);
      beacon.type = "button";
      beacon.dataset.indicator = indicator.id;
      beacon.setAttribute("aria-label", `View ${indicator.label} SIMULATED channel`);
      beacon.addEventListener("click", () => {
        const card = get(`card-${indicator.id}`);
        card.scrollIntoView({ block: "start" });
        card.focus({ preventScroll: true });
      });
      orbit.append(beacon);
    }
    get("hero-channel-count").textContent = String(indicators.length);
    for (const button of document.querySelectorAll("[data-stream-toggle]")) {
      button.disabled = false;
      button.addEventListener("click", () => setStreamRunning(!streamRunning));
    }
    get("step-stream").disabled = false;
    get("step-stream").addEventListener("click", () => {
      setStreamRunning(false, "SIMULATED single-frame preview. Replay is paused for inspection.");
      replayFrame();
    });
    document.addEventListener("visibilitychange", () => setStreamRunning(streamRunning));
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) setStreamRunning(false, "SIMULATED preview paused for reduced motion. Manual frame stepping remains available.");
    });
  }

  function renderCards(now) {
    for (const indicator of indicators) {
      const card = get(`card-${indicator.id}`);
      card.tabIndex = -1;
      card.setAttribute("data-reveal", "");
      const focused = document.activeElement;
      const focusedSection = card.contains(focused) ? focused.closest("details[data-section]")?.dataset.section : null;
      const focusTarget = focused.tagName === "SUMMARY" ? "summary" : focused.classList.contains("table-scroll") ? ".table-scroll" : null;
      const openSections = new Set([...card.querySelectorAll("details[open]")].map((details) => details.dataset.section));
      const history = historyFor(indicator.id);
      const current = history.at(-1) || null;
      const heading = element("header", "card-heading");
      const name = element("h3");
      name.append(element("span", "channel-index", `CHANNEL ${String(indicators.indexOf(indicator) + 1).padStart(2, "0")}`), document.createTextNode(indicator.label));
      name.id = `heading-${indicator.id}`;
      heading.append(name, element("span", "simulated-badge", "SIMULATED"));
      const badge = element("div", "card-status");
      const measurement = element("p", "measurement");
      measurement.append(element("span", "measurement-value", formatValue(indicator, current?.value)));
      measurement.append(element("span", "measurement-unit", ` ${indicator.unit}`));
      const context = indicator.baseline.context ? ` (${indicator.baseline.context})` : "";
      const baseline = element("p", "baseline-summary", `Personal baseline: ${formatValue(indicator, indicator.baseline.value)} ${indicator.unit}${context}`);
      const deviation = element("p", "metadata deviation");
      const readingBlock = element("div", "reading-block");
      readingBlock.append(badge, measurement, baseline, deviation);
      const recorded = readingProvenance(current);
      const hazardPanel = element("section", "hazard-links");
      hazardPanel.hidden = true;
      hazardPanel.setAttribute("aria-label", "Verified association records for the selected hazard");
      const trend = trendFigure(indicator, history, now);
      const archive = element("details", "history-chart");
      archive.dataset.section = "history-chart";
      archive.open = openSections.has("history-chart");
      archive.append(element("summary", "", "Seven-day timeline (actual timestamps)"), trend.figure);
      const guidance = element("div", "guidance-grid");
      for (const [section, title] of guidanceSections) guidance.append(claimSection(indicator, section, title, "No source-verified guidance loaded for this section (left empty rather than invented).", openSections));
      const evidence = element("details", "card-evidence");
      evidence.dataset.section = "guidance";
      evidence.open = openSections.has("guidance");
      evidence.append(element("summary", "", "Evidence & guidance"), guidance);
      const thresholds = element("details", "threshold-details");
      thresholds.dataset.section = "thresholds";
      thresholds.open = openSections.has("thresholds");
      thresholds.append(
        element("summary", "", "Demo threshold configuration"),
        element("p", "metadata", indicator.thresholds || "Green: |deviation| <=10%; Amber: >10% to <=20%; Red: >20%.")
      );
      const details = element("div", "card-details");
      details.append(
        archive, trendTable(indicator, trend.points, openSections), thresholds, evidence,
        claimSection(indicator, "reference", "General adult reference \u2014 not spaceflight-validated.", "No verified reference values loaded.", openSections)
      );
      card.replaceChildren(
        heading, readingBlock, recorded, hazardPanel,
        element("p", "metadata threshold-note", "Illustrative demo thresholds, not clinical."),
        trendFigure(indicator, history, now, true).figure, details
      );
      updateCardStatus(indicator, current, now);
      if (focusedSection && focusTarget) {
        card.querySelector(`details[data-section="${focusedSection}"] > ${focusTarget}`)?.focus({ preventScroll: true });
      }
    }
    get("reading-summary").textContent = `SIMULATED \u00b7 ${status.MAX_READING_AGE_MS / (60 * 60 * 1000)}h recency`;
    renderHazardAssociations();
    updateZoneEmphasis();
    updateTelemetry(now);
  }

  const form = get("measurement-form");
  const selector = get("entry-indicator");
  const moodLabels = ["Very low", "Low", "Neutral", "Good", "Very good"];

  function showFormErrors(issues) {
    for (const control of form.querySelectorAll("[aria-invalid]")) control.removeAttribute("aria-invalid");
    for (const message of form.querySelectorAll(".field-error")) {
      message.hidden = true;
      message.textContent = "";
    }
    const summary = get("entry-errors");
    summary.replaceChildren();
    summary.hidden = issues.length === 0;
    if (!issues.length) return;
    const list = element("ul");
    for (const issue of issues) {
      list.append(element("li", "", issue.message));
      const control = get(`entry-${issue.field}`);
      const message = get(`entry-${issue.field}-error`);
      if (control) control.setAttribute("aria-invalid", "true");
      if (message) {
        message.textContent += `${issue.message} `;
        message.hidden = false;
      }
    }
    summary.append(list);
  }

  function renderEntryFields() {
    const indicator = indicatorById.get(selector.value);
    const fields = get("entry-fields");
    fields.replaceChildren();
    const names = indicator.id === "blood-pressure" ? ["systolic", "diastolic"] : ["value"];
    for (const name of names) {
      const wrapper = element("div", "form-field");
      const label = element("label", "", `${name === "value" ? indicator.label : name === "systolic" ? "Systolic" : "Diastolic"} (${indicator.unit})`);
      label.htmlFor = `entry-${name}`;
      const control = element(indicator.id === "mood" ? "select" : "input");
      control.id = `entry-${name}`;
      control.name = name;
      control.required = true;
      control.setAttribute("aria-describedby", `entry-${name}-hint entry-${name}-error entry-limits-note`);
      const [min, max] = status.limits[indicator.id][name];
      if (indicator.id === "mood") {
        const empty = element("option", "", "Choose an anchored mood");
        empty.value = "";
        control.append(empty);
        moodLabels.forEach((text, index) => {
          const option = element("option", "", `${index + 1} - ${text}`);
          option.value = String(index + 1);
          control.append(option);
        });
      } else {
        control.type = "number";
        control.inputMode = "decimal";
        control.min = String(min);
        control.max = String(max);
        control.step = "any";
      }
      const hint = element("p", "metadata", `Allowed entry: ${min} to ${max} ${indicator.unit}. Fixed demo units; no unit conversion.`);
      hint.id = `entry-${name}-hint`;
      const error = element("p", "field-error");
      error.id = `entry-${name}-error`;
      error.hidden = true;
      wrapper.append(label, control, hint, error);
      fields.append(wrapper);
    }
    if (indicator.baseline.context) {
      const wrapper = element("div", "form-field");
      const label = element("label", "", "Measurement context");
      label.htmlFor = "entry-context";
      const control = element("select");
      control.id = "entry-context";
      control.name = "context";
      control.required = true;
      control.setAttribute("aria-describedby", "entry-context-hint entry-context-error");
      for (const value of [indicator.baseline.context, "other"]) {
        const option = element("option", "", value === "other" ? "Other (not baseline-comparable)" : value === "resting" ? "Resting" : "Fasting");
        option.value = value;
        control.append(option);
      }
      const hint = element("p", "metadata", `Only ${indicator.baseline.context} matches the fixed baseline context. Other readings are logged with a neutral status.`);
      hint.id = "entry-context-hint";
      const error = element("p", "field-error");
      error.id = "entry-context-error";
      error.hidden = true;
      wrapper.append(label, control, hint, error);
      fields.append(wrapper);
    }
    showFormErrors([]);
  }

  function localTimestamp(now) {
    const date = new Date(now);
    return new Date(now - date.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 19);
  }

  function closeEntry() {
    get("entry-panel").hidden = true;
    setStreamRunning(false);
    get("open-entry").setAttribute("aria-expanded", "false");
    get("open-entry").focus();
  }

  selector.replaceChildren();
  for (const indicator of indicators) {
    const option = element("option", "", indicator.label);
    option.value = indicator.id;
    selector.append(option);
  }
  selector.addEventListener("change", renderEntryFields);
  renderEntryFields();
  get("open-entry").addEventListener("click", () => {
    renderEntryFields();
    get("entry-timestamp").value = localTimestamp(Date.now());
    get("entry-timestamp").max = localTimestamp(Date.now());
    get("entry-panel").hidden = false;
    setStreamRunning(false, "SIMULATED preview paused during manual entry. Restart it when ready.");
    get("open-entry").setAttribute("aria-expanded", "true");
    get("entry-panel").scrollIntoView({ block: "start" });
    selector.focus({ preventScroll: true });
  });
  get("cancel-entry").addEventListener("click", closeEntry);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const now = Date.now();
    const indicator = indicatorById.get(selector.value);
    const value = indicator.id === "blood-pressure"
      ? { systolic: get("entry-systolic").valueAsNumber, diastolic: get("entry-diastolic").valueAsNumber }
      : indicator.id === "mood" ? (get("entry-value").value ? Number(get("entry-value").value) : NaN) : get("entry-value").valueAsNumber;
    const reading = {
      indicator: indicator.id, value, unit: indicator.unit,
      context: indicator.baseline.context ? get("entry-context").value : null,
      timestamp: new Date(get("entry-timestamp").value).getTime(), source: get("entry-source").value
    };
    const issues = status.validateReading(indicator.id, reading, now);
    showFormErrors(issues);
    if (issues.length) {
      get(`entry-${issues[0].field}`)?.focus();
      return;
    }
    readings.push(reading);
    previewReadings = previewReadings.filter((preview) => preview.indicator !== indicator.id);
    saveReadings();
    renderCards(now);
    get("demo-announcement").textContent = `SIMULATED ${indicator.label} measurement logged. Cards use the latest timestamp, not entry order.`;
    closeEntry();
  });

  get("test-deviation").addEventListener("click", () => {
    setStreamRunning(false, "SIMULATED preview paused for the deviation test.");
    previewReadings = previewReadings.filter((reading) => reading.indicator !== "heart-rate");
    const indicator = indicatorById.get("heart-rate");
    readings.push({
      indicator: indicator.id, value: indicator.baseline.value * 1.25,
      unit: indicator.unit, context: "resting", timestamp: Math.floor(Date.now() / 1000) * 1000,
      source: "SIMULATED test deviation"
    });
    saveReadings();
    renderCards(Date.now());
    get("demo-announcement").textContent = "SIMULATED Heart Rate deviation inserted: +25% from the fixed personal baseline. This is not a diagnosis.";
  });
  get("reset-demo").addEventListener("click", () => {
    setStreamRunning(false);
    previewReadings = [];
    previewFrame = 0;
    get("packet-log").replaceChildren(element("li", "packet-empty", "Preview reset. Step a frame or start the SIMULATED stream."));
    readings = createDemo(Date.now());
    storageWarning = "";
    saveReadings();
    renderCards(Date.now());
    showFormErrors([]);
    get("demo-announcement").textContent = "SIMULATED seven-day readings reset. Original personal baselines remain fixed.";
  });

  for (const button of hazardButtons) {
    button.addEventListener("click", () => {
      selectedHazard = button.dataset.hazard;
      renderHazardAssociations();
    });
  }
  get("indicator-grid").addEventListener("click", (event) => {
    if (!event.target.closest('a.related-badge[href="#hazard-wide-records"]')) return;
    const evidence = get("hazard-wide-records");
    if (evidence.hidden) return;
    evidence.open = true;
    evidence.focus({ preventScroll: true });
  });
  for (const control of zoneControls) {
    control.addEventListener("click", () => selectZone(control.dataset.zone));
    if (control.getAttribute("role") === "button") {
      control.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!event.repeat) selectZone(control.dataset.zone);
        }
      });
    }
  }

  const logo = get("project-logo");
  const showLogoPlaceholder = () => {
    logo.hidden = true;
    get("logo-placeholder").hidden = false;
  };
  logo.addEventListener("error", showLogoPlaceholder, { once: true });
  if (logo.complete && logo.naturalWidth === 0) showLogoPlaceholder();

  // Anchor targets must clear the safety bar even when its text wraps.
  new ResizeObserver(([entry]) => {
    document.documentElement.style.setProperty("--compliance-height", `${entry.target.getBoundingClientRect().height}px`);
  }).observe(document.querySelector(".compliance-bar"));

  initializeTelemetry();
  renderSources();
  saveReadings();
  renderCards(Date.now());
  if (window.location.hash === "#hazard-wide-records" && !get("hazard-wide-records").hidden) {
    get("hazard-wide-records").open = true;
  }
  for (const id of ["open-entry", "test-deviation", "reset-demo"]) get(id).disabled = false;
  for (const button of hazardButtons) button.disabled = false;
  for (const control of zoneControls) if (control instanceof HTMLButtonElement) control.disabled = false;
  setStreamRunning(!reducedMotion.matches);
  if (streamRunning) scheduleReplay(900);
  const refreshStatuses = () => {
    for (const indicator of indicators) updateCardStatus(indicator, historyFor(indicator.id).at(-1) || null, Date.now());
  };
  window.setInterval(refreshStatuses, 60 * 1000);
  window.addEventListener("focus", refreshStatuses);
})();
