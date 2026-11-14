SPEC AMENDMENTS (override earlier text)
1. Classic <script> tags only. NO type="module", no import/export: Chrome blocks ES modules on file://. Use one global namespace (window.BASELINE).
2. Body zones (match locked design): Zone 1 = Sleep, Mood. Zone 2 = BP, Heart Rate. Zone 3 = Glucose, Core Temp. Core Temp appears once. Tooltip: "Interface grouping, not an anatomical claim."
3. Threshold boundaries, no gaps: HR/Glucose/Sleep: Green |d|<=10%, Amber >10% to <=20%, Red >20%. BP: evaluate systolic and diastolic separately, worst governs: Green <=8, Amber >8 to <=15, Red >15 mmHg. Temp: Green <=0.4, Amber >0.4 to <1.0, Red >=1.0 C. Mood: delta>=0 Green, -1 Amber, <=-2 Red.
4. Label thresholds on every card: "Illustrative demo thresholds, not clinical." Also in README.
5. Context field: Heart Rate must be "resting"; Glucose must be "fasting" or "other". Readings in non-baseline context are logged but show neutral "NOT COMPARABLE (context differs)".
6. Neutral states: "NO RECENT READING" (older than a named constant, e.g. 48 h) and "BASELINE NOT ESTABLISHED". Never default to green.
7. Entry validation: reject (don't clamp) implausible values as typo guards, e.g. HR 20-250, glucose 20-600, temp 30-43, sleep 0-24, SBP 50-260, DBP 30-160, DBP<SBP, no future timestamps. Label them "entry limits, not clinical thresholds".
8. localStorage in try/catch with in-memory fallback, versioned key, reset button. Visible notice: "Do not enter real personal health data."
9. Sparklines: <title>/<desc> plus a collapsed data table. Body zones: role="button", tabindex, aria-pressed, Enter/Space, plus external buttons.
10. Every source file starts with a comment: "AI-assisted (GPT-6 Astra via Kilo), reviewed by author."
11. CUT for now: "Update Personal Baseline" (baseline fixed; no auto-adjust; document as design decision), environment selector, OSDR example.