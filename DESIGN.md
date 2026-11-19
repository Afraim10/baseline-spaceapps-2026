# BASELINE Design Reference Audit and Polish Specification

Audit date: 2026-11-17.

Reference pages:

- https://gitmastery.me/
- https://www.nasa-spaceapps6oct.org/forms?form=project-submission

Current testing-branch direction: **Orbital Observatory**, applied on 2026-11-19 in response to the request for a more creative cosmic interface, scroll activity, and animated incoming samples. Section 17 supersedes the earlier light-only and no-ambient-motion recommendations for this experiment. The original reference audit and Clinical Mission Control pass remain as historical design context.

The core Clinical Mission Control parameters have been applied to `index.html`, `styles.css`, and the presentation/disclosure code in `app.js`. Reference measurements were extracted from public HTML, CSS, JavaScript, and rendered browser inspection; Section 6 records the pre-polish BASELINE snapshot. Proposed targets remain design guidance, while Section 15.5 records the implemented UI checks. Scientific claims, baseline/status math, fixed units, and dependencies were not changed by the polish pass.

## Contents

1. Scope and guardrails
2. Audit method and evidence
3. GitMastery reference analysis
4. Space Apps submission reference analysis
5. What to combine and what to reject
6. Pre-polish BASELINE audit
7. Combined visual direction
8. CSS tokens
9. Typography specification
10. Layout and responsive behavior
11. Component specifications
12. Interaction and motion specification
13. Accessibility and performance
14. Implementation sequence
15. Acceptance checklist
16. Source registry
17. Experimental orbital direction

## 1. Scope and Guardrails

BASELINE is a static browser health-monitoring prototype, not a game, diagnostic product, live telemetry system, or NASA-branded application.

The five original design guardrails remain mandatory:

1. **Personal baseline first.** The configured individual baseline drives deviation status. General adult references remain secondary.
2. **Deviation is not diagnosis.** Green, Amber, and Red describe illustrative configured deviations, not confirmed conditions or validated urgency.
3. **Association is not causation.** Hazard relationships distinguish primary physiological context, secondary/contextual association, and operational relevance. An author's interpretation stays labeled as an interpretation.
4. **Missing data stays visible.** Missing or stale readings, missing baselines, and incompatible contexts remain neutral. Never replace them with a reassuring Green state.
5. **Clinical escalation requires evidence.** Guidance must come from eligible source-verified content, not invented thresholds, mission protocols, or medical advice.

Additional constraints:

- Keep the prototype disclaimer, SIMULATED labeling, and real-personal-data warning visible.
- Retain plain HTML, CSS, classic JavaScript, native controls, and inline SVG. `index.html` must work through `file://` without a build, server, package installation, or network.
- Do not add dependencies or download fonts without approval. Do not copy either reference's framework or animation stack.
- Use BASELINE's own emblem and schematic, retaining their AI-generated disclosures. Do not import NASA logos, reference mascots, branded illustrations, or reference video assets.
- Do not modify claim verification flags or scientific content as part of visual polish. New scientific claims still require `source_id` and default `verified: false` in the project's content workflow.
- Preserve existing IDs, routing keys, fixed units, baseline values, status math, and `baseline.demo.v1` storage behavior.

## 2. Audit Method and Evidence

### 2.1 What was inspected

- Both exact reference URLs, their delivered markup, active stylesheets, and relevant public interaction bundles.
- Desktop rendering at **1440 x 900 CSS px**, device pixel ratio 1, fine pointer and hover enabled.
- Mobile rendering at **390 x 844 CSS px**, device pixel ratio 1, touch emulation, coarse pointer, and no hover.
- GitMastery's first-visit dialog, unobscured homepage, mobile menu, and primary-button hover, active, and focus-visible states.
- The Space Apps closed-submission state, mobile menu, scrolled header, and Register hover, active, and focus-visible states.
- Reduced-motion preference changes, supplemented by reading the JavaScript that implements motion.
- BASELINE through `file:///C:/baseline/index.html`, including the expanded entry panel and actual platform fonts.
- Declared-color contrast calculations using the W3C sRGB relative-luminance formula.

The installed Edge browser reported version `157.0.4341.60`. Measurements were taken after font loading and initial reveal animations settled. On desktop, the normal 15px scrollbar left a **1425px document layout width** inside the 1440px viewport. Consequently, a centered element's recorded x-coordinate can differ from a scrollbar-free mockup.

### 2.2 Evidence labels

| Label | Meaning |
| --- | --- |
| `CSS` | Authored value read from the delivered stylesheet. |
| `DOM` | Structure, class, attribute, or content read from the page markup. |
| `JS` | Behavior or timing read from the relevant public JavaScript. |
| `LIVE` | Computed style, bounding box, screenshot observation, or exercised browser state. |
| `SHARED` | Rule exists in shared assets but was not necessarily active on the requested page. |
| `CALCULATED` | Derived from declared values; calculation assumptions are stated. |
| `TARGET` | Proposed BASELINE value, not an extracted reference measurement. |

Reference sections inherit the source IDs identified at their start. The registry in Section 16 provides the actual URLs and local locators. Registry records retain `verified: false`: this audit is design evidence, not scientific verification or confirmation of event rules.

### 2.3 Limits and important distinctions

- The submission URL currently displays **Project Submission is closed**. It exposes no live project-submission fields, validation errors, upload controls, submit flow, or success state. Those states are not claimed as observed.
- GitMastery is stateful. Its first visit opens a difficulty-selection dialog; the unobscured landing-page measurements were taken after configuring a local Beginner preference in the isolated audit browser.
- The exact requested pages were inspected, not every route, authenticated state, leaderboard condition, shop item, or historical site version.
- Palette inventories capture authored interface colors and relevant illustration colors. Video, lighting, gradients, antialiasing, and procedural textures create additional pixel colors; a finite token table is not a pixel-exhaustive inventory.
- A CSS animation inventory does not capture GSAP timelines or WebGL frame rendering. JavaScript inspection is necessary to understand those movements.
- Browser geometry is a snapshot, not a promise that text height is identical on every OS, viewport, translation, or future deployment.
- The Space Apps reference is the user-provided local-event website. Its design is not evidence of NASA endorsement, medical validity, submission eligibility, or official event policy.

## 3. GitMastery Reference Analysis

Sources: `ref-gitmastery-page`, `ref-gitmastery-css`, `ref-gitmastery-motion`, `audit-browser`.

### 3.1 Theme and visual language

GitMastery uses an **arcade-industrial** identity: dark violet backgrounds, block display lettering, luminous accent colors, thick outlines, hard offset shadows, tilted stickers, and a moving rail-themed backdrop. It deliberately looks like a playable learning environment rather than a generic software landing page.

Its most transferable quality is not gamification. It is the clear relationship between **importance, surface depth, color, and response to input**.

| Element | Treatment and placement | Design purpose |
| --- | --- | --- |
| Sticky header | Dark full-width bar; brand left; navigation, utilities, and primary action toward the right. | Maintains orientation and a consistent start action. |
| Hero headline | Large Bungee lettering; desktop left-aligned, mobile centered. | Creates an unmistakable first visual priority. |
| Play sticker | Lime, rounded, slightly counterclockwise, larger than surrounding words, with a hard darker edge. | A single emphasized word establishes the product's identity. |
| Hero backdrop | Muted looping rail video with dark overlays and a bottom fade. | Adds atmosphere while leaving the left text area relatively quiet. |
| Terminal demonstration | Dark framed panel to the right on desktop and below the actions on mobile. | Shows the product in use instead of relying only on marketing copy. |
| Command ribbon | Lime diagonal band with repeated moving command text. | Connects sections and reinforces the game vocabulary. |
| Learning path | Purple clipped section, dotted texture, vertical progress lane, stage nodes, and level controls. | Gives the long page a recognizable progression structure. |
| Feature rows | Alternating illustration/text columns; tilted, thick-bordered illustrated cards. | Breaks monotonous card-grid repetition. |
| Creator links | One/two/four-column cards with quotation text and a prominent play affordance. | Gives external links a coherent, tactile presentation. |
| Closing action | Centered large heading, paired actions, oversized low-contrast background ribbons. | Repeats the main action after the explanation. |
| Footer | Structured navigation columns and a separate fine-print strip. | Completes the visual system rather than ending abruptly. |

### 3.2 Complete named brand palette

`CSS`. These are the stylesheet's sRGB fallback values. Modern browsers can report equivalent `lab(...)` values because the stylesheet supplies progressive color-space overrides.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-gm-void` | `#0C091F` | Main canvas, deepest inset, dark text on bright actions. |
| `--color-gm-night` | `#171130` | Panels, dialogs, secondary actions. |
| `--color-gm-deep` | `#251A47` | Raised/inset header strips and ghost hover fills. |
| `--color-gm-line` | `#443969` | Panel outlines, neutral hard shadows, scrollbars. |
| `--color-gm-grape` | `#6222B6` | Secondary actions, selected navigation, major path section. |
| `--color-gm-grape-hi` | `#9455EF` | Higher-intensity purple hover/detail accent. |
| `--color-gm-grape-edge` | `#360D6F` | Purple action borders and mechanical shadow edge. |
| `--color-gm-lime` | `#B7F652` | Primary actions, Play sticker, positive/progress decoration. |
| `--color-gm-lime-edge` | `#58A228` | Lime action border and hard shadow. |
| `--color-gm-coral` | `#FF7D7C` | Feature accents, contrasting decorative states. |
| `--color-gm-coral-edge` | `#B3363D` | Coral supporting edge. |
| `--color-gm-cyan` | `#44DDFB` | Focus outlines, terminal graph and branch accents. |
| `--color-gm-cyan-edge` | `#0089A8` | Cyan supporting edge. |
| `--color-gm-gold` | `#FDC94B` | Coins, rewards, sponsor accents, terminal themes. |
| `--color-gm-gold-edge` | `#B77610` | Gold borders and supporting edge. |
| `--color-gm-ink` | `#F5F4FD` | Main light text. |
| `--color-gm-ink-soft` | `#CECAE6` | Body copy and secondary labels. |
| `--color-gm-ink-dim` | `#A59FC2` | Metadata and terminal output. |

Shared terminal treatments add specialized palettes rather than redefining the main UI: blue framing uses `#6FB7FF`, `#3A72C4`, `#1E3A5F`, and `#16273F`; Matrix framing uses `#39FF7A`, `#1C4A28`, and `#0C2A16`; gold framing uses bronze/gold gradients with pale moving highlights. These are **theme effects**, not suitable BASELINE status tokens.

### 3.3 Typography and text metrics

