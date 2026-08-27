import React from 'react';
import { motion } from 'framer-motion';
import { riseItem, staggerParent, viewportOnce } from '../../design/motion';
import { cn } from './cn';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before this element starts animating. */
  delay?: number;
  as?: 'div' | 'section' | 'ul' | 'header' | 'li';
}

/**
 * Scroll-triggered rise-and-fade. Fires once, so scrolling back up doesn't
 * re-trigger and make the page feel twitchy.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, as = 'div' }) => {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: riseItem.hidden,
        visible: {
          ...(riseItem.visible as object),
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Component>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'section';
}

/**
 * Wraps a list so its children animate in sequence. Children must be
 * `<RevealItem>` (or any motion element using the `hidden`/`visible` variants).
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = 'div',
}) => {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerParent(stagger, delay)}
    >
      {children}
    </Component>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}

export const RevealItem: React.FC<RevealItemProps> = ({ children, className, as = 'div' }) => {
  const Component = motion[as];
  return (
    <Component className={cn(className)} variants={riseItem}>
      {children}
    </Component>
  );
};
