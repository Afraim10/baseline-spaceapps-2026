# STATE.md — BASELINE (NASA Space Apps 2026)

**Last Updated:** Sat Nov 14, 2026 — 15:13 EET (Saturday Hour 15)
**Current Phase:** Transitioning from Design Freeze -> Immediate Code Build & NASA HRP Content Verification
**Repository:** `baseline-spaceapps-2026` (Local workspace: `C:\baseline`)

## Done
- Challenge scope, MVP vs. Stretch vs. Out-of-Scope boundaries locked.
- Plain static HTML/CSS/JS + inline SVG architecture locked (zero build step, zero unpinned CDNs, `file://` + GitHub Pages safe).
- **Design System v1.0 & Brand Identity Locked:**
  - Clinical light palette (`#F3F6F8` canvas, `#FFFFFF` cards, `#142536` banner/ink, `#155F7A` primary accent) and accessible Green/Amber/Red status tokens.
  - Finalized circular astronaut-pulse emblem (`baseline_logo.jpg`) — requires quick transparent PNG export (`assets/baseline-logo.png`) and AI-generated watermark label.
- **Scientific Hazard Mapping Locked:**
  - *Radiation:* Explicitly unmapped to vital signs (avoids false dosimetry claims).
  - *Isolation & Confinement:* Sleep Hours, Mood.
  - *Distance from Earth:* All 6 indicators (operational autonomy & escalation readiness).
  - *Gravity Fields:* Blood Pressure, Heart Rate.
  - *Hostile Closed Environments:* Sleep Hours, Mood (primary); Blood Glucose (secondary).

## In Progress
- Exporting `baseline_logo.jpg` with transparent background (`assets/baseline-logo.png`) + AI watermark disclosure.
- Handing off locked technical/design specification to Claude for architectural check and Kilo CLI for code generation in `C:\baseline`.
- Preparing atomic `data/claims.js` entries for manual NASA HRP verification.

## Blocked
- Production card guidance (`Why measured`, `How measured in flight`, `Preventive actions`, `When to escalate`) remains gated on Afraim's manual source verification (`verified: true`).

## Decisions Needed
- Confirm initial personal-baseline deviation thresholds in the Claude/Kilo code pass (HR/Glucose/Sleep `%` bands vs. absolute deltas for BP, Core Temp, and Mood).

## Risks
- **Schedule Slippage (High):** Now at Saturday 15:13 EET (~5 hours behind original scaffolding/UI schedule). Must cut all stretch goals (environment selector, OSDR dataset) until core MVP + verified HRP claims are deployed live on GitHub Pages.
- **Verification Bottleneck (High):** Keep `data/claims.js` strictly atomic (`1 claim = 1 fact`) so verified cards populate incrementally as NASA HRP sources are checked.
- **AI Watermark Compliance (Low-Medium):** Ensure `baseline_logo.jpg` / `assets/baseline-logo.png` carries a visible AI-generated label per 2026 Space Apps guide rules.

## Claims Inventory
- **Total Claims:** 0
- **Verified (`verified: true`):** 0
- **Unverified (`verified: false`):** 0