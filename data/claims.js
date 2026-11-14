/* AI-assisted (GPT-6 Astra via Kilo), reviewed by author. */
"use strict";

window.BASELINE = window.BASELINE || {};

/*
 * Atomic claim schema (one fact per entry):
 * {
 *   id: string,
 *   text: string,
 *   source_id: string,
 *   locator: string,
 *   verified: boolean,
 *   verified_on: string | null
 * }
 * verified defaults to false and verified_on to null. Only Afraim's manual
 * source check permits true; record the check date in verified_on (ISO 8601).
 * A locator identifies the exact page, section, or passage in the source.
 * Keep this inventory empty until actual claims have been authored.
 */
window.BASELINE.claims = [];
