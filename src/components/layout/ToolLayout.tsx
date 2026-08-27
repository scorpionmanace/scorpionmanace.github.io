import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../design/motion';
import { cn } from '../ui/cn';
import Breadcrumbs from './Breadcrumbs';

interface ToolLayoutProps {
  title: string;
  description: string;
  /** Emoji or glyph shown in the title badge. */
  icon?: string;
  category?: string;
  /** Right-aligned controls (export buttons, mode switches…). */
  actions?: React.ReactNode;
  children: React.ReactNode;
  /** Let the tool paint its own full-width surface instead of a padded card. */
  bleed?: boolean;
}

/**
 * Shared chrome for every tool page.
 *
 * Tools previously each rolled their own heading, padding, and background,
 * which is why they looked like different products. They now all mount inside
 * this frame and only supply their working area.
 */
export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  icon,
  category,
  actions,
  children,
  bleed = false,
}) => (
  <div className="flex flex-1 flex-col bg-canvas">
    {/* Header band */}
    <div className="relative overflow-hidden border-b border-line bg-surface">
      <div className="grid-bg fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-content px-5 py-10 sm:px-8 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Tools', to: '/tools' },
              { label: category ? `${category} · ${title}` : title },
            ]}
          />

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="flex items-center gap-3 font-display text-4xl leading-tight tracking-[-0.015em] text-ink md:text-5xl">
                {icon && (
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas text-2xl shadow-card md:h-12 md:w-12"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                )}
                {title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>
            </div>
            {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
          </div>
        </motion.div>
      </div>
    </div>

    {/* Working area */}
    <motion.div
      className={cn('mx-auto w-full max-w-content flex-1 px-5 py-10 sm:px-8 md:py-14')}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12, ease }}
    >
      {bleed ? (
        children
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-raised">
          {children}
        </div>
      )}
    </motion.div>
  </div>
);

export default ToolLayout;
