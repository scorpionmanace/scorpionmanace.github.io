import React from 'react';
import Breadcrumbs, { type Crumb } from '../layout/Breadcrumbs';
import { cn } from '../ui/cn';

interface PageHeadProps {
  crumbs: Crumb[];
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Right side of the pre-printed header — a page reference. */
  folio?: string;
  /** Handwritten note for the margin. */
  note?: string;
  /** Anything else pinned in the margin (a taped print). Desktop only. */
  margin?: React.ReactNode;
  actions?: React.ReactNode;
  /** Extra content under the lede (a portrait, meta line…). */
  aside?: React.ReactNode;
  className?: string;
}

/**
 * The top of an inner page: the engineering pad's pre-printed header row
 * (breadcrumbs on the left, a folio on the right), then the entry title set
 * large in the condensed pad face.
 */
export const PageHead: React.FC<PageHeadProps> = ({
  crumbs,
  title,
  lede,
  folio,
  note,
  margin,
  actions,
  aside,
  className,
}) => (
  <header className={cn('grid-bg paper relative bg-canvas px-5 pb-14 pt-8 sm:px-8 md:pb-20 md:pt-10', className)}>
    <div className="relative mx-auto w-full max-w-content">
      <span
        aria-hidden="true"
        className="margin-rule pointer-events-none absolute -bottom-20 -top-10 left-0 hidden w-[11.5rem] lg:block"
      />
      <div className="lg:grid lg:grid-cols-[11.5rem_1fr] lg:gap-x-12 lg:pr-12 xl:pr-20">
        <div className="hidden lg:block">
          {note && (
            <p className="hand mt-24 -rotate-3 pr-6 text-right text-lg leading-snug text-muted">
              {note}
            </p>
          )}
          {margin && <div className="mt-16 pr-6">{margin}</div>}
        </div>

        <div>
          <div className="flex items-end justify-between gap-4 border-b-[1.5px] border-ink/70 pb-2">
            <Breadcrumbs items={crumbs} />
            {folio && (
              <span className="shrink-0 font-display text-[0.8125rem] font-[720] uppercase tracking-[0.12em] text-muted">
                {folio}
              </span>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-display text-[3.2rem] font-[820] uppercase leading-[0.9] tracking-[-0.005em] text-ink sm:text-[4.2rem] lg:text-[5rem]">
                {title}
              </h1>
              {lede && (
                <p className="mt-6 max-w-[60ch] text-[1.1875rem] leading-relaxed text-ink-soft">
                  {lede}
                </p>
              )}
              {aside}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default PageHead;
