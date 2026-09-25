---
name: Karan Khare
description: Twelve years of engineering leadership, kept as one engineer's bound lab notebook.
colors:
  canvas: "#f4f7f2"
  surface: "#fbfcfa"
  raised: "#ffffff"
  sunken: "#e6eee2"
  ink: "#1a2150"
  ink-soft: "#2e3340"
  muted: "#525a50"
  faint: "#6f776c"
  line: "#d5e0d0"
  line-strong: "#b4c4ad"
  accent: "#2438a6"
  accent-hover: "#182a85"
  accent-soft: "#e4e9fb"
  accent-ink: "#ffffff"
  cloth: "#1d3b2f"
  cloth-deep: "#152c23"
  cloth-ink: "#eaf1e6"
  cloth-muted: "#b3c8ba"
  highlight: "#dcea4a"
  highlight-ink: "#1a2150"
  witness: "#b3261e"
  print: "#ffffff"
typography:
  display:
    fontFamily: "Sofia Sans Extra Condensed Variable, Sofia Sans Extra Condensed, Sofia Sans Variable, ui-sans-serif, sans-serif"
    fontSize: "3.4rem (sm 4.6rem, lg 5.5rem)"
    fontWeight: 820
    lineHeight: 0.88
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Sofia Sans Extra Condensed Variable, Sofia Sans Extra Condensed, Sofia Sans Variable, ui-sans-serif, sans-serif"
    fontSize: "3.2rem (sm 4.2rem, lg 5rem)"
    fontWeight: 820
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Sofia Sans Extra Condensed Variable, Sofia Sans Extra Condensed, Sofia Sans Variable, ui-sans-serif, sans-serif"
    fontSize: "2.6rem (md 3.5rem)"
    fontWeight: 760
    lineHeight: 0.95
    letterSpacing: "-0.005em"
  entry-title:
    fontFamily: "Sofia Sans Extra Condensed Variable, Sofia Sans Extra Condensed, Sofia Sans Variable, ui-sans-serif, sans-serif"
    fontSize: "2rem (md 2.4rem)"
    fontWeight: 760
    lineHeight: 1
  body:
    fontFamily: "Sofia Sans Variable, Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Sofia Sans Variable, Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Sofia Sans Extra Condensed Variable, Sofia Sans Extra Condensed, Sofia Sans Variable, ui-sans-serif, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  pad-header:
    fontFamily: "Sofia Sans Extra Condensed Variable, Sofia Sans Extra Condensed, Sofia Sans Variable, ui-sans-serif, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 720
    letterSpacing: "0.12em"
  hand:
    fontFamily: "Kalam, Bradley Hand, cursive"
    fontSize: "1.125rem–1.4rem"
    fontWeight: 400
    lineHeight: 1.375
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  paper: "3px"
  control: "4px"
  mark: "9999px"
spacing:
  page-x: "20px"
  page-x-sm: "32px"
  band-y: "64px"
  band-y-md: "96px"
  margin-column: "184px"
  margin-gap: "48px"
  content: "1184px"
  prose: "704px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.canvas}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-paper:
    backgroundColor: "{colors.cloth-ink}"
    textColor: "{colors.cloth}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "52px"
  button-paper-hover:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-ink}"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "0 14px"
    height: "44px"
  code-block:
    backgroundColor: "{colors.sunken}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.mono}"
    rounded: "{rounded.paper}"
    padding: "16px"
  print:
    backgroundColor: "{colors.print}"
    padding: "10.4px"
  sticky-note:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.highlight-ink}"
    typography: "{typography.hand}"
    padding: "14px 16px"
    width: "192px"
  taped-card:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink-soft}"
    padding: "24px"
  tool-sheet:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.paper}"
---

# Design System: Karan Khare

## Overview

**Creative North Star: "The Bound Lab Notebook"**

The site is one engineer's bound lab notebook lying open on a desk: dated, numbered, witnessed entries on cool white graph-ruled pages, bound in bottle-green bookcloth. Every page is a Section with the same ruled left margin, so the notebook reads as one continuous object from home page to résumé to tool. Objects get taped onto the pages: a printed portrait, index cards, a sticky note, a printout. A pen annotates the page: underlines, loops, arrows and ticks ink themselves in as they scroll into view. A red ribbon bookmark hangs from under the header and tracks how far you have read.

