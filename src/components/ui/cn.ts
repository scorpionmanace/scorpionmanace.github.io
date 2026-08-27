/** Tiny classname joiner — avoids pulling in clsx for a one-liner. */
export const cn = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');
