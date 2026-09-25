import { useRef, useState } from 'react';
import { useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

/**
 * Multiplane parallax for one scene.
 *
 * Returns a ref for the scene and a `plane(depth)` factory. Depth is how far
 * the plane sits from the page: negative sits behind it and drifts down as
 * you scroll (so it appears to recede), positive sits in front and lifts
 * away faster. A little spring gives each plane mass, so planes settle
 * instead of tracking the scrollbar rigidly.
 */
export const useMultiplane = <T extends HTMLElement>(
  offset: ['start start' | 'start end', 'end start' | 'end end'] = ['start end', 'end start'],
  /**
   * Where planes sit at rest. 'center' suits mid-page scenes, which pass
   * through the viewport; 'start' suits the hero, which is already on screen
   * at load and must rest in its composed position there.
   */
  rest: 'center' | 'start' = 'center',
) => {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });

  /** Pixels a plane travels across the whole scroll range, per unit of depth. */
  // Only on wide screens, where the planes sit beside each other. Stacked on a
  // phone, the same drift pushes one plane into the next.
  const [wide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );
  // MotionConfig's reducedMotion does not reach scroll-bound style values, so
  // the preference is honoured here directly.
  const reduce = useReducedMotion();
  const moving = wide && !reduce;
  const scale = moving ? 1 : 0;

  const plane = (depth: number, travel = 90): MotionValue<number> =>
    useTransform(
      progress,
      [0, 1],
      rest === 'start'
        ? [0, depth * -travel * scale]
        : [depth * travel * 0.5 * scale, depth * -travel * 0.5 * scale],
    );

  /** A scroll-linked value that holds at `from` when planes are still. */
  const drift = <V extends number | string>(from: V, to: V): MotionValue<V> =>
    useTransform(progress, [0, 1], moving ? [from, to] : [from, from]);

  return { ref, progress, plane, drift, moving };
};
