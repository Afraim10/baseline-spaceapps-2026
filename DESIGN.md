# DESIGN.md — BASELINE

## 1. CSS Tokens

Use these variables as the foundation for the entire interface. Keep component styling consistent by referencing tokens rather than introducing arbitrary colors.

```css
:root {
  /* Brand */
  --brand-primary: #155F7A;
  --brand-hover: #104D64;
  --brand-pressed: #0C3F53;
  --brand-tint: #E8F2F6;

  /* Surfaces */
  --bg-canvas: #F3F6F8;
  --bg-surface: #FFFFFF;
  --bg-surface-muted: #E8EEF2;
  --bg-banner: #142536;

  /* Borders */
  --border-strong: #7C91A2;
  --border-soft: #D5DEE6;

  /* Typography */
  --text-primary: #142536;
  --text-secondary: #526577;
  --text-inverse: #FFFFFF;

  /* Clinical status */
  --status-good-bg: #E7F4EB;
  --status-good-border: #397A57;
  --status-good-text: #17613D;

  --status-warn-bg: #FFF3D8;
  --status-warn-border: #946000;
  --status-warn-text: #7B4C00;

  --status-alert-bg: #FCEAEA;
  --status-alert-border: #B33A3A;
  --status-alert-text: #A12B2B;

  /* Compliance */
  --prototype-bg: #142536;
  --prototype-text: #FFFFFF;
  --simulated-bg: #FFF3D8;
  --simulated-border: #946000;
  --simulated-text: #7B4C00;

  /* Charts and interactions */
  --chart-line: #155F7A;
  --chart-grid: #D5DEE6;
  --chart-baseline-band: #E8EEF2;
  --focus-ring: #155F7A;

  /* Fonts */
  --font-ui: "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-data: "IBM Plex Mono", Consolas, monospace;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
}
```

## 2. Typography Scale

Use Inter for interface text and IBM Plex Mono for measurements and timestamps.

| Element | Size | Weight | Typeface |
|---|---:|---:|---|
| Page heading | 30px | 650 | Inter |
| Section heading | 21px | 600 | Inter |
| Card heading | 16px | 600 | Inter |
| Main measurement | 32px | 500 | IBM Plex Mono |
| Body text | 15px | 400 | Inter |
| Field labels | 13px | 500 | Inter |
| Metadata | 12px | 500 | Inter |
| Timestamps | 12px | 400 | IBM Plex Mono |

Use tabular numerals so measurements align consistently. Keep line heights readable and avoid text smaller than 12px.

## 3. Compliance Bar

Keep this bar visible across all dashboard views.

- Height: 42px.
- Background: `--prototype-bg`.
- Left label: `PROTOTYPE — NOT MEDICAL ADVICE`.
- Right label: `SIMULATED DATA`.
- Disclaimer text: white.
- Simulated-data badge: amber status palette.
- Don't hide the disclaimer inside a modal or expandable section.

## 4. Hazard Lens

Provide five selectable filters:

1. Radiation
2. Isolation & Confinement
3. Distance from Earth
4. Gravity Fields
5. Hostile Closed Environments

**Appearance:**
- Inactive: white background, dark text, strong neutral border.
- Active: brand-primary background, white text.
- Minimum control height: 40px.
- Rounded rectangular pills.
- Clearly visible keyboard focus and selected states.

**Interaction:**
- Default selection: All hazards.
- Selecting a hazard highlights its relevant indicator cards.
- Show the relationship classification: Primary physiological context, Secondary/contextual association, or Operational relevance.
- Selecting All restores every indicator.

**Initial associations:**

| Hazard | Associated indicators |
|---|---|
| Radiation | No direct physiological indicator among the six |
| Isolation & Confinement | Sleep, Mood |
| Distance from Earth | All indicators as operational monitoring requirements |
| Gravity Fields | Blood Pressure, Heart Rate |
| Hostile Closed Environments | Sleep, Mood; Glucose as secondary context |

## 5. Indicator Cards

Track these six indicators:

