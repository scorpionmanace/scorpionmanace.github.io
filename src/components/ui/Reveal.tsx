import React from 'react';

/**
 * Structural wrappers kept for API compatibility.
 *
 * These used to fade-and-rise every section on scroll — the same entrance on
 * every block, which is the tell of an assembled page. Content now renders
 * visible and still; motion is spent only on the authored moments (the
 * multiplane hero, the arc, inked annotations, the ribbon bookmark).
 */

type BlockTag = 'div' | 'section' | 'ul' | 'header' | 'li' | 'article';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: BlockTag;
  /** Accepted for compatibility; no longer animates. */
  delay?: number;
  /** Accepted for compatibility; no longer animates. */
  stagger?: number;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className, as = 'div' }) => {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
};

export const Reveal: React.FC<WrapperProps> = (props) => <Wrapper {...props} />;
export const RevealGroup: React.FC<WrapperProps> = (props) => <Wrapper {...props} />;
export const RevealItem: React.FC<WrapperProps> = (props) => <Wrapper {...props} />;