| Role | Typeface | Desktop | Mobile | Weight / line height |
| --- | --- | --- | --- | --- |
| Interface/body | Geist Sans | 16px base | 16px base | 400 / 1.5 base. |
| Brand wordmark | Bungee | 18px | Hidden below 640px in header | 400. |
| Hero heading | Bungee | 84px | 40px | 400 / 0.98; tracking 0.01em. |
| Play sticker | Bungee | 109.2px | 52px | 1.3 times heading size / inherited 0.98 line height. |
| Hero paragraph | Geist Sans | 20px | 18px | 400 / 1.625, measured 32.5px and 29.25px. |
| Main hero actions | Bungee | 18px | 18px | 400 / computed 28px; tracking 0.02em. |
| Small tactile actions | Geist Sans | 15px | 15px | 600 / 15px in `.btn-arcade-sm`. |
| Header navigation | Geist Sans | 14px | Menu uses readable text rows | 600 / 20px desktop. |
| Main section heading | Bungee | 57.6px maximum | 28.8px minimum | 400 / 1.02. |
| Feature heading | Bungee | 38.4px maximum | 24px minimum | 400 / 1.05. |
| Creator-section heading | Bungee | 41.6px maximum | 25.6px minimum | 400 / 1.05. |
| Closing heading | Bungee | 80px maximum | 29.25px at 390px | 400 / 1.0. |
| Hero terminal | Geist Mono | 13px | 12.5px | 1.6 line height. |
| Metadata | Geist Sans / Geist Mono | Usually 12-14px | Usually 12-14px | Role-dependent, not a second display font. |

Authored responsive formulas:

- Hero: `clamp(2.5rem, 6vw, 5.25rem)`.
- Main sections: `clamp(1.8rem, 4.6vw, 3.6rem)`.
- Feature headings: `clamp(1.5rem, 3vw, 2.4rem)`.
- Closing heading: `clamp(1.8rem, 7.5vw, 5rem)`.

The blocky appearance comes from **Bungee's shape**, not a blanket 700 font weight. The display face is served at weight 400. Geist Sans and Geist Mono are variable fonts; the site self-hosts WOFF2 assets and uses `font-display: swap`.

### 3.4 Layout, spacing, and surfaces

| Metric | Extracted value | Evidence |
| --- | --- | --- |
| Spacing foundation | 0.25rem = 4px at the reference's 16px root. | `CSS` |
| Responsive container steps | 640, 768, 1024, 1280, and 1536px breakpoint/container vocabulary. | `CSS` |
| Header | 64px navigation content plus 2px bottom border = 66px measured. | `DOM`, `LIVE` |
| Desktop container | 1280px outer width; 16px inner padding each side; 1248px useful content. | `LIVE` |
| Mobile useful width | 390 - 32 = 358px. | `LIVE` |
| Hero columns | `1.08fr 0.92fr` at 1024px and above. | `DOM` |
| Hero column gap | 40px desktop, 48px in the stacked layout. | `CSS`, `LIVE` |
| Hero vertical padding | Desktop 80px top / 112px bottom; small mobile 56px / 96px. | `LIVE` |
| Hero minimum height | `calc(100svh - 4rem)`; content may exceed the minimum. | `DOM` |
| Hero measured height | 836px desktop; 1176.47px mobile because the content stacks. | `LIVE` |
| Left text block | Maximum 640px; paragraph maximum 544px. | `DOM`, `LIVE` |
| Demonstration panel | Maximum 480px wide; 480 x 441.17px desktop in the measured state. | `LIVE` |
| Demonstration frame | 2px border, 22.4px radius, purple `10px 10px 0` offset shadow. | `CSS`, `LIVE` |
| Primary hero action separation | 16px; small utility group uses 12px gaps. | `DOM`, `LIVE` |
| Feature section padding | 96px or 128px according to breakpoint. | `DOM` |
| Feature-row separation | 80px on small screens; 112px from the small breakpoint. | `DOM` |
| Alternating feature columns | Two columns from 768px; column gaps 40 / 64 / 96px across sizes. | `DOM` |
| Illustrated feature cards | 2px outline, 25.6px radius, hard `12px 12px 0` accent shadow. | `DOM` |
| Feature tilt | -2, +2, or -1 degrees at rest; straightens on hover. | `DOM` |
| Learning-path texture | 22 x 22px radial-dot repeat; diagonal clip uses 2.5vw offsets. | `DOM` |
| Creator cards | One column small, two at 640px, four at 1024px; 16 / 20px gaps. | `DOM` |
| Creator-card outline | 2px; 22.4px radius; hard 5px lower shadow grows to 9px on hover. | `DOM` |
| Footer | One / two / three-column progression; 40px main vertical padding. | `DOM` |

`LIVE` desktop hero coordinates, expressed as x, y, width, height:

| Element | Desktop rectangle | Mobile rectangle |
| --- | --- | --- |
| Main heading | 88.50, 161.33, 640.00, 319.83 | 16.00, 122.00, 358.00, 152.23 |
| Primary Start Learning | 88.50, 646.66, 290.03, 60.00 | 16.00, 459.23, 358.00, 60.00 |
| Secondary Cheat Sheet | 394.53, 646.66, 219.11, 60.00 | 16.00, 535.23, 358.00, 60.00 |
| Terminal frame | 856.50, 247.41, 480.00, 441.17 | 16.00, 767.23, 358.00, 379.23 |

The sticker's bounding box includes its tilt. Text and SVG animation phases can affect some descendant rectangles; the layout specifications are more reusable than those transient measurements.

### 3.5 Buttons, movement, and placement

The main action is repeated at three meaningful points: header, hero, and closing section. Secondary controls sit next to or immediately below the main action, not scattered arbitrarily around the page.

| Control | Size and position | Behavior / hierarchy |
| --- | --- | --- |
| Header Start Learning | 44px high; rightmost main desktop action. | Lime face; Geist Sans; small hard shadow. |
| Hero Start Learning | 60px high, 28px horizontal padding, 16px radius. | Largest lime action; leading play icon and trailing arrow. |
| Hero Cheat Sheet | Same 60px height beside primary on desktop; full width below it on mobile. | Purple secondary action, not a competing lime primary. |
| Difficulty / Shop / Mini Games | 44px minimum; 16px horizontal padding; 13.6px radius. | Dark neutral tertiary actions; wrap on mobile. |
| Desktop navigation | 44px main links; some utilities are only 36px. | Active route purple; inactive routes mostly transparent. |
| Coin/profile controls | Approximately 40px high in the observed header. | Persistent account/game controls, not health-monitor patterns. |
| Mobile menu trigger | 44 x 44px at x330, y10 in the 390px viewport. | Right-aligned, `aria-expanded`, `aria-controls="mobile-nav"`. |
| Mobile menu | Expands the header in document flow, pushing the hero downward. | Text rows with icons and a full-width primary action near its bottom. |
| Footer links | Often 36px minimum height. | Quiet navigation; should be enlarged if adapted to important BASELINE controls. |

Primary `.btn-arcade` state metrics:

| State | Exact treatment |
| --- | --- |
| Rest | 2px darker border; 5px lower hard shadow; `translateY(0)`. |
| Hover | `translateY(-2px)`; shadow becomes 7px; `brightness(1.06)`. |
| Pressed | `translateY(4px)`; shadow collapses to 1px. |
| Focus-visible | 3px cyan solid outline, 4px outline offset. |
| Disabled | Not-allowed cursor; desaturated/dimmed face; no positional transform. |
| Transition | 160ms for transform, shadow, and filter; `cubic-bezier(0.16, 1, 0.3, 1)`. |

The smaller header button family uses related but distinct metrics: 4px rest shadow, 6px hover shadow, 3px pressed travel, and 150ms transitions. Do not treat the two families as one identical component.

### 3.6 Animation inventory

`JS`, `CSS`; shared-only treatments are marked explicitly.

| Movement | Timing / distance / trigger | BASELINE relevance |
| --- | --- | --- |
| Hero words | Enter from `yPercent: 115`; 1s, 70ms stagger, `expo.out`. | Borrow deliberate hierarchy, not delayed health-text revelation. |
| Play sticker | From scale 0.3 and rotation -18 degrees; 1.1s; overlapping the word reveal. | A restrained brand accent only, not a status badge. |
| Hero paragraph | From y18 and hidden opacity; 800ms. | Optional short introduction reveal, substantially shortened. |
| Hero actions | From y16 and hidden opacity; 700ms; 60ms stagger. | Do not delay operable clinical-prototype controls. |
| Hero panel | From y60, rotation 4 degrees, hidden opacity; 1.2s, starts at 350ms. | Product demonstration hierarchy, not a chart entrance effect. |
| Pointer tilt | 1100px perspective; rotationY +/-4.5 degrees and rotationX +/-3.5 degrees; 900ms `power3.out` response. | Reject on health cards and entry controls. |
| Video parallax | yPercent 12 across hero scroll, scrubbed. Video pauses for reduced motion or data-saving preference. | Reject for the offline dashboard. |
| Terminal typing | Approximately 38ms per character; command/output sequence; repeat delay 2.8s; timeline pauses offscreen. | Do not imitate typing or live telemetry in SIMULATED readings. |
| Graph line drawing | 550ms paths, 500ms node/head movements; progress decoration follows command sequence. | Chart values must not be theatrically drawn as new measurements. |
| Learning HUD | 900ms y40 reveal; numeric counters run for 1.4s. | Reject count-up animation for health values. |
| Progress lane | Scroll-driven scaleY with 0.4s scrub smoothing. | Not a physiological-status presentation. |
| Stage cards | Nodes scale from 0.7 over 800ms; bodies enter x40 over 900ms; levels y18 over 600ms with 50ms stagger. | Progress grouping can inspire evidence organization, not achievements. |
| Feature visuals | Scroll entrance y70, alternating +/-6-degree starting tilt, 1.1s; rest tilt straightens over 500ms hover. | Keep monitoring panels level and stationary. |
| General reveals | y30, 900ms, once when approaching 88% viewport height. | Too slow and unnecessary for essential dashboard content. |
| Command ribbons | `gm-marquee`, 38s linear, infinite; some reversed. | Reject moving monitoring/evidence text. |
| Terminal caret | `gm-caret`, 1.05s, stepped opacity blink. | Reject fake terminal behavior in the monitor. |
| Presence pulse | 2s opacity cycle. | Do not imply a live sensor connection. |
| Creator-card hover | y-4 and stronger hard shadow over 150ms; play affordance scales to 1.1. | Restrained feedback may suit real links, not whole cards. |
| Theme preview fan | 500ms; outer previews move +/-12px and rotate farther outward. | Shared/product illustration treatment, not monitoring UI. |
| Dialog appearance | Shared fade/zoom rules; 200ms, centered panel. | Native form semantics are preferable for the current inline panel. |
| Accordion | Shared open/close height rules, 200ms. | Prefer native details and an optional small chevron transition. |
| Mascot idle | Shared CSS: 3.6s float +/-3px and +/-1.5-degree rotation; 5.4s blink. | No active homepage mascot was established by this audit; do not import it. |
| Mascot event motion | Shared CSS: 700ms landing, 1.5s attachment, 2.2s stuck/peer cycle. | Reject gamified feedback. |
| Terminal gold sweep | Shared CSS: 7s full orbit; blue and Matrix variants suppress the sweep. | Reject animated framing around readings. |

