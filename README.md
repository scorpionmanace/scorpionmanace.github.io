# scorpionmanace.github.io

Personal site of **Karan Khare** — portfolio, résumé, and a set of developer tools
that run entirely in the browser.

Live at <https://scorpionmanace.github.io>.

## Stack

| Concern    | Choice                                                |
| ---------- | ----------------------------------------------------- |
| Framework  | React 18 + TypeScript                                 |
| Build      | Vite 6                                                |
| Styling    | Tailwind CSS v4 (CSS-first config in `src/index.css`) |
| Motion     | Framer Motion                                         |
| Routing    | React Router (`BrowserRouter`)                        |
| Tests      | Vitest + Testing Library                              |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5175
```

Other scripts:

```bash
npm run build      # production build into dist/ (also writes 404.html)
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
npm test           # vitest run
```

## Design system

Theming is token-driven. Raw values live on `:root` / `.dark` in `src/index.css`
and are mapped into Tailwind utilities through the `@theme` block, so
`bg-surface`, `text-muted`, `border-line`, and friends flip with the theme
automatically. Dark mode is a `.dark` class on `<html>`, applied before first
paint by an inline script in `index.html` to avoid a flash.

Shared motion values (easing curves, stagger and page-transition variants) live
in `src/design/motion.ts` so animations across the site read as one system.

`/component-lab` renders a living reference of the tokens, type scale, and
component primitives.

### Layout templates

Rather than each page inventing its own chrome, three templates cover everything:

- `components/ui/Section` — the standard content "area": eyebrow, title, lede,
  optional action, and a consistent max-width and vertical rhythm.
- `components/layout/ToolLayout` — the frame every tool page mounts inside
  (breadcrumbs, title block, actions, working surface).
- `components/layout/SiteHeader` / `SiteFooter` — global chrome.

## Adding a tool

1. Add an entry to `src/data/tools.ts` — this is the single source of truth for
   the tools index, the home page's featured strip, and the footer.
2. Build the view and wrap it in `ToolLayout`.
3. Register the route in `src/App.tsx`.
4. Add the path to `public/sitemap.xml` and `public/robots.txt`.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.

Because the app uses `BrowserRouter`, deep links depend on `dist/404.html` —
GitHub Pages serves it for unknown paths, and it is a copy of `index.html`. The
`postbuild` script creates it, so it exists for both CI and the manual
`./deploy.sh` path. Removing that step breaks every URL except `/`.
