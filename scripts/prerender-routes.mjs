#!/usr/bin/env node
/**
 * Emit a real index.html for every known route.
 *
 * GitHub Pages has no SPA rewrite. The usual workaround — copying index.html
 * to 404.html — does make deep links render, but the response still carries a
 * 404 status, and search engines will not index a 404. Writing
 * dist/<route>/index.html means every URL in sitemap.xml resolves with a 200.
 *
 * 404.html is still produced as the catch-all for genuinely unknown paths.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/** Keep in sync with the routes in src/App.tsx and public/sitemap.xml. */
const ROUTES = [
  'about',
  'tools',
  'json-parser',
  'color-picker',
  'data-converter',
  'api-tester',
  'code-formatter',
  'code-playground',
  'component-lab',
  'chakra-ui', // legacy path; the app redirects it to /component-lab
];

const indexPath = join(dist, 'index.html');
const html = readFileSync(indexPath, 'utf8');

for (const route of ROUTES) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });

  // Point the canonical link at this route rather than the site root.
  const routeHtml = html.replace(
    /<link rel="canonical" href="https:\/\/scorpionmanace\.github\.io\/">/,
    `<link rel="canonical" href="https://scorpionmanace.github.io/${route}">`,
  );

  writeFileSync(join(dir, 'index.html'), routeHtml);
}

// Catch-all for paths not listed above.
copyFileSync(indexPath, join(dist, '404.html'));

console.log(`prerendered ${ROUTES.length} routes + 404.html`);
