# BASELINE

## Overview

BASELINE is a static browser health-monitoring prototype for NASA Space Apps 2026, not a game. It includes six baseline-first cards, native SVG sparklines, collapsed timestamped data tables, validated measurement entry, and a persistent SIMULATED seven-day demo. Commit 3 adds the inline body schematic and verified-claim hazard lens. The interface uses the DESIGN.md tokens.

Open `index.html` directly in a browser. No server, build step, package installation, libraries, or network connection is required. Classic scripts load local data into `window.BASELINE`; no modules, fetch calls, or external font downloads are used.

The always-visible compliance bar reads "PROTOTYPE &mdash; NOT MEDICAL ADVICE" and "SIMULATED DATA". The privacy notice reads "Do not enter real personal health data."

The supplied `favicon.svg` is linked locally. The header expects `assets/baseline-logo.png` with alt text "BASELINE project emblem (AI-generated)" and a visible AI-generated label. That PNG is not present yet; the header shows an explicit emblem-pending placeholder if it fails to load.

Use **Log a health measurement** to enter synthetic test readings. Heart Rate comparisons require the fixed `resting` context; Blood Glucose uses the fixed `fasting` context. `other` readings are logged but receive `NOT COMPARABLE (context differs)`. Units are fixed for this demo, including glucose in `mg/dL`; no silent unit conversion is performed.

The display label is **Body Temperature**. The `core-temperature` IDs, claim-routing key, saved-reading key, and existing status math are unchanged.

The geometric markup from `body-schematic.svg` is inline in `index.html`, not loaded as an image. SVG zones and equivalent external buttons support click, Enter, Space, visible keyboard focus, and synchronized `aria-pressed`. Select the active grouping again to clear it, or use its View buttons to focus a card. Head / Neuro groups Sleep Hours and Mood; Thorax / Cardio groups Blood Pressure and Heart Rate; Systemic / Metabolic groups Blood Glucose and Body Temperature. These are interface groupings, not anatomical claims or hazard associations.

Hazard associations come only from display-eligible, explicitly verified `hazard-link` claims with an exact matching hazard ID. There is no hardcoded indicator/hazard mapping. **All hazards** displays the explicit `hazard: "all"` scope, not an aggregation or wildcard for other scopes. Unlinked cards remain visible without a hazard badge; if the selected scope has no verified links, the lens shows "No source-verified associations loaded for this hazard."

Linked cards show "RELATED TO SELECTED HAZARD" with the relationship tier, claim text, source title link, and locator. Interpretation links additionally show "Interface association &mdash; not stated by the cited source." and the author's required note. The Radiation view always displays the requested **BASELINE design note** that the six indicators do not measure radiation exposure. This hardcoded interface caution is separate from the claims inventory and never creates an association.

**Test deviation** appends a SIMULATED Heart Rate deviation. **Reset demo** restores the original synthetic readings with fresh timestamps. Personal baseline values are fixed in code, never auto-adjusted or edited by the form.

Demo history is saved under the versioned `localStorage` key `baseline.demo.v1`. Storage access and JSON loading are guarded by try/catch, with in-memory fallback and a visible notice when storage is unavailable. Invalid saved data is replaced with a fresh demo. Do not enter real personal health data; browser storage is not a private medical record.

`status.js` exposes pure functions through `window.BASELINE.status`. `MAX_READING_AGE_MS` is 48 hours: exactly 48 hours remains recent, anything older is neutral. Missing readings, missing baselines, and differing contexts never default to Green. Status freshness is rechecked every minute and when the window regains focus. Charts show a rolling seven-day window at render time; backdated entries do not replace a later current reading.

Open `tests.html` directly to run the offline pass/fail table. It covers every configured indicator boundary in both directions, exact boundary values, worst-channel Blood Pressure, context mismatch, missing and stale data, entry guards, and tolerance bands. Tests use explicitly SIMULATED fixtures and need no test framework or server.

Append `?dev=1` to the page URL to show metadata lint and a separate development-only draft inventory. Drafts are marked "DRAFT - NOT VERIFIED" and never populate guidance, reference panels, or hazard associations. No source URLs are contacted by lint or rendering.

## NASA Data

No scientific claims are authored by this implementation. Both data inventories remain empty; no NASA data are retrieved and no source URLs, DOIs, or quotations are invented. All hardcoded readings, baselines, and tolerance bands are synthetic demo configuration, not scientific reference values.

- `data/sources.js`: `source_id`, `title`, `publisher`, `url`, `accessed`.
- `data/claims.js`: `id`, `text`, `indicator`, `section`, `hazard`, `tier`, `basis`, `note`, `source_id`, `locator`, `verified`, `verified_on`.

Every claim defaults to `verified: false` and `verified_on: null`. Only Afraim's personal source check permits verification. Sections are `why`, `how`, `prevent`, `escalate`, `hazard-link`, and `reference`. Hazard-link claims require a hazard ID (including `all`), a `primary`, `secondary`, or `operational` tier, and a basis. Other claims normally use null hazard/tier values.

`basis` is `source` or `interpretation`; `note` is a string, normally empty for source-based claims. Every interpretation needs a non-empty note, including interpretation claims outside the hazard lens. Verification of underlying source material does not turn an author interpretation into a relationship stated by that source. Interpretation notes and provenance warnings remain visible beside the relevant claim.

Each card's four guidance sections render only explicitly verified claims matching its indicator and section. Claims need a registered, unambiguous source ID, a source title and safe link, a locator, a verification date, and valid routing/basis/note metadata; invalid metadata blocks display and appears in dev lint. Every displayed claim includes the source title as a link and its locator. Empty sections show "Awaiting manual source verification."

The collapsed "General adult reference &mdash; not spaceflight-validated." panel renders only verified `reference` claims. It shows "No verified reference values loaded." when empty. No general-adult reference numbers are hardcoded. The Sources & verification panel counts verification flags and lists sources used by display-eligible verified claims. Passing lint or tests does not verify scientific accuracy.

## AI Use

Code and documentation were generated with AI assistance using Kilo and require author review. Per-file attribution headers have been removed. The project emblem is designated AI-generated and labeled accordingly. AI assistance and passing tests do not verify scientific content. No NASA logos are used.

## Limitations

- Prototype only, not medical advice or a validated clinical tool.
- "Illustrative demo thresholds, not clinical." Green, Amber, and Red express configured deviations, not diagnoses, urgency, or validated mission protocols.
- Numeric validation uses "entry limits, not clinical thresholds" as typo guards and rejects values rather than clamping. It does not establish medical plausibility or safety.
- Body-zone emphasis and hazard badges organize the interface; neither changes personal-baseline deviation status or establishes clinical causation.
- Personal baselines will remain fixed: no auto-adjustment or Update Personal Baseline action. The environment selector and OSDR example are out of scope.
- Any future synthetic readings must remain labeled `SIMULATED`; never enter real personal health data.
- Hackathon timing, submission wording, and other event rules remain subject to verification against the official 2026 guide.
