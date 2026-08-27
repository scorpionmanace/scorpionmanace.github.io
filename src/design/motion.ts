import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language.
 *
 * Everything on the site animates on the same two curves so transitions feel
 * like one system rather than a pile of independent effects:
 *  - `ease`     : confident, slightly overshoot-free deceleration for entrances
 *  - `easeSoft` : gentler curve for hovers and layout shifts
 */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.4, 0, 0.2, 1] as const;

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 34,
  mass: 0.9,
};

/** Parent that staggers its children in reading order. */
export const staggerParent = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Default child entrance: rise + fade. */
export const riseItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

/** Softer entrance for large surfaces, which look wrong travelling far. */
export const fadeItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

/** Route-level page transition. */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.22, ease: easeSoft },
  },
};

/** Viewport config shared by scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' } as const;
