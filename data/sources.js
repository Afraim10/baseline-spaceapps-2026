"use strict";

window.BASELINE = window.BASELINE || {};

/*
 * Source schema:
 * {
 *   source_id: string,
 *   title: string,
 *   publisher: string,
 *   url: string,
 *   accessed: string
 * }
 * Use the actual source URL and an ISO 8601 access date. Never invent either.
 */
window.BASELINE.sources = [];
