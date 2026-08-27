import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import { Section } from './ui/Section';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';
import { ease } from '../design/motion';

const { spotlight } = resumeData;

/**
 * Surface marks. Drawn rather than set in type, because the box-drawing glyphs
 * this replaced read as decoration and told you nothing about the platform.
 */
const SurfaceIcon: React.FC<{ name: string }> = ({ name }) => {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'Desktop') {
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }

  if (name === 'Web') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
      </svg>
    );
  }

  // iOS and Android both read as handsets; the label disambiguates.
  return (
    <svg {...common}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
};

/**
 * Featured current work — Amazon Quick — framed as the end of a three-step
 * arc, so the agentic-AI work reads as a progression rather than a job title.
 * The surface strip carries the part that is easy to miss: it is one product
 * shipped across desktop, mobile, and web.
 */
export const Spotlight: React.FC<{ tone?: 'canvas' | 'surface' }> = ({ tone = 'canvas' }) => (
  <Section
    tone={tone}
    divider
    id="agentic-ai"
    eyebrow={spotlight.eyebrow}
    title={
      <>
        Building <span className="italic text-accent">agentic AI</span> at AWS
      </>
    }
    lede={spotlight.summary}
  >
    {/* Product card */}
    <Reveal>
      <div className="overflow-hidden rounded-3xl border border-line bg-canvas p-7 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface font-mono text-lg text-accent"
              aria-hidden="true"
            >
              ✦
            </span>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {spotlight.product}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{spotlight.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {spotlight.links.map((link, index) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium transition-colors ${
                  index === 0
                    ? 'bg-ink text-canvas hover:opacity-85'
                    : 'border border-line text-ink-soft hover:border-ink/40 hover:text-ink'
                }`}
              >
                {link.label}
                <span
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Surfaces */}
        <div className="mt-9 border-t border-line pt-7">
          <p className="eyebrow">Shipping on</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {spotlight.surfaces.map((surface) => (
              <li
                key={surface.name}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
              >
                <span className="shrink-0 text-accent">
                  <SurfaceIcon name={surface.name} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{surface.name}</span>
                  <span className="block font-mono text-[0.6875rem] text-faint">
                    {surface.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Components */}
        <div className="mt-7">
          <p className="eyebrow">Component suite</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {spotlight.components.map((component) => (
              <li
                key={component}
                className="rounded-md bg-sunken px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
              >
                {component}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>

    {/* The arc */}
    <RevealGroup as="ul" className="mt-5 grid gap-5 md:grid-cols-3" stagger={0.09}>
      {spotlight.arc.map((step, index) => {
        const isCurrent = index === spotlight.arc.length - 1;

        return (
          <RevealItem as="li" key={step.phase}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-6 md:p-7 ${
                isCurrent ? 'border-accent/40 bg-accent-soft' : 'border-line bg-canvas'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-xs text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-faint">{step.period}</span>
              </div>

              <h3
                className={`mt-4 font-display text-2xl tracking-[-0.01em] ${
                  isCurrent ? 'text-accent' : 'text-ink'
                }`}
              >
                {step.phase}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>

              {/* Connector between cards on wide screens */}
              {!isCurrent && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden h-px w-6 bg-line-strong md:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3, ease }}
                  style={{ originX: 0 }}
                />
              )}
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  </Section>
);

export default Spotlight;
