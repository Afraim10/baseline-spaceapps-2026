# BASELINE

## Overview

BASELINE is a static browser health-monitoring prototype for NASA Space Apps 2026, not a game. It includes six baseline-first cards, native SVG sparklines, collapsed timestamped data tables, validated measurement entry, a persistent SIMULATED seven-day demo, hazard-wide association records, and an inline body schematic. The interface uses the DESIGN.md tokens.

The `polish-v2` testing branch now uses an experimental **Orbital Observatory** design: a dark cosmic backdrop, procedural stars, drifting nebulae, a floating planet with rotating orbital rings, luminous channel panels, scroll reveals, and animated sample arrivals. The earlier Clinical Mission Control pass remains documented in `DESIGN.md`. The interface remains a health-monitoring prototype, not a game or real sensor console.

Open `index.html` directly in a browser. No server, build step, package installation, libraries, or network connection is required. Classic scripts load local data into `window.BASELINE`; no modules, fetch calls, or external font downloads are used.

## Experimental Replay

- All six indicators receive a new **SIMULATED** preview frame every five seconds, replaying the existing seven-day fixture values with new timestamps. Replay starts automatically unless reduced motion is enabled.
- **Pause SIMULATED stream** stops incoming frames. **Step one frame** pauses continuous replay and advances every channel once.
- Preview samples stay in memory, capped at 144 samples across the six channels. They are excluded from `baseline.demo.v1`; saved demo/manual data and the storage format are unchanged.
- Values, timestamps, statuses, recent-sample charts, and historical timelines update without recreating evidence links or focused table regions. The recent chart uses sample order, not a time axis; the separate seven-day timeline retains actual timestamp spacing.
- Manual entry locks replay controls and pauses the stream. Saving excludes preview readings for the entered indicator so its synthetic manual entry remains inspectable. Deviation testing also pauses replay and clears the Heart Rate preview before inserting the existing test.
- **Pause effects** stops the decorative scene and packet animations. OS reduced motion disables effects and automatic replay; explicit frame stepping remains available. Hidden tabs suspend the scene and replay without a catch-up burst.
- The six orbital beacons focus the corresponding indicator cards. Overview, Monitor, and Evidence navigation follows the visible sections, with a scroll-progress indicator.

`cosmos.css` contains the experimental visual layer; `space.js` owns the original canvas scene, scroll enhancements, and visual arrival feedback. System font fallbacks are used, including Bahnschrift where available. No NASA logos, reference-site artwork, external star catalogues, or real cosmological measurements are used.

The always-visible compliance bar reads "PROTOTYPE &mdash; NOT MEDICAL ADVICE" and "SIMULATED DATA". The privacy notice reads "Do not enter real personal health data."

The supplied `favicon.svg` is linked locally. The header displays the author-edited `assets/baseline-logo.png` as a circular emblem beside BASELINE, without a surrounding box or AI-generated label. Its alt text is "BASELINE project emblem". The header retains an emblem-pending placeholder if the image fails to load.

Use **Log a health measurement** to enter synthetic test readings. Heart Rate comparisons require the fixed `resting` context; Blood Glucose uses the fixed `fasting` context. `other` readings are logged but receive `NOT COMPARABLE (context differs)`. Units are fixed for this demo, including glucose in `mg/dL`; no silent unit conversion is performed.

The display label is **Body Temperature**. The `core-temperature` IDs, claim-routing key, saved-reading key, and existing status math are unchanged.

The geometric markup from `body-schematic2.svg` is inline in `index.html`, not loaded as an image. Its embedded styles are merged into `styles.css`; the metadata/C2PA block and namespace are not copied into the page. SVG zones and equivalent external buttons support click, Enter, Space, dashed-stroke keyboard focus, and synchronized `aria-pressed`. Select the active grouping again to clear it, or use its View buttons to focus a card. Head / Neuro groups Sleep Hours and Mood; Thorax / Cardio groups Blood Pressure and Heart Rate; Systemic / Metabolic groups Blood Glucose and Body Temperature. These are interface groupings, not anatomical claims or hazard associations; the additional drawing details are decorative and do not intercept pointer input.

Hazard associations come only from display-eligible, explicitly verified `hazard-link` claims with an exact matching hazard ID. There is no hardcoded indicator/hazard mapping. **All hazards** displays the explicit `hazard: "all"` scope, not an aggregation or wildcard for other scopes. Unlinked cards remain visible without a hazard badge; if the selected scope has no verified links, the lens shows "No source-verified associations loaded for this hazard."

