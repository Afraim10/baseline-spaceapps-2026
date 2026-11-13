"use strict";

/*
 * Atomic claim schema (one fact per entry):
 * {
 *   id: string,
 *   text: string,
 *   source_id: string,
 *   verified: boolean
 * }
 * verified defaults to false; only Afraim's manual source check permits true.
 * This empty classic-script array supports opening index.html via file://.
 */
window.BASELINE_CLAIMS = [];
