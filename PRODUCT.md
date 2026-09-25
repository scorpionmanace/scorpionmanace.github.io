# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, all of whom decide in the first minute whether Karan is worth a conversation:

- **Hiring managers and recruiters** filling senior engineering leadership roles — Director of Engineering level and above. They skim, look for scope (teams led, products shipped, orgs grown), and judge credibility and taste quickly.
- **Engineering peers** evaluating his open-source work (tablez) and the browser tools, and his craft as a builder.
- **Potential collaborators and clients** considering working with him on a project or in an advisory capacity.

## Product Purpose

The personal site of Karan Khare: portfolio, résumé, open-source libraries with living documentation, and a set of free browser-based developer tools. Success is a visitor from any of the three audiences reaching out — or, for peers, adopting tablez or a tool — because the site made the case that he operates at engineering-leadership level.

## Positioning

**A leader who still builds.** Twelve years spanning storage, fintech, autonomous driving, education, e-commerce, and generative AI; has managed and grown engineering teams (led 9 engineers as SDM III, contributed to growing a data-engineering group from 4 to 20+ ICs); currently a core contributor to Amazon Quick, AWS's agentic AI workspace, across desktop, iOS, Android, and web — and still maintains real open-source libraries by hand. The leadership experience must read at Director of Engineering level or above, not as a senior IC's portfolio.

## Operating Context

Visitors arrive from LinkedIn, GitHub, npm, and direct links in outreach. Hiring audiences read the About/résumé page and may print or save it as PDF. Peers land on `/open-source/tablez` from npm/GitHub and use the live playground. Tool users arrive at individual tool routes and expect them to work immediately in the browser.

## Capabilities and Constraints

- Routes: `/` (home), `/about` (résumé, printable), `/open-source`, `/open-source/tablez` (guide + live playground rendering the real package), `/tools` and eight tool routes, `/component-lab`, 404.
- Hosted on GitHub Pages via the Actions workflow; each route is prerendered to a real `index.html` so deep links return 200.
- React 19, Vite, Tailwind CSS v4 (CSS-first tokens in `src/index.css`), Framer Motion. Light and dark themes.
- Résumé content lives in `src/data/resume.json` and drives Home, About, and the print/PDF output.
- The tools run entirely client-side; no data leaves the browser. That is a stated promise and must stay true.

## Brand Commitments

- Name: **Karan Khare** (never "Double K's Hub").
- Monogram "KK" is in use.
- Voice: first person, direct, specific; claims stay within what Karan has confirmed.

## Evidence on Hand

- Portrait: `src/assets/portrait.jpg` (hero), `src/assets/portrait-sm.jpg` (avatar); original `display.jpg` (untracked).
- Résumé: `src/data/resume.json` — five roles (Amazon ×3, Nio, DellEMC), skills with proficiency tiers, three degrees (BU Questrom MBA 2022, SJSU MS CS 2015, Amity B.Tech 2012), three publications (IEEE BigData 2015; ACIJ 2013; SIPIJ 2013).
- Current work: Amazon Quick (launched as Amazon Quick Suite, Oct 2025) and Quick Desktop — https://aws.amazon.com/quick/, https://aws.amazon.com/quick/desktop/.
- Open source: `@scorpionmanace/tablez` v1.0.0 on npm; repo github.com/scorpionmanace/tablez.
- Social card: `public/og-image.jpg`.
- **Absent — do not fabricate:** testimonials, client logos, press, metrics beyond those in resume.json, reporting-line titles beyond those listed.

## Product Principles

1. **Leadership first, craft as proof.** Scope and outcomes lead; the hands-on work demonstrates he still builds.
2. **A person, not a template.** The site should carry evidence of a specific life — the researcher, the MBA, the engineer — rather than generic portfolio patterns.
3. **Everything shown works.** The playground renders the real library; the tools really run. No mockups standing in for function.
4. **Say only what is confirmed.** No invented claims, numbers, or titles.

## Accessibility & Inclusion

No product-specific requirement established beyond WCAG AA contrast, keyboard access, and honoring `prefers-reduced-motion` — which matters here because parallax is planned.