Hazard-wide claims with `indicator: "all"` or `indicator: "none"` appear in a native disclosure inside the selected hazard bar, including their tier, provenance note, and source citation. The collapsed summary shows the record count and relationship tiers. `all` also gives every indicator card a tier badge that opens and focuses the shared evidence; `none` never badges a card. Card-specific guidance and reference sections continue to require an exact card indicator ID.

Linked cards show "RELATED TO SELECTED HAZARD" with the relationship tier, claim text, source title link, and locator. Interpretation links additionally show "Interface association &mdash; not stated by the cited source." and the author's required note. The Radiation view always displays the requested **BASELINE design note** that the six indicators do not measure radiation exposure. This hardcoded interface caution is separate from the claims inventory and never creates an association.

**Test deviation** appends a SIMULATED Heart Rate deviation. **Reset demo** restores the original synthetic readings with fresh timestamps. Personal baseline values are fixed in code, never auto-adjusted or edited by the form.

Demo history is saved under the versioned `localStorage` key `baseline.demo.v1`. Storage access and JSON loading are guarded by try/catch, with in-memory fallback and a visible notice when storage is unavailable. Invalid saved data is replaced with a fresh demo. Do not enter real personal health data; browser storage is not a private medical record.

`status.js` exposes pure functions through `window.BASELINE.status`. `MAX_READING_AGE_MS` is 48 hours: exactly 48 hours remains recent, anything older is neutral. Missing readings, missing baselines, and differing contexts never default to Green. Status freshness is rechecked every minute and when the window regains focus. Historical charts show a rolling seven-day window; the recent preview chart shows up to 16 samples with explicit sequence-axis labeling. Backdated entries do not replace a later current reading.

## Offline Tests

Open `C:\baseline\tests.html` directly in a browser, or select **Offline status tests** in the `index.html` footer. With JavaScript enabled, tests run automatically and show a passed/failed summary plus a result row for each case; reload the page to rerun them. No network connection, test framework, package installation, or server is required.

The tests cover every configured indicator boundary in both directions, exact boundary values, worst-channel Blood Pressure, context mismatch, missing and stale data, entry guards, and tolerance bands. Fixtures are explicitly SIMULATED. This suite tests status and entry-validation logic, not hazard-button routing, image loading, or scientific accuracy.

Append `?dev=1` to the page URL to show metadata lint and a separate development-only draft inventory. Drafts are marked "DRAFT - NOT VERIFIED" and never populate guidance, reference panels, or hazard associations. No source URLs are contacted by lint or rendering.

## NASA And CSA Sources

Claims and source metadata are loaded from the populated local inventories below; no NASA or CSA data are retrieved at runtime. All hardcoded readings, baselines, and tolerance bands are synthetic demo configuration, not scientific reference values.

These NASA and Canadian Space Agency pages are cited by the retained claims. Titles, source IDs, and URLs are copied from `data/sources.js`; listing them here is not a new scientific verification or a fresh check of the remote pages.

