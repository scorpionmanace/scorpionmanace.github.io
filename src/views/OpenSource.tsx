import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OPEN_SOURCE } from '../data/openSource';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ease } from '../design/motion';

const OpenSource: React.FC = () => (
  <div className="flex flex-1 flex-col bg-canvas">
    {/* Page header */}
    <div className="relative overflow-hidden border-b border-line bg-surface">
      <div className="grid-bg fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-content px-5 py-12 sm:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Open source' }]} />

          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] tracking-[-0.02em] text-ink md:text-6xl">
            Open source
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Libraries I maintain in the open. Each one ships with a guide and a live playground on
            this site, so the documentation is exercised by the same code you would install.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Projects */}
    <Section tone="canvas">
      <RevealGroup as="ul" className="flex flex-col gap-6" stagger={0.08}>
        {OPEN_SOURCE.map((project) => (
          <RevealItem as="li" key={project.id}>
            <article className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="p-7 md:p-9">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-3xl tracking-[-0.01em] text-ink">
                        {project.name}
                      </h2>
                      <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                        {project.status}
                      </span>
                      {project.version && (
                        <span className="font-mono text-xs text-faint">v{project.version}</span>
                      )}
                    </div>

                    {project.pkg && (
                      <p className="mt-2 font-mono text-[0.8125rem] text-accent">{project.pkg}</p>
                    )}

                    <p className="mt-4 text-base leading-relaxed text-ink-soft">
                      {project.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="rounded-md bg-sunken px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-1 lg:gap-y-5">
                    {[
                      { label: 'License', value: project.license },
                      { label: 'Language', value: project.language },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="eyebrow">{item.label}</dt>
                        <dd className="mt-1.5 text-sm text-ink">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.route && (
                    <Button to={project.route}>
                      Guide &amp; playground
                      <span aria-hidden="true">→</span>
                    </Button>
                  )}
                  <Button href={project.repo} variant="secondary">
                    GitHub
                  </Button>
                  {project.npm && (
                    <Button href={project.npm} variant="secondary">
                      npm
                    </Button>
                  )}
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-10 text-sm text-faint">
        More to come. If you find a bug in any of these, an issue on the repository is the fastest
        route to a fix.
      </p>
    </Section>

    <Section tone="surface" divider>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="max-w-xl text-base leading-relaxed text-muted">
          Curious how these get built, or want to talk through a data-table problem of your own?
        </p>
        <div className="flex gap-2">
          <Link
            to="/about"
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-ink/40 hover:bg-canvas"
          >
            About me
          </Link>
          <Button href="https://www.linkedin.com/in/karankhare/">Get in touch</Button>
        </div>
      </div>
    </Section>
  </div>
);

export default OpenSource;
