import { describe, expect, it } from 'vitest';
import { TOOLS, TOOL_CATEGORIES, getToolByRoute } from '../tools';

describe('tool catalogue', () => {
  it('has unique ids', () => {
    const ids = TOOLS.map((tool) => tool.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique routes for every shipped tool', () => {
    const routes = TOOLS.filter((tool) => tool.route !== '#').map((tool) => tool.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('only uses categories the filter bar can display', () => {
    const known = new Set<string>(TOOL_CATEGORIES);
    TOOLS.forEach((tool) => expect(known.has(tool.category)).toBe(true));
  });

  it('marks planned tools with the placeholder route so they render as non-links', () => {
    TOOLS.filter((tool) => tool.status === 'planned').forEach((tool) => {
      expect(tool.route).toBe('#');
    });
  });

  it('never features a tool that is not shipped', () => {
    TOOLS.filter((tool) => tool.featured).forEach((tool) => {
      expect(tool.status).toBe('live');
    });
  });

  it('resolves a tool from its route', () => {
    expect(getToolByRoute('/json-parser')?.name).toBe('JSON Parser');
    expect(getToolByRoute('/nope')).toBeUndefined();
  });
});
