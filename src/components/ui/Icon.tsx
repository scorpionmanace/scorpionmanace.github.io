import React from 'react';
import { cn } from './cn';

/**
 * One stroke-drawn icon set, 24px grid, 1.75 stroke, round caps — drawn to
 * sit beside the pen marks rather than a UI kit. Replaces the unicode arrows
 * and symbols the site used to stand in for icons.
 */

const PATHS = {
  arrowRight: <path d="M4 12.2 C 9 11.6, 14 12.4, 19 12 M13.5 6.5 L 19.2 12 L 13.5 17.6" />,
  arrowDown: <path d="M12 4 C 11.6 9, 12.4 14, 12 19 M6.5 13.5 L 12 19.2 L 17.6 13.5" />,
  arrowUp: <path d="M12 20 C 12.4 15, 11.6 10, 12 5 M6.5 10.5 L 12 4.8 L 17.6 10.5" />,
  external: (
    <>
      <path d="M13.5 4.5 H 19.5 V 10.5" />
      <path d="M19.2 4.8 L 10.5 13.5" />
      <path d="M17.5 14 V 18.5 C 17.5 19 17 19.5 16.5 19.5 H 5.5 C 5 19.5 4.5 19 4.5 18.5 V 7.5 C 4.5 7 5 6.5 5.5 6.5 H 10" />
    </>
  ),
  close: <path d="M6 6.2 C 10 10, 14 14, 18 17.8 M17.8 6 C 14 10, 10 14, 6.2 18" />,
  search: (
    <>
      <path d="M10.5 4.5 C 14 4.4, 16.6 7, 16.5 10.6 C 16.4 14, 13.8 16.6 10.4 16.5 C 7 16.4, 4.4 13.8, 4.5 10.4 C 4.6 7.1, 7.1 4.6, 10.5 4.5 Z" />
      <path d="M15 15.2 L 19.6 19.6" />
    </>
  ),
  check: <path d="M4.5 12.8 C 6.5 14, 8 16, 9.6 18 C 12.2 12.6, 15.6 8.4, 19.8 5.2" />,
  alert: (
    <>
      <path d="M12 4.2 L 20.4 19.2 H 3.6 Z" />
      <path d="M12 10 V 13.6 M12 16.4 V 16.6" />
    </>
  ),
  sun: (
    <>
      <path d="M12 8.2 C 14.2 8.1, 15.9 9.8, 15.8 12 C 15.8 14.2, 14.1 15.9, 12 15.8 C 9.8 15.8, 8.1 14.1, 8.2 12 C 8.2 9.8, 9.9 8.2, 12 8.2 Z" />
      <path d="M12 3 V 5 M12 19 V 21 M3 12 H 5 M19 12 H 21 M5.6 5.6 L 7 7 M17 17 L 18.4 18.4 M5.6 18.4 L 7 17 M17 7 L 18.4 5.6" />
    </>
  ),
  moon: <path d="M19.5 14.6 C 18.4 15.1, 17.2 15.3, 16 15.3 C 11.8 15.3, 8.6 12.1, 8.6 7.9 C 8.6 6.6, 8.9 5.4, 9.5 4.3 C 6.1 5.4, 3.8 8.5, 3.8 12.1 C 3.8 16.7, 7.5 20.3, 12 20.3 C 15.4 20.3, 18.3 18.1, 19.5 14.6 Z" />,
  download: <path d="M12 4 V 15 M7.5 10.6 L 12 15.2 L 16.5 10.6 M5 19.5 H 19" />,
  upload: <path d="M12 16 V 5 M7.5 9.4 L 12 4.8 L 16.5 9.4 M5 19.5 H 19" />,
} as const;

export type IconName = keyof typeof PATHS;

export const Icon: React.FC<{ name: IconName; className?: string; label?: string }> = ({
  name,
  className,
  label,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('h-[1.05em] w-[1.05em] shrink-0', className)}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
  >
    {PATHS[name]}
  </svg>
);

export default Icon;
