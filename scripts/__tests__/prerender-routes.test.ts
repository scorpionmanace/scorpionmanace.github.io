import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { TOOLS } from '../../src/data/tools';

const read = (relative: string) => readFileSync(resolve(__dirname, '../..', relative), 'utf8');

/** Routes the prerender script emits a real 200 page for. */
const prerenderedRoutes = (): string[] => {
  const source = read('scripts/prerender-routes.mjs');
  const block = source.match(/const ROUTES = \[(.*?)\];/s);
  if (!block) throw new Error('Could not find ROUTES in prerender-routes.mjs');
  return Array.from(block[1].matchAll(/'([^']+)'/g)).map((match) => match[1]);
};

const sitemapRoutes = (): string[] =>
  Array.from(read('public/sitemap.xml').matchAll(/<loc>https:\/\/[^/]+\/([^<]*)<\/loc>/g))
    .map((match) => match[1])
    .filter(Boolean);

describe('prerendered routes', () => {
  it('covers every URL in the sitemap, so no indexed URL returns a 404 status', () => {
    const missing = sitemapRoutes().filter((route) => !prerenderedRoutes().includes(route));
    expect(missing).toEqual([]);
  });

  it('covers every shipped tool route', () => {
    const routes = prerenderedRoutes();
    const missing = TOOLS.filter((tool) => tool.route !== '#')
      .map((tool) => tool.route.replace(/^\//, ''))
      .filter((route) => !routes.includes(route));

    expect(missing).toEqual([]);
  });

  it('lists each route only once', () => {
    const routes = prerenderedRoutes();
    expect(new Set(routes).size).toBe(routes.length);
  });
});