### 3.7 Interactivity and polish lessons

- The first-visit dialog is centered, 768px wide in the measured desktop state, with 24px padding, a 2px outline, 22.4px radius, dimmed background, and a purple offset shadow. Difficulty choices look selectable rather than decorative.
- A selected difficulty has a check affordance and an emphatic outline. Selection, primary action, and card framing remain visually related.
- Page navigation uses links; difficulty, shop, and mini-game entry points use buttons. The semantic distinction is useful even though BASELINE has fewer destinations.
- Primary, secondary, and tertiary buttons have different fills but compatible silhouettes and feedback.
- The site generally scopes GSAP motion to `prefers-reduced-motion: no-preference` and pointer tilt to fine pointers.
- **Do not assume perfect reduced-motion coverage.** Changing the preference removed major motion, but some terminal carets continued blinking and root scroll behavior remained smooth in the audit. BASELINE should specify complete coverage rather than copy these gaps.
- The full authentication, focus-trapping lifecycle, shop interactions, and game-state variants were not exhaustively tested. They are outside the requested homepage design audit.

## 4. Space Apps Submission Reference Analysis

Sources: `ref-spaceapps-page`, `ref-spaceapps-css`, `ref-spaceapps-layout`, `ref-spaceapps-motion`, `ref-spaceapps-background`, `audit-browser`.

### 4.1 Theme and composition

The submission page uses a **cosmic editorial-poster** identity: near-black space, blue and magenta atmospheric gradients, a procedural astronaut/planet scene, oversized condensed uppercase text, warm torn-paper content, handwritten labels, and a conspicuous pink Register action.

The key compositional contrast is **expansive dark atmosphere versus a contained light information sheet**. That contrast can inform BASELINE's evidence presentation without making the monitoring surface theatrical.

| Layer / element | Treatment |
| --- | --- |
| Background | Full-page dark radial gradients and a fixed, non-interactive WebGL canvas. |
| Navigation | Fixed at the top; logo left, desktop links right, accent Register action at the end. |
| Introductory label | Handwritten yellow Forms label, centered. |
| Main heading | Large Anton uppercase mission heading, centered. |
| Supporting paragraph | Space Grotesk, restrained width, pale text with reduced opacity. |
| Submission notice | Warm paper sheet with irregular clipped edges, grain, and a strong drop shadow. |
| Notice label | Handwritten pink Submission label. |
| Notice heading | Condensed dark uppercase closed-state message. |
| Footer | Dark translucent surface; logo/title grouping, handwritten volunteer credit, underlined contact link. |

**Observed state:** project submission is closed. The page contains no submission button or editable project form. The header Register link is a separate registration destination, not the closed project's submit control.

### 4.2 Palette and material colors

| Name / role | Value | Use |
| --- | --- | --- |
| Ink | `#0A0A0A` | Base canvas and dark paper text. |
| Night | `#0D0D12` | Translucent scrolled header, footer, shared dark paper variant. |
| Paper | `#F3EAD3` | Main notice surface, navigation hover fill, light text. |
| Sun | `#FFD84D` | Forms label, CTA outer edge, handwritten credit, shared highlights. |
| Rose | `#FF2D95` | Register face, Submission label, decorative accents. |
| Cerulean | `#007BA7` | Shared paper variant and scene accents. |
| White | `#FFFFFF` | CTA text, scene highlights. |
| Blue atmosphere | `#17348A66` | 40%-opacity top-right radial glow. |
| Blue atmosphere | `#0B3A7A55` | Approximately 33%-opacity left/midpage glow. |
| Rose atmosphere | `#FF2D9524` | Approximately 14%-opacity lower-right glow. |

The authored body background is:

```css
background:
  radial-gradient(70% 45% at 85% 4%, #17348A66, transparent),
  radial-gradient(55% 35% at 4% 45%, #0B3A7A55, transparent),
  radial-gradient(55% 35% at 92% 85%, #FF2D9524, transparent),
  #0A0A0A;
```

Related scene palettes, not application status tokens:

| Procedural asset | Authored color set |
| --- | --- |
| Hero blue/pink planet | `#0B1E5B`, `#17348A`, `#007BA7`, `#FF2D95`. |
| Blue planet | `#0A4F7A`, `#007BA7`, `#2A8FC0`, `#0B1E5B`. |
| Pink/gold planet | `#FF2D95`, `#B3126A`, `#FFD84D`, `#3A0A2A`. |
| Paper/gold planet | `#F3EAD3`, `#FFD84D`, `#C9A43A`, `#0B1E5B`. |
| Pale blue/gray planet | `#B8C4E0`, `#6F7FA8`, `#E8EEFB`. |
| Visor gradient | `#2F6FB8`, `#16376B`, `#0A1A36`, `#050A18`, plus translucent cyan/white highlights. |

Shared component variables also define a generic dark grayscale background/card/popover system, approximately 4%, 9%, 14.9%, 63.9%, 83.1%, and 98% lightness. These scaffold variables are not the distinctive paper/sun/rose theme and should not be mistaken for the active route's complete design direction.

### 4.3 Typography

| Role | Face | Desktop | Mobile | Weight / line height |
| --- | --- | --- | --- | --- |
| Body/UI | Space Grotesk | 16px base | 16px base | 400 / 24px base. |
| Main heading | Anton | 72px | 48px | 400; computed desktop 72px, mobile 57.6px line height. |
| Intermediate heading size | Anton | 60px at the 640px breakpoint | Not the 390px state | Responsive utility value. |
| Forms label | Caveat | 36px | 30px | Handwritten; 40px / 36px line-height utilities. |
| Intro paragraph | Space Grotesk | 18px | 18px | 400 / 27px; paper color at 75% opacity. |
| Submission label | Caveat | 30px | 30px | Rose, 36px line height. |
| Closed-state heading | Anton | 36px | 36px | 400 / 43.2px; wraps to two lines on mobile. |
| Notice paragraph | Space Grotesk | 16px | 16px | 400 / 24px; ink at 80% opacity. |
| Desktop nav links | Space Grotesk | 14px | Hidden below 1024px | 500 / 20px. |
| Register in header/menu | Space Grotesk | 14px | 14px | 700 / 20px. |
| Mobile nav rows | Anton | Not shown | 20px | 400 / 28px; uppercase. |
| Footer event title | Anton | 20px | 20px | Uppercase, tight line height. |
| Volunteer credit | Caveat | 24px | 20px | Sun accent. |
| Copyright / metadata | Space Grotesk | 12px | 12px | Reduced-opacity paper text. |

The actual heading line heights matter: markup includes `leading-[1.2]`, but responsive `text-6xl` and `text-7xl` rules can override it. The audited desktop h1 computes to **1.0**, while the 390px h1 computes to **1.2**. Do not derive the final typography solely from class names.

Fonts are self-hosted WOFF2 with `font-display: swap`. Anton is weight 400; Caveat is a 400-700 variable face; Space Grotesk is a 300-700 variable face. Handwriting is used for brief accents, not form labels, instructions, or quantitative data.

### 4.4 Geometry and spacing

| Metric | Extracted value | Evidence |
| --- | --- | --- |
| Main horizontal padding | 20px small; 40px from 768px. | `DOM`, `CSS` |
| Main content maximum | 896px (`max-w-4xl`). | `DOM`, `LIVE` |
| Intro copy maximum | 672px (`max-w-2xl`). | `DOM` |
| Paper paragraph maximum | 576px (`max-w-xl`). | `DOM` |
| Header/footer inner maximum | 1152px (`max-w-6xl`). | `DOM` |
| Section top padding | 144px. | `DOM` |
| Section bottom padding | 112px. | `DOM` |
| Intro element separation | 12px. | `DOM` |
| Intro-to-notice separation | 48px. | `DOM`, `LIVE` |
| Notice internal separation | 16px. | `DOM` |
| Notice padding | 48px desktop; 32px small mobile. | `LIVE` |
| Notice silhouette | No rounded rectangle; an irregular percentage-based polygon clip. | `DOM` |
| Paper depth | `drop-shadow(0 14px 14px rgba(0,0,0,.55))` on the wrapper. | `CSS`, `LIVE` |
| Paper grain | Non-interactive pseudo-element; opacity 0.22; multiply blend mode. | `CSS` |
| Grain source | Embedded 160 x 160 SVG; fractal noise frequency 0.8; two octaves. | `CSS` |
| Initial fixed header | 72px measured: 48px content plus 12px padding above/below. | `LIVE` |
| Scrolled header | 65px measured: 48px content, 8px above/below, 1px lower border. | `LIVE` |
| Scrolled fill | Night at 90%, paper border at 10%, medium backdrop blur. | `DOM`, `JS` |
| Header transition | 300ms; switches after scrollY > 24px. | `JS`, `LIVE` |
| Desktop logo scale | 2.5 initially, 1.4 after scrolling; left transform origin. | `JS`, `LIVE` |
| Mobile logo scale | 1.25; desktop scale changes do not apply. | `DOM`, `LIVE` |
| Desktop navigation breakpoint | 1024px. | `DOM`, `CSS` |
| Mobile menu panel | 16px radius, 16px padding, 8px row gaps. | `LIVE` |
| Footer padding | 40px vertical / 20px horizontal small; 48px / 40px desktop. | `DOM`, `LIVE` |

`LIVE` rectangles:

| Element | Desktop x, y, width, height | Mobile x, y, width, height |
| --- | --- | --- |
| Intro header | 264.50, 144.00, 896.00, 190.00 | 20.00, 144.00, 350.00, 256.19 |
| Main heading | 264.50, 196.00, 896.00, 72.00 | 20.00, 192.00, 350.00, 115.19 |
| Submission paper | 264.50, 382.00, 896.00, 255.19 | 20.00, 448.19, 350.00, 314.38 |
| Closed-state heading | 312.50, 482.00, 800.00, 43.19 | 52.00, 532.19, 286.00, 86.38 |
| Desktop Register | 1151.95, 16.00, 96.55, 40.00 | Only present when mobile menu is expanded. |
| Mobile menu trigger | Hidden in desktop navigation mode. | 326.00, 14.00, 44.00, 44.00 |
| Expanded mobile nav | Not shown. | 20.00, 76.00, 350.00, 500.00 |

The ripped perimeter is material decoration, not a reliable alignment edge. Text aligns to the padded content box. Reproducing the exact long polygon is unnecessary for a professional BASELINE adaptation.

### 4.5 Buttons, navigation, and placement