| Source ID | Page |
| --- | --- |
| `nasa-hrp-hazards` | [Five Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/) |
| `nasa-hazard-gravity-fields` | [Gravity Fields](https://www.nasa.gov/hrp/hazard-gravity-fields/) |
| `nasa-hrp-isolation` | [Isolation and Confinement](https://www.nasa.gov/hrp/hazard-isolation-and-confinement/) |
| `nasa-hrp-distance` | [Distance from Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/) |
| `nasa-space-radiation-risks` | [Space Radiation](https://nasa.gov/hrp/5-hazards-of-human-spaceflight/space-radiation/) |
| `nasa-hfbp-slee-risk` | [Risk of Performance Decrements and Adverse Health Outcomes Resulting from Sleep Loss, Circadian Desynchronization, and Work Overload](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=100) |
| `csa-bio-monitor` | [Bio-Monitor: Keeping an eye on astronauts' vital signs](https://asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| `habitability_functions` | [Features of the system required for human occupancy.](https://www.nasa.gov/reference/7-0-habit-ability-functions-vol-2/) |
| `ntrs-iss-lab-analysis` | [Laboratory Analysis Capability for the International Space Station and Future Space Exploration Missions](https://ntrs.nasa.gov/api/citations/20150012223/downloads/20150012223.pdf) |
| `nasa-hazard-hostile-closed-environments` | [Hazard: Hostile/Closed Environments](https://www.nasa.gov/hrp/hazard-hostile-closed-environments/) |

The inventory also registers `nasa-hfbp-risks`, [Sleep Loss, Circadian Desynchronization, and Work Overload Risk](https://www.nasa.gov/directorates/esdmd/hhp/risk-of-performance-decrements-and-adverse-health-outcomes-resulting-from-sleep-loss-circadian-desynchronization-and-work-overload/), which is not currently referenced by the retained claims. The in-app Sources & verification panel lists only sources used by display-eligible verified claims.

- `data/sources.js`: `source_id`, `title`, `publisher`, `url`, `accessed`.
- `data/claims.js`: `id`, `text`, `indicator`, `section`, `hazard`, `tier`, `basis`, `note`, `source_id`, `locator`, `verified`, `verified_on`.

Every claim defaults to `verified: false` and `verified_on: null`. Only Afraim's personal source check permits verification. Sections are `why`, `how`, `prevent`, `escalate`, `hazard-link`, and `reference`. Hazard-link claims require a hazard ID (including `all`), a `primary`, `secondary`, or `operational` tier, and a basis. Other claims normally use null hazard/tier values.

Runtime claim validation also accepts `all` and `none` indicator IDs. Undefined hazard/tier values are normalized to null, and an undefined note to an empty string, on in-memory copies only. `data/claims.js` and `data/sources.js` are not modified by normalization. A case-insensitive occurrence of `CHECK`, `TBD`, or `Draft:` anywhere in text, note, or locator fails lint; a marked verified claim is excluded from display. Placeholder markers in unverified drafts are reported without treating incomplete draft metadata as verified.

`basis` is `source` or `interpretation`; `note` is a string, normally empty for source-based claims. Every interpretation needs a non-empty note, including interpretation claims outside the hazard lens. Verification of underlying source material does not turn an author interpretation into a relationship stated by that source. Interpretation notes and provenance warnings remain visible beside the relevant claim.

Each card's four guidance sections are grouped in the native **Evidence & guidance** disclosure and render only explicitly verified claims matching its indicator and section. Claims need a registered, unambiguous source ID, a source title and safe link, a locator, a verification date, and valid routing/basis/note metadata; invalid metadata blocks display and appears in dev lint. Every displayed claim includes the source title as a link and its locator. Empty sections show "No source-verified guidance loaded for this section (left empty rather than invented)." Demo configuration numbers sit in a separate disclosure while the illustrative-threshold warning stays visible. Open disclosures and focused summaries/table regions are preserved when cards rerender.

The collapsed "General adult reference &mdash; not spaceflight-validated." panel renders only verified `reference` claims. It shows "No verified reference values loaded." when empty. No general-adult reference numbers are hardcoded. The Sources & verification panel counts verification flags and lists sources used by display-eligible verified claims. Passing lint or tests does not verify scientific accuracy.

## AI Use

AI assistance was used for:

- **Kilo / GPT-6 Astra:** code and tests.
- **ChatGPT:** design specification and SVGs.
- **Gemini:** planning and draft claims.
- **Claude:** review.

The Clinical Mission Control UI implementation and one-off browser verification were also AI-assisted using Kilo.

The experimental Orbital Observatory scene, replay UI, animations, and browser checks were AI-assisted using Kilo. All celestial graphics are original concept artwork, not scientific visualizations or imported NASA assets.

AI-generated code and documentation require author review. `body-schematic2.svg` was AI-generated; its drawing is used inline with a visible AI-generated label and interface-grouping disclaimer. Per-file attribution headers have been removed. The project author edited the emblem and logo, which use neutral labeling in the header. AI assistance and passing tests do not verify scientific content; draft claims require manual source checking before verification. No NASA logos are used.

## Limitations

- Prototype only, not medical advice or a validated clinical tool.
- "Illustrative demo thresholds, not clinical." Green, Amber, and Red express configured deviations, not diagnoses, urgency, or validated mission protocols.
- Numeric validation uses "entry limits, not clinical thresholds" as typo guards and rejects values rather than clamping. It does not establish medical plausibility or safety.
- Guidance is incomplete. Sections without eligible source-verified claims stay empty rather than supplying invented explanations, preventive actions, or escalation instructions.
- Verification flags, metadata lint, and passing tests do not establish scientific accuracy, clinical validation, or applicability to a spaceflight mission.
- Measurement-method context does not validate the demo readings: the cited CSA passage describes skin temperature, not core-temperature measurement, and the blood-analysis passages do not establish glucose measurement.
- Body-zone emphasis and hazard badges organize the interface; neither changes personal-baseline deviation status or establishes clinical causation.
- No live sensors, telemetry, or medical assessment are connected. Browser `localStorage` is not a secure medical record and may be unavailable or cleared.
- Personal baselines will remain fixed: no auto-adjustment or Update Personal Baseline action. The environment selector and OSDR example are out of scope.
- Any future synthetic readings must remain labeled `SIMULATED`; never enter real personal health data.
- Hackathon timing, submission wording, and other event rules remain subject to verification against the official 2026 guide.