The type is doing the notebook's job, not a portfolio's. Sofia Sans sets the typed entries. Its Extra Condensed cut is the voice of the pre-printed pad (headers, field labels, folios, button lettering), and it carries all headlines as condensed heavy ink. Kalam is the hand that writes on the page: margin notes, dates, captions, signatures. The system deliberately refuses the cream-paper, serif-headline, mono-kicker portfolio template; there is no serif anywhere, and monospace appears only for code and data.

Density is moderate and editorial: wide bands (64–96px vertical), a fixed 11.5rem margin column (with a matching outer margin — lg:pr-12, xl:pr-20 — so the page breathes on both sides) on desktop, measure capped at 60–62ch for ledes. Light theme is the notebook by day; dark is the same desk at night: the page dims to green-black, the ink lightens to pale blue, the cloth goes nearly black.

**Key Characteristics:**
- Bottle-green bookcloth bands (hero backdrop, spotlight, closing CTA, footer) alternate with graph-ruled paper bands.
- A red double margin rule down the left of every paper band on desktop.
- Condensed heavy headlines in blue-black ink; handwritten Kalam only for things a hand wrote.
- Physical objects (prints, tape, index cards, sticky notes) with real paper shadows and slight rotations.
- Chartreuse highlighter marks only current work.
- Near-square corners throughout; motion is pen strokes, weighted springs and wide-screen parallax.

## Colors

A cool, green-tinted paper world: neutral pages and blue-black fountain ink, one bottle-green material, one blue accent, and two sparing marks (red witness, chartreuse highlighter).

### Primary
- **Fountain Ink Blue** (accent): links, the active-nav pen underline, primary-button hover, focus rings, caret, the current-role underline, code identifiers. Dark: #a6b6ff, hover #c4cfff.
- **Blue-Black Ink** (ink): headings, the primary button fill, the nameplate, hand annotations on paper. Dark: #e8edff.

### Secondary
- **Bottle-Green Bookcloth** (cloth, cloth-deep): whole bands only, never a small chip. Carries a fine weave and fibre noise. Text on cloth uses **Cloth Ink** (cloth-ink) for headings and **Cloth Sage** (cloth-muted) for ledes, margin notes and pen marks. Dark cloth: #1c3b2e.

### Tertiary
- **Chartreuse Highlighter** (highlight, text highlight-ink): the highlighter stroke over current work, the "Now" sticky note, and text selection. Dark: #d2e04a.
- **Witness Red** (witness): the double margin rule (at 55% opacity), the ribbon bookmark, the index-card header line, and the pen loop that rings a key ledger figure. Dark: #e0655c.
- **Masking Tape** (`rgb(236 224 192 / 0.86)`; dark `rgb(214 200 164 / 0.42)`): tape strips only.

### Neutral
- **Graph Paper** (canvas): default page, ruled with the graph grid. Dark #111a16.
- **Clean Sheet** (surface): alternate un-ruled paper band. Dark #17231e.
- **Raised Card** (raised): taped cards, printouts, the tool working sheet. Dark #1c2a24.
- **Sunken Well** (sunken): code blocks, inline code, wells. Dark #0d1512.
- **Soft Ink** (ink-soft): body text. **Pencil** (muted): ledes, margin notes, form labels. **Faint Pencil** (faint): hints, metadata, placeholder.
- **Rule Green** (line / line-strong): hairlines, table rules, dotted leaders. Graph ruling uses `rgb(46 110 80 / 0.07)` minor every 20px and `/ 0.14` major every 100px.
- **Print White** (print): the photo-print border and index cards. Dark #e9ede6 (a print under a desk lamp, not a white void).

### Named Rules
**The Current-Work Highlighter Rule.** Chartreuse marks current work only: Amazon Quick in the hero, the current employer in Entries and on About, the "Agentic" card in the spotlight arc, the "Now" sticky note. Apart from text selection, it never appears as decoration on older work.

**The Cloth Owns the Band Rule.** Bookcloth fills a full-width band or the hero backdrop. It is never a card, a pill or a button fill.