- Blood Pressure (mmHg)
- Heart Rate (bpm)
- Blood Glucose (mg/dL or mmol/L)
- Core Temperature (°C)
- Sleep Hours (hours)
- Mood (self-reported scale)

**Visual specifications:**
- White surface with a 1px strong neutral border.
- 12px radius and 18–20px padding.
- Approximately 280px minimum collapsed height.
- Use the same structure across all six cards.

**Required content:**
1. Indicator name.
2. Current reading and unit.
3. Personal baseline value.
4. Absolute or relative deviation.
5. Green / Amber / Red status, with an icon and written label.
6. Seven-day trend chart.
7. Last recorded timestamp and measurement source.
8. Four expandable guidance sections:
   - Why measured
   - How measured in flight
   - Preventive actions
   - When to escalate

For charts, use a solid teal trend line and a muted personal-baseline band. Show actual timestamps and avoid decorative smoothing.

Keep general adult context secondary and use this exact wording:

"General adult reference — not spaceflight-validated."

## 6. Entry Form

Use the title **Log a health measurement**.

**Fields:**
- Blood Pressure: systolic and diastolic.
- Heart Rate: numeric, bpm.
- Blood Glucose: numeric, with unit.
- Core Temperature: numeric, °C.
- Sleep Hours: numeric, hours.
- Mood: five-point anchored selection.

**Mood labels:**
1. Very low
2. Low
3. Neutral
4. Good
5. Very good

**Additional fields:**
- Measurement timestamp.
- Input source.
- Save Measurement.
- Cancel.

**Demo controls:**
- `Test deviation`: inserts a predefined simulated deviation and updates the affected card, status, and trend.
- `Reset demo`: restores the original synthetic dataset and baseline values.

Give every control a visible label, unit indicator, validation message, and minimum 44px touch target. Never rely on placeholder text as the only field label.

## 7. Body-Figure Interaction

Build a geometric, front-facing anatomical SVG.

- ViewBox: `0 0 240 520`.
- Transparent background.
- Neutral gray base silhouette.
- Brand-blue selected zones.
- Blue-gray anatomical boundaries.
- Independently selectable regions.

**Three interactive zones:**

| Zone | Associated indicators |
|---|---|
| Head / Neuro | Sleep Hours, Mood |
| Thorax / Cardio | Blood Pressure, Heart Rate |
| Systemic / Metabolic | Blood Glucose, Core Temperature |

When a user selects a zone:
- Highlight the anatomical region.
- Emphasize its associated indicator cards.
- Allow the user to open a related indicator card.

Provide equivalent keyboard-accessible controls outside the SVG, visible focus states, and descriptive accessible labels.

These zones are interface groupings, not claims of exclusive anatomical localization.

## 8. Layout

### Desktop — 1440 × 900px reference

- Compliance bar: 42px.
- Main navigation: approximately 64px.
- Hazard Lens: 80–100px.
- Main content: two-column layout.
- Left column: approximately 30% width for the body schematic.
- Right column: approximately 70% width for indicators.
- Indicator grid: two columns, three rows.
- Keep the measurement-entry action accessible.

### Mobile

- Use a single-column layout.
- Place the body schematic above the indicator cards.
- Make the Hazard Lens horizontally scrollable.
- Give indicator cards the full available width.
- Keep entry controls touch-friendly.
- Avoid horizontal scrolling for essential content.

## 9. Five Design Guardrails

1. **Personal baseline first:** The individual baseline drives the primary status. General adult references remain secondary.

2. **Deviation is not diagnosis:** Green, Amber, and Red communicate configured deviations, not confirmed medical conditions.

3. **Association is not causation:** Hazard relationships must distinguish physiological mechanisms, contextual associations, and operational relevance.

4. **Missing data stays visible:** Use `NO RECENT READING` or `BASELINE NOT ESTABLISHED`. Never assign Green to missing measurements.

5. **Clinical escalation requires evidence:** Use established medical protocols and appropriate mission medical personnel. Never invent clinical thresholds or present unsupported medical advice.