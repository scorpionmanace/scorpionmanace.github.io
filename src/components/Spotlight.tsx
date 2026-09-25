import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { Tape } from './notebook/Tape';
import { InkArrow } from './notebook/Ink';
import { useMultiplane } from './notebook/useMultiplane';
import { cn } from './ui/cn';

const { spotlight } = resumeData;

/** Platform marks, drawn in the same stroke as the icon set. */
const SurfaceIcon: React.FC<{ name: string }> = ({ name }) => {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'Desktop') {
    return (
      <svg {...common}>
        <rect x="2.5" y="4" width="19" height="12.5" rx="1.5" />
        <path d="M8 20.5h8M12 16.5v4" />
      </svg>
    );
  }

  if (name === 'Web') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
};

/** A ruled index card: red header line, pale blue ruling below. */
const IndexCard: React.FC<{
  period: string;
  phase: string;
  detail: string;
  current: boolean;
  tilt: number;
}> = ({ period, phase, detail, current, tilt }) => (
  <div
    className="relative bg-print px-5 pb-6 pt-4 text-[#2a2f3a] shadow-float"
    style={{
      rotate: `${tilt}deg`,
      backgroundImage:
        'linear-gradient(to bottom, transparent 3.1rem, rgb(179 38 30 / 0.55) 3.1rem, rgb(179 38 30 / 0.55) calc(3.1rem + 1.5px), transparent calc(3.1rem + 1.5px)), repeating-linear-gradient(to bottom, transparent 0 1.7rem, rgb(80 120 200 / 0.22) 1.7rem calc(1.7rem + 1px))',
      backgroundPosition: '0 0, 0 3.35rem',
    }}
  >
    <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" />
    <div className="flex h-[2.4rem] items-end justify-between">
      <h3 className="font-display text-[2rem] font-[800] uppercase leading-none tracking-[0.01em] text-[#1a2150]">
        {current ? <span className="highlight">{phase}</span> : phase}
      </h3>
      <span className="hand text-[1.15rem] text-[#525a50]">{period}</span>
    </div>
    <p className="mt-6 text-[1.0625rem] leading-[1.7rem] text-[#2e3340]">{detail}</p>
  </div>
);

/**
 * Current work — Amazon Quick — as the last step of a three-card arc,
 * pinned to the cloth. Each card rides its own parallax depth.
 */
export const Spotlight: React.FC<{ tone?: 'canvas' | 'surface' | 'cloth' }> = () => {
  const { ref, plane } = useMultiplane<HTMLDivElement>();
  const depths = [plane(0.6, 110), plane(1.3, 110), plane(2.1, 110)];
  const insertY = plane(0.25, 110);

  return (
    <Section
      tone="cloth"
      id="agentic-ai"
      eyebrow="currently"
      title="Building agentic AI at AWS"
      lede={spotlight.summary}
      className="pb-32 md:pb-44"
    >
      <div ref={ref}>
        {/* The spec insert */}
        <motion.div style={{ y: insertY }} className="relative bg-canvas p-6 text-ink-soft shadow-float md:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="font-display text-[2.6rem] font-[800] leading-none text-ink">
                {spotlight.product}
              </h3>
              <p className="mt-2 text-[1.0625rem] text-muted">{spotlight.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {spotlight.links.map((link, index) => (
                <Button
                  key={link.url}
                  href={link.url}
                  variant={index === 0 ? 'primary' : 'secondary'}
                  size="md"
                >
                  {link.label}
                  <Icon name="external" />
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 border-t border-line pt-7 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h4 className="text-[1.0625rem] font-semibold text-ink">Shipping on four surfaces</h4>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                {spotlight.surfaces.map((surface) => (
                  <li key={surface.name} className="flex items-center gap-3">
                    <span className="text-accent">
                      <SurfaceIcon name={surface.name} />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{surface.name}</span>
                      <span className="block text-sm text-faint">{surface.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[1.0625rem] font-semibold text-ink">Six products under one roof</h4>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                {spotlight.components.join(' · ')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* The arc, pinned to the cloth at three depths */}
        <div className="mt-16 flex items-end gap-3 md:mt-20">
          <p className="hand text-[1.4rem] text-cloth-muted">How I got here</p>
          <InkArrow className="h-10 w-16" tone="cloth" delay={0.2} />
        </div>
        <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {spotlight.arc.map((step, index) => (
            <motion.li key={step.phase} style={{ y: depths[index] }} className={cn(index === 1 && 'md:mt-10', index === 2 && 'md:mt-4')}>
              <IndexCard
                period={step.period}
                phase={step.phase}
                detail={step.detail}
                current={index === spotlight.arc.length - 1}
                tilt={[-1.6, 1.2, -0.8][index] ?? 0}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Spotlight;
