# STATE.md — BASELINE (NASA Space Apps 2026)

**Last Updated:** Sat Nov 14, 2026 (Pre-event, Saturday night)
**Current Phase:** Sat 0–2h Scaffold + Deploy
**Repository:** `baseline-spaceapps-2026`

## Canonical Scope & Guardrails
- **Project:** BASELINE — visual self-assessment health-monitoring prototype for astronauts ("Create Health Monitoring Software for Astronauts on Space Missions"). Strictly a clinical/operational decision-support prototype (NOT a game; zero gameplay, exoplanet, or Horizons concepts).
- **Indicators (6):** Blood Pressure, Heart Rate, Blood Glucose, Core Temperature, Sleep Hours, Mood.
- **Core Mechanism:** Compare current values against the astronaut's **own personal baseline** (primary Green/Amber/Red status) alongside general-adult reference ranges (explicitly tagged *"General adult reference — not spaceflight-validated"*), viewed through a filterable lens of **NASA's five spaceflight hazards** (Radiation, Isolation & Confinement, Distance from Earth, Gravity Fields, Hostile Closed Environments).
- **NASA Data Sources:** NASA Human Research Program (HRP) resources (plus optionally one NASA OSDR dataset example with explicit source attribution), listed in the submission's "NASA Data" field.
- **Stack:** Plain static HTML/CSS/JS, locally vendored libraries only (`vendor/`), no `npm`/build step, no unpinned CDNs, continuously deployable on GitHub Pages.
- **Accuracy Protocol:** Atomic claims in structured data with `source_id` per claim and `verified: false` by default. Production UI renders ONLY claims with `verified: true` that Afraim has personally checked against the source text. Never fabricate URLs, DOIs, or quotes.
- **Compliance & Submission Rules (Verify exact wording in 2026 Guide):**
  - Build code only after official hackathon start.
  - Disclose AI use clearly (in `README.md` and submission form).
  - No NASA logos anywhere in UI, repo, or demo.
  - AI-generated images require a visible watermark (avoid by using self-authored geometric SVGs).
  - Demo: video up to 30 sec OR slide deck up to 7 slides (confirm exact format/upload rules in the 2026 guide).
  - Keep GitHub Pages deployment live and unbroken at all times.

## Done
- Challenge scope, MVP vs. Stretch vs. Out-of-Scope boundaries locked.
- Stack simplified to zero-build static HTML/CSS/JS + vendored assets for continuous GitHub Pages deployment.
- Accuracy gate (`source_id` + `verified: true` filter) and compliance constraints established.

## In Progress
- **Sat 0–2h:** Create `baseline-spaceapps-2026` repo, vendor charting library (if used), scaffold `index.html` / `styles.css` / `app.js` / `data/`, enable GitHub Pages, and verify live deployment.

## Blocked
- Production claim rendering is intentionally gated on Afraim's manual source verification (`verified: true`) during Sat 10–16h.

## Decisions Needed (Immediate — Sat 0–2h)
1. **Charting Implementation:** Vendor single-file `chart.umd.min.js` (pinned version in `vendor/`, license included) vs. zero-dependency native `<svg>` trend charts.
2. **Baseline Threshold Math:** Confirm Green/Amber/Red delta bands relative to personal baseline (e.g., Green $\le 10\%$ deviation, Amber $10\text{–}20\%$, Red $> 20\%$, with fixed absolute bounds for Temperature and Mood).
3. **2026 Guide Check:** Confirm exact local/UTC start time, AI-disclosure wording, and 30s video / 7-slide deck rules in the official 2026 Participant/Submission Guide.

## Risks
- **`file://` JSON CORS Block (High if using `fetch`):** Opening plain `index.html` locally without an HTTP server blocks `fetch('data/claims.json')`.
- **Verification Bottleneck (High):** Coarse-grained claim objects will hide entire UI cards if one sentence is unverified; claims must be atomic (`1 claim = 1 fact`).
- **30-Cell Matrix Overload (Medium):** Verifying all 5 hazards $\times$ 6 indicators in 6 hours is tight; prioritize high-evidence HRP physiological links first.

## Claims Inventory
- **Total Claims:** 0
- **Verified (`verified: true`):** 0
- **Unverified (`verified: false`):** 0