| State / component | Extracted treatment |
| --- | --- |
| Register rest | Rose fill, white text, 700 weight, asymmetrical `60px 14px 60px 14px` radii. |
| Register framing | 3px ink ring, 5px sun ring, 40px rose glow at 60% opacity. |
| Register hover | Rotate -2 degrees and scale to 1.06 over 300ms; shadow remains the same. |
| Register active | No separate authored press-compression treatment was established. |
| Register focus-visible | Native browser outline appeared; no equivalent custom cyan focus system was established on this control. |
| Shared base CTA | 18px text, 28px line height, 20px vertical / 38px horizontal padding. |
| Actual header CTA | Utility overrides produce 14px text, 20px line height, 10px / 20px padding, and 40px height. |
| Disabled CTA | Shared rule: opacity 0.6 and no transform. Not a live submission-state control on this page. |
| Desktop nav links | Paper text at 80%; full pill radii; 12px / 8px padding; hover becomes paper with ink text. |
| Mobile trigger | 44px cream circle, dark 20px menu/close icon, accessible open/close label and expanded state. |
| Mobile nav rows | 52px measured height; 12px / 16px padding; 8px corners; sun hover fill. |
| Mobile menu behavior | Fixed-header expansion overlays content; selecting a link closes it. It does not push the form section down. |
| Footer contact | Underlined text link; rose decoration and sun hover color. The observed example address is not contact information to copy. |

There is **no project-submit action in the closed paper notice**. The open form's button placement, upload behavior, required-field treatment, loading state, error recovery, and success animation cannot be extracted from this closed route.

### 4.6 Reveal and motion inventory

| Movement | Exact authored behavior | Scope |
| --- | --- | --- |
| Paper reveal | Opacity 0, y70, rotation `data-rotate - 7`, scale 0.94 to normal; 1s, `back.out(1.3)`; trigger top at 90% viewport. | Active route pattern; notice uses final rotation 0. |
| Intro fade | Opacity 0, y40 to normal; 900ms; trigger top at 92% viewport. No explicit easing in that call. | Active route pattern. |
| Closed-state wrapper | CSS fade and small bottom slide with a 500ms duration utility. | Active DOM; overlaps the paper reveal layer. |
| Header compression | Padding, background, border, and logo transform change over 300ms after 24px scroll. | Active and exercised. |
| CTA hover | -2-degree rotation, 1.06 scale, 300ms ease. | Active and exercised. |
| Drawn strokes | Dash offset 1 to 0; 1.4s `power2.inOut`, 600ms delay. | Shared motion system; no such stroke was established on the closed notice. |
| Orbit paths | Scroll-controlled dash drawing from top 70% to bottom 65%, linear scrub. | Shared. |
| Floating hero objects | y displacement `-90 - 40 * index`; alternating -12 / +18-degree rotation; scrubbed against hero scroll. | Shared, not the closed notice's motion. |
| Text tape | 30s linear infinite marquee; hover can pause its ticker wrapper. | Shared CSS; not active on the closed notice. |
| Sponsor ribbon | 35s linear, translates by one third of repeated content. | Shared CSS; not active on the requested page. |
| Details icon | 300ms rotation; open details rotates icon 45 degrees. | Shared CSS. |
| Float hint | 6px vertical cycle defined in keyframes. | Shared; a route-specific duration was not established here. |

The combination of a 1s paper reveal and a 500ms wrapper entrance is visually rich, but it is not a model for delaying an essential health-prototype value or error message.

### 4.7 WebGL scene, continuous movement, and performance

The background is a **procedurally generated scene**, not merely a static star image or CSS sparkle animation. It includes an astronaut, multiple textured/glowing planets, rings, stars, and foreground dust. The canvas is fixed at z-index 0 with `pointer-events: none` and `aria-hidden`.

Source configuration, measured in scene/world units rather than CSS pixels:

| Parameter | Authored value / behavior |
| --- | --- |
| Star populations | 1500 white points, 160 gold points, and 120 near-camera dust points. |
| Planet count | Five palette-defined planets; randomized generated textures. |
| Camera mode threshold | Width below 800px, distinct from the navigation's 1024px breakpoint. |
| Camera field of view | 60 degrees mobile; 45 degrees desktop. |
| Render pixel ratio cap | 1.25 mobile; 1.75 desktop. |
| Antialiasing | Disabled in the mobile renderer configuration. |
| Scroll interpolation | Normally approaches scroll progress by a factor of 0.07 per frame. |
| Vertical scene travel | Camera tracks approximately 38 scene units across document progress. |
| Astronaut bob | Includes `0.18 * sin(1.2 * time)` vertical displacement. |
| Astronaut rotation | Time-driven sinusoidal rotations plus pointer and scroll terms. |
| Planet rotation | Increments about 0.002 radians per rendered frame, alternating direction. |
| Star/dust drift | Time-based y-axis rotation; dust also responds to desktop pointer position. |
| Pointer response | Desktop pointer normalized around the viewport center affects camera and astronaut pose; disabled in mobile camera mode. |
| Hidden document | Frame rendering work is skipped while the document is hidden. |

Reduced motion has two layers: CSS globally disables animations/transitions, while scene/reveal JavaScript checks the preference at component creation. The background's JavaScript does not establish a live preference-change listener in the inspected effect. A canvas remaining present and an empty CSS-animation list do not prove its frame loop stopped after a live preference change.

**Do not transfer this GPU workload to BASELINE.** A small static schematic and intentional CSS state feedback are better suited to an offline monitoring prototype.

### 4.8 Risks not to inherit

- Bright astronaut/planet artwork sometimes passes directly behind the introductory copy and reduces local legibility, especially on mobile.
- White 14px Register text on rose does not meet 4.5:1 using the declared solid colors; the yellow outer ring does not improve the text-to-fill contrast.
- The handwritten pink Submission label on paper also has weak declared-color contrast.
- Fixed menu expansion covers the page's underlying content. A much smaller BASELINE action set does not justify a similarly tall overlay.
- Paper grain and irregular edges create identity, but applying them to measurements, tables, or every card would reduce precision.

## 5. What to Combine and What to Reject

Sources: both reference audits; recommendations are `TARGET`, source ID `baseline-polish-proposal`.

| Design dimension | GitMastery contribution | Space Apps contribution | BASELINE decision |
| --- | --- | --- | --- |
| Identity | Coherent tactile components and a recognizable accent. | Strong mission/editorial atmosphere. | Keep navy/teal identity and BASELINE's own emblem. |
| Hierarchy | Clear primary/secondary/tertiary actions. | One prominent information sheet. | One dominant logging action; readings outrank metadata. |
| Typography | Display/UI/data roles are clearly separated. | Condensed heading and brief handwritten accents. | Strong sans headings, calm UI text, tabular monospace readings; no handwriting for data. |
| Surfaces | Framed insets and hard-edge depth. | Warm light sheet over dark space. | White monitoring surfaces; restrained warm evidence surface; subtle shadows. |
| Placement | Product demonstration beside explanation. | Narrow focused content column. | Preserve schematic beside indicators on desktop; compact it above cards on mobile. |
| Motion | Physical button response and explicit state changes. | Gentle reveal and header response. | Short input-driven feedback; no perpetual atmosphere or animated values. |
| Navigation | Repeated primary action with consistent meaning. | Stable top navigation and mobile alternative. | Keep direct access to Log and Sources; avoid unnecessary menus. |
| Texture | Sparse dots and mechanical framing. | Paper grain and irregular edges. | Optional restrained evidence decoration only; charts stay clean. |
| Trust | Transparent link/control affordances. | Clear closed-state notice. | Explicit simulation, freshness, provenance, and empty states. |

**Adopt:** consistent spacing, distinct action hierarchy, strong focus, stable geometry, type-role contrast, generous but purposeful whitespace, polished empty states, and repeated component structure.

**Adapt:** tactile shadows become 1-2px action depth instead of 5-12px; paper becomes a calm evidence/briefing surface instead of a torn measurement card; bold headings become compact dashboard headings instead of a viewport-sized hero.

**Reject:** XP, scores, coins, leaderboards, streaks, celebratory rewards, sound effects, blinking terminal cursors, fake live indicators, moving tickers, cursor-following data cards, rotating input controls, heavy WebGL, background video, and NASA-branded artwork.

## 6. Pre-Polish BASELINE Audit

Sources: `baseline-html`, `baseline-css`, `baseline-app`, `baseline-readme`, `audit-browser`.

### 6.1 Existing strengths

- A coherent light clinical-prototype palette already exists and has strong declared text contrast.
- The persistent navy disclaimer bar and explicit SIMULATED badges communicate the prototype's limitations.
- Six cards share the same core content, baseline logic, timestamped trend, and evidence structure.
- Native inputs, selects, buttons, details/summary, SVG descriptions, and data tables provide a sound implementation foundation.
- Hazard selection and body grouping are distinct operations; neither changes deviation status.
- The mobile hazard row and data tables have contained scrolling instead of forcing the whole page to scroll horizontally.
- The page works offline, including the entry panel and locally persisted synthetic demo.

### 6.2 Initial metrics, not proposed targets

| Metric | Current value / observation |
| --- | --- |
| Root UI text | 15px, 1.55 line height. |
| Declared UI stack | Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif. |
| Actual audited heading font | Segoe UI Bold. No Inter webfont is loaded by the page. |
| Declared data stack | IBM Plex Mono, Consolas, monospace. |
| Actual audited reading font | Consolas for values; Segoe UI Semibold for the appended unit. |
| Maximum page wrap | 1320px; otherwise viewport width minus 32px. |
| Compliance bar | 42px minimum; sticky at top. |
| Desktop header | Approximately 75.59px measured; CSS minimum is 64px. |
| Desktop Log action | 215.25 x 44px in the audited browser. |
| Header/section/card headings | 30 / 21 / 16px. |
| Main reading | 32px, 40px line height. |
| Metadata | Mostly 12px, medium weight. |
| Panel/card surfaces | White, 1px strong border, 12px radius, 20px padding, no shadow. |
| Dashboard columns | 3fr / 7fr with 24px gap; 388.8px / 907.2px in the desktop snapshot. |
| Indicator grid | Two columns with 16px gap; approximately 445.6px card width desktop. |
| Card minimum | 280px, but populated cards are much taller. |
| First populated card | Approximately 810.64px high desktop, 976.84px mobile in the audited state. |
| First card top | y643.45 desktop; y1844.94 mobile. |
| Body panel | Approximately 912.61px high in both audited layouts. |
| Breakpoints | Dashboard stacks at 960px and below; indicators/forms/guidance become single-column at 700px and below. |
| Chart | Native SVG, 320 x 110 viewBox, 110px CSS height. |
| Current motion | Mainly 150ms SVG fill/stroke/detail transitions; no ambient animation. |

### 6.3 Main presentation problems

1. **Important readings arrive too late on mobile.** The tall body explorer sits ahead of the cards, and a lengthy hazard-wide evidence block precedes it.
2. **Metadata has too much equal visual weight.** Simulation, baseline, deviation, full source/timestamp, association, threshold wording, and chart notes compete with the main value.
3. **The shell and cards are visually flat.** Strong borders are useful, but a small amount of purposeful surface depth could distinguish content, actions, and evidence.
4. **The mobile header wraps into several action rows.** The primary action remains operable but lacks the references' deliberately designed full-width mobile treatment.
5. **The type specification advertises fonts that are not supplied.** Polish must work with the actual offline fallback fonts unless font assets are separately approved.
6. **Minimum card height is misleading as a design target.** Real content determines height; setting a fixed 280px or 340px height would clip necessary information.

