# BASELINE

## Overview

BASELINE is a static browser health-monitoring prototype for NASA Space Apps 2026, not a game. This scaffold displays the title, a safety banner, and an empty evidence section.

Open `index.html` directly in a browser. No server, build step, package installation, libraries, or network connection is required. Styles and scripts are local; `data/claims.js` provides an empty array without using `fetch` or JavaScript modules.

The visible banner reads: "Prototype, simulated data, not medical advice". The page also carries a `SIMULATED` label.

## NASA Data

No NASA data or research claims are included or retrieved in this scaffold. NASA Human Research Program (HRP) resources are planned sources, not yet selected or verified. No NASA logos are used.

Future research content belongs in `data/*.json`. Each atomic claim must include a `source_id` and default to `verified: false`. Only after Afraim personally checks the source text may a claim be marked `verified: true`. The schema is documented in `data/claims.js`; `app.js` displays only explicitly verified claims and includes their source IDs. No source URLs, DOIs, or quotations have been invented.

## AI Use

The initial HTML, CSS, JavaScript, and README scaffold were generated with AI assistance using Kilo. AI-generated code requires human review, and AI assistance does not establish medical accuracy or verify research claims. No AI-generated images are included.

## Limitations

- Prototype only, not medical advice or a validated clinical tool.
- No live measurements, personal-baseline calculations, reference ranges, alerts, or recommendations are implemented.
- The claim inventory is empty; no scientific or clinical evidence is displayed.
- Any future simulated measurements must be visibly labeled `SIMULATED`.
- Hackathon timing, submission wording, and other event rules remain subject to verification against the official 2026 guide.
