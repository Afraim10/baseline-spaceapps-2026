"use strict";

window.BASELINE = window.BASELINE || {};

/*
 * Atomic claim schema (one fact per entry):
 * {
 *   id: string,
 *   text: string,
 *   indicator: "blood-pressure" | "heart-rate" | "blood-glucose" |
 *              "core-temperature" | "sleep-hours" | "mood",
 *   section: "why" | "how" | "prevent" | "escalate" | "hazard-link" | "reference",
 *   hazard: "radiation" | "isolation" | "distance" | "gravity" |
 *           "closed-environment" | null,
 *   tier: "primary" | "secondary" | "operational" | null,
 *   source_id: string,
 *   locator: string,
 *   verified: boolean,
 *   verified_on: string | null
 * }
 * verified defaults to false and verified_on to null. Only Afraim's manual
 * source check permits true; record the check date in verified_on (ISO 8601).
 * A locator identifies the exact page, section, or passage in the source.
 * hazard and tier are required for hazard-link claims; otherwise use null
 * unless an explicitly sourced relationship has been authored.
 * Keep this inventory empty until actual claims have been authored.
 */
window.BASELINE.claims = [];
