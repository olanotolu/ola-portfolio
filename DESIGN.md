---
name: OlaOlu. — Personal Research Institution
description: Monument-scale serif type on a white field; blur reveals, no chrome.
colors:
  paper: "#ffffff"
  ink: "#171717"
  hairline: "#e5e7eb"
  soft-ink: "#4b5563"
  muted-ink: "#737373"
  dim-ink: "#9ca3af"
  void: "#000000"
  signal-green: "#00ff00"
  signal-red: "#ff0000"
typography:
  display:
    fontFamily: "pr, serif"
    fontSize: "clamp(1rem, 1rem + 6vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-0.08em"
    textTransform: "uppercase"
  headline:
    fontFamily: "pr, serif"
    fontSize: "clamp(1rem, 1rem + 5vw, 4.5rem)"
    lineHeight: 0.9
  title:
    fontFamily: "pr, serif"
    fontSize: "26px"
    lineHeight: 1.1
  title-sm:
    fontFamily: "pr, serif"
    fontSize: "20px"
    lineHeight: 1.1
  body:
    fontFamily: "sc, sans-serif"
    fontSize: "15px"
    lineHeight: "1.6"
  body-lg:
    fontFamily: "sc, sans-serif"
    fontSize: "19px"
    lineHeight: "1.6"
  thesis:
    fontFamily: "sc, sans-serif"
    fontSize: "22px"
    lineHeight: 1.1
  thesis-sm:
    fontFamily: "sc, sans-serif"
    fontSize: "18px"
    lineHeight: 1.1
  body-md:
    fontFamily: "sc, sans-serif"
    fontSize: "17px"
    lineHeight: "1.6"
  description:
    fontFamily: "sc, sans-serif"
    fontSize: "14px"
    lineHeight: "1.6"
  label:
    fontFamily: "sc, sans-serif"
    fontSize: "12px"
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  label-sm:
    fontFamily: "sc, sans-serif"
    fontSize: "11px"
    letterSpacing: "0.15em"
    textTransform: "uppercase"
  micro:
    fontFamily: "sc, sans-serif"
    fontSize: "11px"
    letterSpacing: "0.08em"
    textTransform: "uppercase"
rounded:
  none: "0px"
spacing:
  section-y: "96px"
  section-y-lg: "144px"
  content-x: "24px"
  content-x-lg: "40px"
  content-max: "768px"
  list-gap: "24px"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "4px 8px"
  project-link:
    textColor: "{colors.ink}"
    typography: "{typography.display}"
  list-item-link:
    textColor: "{colors.ink}"
    padding: "24px 0"
    height: "auto"
  paper-link:
    textColor: "{colors.ink}"
    padding: "24px 0"
  footer-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  logo-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
---

# Design System: OlaOlu. — Personal Research Institution

## Overview

**Creative North Star: "The Monument-Scale Thesis"**

A white gallery wall, one enormous serif word at a time. The site treats each company name, each paper, each essay as a monument carved in near-black ink on a white field — big enough to read at a glance, quiet enough that the visitor's only task is choosing which monument to walk toward. Depth is never rendered with shadows; it is rendered with *blur* — the hovered name snaps into focus while its siblings fall out of it, the preloader blooms from blur into clarity, and the page itself resolves from soft fog on load.

The visual world is deliberately minimal in chrome: no cards, no buttons, no colored surfaces — white paper, black ink, one hairline divider, a crosshair cursor that says "this whole page is a target." Motion is a first-class material: every transition uses the same easeOutCubic language, and the image preview that rides alongside project hover is the site's signature trick. Typography is the entire interface.

**Key Characteristics:**
- Monument-scale uppercase serif display type (up to 28vw on the hero wordmark)
- White paper / near-black ink, with gray reserved for meta-labels and hairlines
- Blur is the depth language — hover, preloader, and page reveal all use it
- No border radius anywhere; sharp, uncompromising edges
- Crosshair cursor on every interactive element
- Image previews float at the bottom-right on project hover; siblings blur

## Colors

One field, one ink, and grays that step down quietly for meta content. Accent color is nearly absent — the only chromatic moments are the two signal colors used for the Education (green) and Research (red) project wordmarks.

