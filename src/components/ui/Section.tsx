import React from 'react';
import { Reveal } from './Reveal';
import { cn } from './cn';

type Tone = 'canvas' | 'surface' | 'sunken';

interface SectionProps {
  children: React.ReactNode;
  /** Small mono label above the heading — the section's index marker. */
  eyebrow?: string;
  title?: React.ReactNode;
  /** Supporting sentence under the title. */
  lede?: React.ReactNode;
  /** Right-aligned slot beside the heading (a link, filter, button…). */
  action?: React.ReactNode;
  tone?: Tone;
  /** Draw a hairline across the top of the band. */
  divider?: boolean;
  id?: string;
  className?: string;
  contentClassName?: string;
  /** Narrow the inner column for long-form reading. */
  prose?: boolean;
}

const toneClass: Record<Tone, string> = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  sunken: 'bg-sunken',
};

/**
 * The standard "area" template. Every major block on the site — hero aside —
 * is a Section, so headings, rhythm, and max-widths stay identical across
 * Home, Tools, About, and each tool page.
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
}) => {
  const hasHeading = Boolean(eyebrow || title || lede || action);

  return (
    <section
      id={id}
      className={cn(
        'px-5 py-16 sm:px-8 md:py-24',
        toneClass[tone],
        divider && 'border-t border-line',
        className,
      )}
    >
      <div className={cn('mx-auto w-full', prose ? 'max-w-prose' : 'max-w-content')}>
        {hasHeading && (
          <Reveal className="mb-10 md:mb-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                {eyebrow && (
                  <span className="eyebrow flex items-center gap-3">
                    <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <h2 className="mt-4 font-display text-3xl leading-[1.12] tracking-[-0.01em] text-ink md:text-[2.75rem]">
                    {title}
                  </h2>
                )}
                {lede && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{lede}</p>}
              </div>
              {action && <div className="shrink-0">{action}</div>}
            </div>
          </Reveal>
        )}

        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