### 6.4 Corrections to the earlier design sheet

This document replaces the earlier speculative hazard-to-indicator table with the application's actual evidence-gated behavior. Do not reintroduce hardcoded hazard associations from an older design or state note.

- All six cards remain visible for every hazard.
- `All hazards` uses explicit `hazard: "all"` records. It is not an aggregation or wildcard for other hazards.
- Eligible `hazard-link` claims create association emphasis and citations; no verified links means a clear empty association state.
- `indicator: "all"` creates shared evidence links on cards; `indicator: "none"` remains hazard-wide without card badges.
- Body groupings are fixed **interface organization**, not source-verified anatomical or hazard claims.
- The displayed temperature label is **Body Temperature**. Keep the existing `core-temperature` IDs and saved-data key.
- Glucose is fixed to `mg/dL` in the current demo. Do not add a unit switch or silent conversion.
- Heart Rate baseline context is resting; Blood Glucose baseline context is fasting. Other contexts stay neutral/not comparable.
- Personal baselines remain fixed. There is no Update Personal Baseline action, environment selector, or OSDR feature in this scope.

## 7. Combined Visual Direction

### 7.1 Clinical Mission Control

The desired visual sentence is:

**A navy mission frame, crisp white monitoring panels, a teal action system, a quiet warm evidence sheet, large aligned readings, and restrained tactile feedback.**

Retain the existing visual language rather than installing an unrelated dark arcade skin. The navy compliance bar already supplies the dark framing. Keep the dashboard canvas light and the card interiors white. A future darker masthead is optional, not a prerequisite for this polish pass.

| Area | Intended character |
| --- | --- |
| Compliance | Compact, unmistakable, always visible. |
| Brand/header | Confident and compact; stronger wordmark, clean alignment, clear Log action. |
| Hazard lens | A research-context tool, not an alarm dashboard. |
| Body explorer | An optional way to organize attention, not the page's largest object. |
| Readings | Highest quantitative emphasis; clean numerals and adjacent units. |
| Status | Small written/icon badge, independent of navigation selection. |
| Evidence | Editorial and readable, with visible provenance and clear disclosure. |
| Entry | Calm, structured, unmistakably synthetic, with excellent error recovery. |
| Footer | Quiet safety reminder and access to tests. |

### 7.2 Shape and depth rules

- Monitoring cards: 12px radius and a restrained neutral shadow. Keep their measurement geometry straight.
- Large evidence and entry panels: up to the existing 16px radius.
- Inputs and normal buttons: 8px radius; do not make every component a pill.
- Hazard controls: rounded rectangles, not constantly moving stickers.
- Status badges: compact 4px corners, icon plus text, no glow.
- Depth expresses surface/action hierarchy, not clinical urgency. A Red badge does not make the entire card shake, pulse, or protrude.
- Use at most one decorative treatment on the evidence surface. Do not combine tears, grain, tape, glow, rotation, and a heavy shadow.

## 8. CSS Tokens

The following core tokens are retained from the original specification and current `styles.css`. They remain the compatibility foundation. Do not scatter reference hex colors throughout components.

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

  /* Configured deviation status, not diagnosis */
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

### 8.1 Minimal proposed extensions

`TARGET`. Add only tokens with a concrete component use. This is not a second theme or a requirement to introduce every token immediately.

```css
:root {
  --bg-briefing: #F3EAD3;
  --focus-ring-inverse: #FFFFFF;

  --shadow-surface: 0 2px 8px rgba(20, 37, 54, 0.05);
  --shadow-raised: 0 10px 28px rgba(20, 37, 54, 0.08);
  --shadow-action: 0 2px 0 var(--brand-pressed);

  --duration-fast: 120ms;
  --duration-control: 160ms;
  --duration-panel: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  --space-10: 40px;
  --space-12: 48px;
}
```

Token applications:

- `--bg-briefing`: optional evidence/briefing material, not an Amber status replacement.
- `--shadow-surface`: monitoring panels; subtle separation, not floating arcade cards.
- `--shadow-raised`: entry/evidence emphasis where warranted, not all cards simultaneously.
- `--shadow-action`: primary action only; remove it when disabled.
- `--focus-ring-inverse`: controls on navy surfaces; the existing teal ring remains appropriate on light surfaces.
- Keep 4 / 8 / 12 / 16 / 20 / 24 / 32px as the ordinary spacing vocabulary. Use 40 / 48px for section separation, not arbitrary gaps everywhere.

## 9. Typography Specification

`TARGET`; compatible with the existing offline stacks.

| Role | Desktop target | Mobile target | Weight | Line height / tracking |
| --- | --- | --- | --- | --- |
| BASELINE wordmark | 36-40px | 30-32px | 700 | 1.1; optional -0.02em. |
| Section heading | 22px | 20-22px | 600 | 1.3; normal tracking. |
| Card heading | 16px | 16px | 600 | 1.4. |
| Main reading | 36-40px | 32-36px | 500 | 1.15-1.25; tabular numerals. |
| Reading unit | 13-14px | 13-14px | 500 | Aligned with value, not separated into a remote label. |
| Body/explanation | 15px | 15-16px | 400 | 1.55-1.65. |
| Baseline/deviation summary | 13-14px | 13-14px | 400-500 | 1.5; data face only for quantitative portions. |
| Field label | 14px | 14px | 500-600 | 1.4. |
| Input/select value | 16px | 16px | 400 | Comfortable native-control line height. |
| Metadata/timestamps | 13px | 13px | 400-500 | 1.5; allow wrapping. |
| Status / simulation badge | 12px | 12px | 600 | 1.4-1.5; written labels remain readable. |
| Compliance text | 12px | 12px | 500-600 | At least 1.5; allow bar height to grow. |

Rules:

- Use `--font-ui` for headings, actions, labels, and explanations. Use `--font-data` for values and timestamps.
- Keep `font-variant-numeric: tabular-nums`. Avoid cramped negative tracking on numbers.
- A blood-pressure pair must read as a pair. Never enlarge one channel and visually demote the other.
- Let the value dominate through size and spacing; do not make every metadata line bold.
- Keep explanatory text to roughly 60-75 characters per line where practical. Evidence text uses a readable content column rather than an unrestricted dashboard-wide line.
- Avoid all-caps paragraphs. Uppercase is reserved for concise safety/status labels and the existing wordmark.
- No data text below 12px. Prefer 13px metadata over enlarging decorative headings.
- Do not introduce Bungee, Anton, or Caveat as measurement fonts. The references' type-role contrast is transferable; their exact display faces are not necessary.
- The first pass must look intentional with Segoe UI/Consolas and other existing fallbacks. Optional self-hosted Inter/IBM Plex Mono provisioning requires approval, license review, and offline font files; it is not part of this document's implementation.

## 10. Layout and Responsive Behavior

`TARGET`, except where an existing layout contract is explicitly retained.

### 10.1 Desktop structure

```text
+------------------------------------------------------------------+
| PROTOTYPE - NOT MEDICAL ADVICE                     SIMULATED DATA  |
+------------------------------------------------------------------+
| BASELINE + emblem                 Sources       [Log measurement] |
| Short identity / AI disclosure                                    |
+------------------------------------------------------------------+
| Privacy warning         SIMULATED demo       [Test] [Reset]        |
| Storage / action feedback                                         |
+------------------------------------------------------------------+
| Hazard lens   [All] [Radiation] [Isolation] [Distance] [...]        |
| Evidence availability / clearly labeled shared evidence access    |
+----------------------+-------------------------------------------+
| Body explorer        | Health indicators                         |
|                      | [Blood Pressure]    [Heart Rate]          |
| Schematic + zones    | [Blood Glucose]     [Body Temperature]    |
|                      | [Sleep Hours]       [Mood]                |
+----------------------+-------------------------------------------+
| Sources & verification                                            |
+------------------------------------------------------------------+
| Safety reminder                              Offline status tests |
+------------------------------------------------------------------+
```

The wireframe's abbreviated action wording is illustrative; retain the application's exact visible labels.

- Keep the current 1320px maximum page wrap and 16px minimum side gutters.
- Retain the approximate 30% / 70% dashboard split and two-column indicator grid.
- Keep 24px between dashboard columns and 16-20px between cards.
- Use a compact 80-88px desktop masthead target rather than a full-height marketing hero.
- Place the primary Log action at the header's trailing edge; keep the Sources link visually secondary and adjacent.
- Keep the compliance bar sticky; the masthead need not become sticky in the first pass.
- Target first-row card headings within approximately the first **600px** of normal desktop document content. This is a design goal, not a measurement already achieved.
- Do not make the full body panel sticky when it is taller than the available viewport. The current approximately 913px body panel does not fit beneath a 42px disclaimer in a 900px viewport.

### 10.2 Mobile structure

```text
+--------------------------------------+
| Prototype disclaimer + SIMULATED     |
+--------------------------------------+
| Emblem  BASELINE                     |
| Identity / AI disclosure             |
| Sources & verification               |
| [ Log a health measurement         ] |
+--------------------------------------+
| Privacy warning                     |
| SIMULATED demo   [Test] [Reset]       |
| Storage / action feedback            |
+--------------------------------------+
| Hazard lens                         |
| [All] [Radiation] [Isolation] ...     |
| Evidence summary / disclosure        |
+--------------------------------------+
| Compact body explorer + zone buttons |
+--------------------------------------+
| Health indicators                   |
| Blood Pressure                      |
| Heart Rate                          |
| Blood Glucose                       |
| Body Temperature                    |
| Sleep Hours                         |
| Mood                                |
+--------------------------------------+
| Sources & verification              |
| Safety reminder / tests              |
+--------------------------------------+
```

- Use a single main column and full available card width. Do not make mobile data values depend on hover.
- Keep the body explorer above the cards, but use a compact, complete presentation instead of a 520px-tall drawing followed by another large control stack.
- A practical compact arrangement is a 112-120px-wide full schematic beside the three equivalent zone controls, with explanatory text outside that row. Preserve aspect ratio; do not crop the figure.
- Aim for a roughly 320-440px collapsed body-explorer block, with automatic growth when text requires it. Never enforce this with clipping or hidden overflow.
- Keep every external zone control at least 44px high. It remains the accessible alternative when a scaled SVG zone is small.
- Give Log the full available width. Test and Reset can share a row when their complete labels fit; otherwise let them wrap.
- The first card should arrive roughly within **1000px of normal mobile document content** after compaction and any approved evidence disclosure work. This is a usability target, not an assertion that every translation or expanded state fits there.
- Do not add a bottom-fixed Log bar in the initial pass: it can compete with the keyboard, obscure content, and create another sticky layer.

### 10.3 Responsive contracts