**The Fixed Ink on Objects Rule.** Text printed or written on a physical object (the portrait caption, index cards) uses fixed dark ink (#1a2150 heading, #2e3340 body, #525a50 hand) whatever the theme, because the object is the same paper in both. Pen marks drawn directly on cloth use the cloth tone (cloth-muted) so they don't vanish.

## Typography

**Display Font:** Sofia Sans Extra Condensed Variable (falls back to Sofia Sans, sans-serif)
**Body Font:** Sofia Sans Variable (falls back to system-ui)
**Hand Font:** Kalam 300/400 (falls back to Bradley Hand, cursive)
**Mono Font:** JetBrains Mono Variable, for code and data only

All faces are self-hosted through @fontsource imports in `src/index.tsx`, not linked from a CDN.

**Character:** One family in two widths: the pre-printed pad (condensed, heavy, often uppercase) and the typed entry (normal width, relaxed leading). Kalam is the only other hand on the page.

### Hierarchy
- **Display** (820, 3.4 → 4.6 → 5.5rem, lh 0.88, uppercase): the home hero statement only.
- **Headline** (820, 3.2 → 4.2 → 5rem, lh 0.9, uppercase): inner-page titles in PageHead.
- **Title** (760, 2.6 → 3.5rem, lh 0.95, sentence case): Section headings. On cloth, some closing headings are set uppercase at 800.
- **Entry title** (760–800, 1.7–2.6rem, lh 1): role titles, card and printout titles, tool names in the contents list.
- **Lede** (400, 1.1875rem, relaxed, max 60–62ch): the paragraph under a title.
- **Body** (400, 1.0625rem, lh 1.6): entries; `text-wrap: pretty`, headings `balance`, tables `tabular-nums`.
- **Label** (700, 0.8125rem, 0.08em, uppercase): form labels, table heads, breadcrumbs.
- **Pad header** (720, 0.8125rem, 0.12em, uppercase): the ruled header row ("Notebook of K. Khare … p. 1"), folios, sign-off captions.
- **Button lettering** (720, uppercase, 0.04em): condensed face at 0.95 / 1.0625 / 1.1875rem by size.
- **Hand** (Kalam 400, 1.125–1.4rem; up to 1.75rem for signatures): margin notes, dates, captions, sticky notes, sign-off.

### Named Rules
**The Margin, Not the Kicker Rule.** No label sits above a heading. A short orienting note goes in the 11.5rem left margin column beside the heading, handwritten in Kalam, rotated about -3°, right-aligned, and shown on desktop only (`lg`). On smaller screens it is dropped, not moved on top of the heading.

**The Pre-Printed Label Rule.** Uppercase condensed label lettering is only for things printed on the pad: field labels, table column heads, breadcrumbs, folios, sign-off captions. It never works as a section kicker.

**The Hand Is a Hand Rule.** Kalam is used only for text a person wrote on the page: margin notes, dates in the margin, photo captions, sticky notes, the "not built yet" notes, the signature and last-entry date, filled-in form values. It is never used for navigation, buttons or body copy.

**The Mono Is Data Rule.** JetBrains Mono appears only for code, package names, identifiers, hex values and machine output. It is never a stylistic label.

## Layout

The page is a stack of full-width bands. Each band is a Section with a tone (canvas + graph ruling, surface + grain, sunken + grain, or cloth), 20px side padding (32px from `sm`), and 64px vertical padding (96px from `md`). Content sits in a 74rem (1184px) container; long-form reading narrows to 44rem.

On desktop (`lg`, 1024px) every paper band splits into a **11.5rem margin column** and the entry column, with a 3rem gap. The red margin rule is painted on the margin column and extends past the band's padding, so it reads as one unbroken rule from band to band. Dated lists (Entries, About roles, the tools contents) reuse the same 11.5rem column for the date or count, so the margin stays aligned down the page. A `bleed` Section lets wide content span both columns while its heading stays in the entry column.

The home hero is a two-page spread (about 0.82fr / 1.18fr) on a cloth backdrop, with a spine shadow at 41%. Inner pages open with PageHead: a pad-header rule (breadcrumbs left, folio right) over a large uppercase title, with an optional taped print in the margin. Tool pages put the tool on a raised sheet (`rounded 3px`, float shadow) pulled 24px up over the ruled paper below the head.

Below `lg` the margin column, the margin rule, the margin notes and the sticky note are hidden. Grids collapse to a single column. The ribbon bookmark tucks into the page gutter.

## Elevation & Depth

Depth is physical: objects sit on paper and paper sits on cloth. Shadows are layered: a tight contact shadow plus a long, soft, negatively spread drop tinted green-black (pure black in dark mode). Flat bands carry no shadow; only objects lying on the page lift. Parallax adds real depth on wide screens.

### Shadow Vocabulary
- **Card** (`0 1px 1px rgb(20 40 30 / .06), 0 2px 4px -2px rgb(20 40 30 / .12)`): the sticky header once scrolled.
- **Raised** (`0 2px 3px rgb(20 40 30 / .07), 0 12px 24px -12px rgb(20 40 30 / .28)`): taped cards, the printout, the sticky note.
- **Float** (`0 3px 6px rgb(20 40 30 / .08), 0 28px 48px -20px rgb(20 40 30 / .42)`): the open spread, the spotlight insert, index cards, tool sheets.
- **Print** (`0 2px 3px rgb(20 30 25 / .14), 0 18px 32px -16px rgb(20 30 25 / .45)`): photographic prints only.
- **Tape** (`0 1px 1px rgb(0 0 0 / .1), 0 3px 6px -3px rgb(0 0 0 / .18)`): masking tape only.

### Named Rules
**The Objects Lift, Pages Don't Rule.** Shadows belong to things placed on the page (prints, cards, notes, sheets) and to the spread lying on the cloth. A plain band or a list row never gets a shadow.

**The Multiplane Rule.** Parallax goes through `useMultiplane` only. The hero uses `rest: 'start'` so its planes sit in their composed position at load. Mid-page scenes (spotlight index cards, the tablez printout) use `rest: 'center'`. Depth is negative behind the page, positive in front. Scale is 0 (no movement) below 1024px and under `prefers-reduced-motion`. Planes ride a spring (stiffness 120, damping 24, mass 0.6).

## Shapes

Paper is near-square. Sheets, inputs, code blocks and wells use a 3px corner. Buttons and header controls use 4px. Taped objects (prints, cards, sticky notes) have square corners and a slight rotation (about ±0.6° to ±3°) instead of rounding. Masking tape is the one torn edge: a jagged clip-path polygon at both ends. Fully round shapes are reserved for marks that are really circular: proficiency pips, bullet dots, a close badge. Borders are 1px hairlines in the rule green. Inked controls use a 1.5px stroke, like a pen line. The pad header rule is 1.5px ink at 70%.

**The Near-Square Rule.** Corners are 3px (paper) or 4px (controls). Use `rounded-full` only for a genuinely circular mark, never for a pill, a chip or a track.

## Components

### Buttons
Inked rectangles lettered in the pad's condensed caps. Pressing one sinks it like a key (y +1.5px, scale 0.99, spring 700/30); it never lifts.
- **Shape:** near-square (4px), 1.5px border.
- **Primary:** ink fill, canvas text; hover turns to fountain-ink blue. Heights 36 / 44 / 52px (sm / md / lg).
- **Secondary:** transparent with a 70% ink border; hover firms the border and adds a 4% ink wash.
- **Ghost:** borderless, with a 30% ink underline that darkens on hover.
- **Paper:** the primary action on cloth: cloth-ink fill, cloth text; hover empties to an outline in cloth ink (the highlighter stays reserved for current work).
- **Disabled:** 45% opacity, not-allowed cursor.
- Icons trail the label from the drawn set (arrowRight, external).

### Text Links
Semibold fountain ink with a 30% accent underline at a 0.28em offset, going to full accent on hover. A trailing drawn arrow. On cloth: cloth-ink text, cloth-muted underline.

### Inputs / Fields
- **Style:** 1px rule-green border, canvas fill, 3px corner, 44px tall. Textareas are mono at 0.8125rem.
- **Label:** the pre-printed label style, 8px above the control. Hint in faint pencil at 12px.
- **Focus:** the border shifts to fountain ink. The global focus ring is 2px accent with a 3px offset.
- **Search:** tools search is an underline field (1.5px ink at 40%, accent on focus) with the drawn search icon.
- **Error:** alert banner with the drawn alert icon, 3px corner, faint red tint.

### Code Blocks
Sunken well, 1px rule border, 3px corner. Header strip with the language in condensed uppercase (0.875rem, 0.06em) and a Copy/Copied text button. Mono body at 0.8125rem, relaxed. On a printout, code sits between dashed rules instead of in a well.

### Navigation
- **Header:** sticky, 72px tall, canvas. After 12px of scroll it gains a hairline, card shadow and backdrop blur. The nameplate is a ruled "KK" box plus "KARAN KHARE" in condensed caps.
- **Links:** 1.0625rem Sofia Sans; muted at rest, ink on hover. The active link is semibold ink with a hand-drawn accent pen underline that springs between links (`layoutId`). Tool category tabs use the same underline.
- **Controls:** theme toggle and menu button are 40px squares, 4px corner, 1.5px ink border at 25%. The "Get in touch" CTA is an inked primary.
- **Mobile:** the drawer opens on graph paper with 1.75rem condensed links, each ruled with a trailing arrow, and a full-width inked CTA.
- **Footer:** the back cover in cloth, with a large condensed-caps sign-off line, contents lists with 12% cloth-ink rules, and a "Signed / Last entry" block with Kalam signatures over ruled lines.

### Pen Annotations (signature)
Hand-authored irregular SVG paths (InkUnderline, InkLoop, InkArrow, InkTick) that draw themselves once via `pathLength` (0.9s, ease `[0.65, 0, 0.35, 1]`) when 60% in view. Tones: ink, accent, witness, cloth. Used for the hero underline (accent), the current-role underline, the ringed ledger figure (witness), and the margin arrow.

### Ribbon Bookmark (signature)
A witness-red ribbon, 10–14px wide with a notched tail, hanging from under the header just outside the 74rem content edge. Its length springs (140 / 22 / 0.9) from 3.5rem to 62vh with scroll progress. Under reduced motion it stays at 3.5rem.

### Taped Objects
- **Print:** white border (10px), print shadow, Kalam caption in fixed ink, tape strip across the top edge. In the hero it drops in on a weighted spring (stiffness 110, damping 11, mass 1.1) from -8.5° to rest.
- **Taped card:** raised fill, 24px padding, raised shadow, ±0.6–0.8° tilt, one tape strip.
- **Index card:** print fill, a red header rule at 3.1rem and pale-blue ruling every 1.7rem, fixed dark ink, float shadow, tilted.
- **Sticky note:** highlighter fill, Kalam in highlighter ink, raised shadow, springs in (140 / 13). Desktop only, current work only.
- **Tape:** 96 × 28px, translucent kraft with a gloss gradient and fibre noise, torn clip-path, rotated about ±2–6°.

### Ledgers and Contents
Tables of record: a label cell in body type with faint notes, the figure in condensed 780 at 2.2rem, and 70% strong rules between rows. Contents lists run a tool name, a 2px dotted leader and a muted tagline. Planned items are struck through in faint pencil with a Kalam "not built yet" note.

### Icons
One drawn set (`Icon.tsx`): 24px grid, 1.75 stroke, round caps and joins, slightly irregular paths so they sit beside the pen marks, sized 1.05em. Platform marks in the spotlight follow the same stroke spec.

## Do's and Don'ts

### Do:
- **Do** build every band as a Section with a tone, so the margin column and red margin rule stay continuous.
- **Do** put orienting notes in the 11.5rem margin column in Kalam, rotated about -3°, desktop only.
- **Do** keep chartreuse for current work: Amazon Quick, the current role and employer, "Agentic", "Now".
- **Do** use the pre-printed label style only for field labels, table heads, breadcrumbs and folios.
- **Do** set text on prints, index cards and sticky notes in fixed dark ink, and pen marks on cloth with `tone="cloth"`.
- **Do** use 3px corners for paper and wells and 4px for controls, with 1.5px inked strokes on controls.
- **Do** drive parallax only through `useMultiplane`: `'start'` for the hero, `'center'` mid-page, still below 1024px and under reduced motion.
- **Do** draw icons from `Icon.tsx` (or the same 1.75-stroke round-cap spec).
- **Do** keep monospace for code and data only.

### Don't:
- **Don't** place a kicker or eyebrow label above a heading.
- **Don't** use highlighter on past roles, generic emphasis or decoration.
- **Don't** use unicode glyphs (▶ ⌘ → ✓ ×) as icons.
- **Don't** use pills or `rounded-full` on anything that isn't a genuinely circular mark.
- **Don't** introduce a serif, a system display face, or monospace labels. The cream-serif-and-mono-kicker portfolio template is the anti-reference.
- **Don't** make bookcloth into a card or chip; it owns whole bands.
- **Don't** give flat bands or list rows shadows; only objects lying on the page lift.
- **Don't** let parallax run on phones or under reduced motion.

### Open question
Inner PageHeads and tool pages lay full-bleed graph ruling right up to the header, so the whole viewport reads as ruled paper. A detector advisory flagged full-bleed ruling on inner PageHeads. It is recorded here as unresolved, not as a rule: graph ruling is the engineering paper's own material, but whether inner heads should rule full-bleed or sit on a bounded sheet has not been decided.
