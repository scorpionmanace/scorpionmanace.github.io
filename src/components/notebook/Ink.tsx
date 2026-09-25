import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '../ui/cn';

/**
 * Pen marks. Each path is drawn by hand-authored, slightly irregular
 * curves rather than geometric primitives, and inks itself in once when it
 * scrolls into view — the page's one recurring motion besides parallax.
 */

const pen = [0.65, 0, 0.35, 1] as const;

const drawn: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay, ease: pen },
      opacity: { duration: 0.01, delay },
    },
  }),
};

interface InkProps {
  className?: string;
  /** Seconds before the pen starts. */
  delay?: number;
  /** Stroke colour; defaults to the ink token. */
  /** `cloth` is for marks drawn on bookcloth, where ink would vanish. */
  tone?: 'ink' | 'witness' | 'accent' | 'cloth';
  strokeWidth?: number;
}

const toneClass = {
  ink: 'text-ink',
  witness: 'text-witness',
  accent: 'text-accent',
  cloth: 'text-cloth-muted',
};

const Svg: React.FC<
  InkProps & { viewBox: string; children: React.ReactNode; preserve?: string }
> = ({ className, tone = 'ink', viewBox, children, preserve }) => (
  <motion.svg
    viewBox={viewBox}
    preserveAspectRatio={preserve}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.6 }}
    className={cn('pointer-events-none overflow-visible', toneClass[tone], className)}
  >
    {children}
  </motion.svg>
);

/** A quick pen underline, stretched to the width it sits under. */
export const InkUnderline: React.FC<InkProps> = ({ delay = 0, strokeWidth = 2.4, ...rest }) => (
  <Svg {...rest} viewBox="0 0 200 14" preserve="none">
    <motion.path
      d="M3 9 C 38 4, 74 11, 112 7 S 176 3, 197 8"
      strokeWidth={strokeWidth}
      variants={drawn}
      custom={delay}
    />
  </Svg>
);

/** A loose loop around a word, the way you ring something in a margin. */
export const InkLoop: React.FC<InkProps> = ({ delay = 0, strokeWidth = 2, ...rest }) => (
  <Svg {...rest} viewBox="0 0 220 90" preserve="none">
    <motion.path
      d="M36 46 C 30 16, 176 4, 202 34 C 222 60, 84 88, 26 66 C 2 56, 22 26, 118 14"
      strokeWidth={strokeWidth}
      variants={drawn}
      custom={delay}
    />
  </Svg>
);

/** A curved arrow pointing right-and-down, head included. */
export const InkArrow: React.FC<InkProps & { flip?: boolean }> = ({
  delay = 0,
  strokeWidth = 2,
  flip = false,
  className,
  ...rest
}) => (
  <Svg {...rest} viewBox="0 0 130 70" className={cn(flip && '-scale-x-100', className)}>
    <motion.path
      d="M6 10 C 30 4, 70 6, 94 30 C 104 40, 108 50, 110 60"
      strokeWidth={strokeWidth}
      variants={drawn}
      custom={delay}
    />
    <motion.path
      d="M98 50 L 110 62 L 121 47"
      strokeWidth={strokeWidth}
      variants={drawn}
      custom={delay + 0.75}
    />
  </Svg>
);

/** A single tick — used for "done" in ledgers. */
export const InkTick: React.FC<InkProps> = ({ delay = 0, strokeWidth = 2.4, ...rest }) => (
  <Svg {...rest} viewBox="0 0 24 24">
    <motion.path
      d="M4 13 C 6 14, 8 17, 9.5 19 C 12 13, 16 8, 21 4"
      strokeWidth={strokeWidth}
      variants={drawn}
      custom={delay}
    />
  </Svg>
);