| Width / condition | Intended behavior |
| --- | --- |
| Above 960px | Existing side-by-side schematic/indicator layout; two indicator columns. |
| 701-960px | Body section above indicators; compact body presentation; two indicator columns where text still fits. |
| 700px and below | Single indicator/form/guidance column; full-width primary entry action. |
| 390px reference | 358px available content with the existing gutters. |
| 320px minimum test | No page-level horizontal overflow; labels and disclaimer wrap rather than truncate. |
| Landscape / short viewport | No oversized sticky body panel or fixed menu obstructing essential controls. |
| 200-400% zoom | Reflow to a usable narrow layout; no clipped controls or hidden evidence. |

Only 1440px desktop and 390px mobile were exercised in the reference audit. Other sizes here are implementation test targets.

### 10.4 Density and disclosure

The biggest density improvement should come from organizing secondary content, not shrinking it.

- Keep the main value, unit, baseline, deviation status, freshness, and safety labels easy to find.
- Group related metadata and use calm separators instead of a visually equal paragraph for every datum.
- A later phase may make **hazard-wide evidence** a native details disclosure, provided the association availability and tier remain visible and badge links open/focus the referenced evidence correctly.
- Do not hide the global disclaimer, per-card SIMULATED labeling, illustrative-threshold warning, or provenance warnings in an obscure menu.
- Keep citations and interpretation notes adjacent to the claim whenever the claim is displayed.
- Do not introduce fixed card heights or CSS line clamps to achieve equal-sized cards. A card with open evidence must expand naturally.
- If additional disclosure is introduced, preserve its open state across `renderCards()` and maintain the current card-focus behavior.

## 11. Component Specifications

### 11.1 Compliance and privacy

- Retain a 42px **minimum**, not an inflexible height, for the navy compliance bar.
- Preserve the current disclaimer text; its existing dash is represented by HTML `&mdash;` in `index.html`.
- Keep SIMULATED DATA at the opposite edge where space permits. Wrap into a second line on narrow/zoomed layouts instead of ellipsizing either message.
- Ensure in-page targets clear the actual sticky bar height plus breathing room. If the bar can wrap, a hardcoded 42px scroll offset alone is insufficient.
- Keep **Do not enter real personal health data.** visible before the monitoring/entry experience.
- Keep the storage notice factual. It describes browser storage, not a secure medical record or cloud synchronization.

### 11.2 Header and primary action

- Retain the existing emblem, explicit AI-generated disclosure, and image-failure placeholder.
- Use a confident wordmark with aligned emblem/text baselines rather than enlarging the emblem into a hero illustration.
- Primary label stays **Log a health measurement**. Avoid vague Start, Launch, or Begin Mission labels for this action.
- Desktop control target: 48px height, 20-24px horizontal padding, 8px corners, white text on teal, optional 2px lower depth.
- Mobile control target: full width, 48px minimum, complete readable label.
- Keep Sources as a real anchor to `#sources-verification`, not a competing filled button.
- Do not reorder meaningful actions visually with CSS while leaving a contradictory keyboard sequence in the DOM.

### 11.3 Hazard lens

Retain these controls: All hazards, Radiation, Isolation & Confinement, Distance from Earth, Gravity Fields, and Hostile Closed Environments.

- Minimum 44px height, 8px corners, 8px gap, strong border on inactive white surfaces.
- Selected control: teal background, white text, synchronized `aria-pressed`.
- Hover: gentle brand tint or border change, not vertical movement.
- Keep horizontal scrolling local to the option row. Leave padding for focus outlines and a visible overflow/scroll affordance.
- Do not turn the lens into a severity meter or color each hazard as an alarm.
- Related cards gain an evidence-association border/label; unrelated cards remain visible and readable.
- Relationship tiers stay written out: Primary physiological context, Secondary/contextual association, or Operational relevance.
- The Radiation caution that the six indicators do not measure radiation exposure remains an interface design note, separate from source claims.

### 11.4 Indicator card anatomy

Retain six indicators: Blood Pressure, Heart Rate, Blood Glucose, Body Temperature, Sleep Hours, and Mood.

Recommended reading order:

1. Indicator heading with a compact SIMULATED badge.
2. Written/icon deviation-status badge.
3. Main value with an adjacent unit.
4. Personal baseline and deviation relationship.
5. Last-recorded timestamp, input source, and relevant measurement context.
6. Eligible association information, if any.
7. Illustrative-demo-threshold warning and access to configuration context.
8. Seven-day trend and its data-table disclosure.
9. Four guidance disclosures and the secondary general-adult-reference disclosure.

Surface target: white, 1px strong neutral border, 12px radius, 20-24px desktop padding, 16-20px mobile padding, subtle surface shadow. Use approximately 8px within closely related information and 12-16px between information groups.

- The whole article is not a button. Do not give it a pointer cursor or a hover lift unless a specific interactive target requires it.
- Use the brand color for organization/emphasis, not to redefine Green/Amber/Red.
- Zone selection can use an inset ring; hazard association can use the existing border plus explicit label. Preserve both states when selected together.
- Neutral measurements must look intentionally unavailable, not like a loading success state.
- Keep the exact safety meaning of **Illustrative demo thresholds, not clinical.** visible on each card.
- Keep the existing general-adult-reference wording and its not-spaceflight-validated qualification; do not replace it with a generic Normal Range label.

### 11.5 Status and missing-data states

| State | Presentation | Meaning to preserve |
| --- | --- | --- |
| Green | Existing pale green, check icon, written label. | Within configured demo deviation bounds, not certified healthy. |
| Amber | Existing pale amber, caution icon, written label. | Configured intermediate deviation, not a validated medical urgency level. |
| Red | Existing pale red, alert icon, written label. | Configured larger deviation, not a diagnosis. |
| NO RECENT READING | Neutral gray/blue badge and explanatory copy. | No recent eligible measurement. |
| BASELINE NOT ESTABLISHED | Neutral badge and explicit baseline message. | Comparison cannot be evaluated. |
| NOT COMPARABLE | Neutral status with context-differs wording. | Reading is logged but not comparable to baseline context. |
| No verified guidance | Calm evidence empty state, not fabricated advice. | Eligible source-verified content is absent. |
| Storage unavailable | Visible non-alarming notice. | Synthetic data stays in memory and may be lost on reload. |

Color is always accompanied by text and, for deviation status, an icon. No state uses a flashing badge, heartbeat animation, or full-card alarm color.

### 11.6 Trends and tables

- Keep the native 320 x 110 SVG viewBox and approximately 110px chart height.
- Preserve actual timestamp spacing, straight segments, comparable-context filtering, and breaks where context is not comparable.
- Retain a 2px teal line with non-scaling stroke, soft grid lines, and a clearly described demo-tolerance band.
- Blood Pressure retains separate systolic/diastolic series with solid/dashed distinction and text description.
- Do not smooth the trace, add fake ECG shapes, draw an animated sweep, or simulate a live sensor feed.
- Values update directly. No count-up animation from zero and no path morph that suggests intermediate measurements existed.
- Keep SVG title/description and the native data-table disclosure. Decorative pixels must not be the only way to read a value.
- Tables scroll inside their existing labeled region, not across the whole page. Preserve keyboard access and UTC timestamp labeling.
- Point inspection is optional future work. If added, it must work with keyboard and touch, not hover alone, and must use actual stored readings.

### 11.7 Body explorer

Retain the front-facing geometric SVG, `viewBox="0 0 240 520"`, transparent background, neutral silhouette, and independently selectable regions.

| Interface grouping | Indicators |
| --- | --- |
| Head / Neuro | Sleep Hours, Mood. |
| Thorax / Cardio | Blood Pressure, Heart Rate. |
| Systemic / Metabolic | Blood Glucose, Body Temperature. |

- Preserve **Interface grouping, not an anatomical claim.** and the AI-generated schematic label.
- Hover may use a low-opacity teal fill. Active selection uses stronger fill and stroke, not an anatomical heat map.
- Preserve dashed-stroke keyboard focus on SVG zones, Enter/Space activation, and synchronized external buttons.
- Selecting the active grouping again clears emphasis; it does not remove readings or change their statuses.
- View buttons reveal a specific existing card through scrolling/focus. Do not turn grouping selection into an automatic carousel.
- Keep decorative anatomical detail paths from intercepting input.
- Mobile scaling must preserve the entire schematic and the equivalent external controls.

### 11.8 Measurement entry

Retain the inline **Log a health measurement** panel. A modal conversion is not needed for the initial polish pass.

| Field / action | Requirement |
| --- | --- |
| Indicator | Visible label and native select. |
| Blood Pressure | Separate systolic and diastolic fields; fixed mmHg units. |
| Heart Rate | Numeric bpm value plus resting/other context. |
| Blood Glucose | Numeric mg/dL value plus fasting/other context. |
| Body Temperature | Numeric value with the existing temperature unit; keep the `core-temperature` key. |
| Sleep Hours | Numeric hours value. |
| Mood | Five anchored choices: Very low, Low, Neutral, Good, Very good. |
| Timestamp | Visible local-time label and hint; future timestamps rejected. |
| Input source | Native select with explicit SIMULATED options. |
| Save | Existing **Save Measurement** submit label; primary teal action. |
| Cancel | Existing neutral secondary action; closes without saving and returns focus to Log. |

Form targets:

- 16px input/select text, 48px preferred control height, minimum 44px, 8px corners, 12-16px inner horizontal padding.
- Two field columns on wide screens; one on narrow screens. The blood-pressure pair remains clearly related.
- Labels above fields; units in visible labels; hint text beneath controls, not placeholder-only instructions.
- Preserve **entry limits, not clinical thresholds** and rejection rather than clamping.
- Keep errors next to the relevant fields and in the existing alert summary. Focus the first invalid control on failed save.
- Do not shake invalid fields, clear valid entries, disable the whole form without explanation, or invent a network loading state for local saving.
- Save and Cancel remain together at the start of the form-action row, matching the current interface. They may wrap, but never reverse meaning or become unlabeled icons.
- Successful local save updates the correct card/status/trend and issues the existing polite SIMULATED announcement. No confetti, achievement badge, or false clinical reassurance.

### 11.9 Sources and evidence

- Keep the Sources & verification section available from the header.
- Use the optional warm briefing surface for an editorial evidence area, or retain white and use a subtle separator. Both must meet text contrast requirements.
- Maintain total, verified, unverified, and registered-source counts as descriptive inventory counts, not authority scores or percentage-complete progress.
- Preserve source title links, locators, interpretation warnings, and provenance notes.
- Evidence disclosures use native details/summary with at least 44px summary targets; optional chevrons must not replace text labels.
- Empty content stays visibly empty with an explanation. Never fill gaps with reference-site marketing text or AI-generated medical guidance.
- Keep draft claims in the existing development-only inventory; visual polish must not leak drafts into production cards.

## 12. Interaction and Motion Specification

### 12.1 Action placement map

