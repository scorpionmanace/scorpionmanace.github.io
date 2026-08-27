import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost';
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

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink border border-transparent hover:bg-accent-hover shadow-card',
  secondary:
    'bg-surface text-ink border border-line-strong hover:border-ink/40 hover:bg-raised shadow-card',
  ghost:
    'bg-transparent text-ink-soft border border-transparent hover:bg-sunken hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.8125rem] gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-[0.9375rem] gap-2.5',
};

/**
 * One button surface for the whole site. Renders as a router `Link`, an
 * external anchor, or a `<button>` depending on which prop is supplied.
 */
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
    'inline-flex items-center justify-center rounded-full font-medium',
    'transition-colors duration-200 select-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );

  const motionProps = disabled
    ? {}
    : { whileHover: { y: -2 }, whileTap: { y: 0, scale: 0.98 }, transition: { duration: 0.18 } };

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
