import React from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * The notebook's ribbon bookmark. It hangs from under the header and its
 * tail follows your reading position down the page. A spring gives it
 * weight, so it swings to a stop rather than snapping.
 */
export const ScrollProgress: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.9 });
  const length = useTransform(eased, [0, 1], ['3.5rem', '62vh']);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-[4.5rem] z-40 w-2.5 origin-top sm:w-3.5"
      style={{
        height: reduce ? '3.5rem' : length,
        // Hangs just off the notebook's outer edge rather than the window's
        // corner; on a phone it tucks into the page gutter.
        right: 'max(0.3rem, calc((100vw - 74rem) / 2 - 1.75rem))',
        background:
          'linear-gradient(90deg, rgb(0 0 0 / 0.18), transparent 35%, rgb(255 255 255 / 0.18) 55%, transparent 75%, rgb(0 0 0 / 0.14)), var(--ui-witness)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 9px), 0 100%)',
        filter: 'drop-shadow(0 3px 3px rgb(0 0 0 / 0.22))',
      }}
    />
  );
};

export default ScrollProgress;