| Action | Desktop placement | Mobile placement | Visual priority |
| --- | --- | --- | --- |
| Log a health measurement | Trailing edge of masthead. | Full width after brand/navigation content. | Primary. |
| Sources & verification | Beside primary header action. | Visible secondary link in header. | Quiet navigation. |
| Test deviation | Trailing side of demo toolbar. | Beside Reset where labels fit. | Secondary demo control. |
| Reset demo | Beside Test; never styled as the main task. | Adjacent or wrapped, full label. | Secondary/quiet. |
| Hazard controls | Single aligned group above dashboard. | Locally scrollable row. | Context selection. |
| Zone controls | With schematic in left panel. | Beside compact full schematic. | Organizational selection. |
| View selected indicator | Below selected-zone controls/status. | Same logical location. | Contextual action. |
| Save Measurement | Start of entry action row. | Start/full-width if wrapping is needed. | Primary inside form. |
| Cancel | Immediately after Save. | Next to or below Save. | Secondary inside form. |
| Evidence/data summaries | Within the relevant card or evidence panel. | Same content order. | Disclosure, not primary CTA. |
| Offline status tests | Footer. | Footer with a comfortable target. | Supporting utility. |

### 12.2 Feedback and motion targets

These values are **proposed**, not copied reference measurements.

| Interaction | Duration | Allowed movement | Required behavior |
| --- | --- | --- | --- |
| Primary hover | 160ms | At most -1px, fine-pointer hover only. | Gentle depth/color response. |
| Primary press | 120-160ms | At most +1px relative to rest. | Depth compresses; action remains in place. |
| Secondary/ghost hover | 120ms | None. | Tint or border change. |
| Keyboard focus | Immediate | None. | Existing 3px outline is never delayed or faded in. |
| Hazard selection | 120-160ms color transition | None. | ARIA and logical selection update immediately. |
| SVG zone emphasis | Approximately 150ms | Fill/stroke only. | Preserve current direct, synchronized behavior. |
| Entry appearance | Optional 180-240ms | Opacity and up to 8px translation. | Focus and operability do not wait for animation. |
| Disclosure chevron | 120-160ms | Up to 90-degree rotation. | Native details controls content visibility. |
| Save/test feedback | Immediate content update | None on readings/charts. | Short polite live announcement. |
| Anchor/card navigation | Native scroll; optional smooth only without reduced motion. | No layout reordering. | Focus lands on the intended visible target. |
| Background / idle | No continuous motion. | None. | No ticking, breathing glows, floating cards, or fake live LEDs. |

Avoid `transition: all`. Name the exact paint/composite properties. Do not animate font size, card dimensions, input position, or chart values. Avoid staggered entrances for the six cards: essential content must be visible immediately.

### 12.3 Suggested CSS pattern

Illustrative handoff code only; not applied to `styles.css` by this documentation task.

```css
.button-primary {
  box-shadow: var(--shadow-action);
  transition:
    background-color var(--duration-control) var(--ease-standard),
    border-color var(--duration-control) var(--ease-standard),
    box-shadow var(--duration-control) var(--ease-standard),
    transform var(--duration-control) var(--ease-standard);
}

@media (hover: hover) and (pointer: fine) {
  .button-primary:hover:not(:disabled) {
    transform: translateY(-1px);
  }
}

.button-primary:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--brand-pressed);
}

.button-primary:disabled {
  transform: none;
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

If JavaScript motion is ever introduced, it must honor the preference both initially and when it changes. CSS alone cannot cancel a WebGL loop or an unrelated JavaScript timeline. No animation library is justified by this specification.

## 13. Accessibility and Performance

### 13.1 Declared-color contrast

Sources: `standard-contrast`, reference/current CSS; `CALCULATED` using `(lighter luminance + 0.05) / (darker luminance + 0.05)` with linearized sRGB channels. Displayed ratios are rounded for documentation; pass/fail thresholds must be evaluated without rounding.

| Foreground on background | Ratio | Design implication |
| --- | --- | --- |
| Git ink `#F5F4FD` on void `#0C091F` | 17.91:1 | Strong reference text separation. |
| Git void on lime `#B7F652` | 15.19:1 | Bright CTA remains very readable. |
| White on Space Apps rose `#FF2D95` | 3.46:1 | Insufficient for normal-size 14px CTA text at 4.5:1. |
| Rose on Space Apps paper `#F3EAD3` | 2.89:1 | Avoid this accent-text pairing. |
| Space Apps ink on paper | 16.52:1 | Excellent light-sheet body-text pairing. |
| BASELINE white on primary `#155F7A` | 7.12:1 | Keep the existing primary action pairing. |
| BASELINE ink `#142536` on canvas `#F3F6F8` | 14.36:1 | Strong primary text. |
| Secondary `#526577` on white | 6.02:1 | Readable metadata without over-bolding. |
| Strong border `#7C91A2` on white | 3.27:1 | Suitable contrast for important component boundaries. |
| Soft border `#D5DEE6` on white | 1.36:1 | Decorative separator only; not the sole interactive boundary. |
| Green text on its pale green background | 6.59:1 | Existing badge pairing is a good foundation. |
| Amber text on its pale amber background | 6.63:1 | Existing badge pairing is a good foundation. |
| Red text on its pale red background | 6.25:1 | Existing badge pairing is a good foundation. |

These are selected solid-color calculations, not full-page WCAG conformance certification. Alpha compositing, local background artwork, hover states, focus rings, and text over gradients require their own checks.

### 13.2 Accessibility requirements

- Target WCAG 2.2 AA behavior, with BASELINE's stricter **44 x 44px preferred actionable target**. WCAG 2.2 AA's minimum target criterion is 24 x 24px with exceptions; do not incorrectly call 44px the AA minimum.
- Keep text contrast at least 4.5:1 for normal text and 3:1 for qualifying large text. Keep important control boundaries and non-text indicators distinguishable.
- Preserve the skip link, landmarks, sensible heading order, and native controls.
- Maintain actual keyboard order when adjusting visual placement. No positive tabindex or mouse-only interactions.
- Ensure focus rings are not clipped by scroll containers, card overflow, paper decoration, or the sticky disclaimer.
- Do not rely on color, hover, animation, or an SVG region alone to convey information or provide an action.
- Keep `[hidden]` semantics reliable: hidden panels must not retain operable/focusable visible remnants.
- Keep visible field labels and associated hints/errors. A red outline alone is not a validation message.
- Keep announcements short and purposeful; never repeatedly announce all six cards or every chart point.
- Test forced-colors/high-contrast mode. Preserve system focus and control affordances rather than forcing decorative colors everywhere.
- Test 200% and 400% zoom, reduced motion on initial load and preference change, narrow reflow, and short landscape viewports.
- Do not make an essential instruction disappear after a timeout.

### 13.3 Performance and offline budgets

`TARGET`, not measured performance claims:

- **Zero added runtime dependencies** for the first polish pass.
- **Zero new external requests** from `index.html`; no remote fonts, CDN styles, scene downloads, or video.
- **Zero idle animation loops** and no continuous GPU scene.
- CSS-first motion limited to small, input-driven effects; never keep permanent `will-change` on every card.
- Preserve native SVG rather than adding a charting library for six small trends.
- Declare image dimensions and preserve layout space for the emblem/placeholder. A failed image must not collapse the header.
- Avoid expensive blur/glow/filter stacks on every panel. The references' effects are inspiration, not a performance requirement.
- Keep local input/save/filter feedback immediate. Do not add synthetic loading delays to make a local action feel more complex.
- Progressive enhancement must leave safety copy and neutral card structure usable if scripts or optional assets fail.

## 14. Implementation Sequence

The recommended sequence minimizes risk and separates visual polish from behavioral changes.

### Phase 1: CSS-only foundation

1. Keep existing palette/status tokens; introduce only the small used surface/motion extensions.
2. Improve wordmark, reading, label, and metadata hierarchy with existing offline fonts.
3. Establish consistent 8px controls, 12px cards, 16px large panels, restrained shadows, and explicit hover/focus/disabled states.
4. Improve mobile header/action layout and 16px input text while preserving DOM reading order.
5. Preserve all status and claim-rendering behavior.

### Phase 2: Responsive density

1. Compact the full body schematic beside its equivalent controls on mobile/tablet.
2. Group metadata visually without removing required context or warnings.
3. Recheck 960px/700px boundaries, long hazard labels, blood-pressure pairs, and form errors.
4. Verify that the primary reading reaches a useful position earlier in normal mobile content.

### Phase 3: Optional disclosure refinements

1. Consider native disclosure for long shared hazard-wide evidence while retaining a clear visible summary.
2. Make badge anchors reveal/focus their evidence target correctly.
3. Preserve open-section state and focused controls when cards rerender.
4. Keep all citations and interpretation warnings adjacent to displayed claims.

### Phase 4: Optional approved assets

Only after approval, consider self-hosted font assets or a restrained original evidence decoration. They must remain offline, licensed, AI-disclosed when applicable, and free of NASA logos. Do not add WebGL, GSAP, React, Tailwind, or a component framework to reproduce the references.

### File-level implementation map

| File / locator | Intended work | Must not change |
| --- | --- | --- |
| `styles.css`: root, header, controls, grids, metadata, responsive rules | Tokens, visual hierarchy, spacing, compact body layout, surface depth, reduced motion. | Semantic status mappings, hidden behavior, accessible focus. |
| `index.html`: header, notices, body/indicator/evidence structure | Minimal semantic grouping only if CSS cannot achieve the intended structure. | Existing element IDs, disclaimer copy, script loading, local asset behavior. |
| `app.js`: `renderCards`, `renderHazardAssociations`, entry/zone handlers | Only approved disclosure/focus preservation refinements. | Claim eligibility, hazard scope, baseline values, fixed units, context logic, storage key. |
| `status.js` | No design-driven changes. | Evaluation, freshness, thresholds, validation, tolerance bands. |
| `data/claims.js`, `data/sources.js` | No design-driven content changes. | Scientific text, citations, verification flags, provenance. |
| `tests.html` | Rerun existing tests after actual implementation. | No weakened assertions to accommodate cosmetic changes. |

No code changes or package installations are necessary to use this document as a handoff.

## 15. Acceptance Checklist

### 15.1 Visual and responsive

- [ ] The interface still reads as BASELINE, not an arcade or copied event website.
- [ ] Readings outrank metadata; units and baselines remain visually connected.
- [ ] Primary, secondary, context-selection, disclosure, and status elements look distinct but related.
- [ ] Cards remain level, stable, and readable when a hazard and body grouping are both selected.
- [ ] The mobile body explorer is compact without cropping its schematic or removing keyboard alternatives.
- [ ] No fixed card height, line clamp, or hidden overflow conceals necessary information.
- [ ] Header actions, long hazard names, source titles, and timestamp strings wrap cleanly.
- [ ] Page-level horizontal scrolling is absent; only the hazard row and labeled data-table regions may scroll locally.
- [ ] Check 1440x900, 1280x800, 1024x768, 960px, 768px, 700px, 390x844, 360px, 320px, and short landscape layouts.
- [ ] Font fallback and emblem failure preserve an intentional layout.

