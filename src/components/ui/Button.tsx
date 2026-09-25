import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'paper';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Router path. Takes precedence over `href`. */
  to?: string;
  /** External URL — rendered as a safe `_blank` anchor. */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

/*
 * Inked rectangles with the pad's condensed header lettering. `paper` is the
 * primary action when it sits on bookcloth.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-canvas border-[1.5px] border-ink hover:bg-accent hover:border-accent dark:text-canvas',
  secondary:
    'bg-transparent text-ink border-[1.5px] border-ink/70 hover:border-ink hover:bg-ink/[0.04]',
  ghost:
    'bg-transparent text-ink border-[1.5px] border-transparent underline decoration-ink/30 decoration-1 underline-offset-4 hover:decoration-ink',
  paper:
    'bg-cloth-ink text-cloth border-[1.5px] border-cloth-ink hover:bg-transparent hover:text-cloth-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.95rem] gap-1.5',
  md: 'h-11 px-5 text-[1.0625rem] gap-2',
  lg: 'h-[3.25rem] px-6 text-[1.1875rem] gap-2.5',
};

export const Button: React.FC<BaseProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  ...rest
}) => {
  const classes = cn(
    'inline-flex items-center justify-center rounded-[4px] font-display font-[720] uppercase tracking-[0.04em]',
    'transition-colors duration-200 select-none',
    'disabled:cursor-not-allowed disabled:opacity-45',
    variants[variant],
    sizes[size],
    className,
  );

  // A pressed key, not a floating card: it sinks on press rather than lifting.
  const motionProps = disabled
    ? {}
    : { whileTap: { y: 1.5, scale: 0.99 }, transition: { type: 'spring' as const, stiffness: 700, damping: 30 } };

  if (to) {
    return (
      <motion.span className="inline-flex" {...motionProps}>
        <Link to={to} className={classes} {...rest}>
          {children}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    return (
      <motion.span className="inline-flex" {...motionProps}>
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      </motion.span>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