### Primary
- **Ink** (#171717): the single text color for all headings, wordmarks, and body copy. Near-black, slightly warm against pure white.

### Neutral
- **Paper** (#ffffff): the background. Pure white, never tinted.
- **Soft Ink** (#4b5563): secondary copy — research/essay descriptions, reading text.
- **Muted Ink** (#737373): meta labels — years, section eyebrows, topic tags at rest.
- **Dim Ink** (#9ca3af): the faintest text — hero micro-labels, newsletter suffix, clock.
- **Hairline** (#e5e7eb): the only border — bottom rules under papers/essays and the projects divider.
- **Void** (#000000): preloader overlay and its giant wordmark.

### Tertiary
- **Signal Green** (#00ff00): reserved exclusively for the Education project wordmark.
- **Signal Red** (#ff0000): reserved exclusively for the Research project wordmark.

### Named Rules
**The Rarity Rule.** Color appears only where meaning demands it. Green and red exist solely to make the two non-company projects read differently from the four company monuments. Any third use dilutes the signal.

## Typography

**Display Font:** pr (locally hosted woff2, with serif fallback)
**Body Font:** sc (locally hosted woff2, with sans-serif fallback)

**Character:** The pairing is a museum placard meeting a manifesto: a high-contrast serif set at monumental, tightly-tracked uppercase for everything that matters, and a plain sans for everything that explains. The sans never competes — it is small, uppercase, letterspaced, or gray.

### Hierarchy
- **Display** (400, `clamp(1rem, 1rem + 6vw, 7rem)` up to 28vw on the wordmark, line-height 0.7–0.8, tracking −0.08em): the hero wordmark and project names. Set in uppercase, always. This is the voice of the site.
- **Headline** (400, `calc(1rem + 3–5vw)`, line-height 0.9): page titles (Research, Writing) and the About heading.
- **Title** (400, 20–26px, line-height 1.1): paper and essay titles.
- **Thesis** (400, 18px mobile / 22px desktop, line-height 1.1): the hero statement paragraph.
- **Body** (400, 15px, line-height 1.6; About copy at 17–19px): running prose, max line length ~2xl (672px).
- **Agenda line** (400, italic, 18px mobile / 22px desktop, line-height 1.5): the Research page's topic list, set as one serif sentence in the thesis voice.
- **Description** (400, 14px, line-height 1.6): paper and essay descriptions.
- **Label** (400, 11–12px, uppercase, tracking 0.08–0.15em): section eyebrows, years, meta.
- **Micro** (400, 11px, uppercase, tracking 0.08em): nav links and the hero's corner labels. The smallest voice, used for wayfinding.

### Named Rules
**The One-Voice Rule.** Only the serif speaks loudly. Any text that must be quiet is set in the sans, in gray, in uppercase, or all three. When in doubt, make it smaller and grayer.

## Layout

A single centered column on every surface. Content constrains to `max-w-3xl` (768px) and breathes with generous vertical rhythm — sections pad 96px vertically on mobile and 144px on desktop, side gutters 24px on mobile and 40px on desktop. The hero is a full-viewport flex stack: micro-labels pinned top, thesis centered, the giant wordmark anchoring the bottom. Lists (projects, papers, essays) are single-column stacks separated by hairlines or rhythm, never cards. The projects section is the one exception to the column: its wordmarks sit center-page, with the hovered project's image floating bottom-right, fixed to the viewport.

## Elevation & Depth

The system is flat by doctrine — zero shadows anywhere. Depth is conveyed exclusively through blur and motion: siblings blur while the hovered project stays sharp; the preloader and page reveal animate from blur to clarity; the fixed project image floats above the page as the only layered element. The image preview is the single sanctioned exception to the flat rule.

## Shapes

Everything is square. No border radius, no rounded corners, no pill shapes — the radius vocabulary is exactly one value: 0. Dividers are 1px hairlines in gray-200. This is a deliberate anti-softness stance; the only curves in the system come from the serif's own anatomy.

## Components

### Logo
- Fixed top-left, "OlaOlu." in the body sans (15px). Blur-on-hover. The period is part of the mark — never drop it.

### Nav Links
- Uppercase 10px sans, tight tracking (0.08em), stacked right-aligned in the hero.
- **Hover:** blurs 2px (the `lnk-blr-hvr` signature).
- **Focus:** 2px ink outline, offset 2px.

### Project Link (the signature component)
- The company name in monumental serif (`calc(1rem + 6vw)`), uppercase, centered, line-height 0.8.
- **Hover (desktop):** siblings blur 2px, hovered name snaps sharp, and a large image preview fades in fixed at bottom-right. The preview is non-interactive (`pointer-events: none`) on every breakpoint so it never blocks taps. Cursor stays crosshair everywhere — links included; the whole page is a target.
- **Mobile:** scroll-driven — the name nearest viewport center is sharp, the rest stay blurred, and its image preview appears bottom-right (matched via the same `data-for` lookup as desktop).
- Chromatic variants: Education renders green (#00ff00), Research red (#ff0000).

### Paper / Essay List Item
- Full-width row with a bottom hairline; padding 24px vertical. The entire row is one link (blur-on-hover).
- Title in serif (20–26px) with the year right-aligned as a 12px uppercase gray label on desktop; stacked on mobile.
- Description in 14px soft-ink, max-width 2xl.

### 404 Page
- A monument-world dead end: giant serif "404" that starts blurred and snaps sharp on hover (the inverse of the blur-on-hover signature — the missing page comes into focus when you look at it). "This page fell out of focus." plus a blur-on-hover link home. Sharp under reduced motion.

### Preloader
- Void-black full-viewport overlay. A giant white "OlaOlu." blooms in (blur 10→0, 20px rise), a 150px project thumbnail cycles bottom-right every 150ms, then everything fades back out. Runs once per session; skipped entirely under reduced motion.

### Footer
- Flex row, name left, email link right, 15px sans. Blur-on-hover on the link.
- Shared across every page via the `SiteFooter` component, so subpages always have a way home and a contact exit.

## Do's and Don'ts

### Do:
- **Do** set every project name in the giant serif — the monument scale is the brand.
- **Do** use blur for all depth and state changes; it is the system's material.
- **Do** keep backgrounds pure white and text near-black; gray is for meta only.
- **Do** use the crosshair cursor as the default pointer.
- **Do** keep hairline dividers as the only separators — never cards or boxes.
- **Do** link every project to its live site; the work speaks for itself.

### Don't:
- **Don't** add border radius, shadows, or colored surfaces — the system is flat and square.
- **Don't** use green or red anywhere except the Education and Research wordmarks (The Rarity Rule).
- **Don't** render two loud type voices at once; if the serif is present, everything else whispers.
- **Don't** introduce buttons, pills, or gradient text.
- **Don't** blur on hover for users with reduced motion — the media query must keep links readable.
- **Don't** drop the period from "OlaOlu."