### 15.2 Interaction and accessibility

- [ ] Log opens the entry panel, synchronizes expanded state, and focuses the indicator select.
- [ ] Invalid save preserves entries, exposes associated errors, and focuses the first invalid control.
- [ ] Valid synthetic save updates the intended card and announcement without animated intermediate values.
- [ ] Cancel returns focus to Log without saving.
- [ ] Test deviation and Reset retain their existing explicitly SIMULATED behavior.
- [ ] Every hazard updates its own scope; All is not treated as a wildcard.
- [ ] Body zones work with click, Enter, and Space; external controls remain equivalent.
- [ ] View buttons scroll/focus the correct card without a sticky layer covering it.
- [ ] Details summaries, links, table-scroll regions, inputs, and buttons all have visible unclipped focus.
- [ ] Open evidence state survives relevant rerenders if disclosure behavior is changed.
- [ ] Normal, selected, hover, pressed, disabled, missing, stale, non-comparable, error, and storage-fallback states are checked.
- [ ] Reduced motion suppresses all nonessential movement, including any future JavaScript motion.
- [ ] Check keyboard-only use, 200-400% zoom, forced colors, and touch without hover.

### 15.3 Safety and architecture

- [ ] Prototype disclaimer, SIMULATED labeling, privacy warning, and illustrative-threshold cautions remain visible.
- [ ] No missing or incompatible reading becomes Green.
- [ ] No unverified/draft claim becomes visible guidance or a hazard association.
- [ ] No CSS emphasis implies diagnosis, causation, radiation dosimetry, live sensors, or a secure medical record.
- [ ] Temperature display naming and `core-temperature` persisted keys remain compatible.
- [ ] Fixed baselines, units, timestamp behavior, recency logic, and status math remain unchanged.
- [ ] `index.html` works through `file://` with networking disabled.
- [ ] Existing `tests.html` status/validation tests pass after implementation; passing tests do not verify scientific accuracy.
- [ ] No new dependency, external font request, NASA logo, ambient video, or GPU scene is introduced.

### 15.4 Audit completion versus future implementation

Completed in the initial reference audit: both reference/source analyses, desktop/mobile browser observations, button-state sampling, mobile-menu and scrolled-header inspection, BASELINE entry/font inspection, declared-color contrast calculations, and the combined specification.

That initial audit did not include UI implementation, closed-route form testing, all-reference-route coverage, Safari/Firefox/device testing, full accessibility certification, performance benchmarking, or scientific/event-policy verification. The implemented UI and its completed checks are now recorded below; the checklist also includes broader acceptance work not covered by those checks.

### 15.5 Implemented UI verification

Implementation date: 2026-11-17. The core CSS, responsive layout, and native disclosure refinements are now applied. Optional external font assets and heavy reference effects were not added.

One-off headless Edge checks through `file://` passed **82 UI checks** and the unchanged **245 status/entry-validation tests**, with no runtime exceptions or external page requests. The UI checks covered keyboard order/focus, tactile button states, hazard scopes, shared-evidence links, disclosure/focus preservation, validation and synthetic saving, context mismatch, Cancel, emblem failure, storage failure, empty history, empty evidence, draft suppression, direct evidence hashes, reduced motion, and forced colors.

Responsive checks covered 1440x900, 1280x800, 1024x768, 960x900, 768x900, 700x900, 390x844, 360x800, 320x760, and 844x390. All had contained page widths and visible native controls at least 44px high.

Observed snapshot improvements (`LIVE`, source ID `audit-browser`):

| Metric | Pre-polish | Implemented |
| --- | --- | --- |
| Desktop first-card top, 1440x900 | 643.45px | 568.19px |
| Desktop body-panel height | 912.61px | 445.00px |
| Mobile first-card top, 390x844 | 1844.94px | 1095.28px |
| Mobile body-panel height | 912.61px | 389.09px |

These are geometry observations, not clinical measurements or guarantees for every saved state. The approximately 1000px mobile arrival target remains a direction for further density refinements, not an achieved exact limit. Safari/Firefox, physical devices/screen readers, formal accessibility certification, and scientific verification remain outside these browser checks. The checklist remains available for broader acceptance testing.

## 16. Source Registry

All records below have `verified: false`. They document design provenance; they are not additions to BASELINE's scientific claims inventory. The audit date is 2026-11-17. Asset hashes identify the inspected deployment and can change on later releases.

| `source_id` | Source / locator | Evidence supported |
| --- | --- | --- |
| `ref-gitmastery-page` | https://gitmastery.me/ | Homepage structure, classes, links, copy, hierarchy. |
| `ref-gitmastery-css` | https://gitmastery.me/_next/static/chunks/439083c760de6c02.css | Named palette, fonts, tactile controls, shared component effects, keyframes, breakpoints. |
| `ref-gitmastery-motion` | https://gitmastery.me/_next/static/chunks/b9599fc5f4a78339.js | Hero GSAP sequence, typing/graph loop, pointer tilt, scroll reveals, video preference behavior, onboarding preference logic. |
| `ref-spaceapps-page` | https://www.nasa-spaceapps6oct.org/forms?form=project-submission | Exact closed-submission route, content structure, classes, navigation/footer. |
| `ref-spaceapps-css` | https://www.nasa-spaceapps6oct.org/_next/static/css/22d4a11bef86a7e7.css | Paper/CTA system, fonts, gradients, grain, shared animation rules, responsive and reduced-motion CSS. |
| `ref-spaceapps-layout` | https://www.nasa-spaceapps6oct.org/_next/static/chunks/app/layout-6b1e2df20eb14e36.js | Header scroll threshold, logo scaling, mobile menu, route wrappers. |
| `ref-spaceapps-motion` | https://www.nasa-spaceapps6oct.org/_next/static/chunks/666.5ab11437a9f2501c.js | Paper/fade/draw/orbit/float choreography and initial reduced-motion check. |
| `ref-spaceapps-background` | https://www.nasa-spaceapps6oct.org/_next/static/chunks/639.392b9a6561da2aff.js | Procedural scene colors, stars/planets, camera, pointer/scroll motion, renderer limits. |
| `audit-browser` | Isolated local Edge inspection described in Sections 2, 15.5, and 17; reference screenshots and the recorded responsive UI checks. | Snapshot geometry, actual states, visual conflicts, platform fonts, UI verification. Temporary audit files are not product assets. |
| `baseline-html` | [index.html](index.html): header, compliance, entry, hazard, SVG, indicator, evidence, footer markup. | Existing structure, labels, accessibility attributes, script/local-asset loading. |
| `baseline-css` | [styles.css](styles.css): root tokens; `.page-wrap`, grids, controls, charts, media queries. | Existing palette, geometry, type scales, focus, responsive and SVG motion behavior. |
| `baseline-app` | [app.js](app.js): `renderCards`, `renderHazardAssociations`, `selectZone`, entry handlers. | Actual card content, evidence gating, interactions, fixed units/baselines, local storage. |
| `baseline-readme` | [README.md](README.md): overview, sources, AI use, limitations. | Offline architecture, safety/provenance constraints, current behavior and scope. |
| `standard-contrast` | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | Text contrast criteria and sRGB relative-luminance calculation. |
| `standard-target-size` | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | WCAG 2.2 AA 24px target criterion, exceptions, distinction from enhanced 44px targets. |
| `baseline-polish-proposal` | This document, Sections 5 and 7-15. | Explicitly proposed design targets; not extracted site measurements or medical recommendations. |
| `baseline-orbital-css` | [cosmos.css](cosmos.css) | Experimental dark palette, orbital artwork, responsive panels, and scroll-reveal styling. |
| `baseline-orbital-effects` | [space.js](space.js) | Original procedural starfield, scene pause/visibility behavior, navigation, and packet-arrival animation. |

## 17. Experimental Orbital Direction

Implementation date: 2026-11-19. Branch: `polish-v2`. This iteration intentionally moves beyond the restrained clinical skin. The earlier light-theme, zero-idle-animation, button-only-motion, and first-card-arrival targets do not constrain this testing-branch experiment. Health safety, provenance, explicit SIMULATED labeling, fixed baselines/units/status math, and the prohibition on NASA logos still apply.

### Visual and Motion Language

- Deep navy canvas `#070B18`, luminous cyan actions `#8DE5F0`, pale ink `#EDF3FF`, secondary ink `#B0BED5`, violet atmosphere, and a retained warm evidence sheet.
- Large Bahnschrift/system-fallback display typography, compact monospace session/frame readouts, six channel accent colors, outlined data surfaces, and a distinct orbital hero.
- Original procedural starfield, concept constellations and shooting streaks, slowly drifting nebulae, rotating rings, floating spherical artwork, and pointer/scroll response on decoration.
- Scroll-triggered reveals, visible-section navigation, and actual page progress. Keyboard focus reveals a target immediately, and jump margins keep settled reveal content clear of the disclaimer.
- Arrival feedback animates opacity, small translation, chart drawing, and panel light. Numeric values update directly to actual replay samples; no fabricated intermediate reading is displayed.
- Effects can be paused. Reduced motion and hidden tabs stop the scene; low-width devices use fewer stars and a lower paint cadence. Celestial graphics are AI-generated concepts, not an orbital model or astronomical catalogue.

### Replay Behavior

- Automatic, explicitly SIMULATED replay uses the existing fixture values. Each five-second frame supplies all six indicator channels with a real preview timestamp.
- The transient preview buffer contains at most 24 frames / 144 samples. Persisted demo/manual entries are separate and retain the existing versioned storage format.
- Pause, manual frame stepping, entry/deviation-test suspension, and reset are explicit controls. Reduced motion begins paused but permits deliberate sampling.
- Recent charts use the last 16 eligible samples on a sequence axis. The historical seven-day timeline and UTC data table retain timestamp/context semantics and comparable-context filtering.
- Incoming data updates measurement/provenance/chart/table content incrementally. Evidence links, open disclosures, and table-region focus remain stable.
- This is neither live sensor telemetry nor a game. Frame/session counters describe the local preview, not health scores, actual mission metrics, or scientifically verified conditions.

### Verification

The experimental pass passed **92 UI checks** and the unchanged **245 status/validation tests** in headless Edge through `file://`, with no runtime exceptions or external page requests. Checks covered 320px to 1440px layouts plus landscape, actual all-channel updates, timestamp changes, preview isolation/bounds, evidence/table focus, manual entry locks, validation, context mismatch, deviation/reset, hazard routing, beacon navigation, effect pause/resume, hidden tabs, and initial/live reduced-motion preferences. Important anchor contrast and channel value/unit containment were also checked.

Cross-browser, physical-device/screen-reader testing, formal accessibility certification, and performance benchmarking remain unverified. The original reference audit is visual inspiration only and does not verify clinical or event-policy claims.

AI assistance was used to produce this design audit and specification. Author review is required before implementation. The reference sites supply visual inspiration, not scientific authority or assets licensed for automatic reuse.
