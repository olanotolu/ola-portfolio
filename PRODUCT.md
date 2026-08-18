# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** people evaluating Ola Aduloju as a founder/builder — potential co-founders, investors, employers, collaborators, and press. They arrive from LinkedIn, X/Twitter, his research or writing, and their job is to form a quick, sharp judgment: *who is this person, what does he build, and why should I engage?*
- **Secondary:** readers of the research papers and essays; clients and partners of his ventures (Concya, Ontitled, Unbehalf, Omposition).

## Product Purpose

OlaOlu. is a personal portfolio presented as a "research institution" — one surface that communicates Ola's thesis ("Build until the impossible becomes ordinary"), his companies and projects, his research agenda, and his writing. Success means the visitor leaves with a memorable, specific sense of the person and a reason to email, subscribe, or reach out.

## Positioning

A personal research institution rather than a conventional résumé portfolio: the site leads with an aphorism and a thesis, presents companies as one-word monuments, and treats research papers and essays as first-class output. The emphatic, gallery-like presentation (giant serif splash, crosshair cursor, blur-on-hover, image previews) is part of the pitch — it is the first proof of craft.

## Operating Context

- Home route is a one-pager: hero → About → Projects. Research and Writing are separate routes.
- Interaction language: hover a project name (desktop) to preview its image and blur the siblings; scroll (mobile) to highlight the nearest project; crosshair cursor throughout; session-only preloader; smooth scroll via Lenis; live NYC clock.
- External destinations: project company sites, papers on uninitial.com / concya.com, essays on X/Twitter, LinkedIn newsletter, email (subxmii@gmail.com).
- Deployed on Vercel at www.0la0lu.com; source repo olanotolu/ola-portfolio (main + gh-pages branches).

## Capabilities and Constraints

- Routes: `/` (home), `/research`, `/writing`.
- Projects (6): Concya, Unbehalf, Ontitled, Omposition (each links to its live site), Education (Jochi Labs, Harvard shield), Research (Newol).
- Research page: 10 topic tags + 3 papers. Writing page: 2 essays.
- Stack: Next.js 16.3.1 (App Router), React 19, Tailwind CSS v4, TypeScript, Lenis. Fonts are locally hosted woff2 ("pr" serif display, "sc" sans); project imagery under `/projects`.
- Content is hand-maintained data arrays in `app/` and `lib/`, not a CMS.
- [inferred] The site was rebuilt to mirror the look and feel of emelecollab.com; code comments treat that snapshot as the incumbent visual authority ("ponytail: ... matches original").
- [inferred] The featured four project names were renamed from case-study names (Xanvier Allison → Concya, Hilary Eden → Unbehalf, Jump Factory → Ontitled, Adcker → Omposition) in commit 2ccfed0.

## Brand Commitments

- Wordmark: **"OlaOlu."** — always with the trailing period.
- Tagline: "Increasing the surface area of possibility."
- Hero quote: "Build until the impossible becomes ordinary."
- Voice: bold, future-facing, aphoristic ("Things I'm trying to understand before they become companies.").
- [inferred from code] Visual commitments: white field, near-black ink (#171717), crosshair cursor, blur-on-hover links, giant uppercase serif display type.

## Evidence on Hand

- Live project sites (verified HTTP 200): concya.com, unbehalf.com, ontitled.com, omposition.com.
- Real papers: "The Emergence of Machine Labor Markets" (uninitial.com/markets), "JOHN DOE: Zero-Raw-Context AI Orchestration", "World Models for Hospitality" (concya.com/research/...).
- Real essays on X: "Before the Screen", "Held Hostage by Your Own Coherence".
- LinkedIn newsletter with "200+ subscribers" claimed in nav copy.
- Assets: `/projects/*.{jpg,png}`, `/fonts/pr.woff2`, `/fonts/sc.woff2`, `/harvard.svg`.
- Absences: no testimonials, résumé/CV, or press mentions — must not fabricate.

## Product Principles

1. **Lead with thesis, not biography.** The giant wordmark and aphorism set the frame before any detail.
2. **Work speaks in its own words.** Every project links out to its live site rather than being described in place.
3. **Research and writing are first-class outputs**, equal to projects.
4. **Restraint in chrome.** White page, black ink, one interaction language (blur-on-hover), no cards or button chrome beyond what content needs.
5. **The experience is the pitch.** Preloader, smooth scroll, and hover previews are the visitor's first proof of craft.

## Accessibility & Inclusion

- `prefers-reduced-motion` is honored: preloader skipped, blur/transform effects disabled.
- `:focus-visible` outlines and `.sr-only` labels exist.
- [inferred] Muted gray text (gray-400/500/600) on white is used for small labels; WCAG AA contrast for those sizes is unverified.
