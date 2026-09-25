import React from 'react';
import { cn } from './cn';

type Tone = 'canvas' | 'surface' | 'sunken' | 'cloth';

interface SectionProps {
  children: React.ReactNode;
  /**
   * A short handwritten note for the page margin. It sits beside the
   * heading in the gutter, never above it.
   */
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  /** Right-aligned slot beside the heading. */
  action?: React.ReactNode;
  tone?: Tone;
  /** Draw a hairline across the top of the band. */
  divider?: boolean;
  id?: string;
  className?: string;
  contentClassName?: string;
  /** Narrow the inner column for long-form reading. */
  prose?: boolean;
  /** Let the body span the margin column too (wide tables, spreads). */
  bleed?: boolean;
}

const toneClass: Record<Tone, string> = {
  canvas: 'bg-canvas grid-bg',
  surface: 'bg-surface paper',
  sunken: 'bg-sunken paper',
  cloth: 'cloth',
};

/**
 * One page of the notebook. Every major block on the site is a Section, so
 * the margin, ruling, and rhythm stay continuous from page to page: the red
 * margin rule runs unbroken down the left of every paper section.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  eyebrow,
  title,
  lede,
  action,
  tone = 'canvas',
  divider = false,
  id,
  className,
  contentClassName,
  prose = false,
  bleed = false,
}) => {
  const onCloth = tone === 'cloth';
  const hasHeading = Boolean(title || lede || action);

  return (
    <section
      id={id}
      className={cn(
        'relative px-5 py-16 sm:px-8 md:py-24',
        toneClass[tone],
        divider && !onCloth && 'border-t border-line',
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-content">
        {/* Margin rule — only on paper, and only where there is a margin. */}
        {!onCloth && (
          <span
            aria-hidden="true"
            className="margin-rule pointer-events-none absolute -top-16 -bottom-16 left-0 hidden w-[11.5rem] md:-top-24 md:-bottom-24 lg:block"
          />
        )}

        <div className={cn('lg:grid lg:grid-cols-[11.5rem_1fr] lg:gap-x-12 lg:pr-12 xl:pr-20')}>
          {/* Margin */}
          <div className="hidden lg:block">
            {eyebrow && (
              <p
                className={cn(
                  'hand mt-3 -rotate-3 pr-6 text-right text-lg leading-snug',
                  onCloth ? 'text-cloth-muted' : 'text-muted',
                )}
              >
                {eyebrow}
              </p>
            )}
          </div>

          <div className={cn('min-w-0', prose && 'max-w-prose', bleed && 'lg:col-span-2')}>
            {hasHeading && (
              <div
                className={cn(
                  'mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-14',
                  bleed && 'lg:ml-[calc(11.5rem+3rem)]',
                )}
              >
                <div className="max-w-2xl">
                  {title && (
                    <h2
                      className={cn(
                        'font-display text-[2.6rem] font-[760] leading-[0.95] tracking-[-0.005em] md:text-[3.5rem]',
                        onCloth ? 'text-cloth-ink' : 'text-ink',
                      )}
                    >
                      {title}
                    </h2>
                  )}
                  {lede && (
                    <p
                      className={cn(
                        'mt-5 max-w-[62ch] text-lg leading-relaxed',
                        onCloth ? 'text-cloth-muted' : 'text-muted',
                      )}
                    >
                      {lede}
                    </p>
                  )}
                </div>
                {action && <div className="shrink-0">{action}</div>}
              </div>
            )}

            <div className={contentClassName}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
