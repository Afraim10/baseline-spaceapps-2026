# STATE.md — BASELINE (NASA Space Apps 2026)

**Last Updated:** Sat Nov 14, 2026 — 08:58 EET (Saturday Hour 9)
**Current Phase:** Sat 2–10h UI Shell, Data Schema, Body Figure & Charts (Closing window — transition to Sat 10–16h Content Verification imminent)
**Repository:** `baseline-spaceapps-2026`

## Done
- Challenge scope, MVP vs. Stretch vs. Out-of-Scope boundaries locked.
- Plain static HTML/CSS/JS + vendored assets architecture established.
- **Design System v1.0 locked:** Clinical light theme (`#F3F6F8` canvas, `#FFFFFF` cards, `#142536` text, `#155F7A` primary teal-blue), accessible Green/Amber/Red deviation tokens, Inter + IBM Plex Mono typography scale, and component specs.
- **Scientific Hazard Mapping locked:**
  - *Radiation:* Explicitly unmapped to acute vital changes (avoids false dosimetry claims).
  - *Isolation & Confinement:* Sleep Hours, Mood (primary circadian/behavioral context).
  - *Distance from Earth:* All 6 indicators (operational autonomy & escalation preparedness, not direct physiological causation).
  - *Gravity Fields:* Blood Pressure, Heart Rate (cephalad fluid shifts, cardiovascular deconditioning).
  - *Hostile Closed Environments:* Sleep Hours, Mood (primary); Blood Glucose (secondary metabolic/circadian context).

## In Progress
- Simplifying the circular astronaut-pulse emblem into a flat, non-AI vector SVG mark for the header and favicon.
- Implementing the static UI shell (`index.html`, `styles.css`, `app.js`) and atomic `data/claims.js` schema.

## Blocked
- Production text rendering in indicator cards remains intentionally gated on manual source verification (`verified: true`) scheduled for Sat 10–16h.

## Decisions Needed
1. **Logo Execution:** Confirm flat SVG trace for UI/favicon (and watermark label if using the raster ChatGPT emblem in demo slides).
2. **Charting Implementation:** Confirm zero-dependency inline `<svg>` trend charts (with personal baseline shaded band) vs. vendored `chart.umd.min.js` so no time is lost on library configuration.

## Risks
- **Timebox Slippage (High):** It is 08:58 AM Saturday (Hour 9). Any additional time spent in Photoshop cuts directly into the Sat 10–16h NASA HRP literature verification window.
- **AI Watermark Non-Compliance (Medium):** Using the unwatermarked ChatGPT emblem directly in public deliverables risks violating 2026 Space Apps media rules.
- **Verification Bottleneck (High):** Keep claims atomic (`1 claim = 1 fact` in `data/claims.js`) so verified cards render immediately as you check HRP sources.

## Claims Inventory
- **Total Claims:** 0
- **Verified (`verified: true`):** 0
- **Unverified (`verified: false`):** 0