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

## Troubleshooting

**Styles look missing locally.** Tailwind is configured CSS-first in
`src/index.css`; there is no `tailwind.config.js`. Two things have caused a
seemingly unstyled page before:

- A `"postcss"` key in `package.json`. `postcss-load-config` prefers it over
  `postcss.config.js`, which silently disables the Tailwind plugin so
  `@tailwind` directives ship verbatim. Do not reintroduce it.
- A stale Vite cache after dependency changes — `rm -rf node_modules/.vite`.

To confirm the pipeline is healthy, build and grep the output for a utility:

```bash
npm run build && grep -c 'mx-auto' dist/assets/*.css   # expect 1, not 0
```

The service worker no longer registers on localhost, so `npm run preview` can
no longer serve you a stale cached bundle.

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

## Open source section

`/open-source` lists the libraries in `src/data/openSource.ts`. `tablez` has a
full guide at `/open-source/tablez` that doubles as its living documentation:

- `src/data/tablez/examples.ts` — the playground examples. Each renders the
  real published package against editable JSON config.
- `src/data/tablez/api.ts` — the prop reference tables.
- `src/components/tablez/TablezPlayground.tsx` — live preview, JSON editors,
  and a generated code snippet.

Examples marked `editable` must be pure JSON, because the editor round-trips
them through `JSON.parse`. A test enforces that, along with column keys
existing on the data and virtualized examples declaring a row height.

`src/types/tablez.d.ts` is a stopgap: tablez 1.0.0 ships no usable type
declarations. Fixed upstream in 1.0.1 — once that is published to npm, bump the
dependency and delete the file.

## Adding a tool

1. Add an entry to `src/data/tools.ts` — this is the single source of truth for
   the tools index, the home page's featured strip, and the footer.
2. Build the view and wrap it in `ToolLayout`.
3. Register the route in `src/App.tsx`.
4. Add the path to `public/sitemap.xml`, `public/robots.txt`, and `ROUTES` in
   `scripts/prerender-routes.mjs`.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.

Pages is configured to publish the workflow artifact (`build_type: workflow`),
not the branch contents — pointing it back at a branch would serve the
unbuilt source `index.html`.

GitHub Pages has no SPA rewrite, so `scripts/prerender-routes.mjs` (wired to
`postbuild`) writes a real `dist/<route>/index.html` for every known route.
That matters: the common `404.html` trick renders the page but responds with a
404 status, which search engines will not index. `404.html` is still emitted as
the catch-all for unknown paths.

When you add a route, add it to `ROUTES` in that script — a test fails if it
drifts from `sitemap.xml` or the tool registry.
