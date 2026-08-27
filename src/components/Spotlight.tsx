import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import { Section } from './ui/Section';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';
import { ease } from '../design/motion';

const { spotlight } = resumeData;

/**
 * Featured current work — Amazon Quick — framed as the end of a three-step
 * arc, so the agentic-AI work reads as a progression rather than a job title.
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
      <a
        href={spotlight.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-3xl border border-line bg-canvas p-7 transition-colors hover:border-line-strong md:p-10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas font-mono text-lg text-accent"
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

            <ul className="mt-7 flex flex-wrap gap-1.5">
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

          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
            View on AWS
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </div>
      </a>
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
