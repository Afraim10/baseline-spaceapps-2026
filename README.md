<!-- AI-assisted (GPT-6 Astra via Kilo), reviewed by author. -->
# BASELINE

## Overview

BASELINE is a static browser health-monitoring prototype for NASA Space Apps 2026, not a game. Step 1 provides the DESIGN.md token-based shell: compliance bar, project header, hazard lens, body-figure slot, six neutral indicator slots, and Sources & verification counts.

Open `index.html` directly in a browser. No server, build step, package installation, libraries, or network connection is required. Classic scripts load local data into `window.BASELINE`; no modules, fetch calls, or external font downloads are used.

The always-visible compliance bar reads "PROTOTYPE &mdash; NOT MEDICAL ADVICE" and "SIMULATED DATA". The privacy notice reads "Do not enter real personal health data."

The supplied `favicon.svg` is linked locally. The header expects `assets/baseline-logo.png` with alt text "BASELINE project emblem (AI-generated)" and a visible AI-generated label. That PNG is not present yet; the header shows an explicit emblem-pending placeholder if it fails to load.

Append `?dev=1` to the page URL to show the in-page verified-claim metadata lint.

## NASA Data

No scientific claims are authored or displayed by this shell. Both data inventories are empty; no NASA data are retrieved and no source URLs, DOIs, or quotations are invented.

- `data/sources.js`: `source_id`, `title`, `publisher`, `url`, `accessed`.
- `data/claims.js`: `id`, `text`, `source_id`, `locator`, `verified`, `verified_on`.

Every claim defaults to `verified: false` and `verified_on: null`. Only Afraim's personal source check permits verification. Dev lint requires every explicitly verified claim to reference an existing source and provide a non-empty locator; passing lint does not verify its scientific accuracy. Verified-only guidance and development draft rendering are deferred to step 3.

## AI Use

Code and documentation are AI-assisted using Kilo. Source headers use the project-required attribution "AI-assisted (GPT-6 Astra via Kilo), reviewed by author." Author review and scientific source verification remain separate requirements. The project emblem is designated AI-generated and labeled accordingly. No NASA logos are used.

## Limitations

- Prototype only, not medical advice or a validated clinical tool.
- Measurement entry, baseline calculations, persisted demo data, charts, body zones, and hazard interactions are not implemented in step 1. Their controls are deliberately disabled.
- "Illustrative demo thresholds, not clinical." Deviation statuses in the planned demo are not diagnoses.
- Personal baselines will remain fixed: no auto-adjustment or Update Personal Baseline action. The environment selector and OSDR example are out of scope.
- Any future synthetic readings must remain labeled `SIMULATED`; never enter real personal health data.
- Hackathon timing, submission wording, and other event rules remain subject to verification against the official 2026 guide.
