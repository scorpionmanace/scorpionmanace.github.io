import { describe, expect, it } from 'vitest';
import { EXAMPLES, EXAMPLE_GROUPS, getExample } from '../examples';
import { API_SECTIONS, THEME_TOKENS } from '../api';

/**
 * The playground doubles as tablez's documentation, so these guard the
 * properties that make it trustworthy: examples must be uniquely addressable,
 * every editable example must survive a JSON round-trip (the editor parses
 * with JSON.parse), and columns must reference fields that exist in the data.
 */
describe('tablez examples', () => {
  it('has unique ids', () => {
    const ids = EXAMPLES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses declared groups', () => {
    const known = new Set<string>(EXAMPLE_GROUPS);
    EXAMPLES.forEach((e) => expect(known.has(e.group)).toBe(true));
  });

  it('resolves an example by id', () => {
    expect(getExample('basic')?.title).toBe('Basic table');
    expect(getExample('nope')).toBeUndefined();
  });

  it('survives the JSON round-trip the editor performs', () => {
    EXAMPLES.filter((e) => e.editable).forEach((example) => {
      const roundTrip = (value: unknown) => JSON.parse(JSON.stringify(value ?? {}));

      expect(roundTrip(example.columns), example.id).toEqual(example.columns);
      expect(roundTrip(example.settings ?? {}), example.id).toEqual(example.settings ?? {});
      // Data may be large; checking the first row is enough to catch functions.
      expect(roundTrip(example.data[0]), example.id).toEqual(example.data[0]);
    });
  });

  it('gives every column a key and a title', () => {
    EXAMPLES.forEach((example) => {
      (example.columns as Array<Record<string, unknown>>).forEach((column) => {
        expect(column.key, `${example.id}: missing key`).toBeTruthy();
        expect(column.title, `${example.id}: ${column.key} missing title`).toBeTruthy();
      });
    });
  });

  it('uses numeric column widths, which the resize maths requires', () => {
    EXAMPLES.forEach((example) => {
      (example.columns as Array<Record<string, unknown>>).forEach((column) => {
        if (column.width !== undefined) {
          expect(typeof column.width, `${example.id}: ${column.key}`).toBe('number');
        }
      });
    });
  });

  it('references fields that exist on the data, except for formula columns', () => {
    EXAMPLES.forEach((example) => {
      const first = example.data[0] as Record<string, unknown> | undefined;
      if (!first) return;

      (example.columns as Array<Record<string, unknown>>).forEach((column) => {
        if (column.formula) return; // computed, never stored on the row
        expect(
          Object.prototype.hasOwnProperty.call(first, column.key as string),
          `${example.id}: column "${column.key}" is not a field on the data`,
        ).toBe(true);
      });
    });
  });

  it('sets a row key wherever selection or virtualization needs one', () => {
    EXAMPLES.forEach((example) => {
      expect(example.rowSettings?.key, `${example.id} should set rowSettings.key`).toBeTruthy();
    });
  });

  it('pairs virtualization with a container height and row height', () => {
    EXAMPLES.filter((e) => e.settings?.virtualized).forEach((example) => {
      expect(example.settings?.containerHeight, example.id).toBeTypeOf('number');
      expect(example.rowSettings?.height, example.id).toBeTypeOf('number');
    });
  });
});

describe('tablez API reference', () => {
  it('has unique section ids', () => {
    const ids = API_SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('documents a name, type, and description for every row', () => {
    [...API_SECTIONS.flatMap((s) => s.rows), ...THEME_TOKENS].forEach((row) => {
      expect(row.name).toBeTruthy();
      expect(row.type).toBeTruthy();
      expect(row.description).toBeTruthy();
    });
  });
});
