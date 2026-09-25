import React from 'react';
import { OPEN_SOURCE } from '../data/openSource';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { PageHead } from '../components/notebook/PageHead';
import { Tape } from '../components/notebook/Tape';

const OpenSource: React.FC = () => (
  <div className="flex flex-1 flex-col bg-canvas">
    <PageHead
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Open source' }]}
      folio="Appendix"
      note="the work I do in public"
      title="Open source"
      lede="Libraries I maintain in the open. Each ships with a guide and a live playground on this site, so the documentation runs the same code you would install."
    />

    <Section tone="surface" divider>
      <ol className="flex flex-col gap-16">
        {OPEN_SOURCE.map((project, index) => (
          <li key={project.id} className="relative" style={{ rotate: index % 2 ? '0.5deg' : '-0.5deg' }}>
            <Tape className="-top-3 left-10 -rotate-3" />
            <Tape className="-top-3 right-12 rotate-3" />
            <article className="bg-raised px-6 pb-8 pt-9 shadow-raised md:px-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="font-display text-[3.4rem] font-[820] leading-none text-ink">
                      {project.name}
                    </h2>
                    {project.pkg && <code className="font-mono text-[0.9rem] text-accent">{project.pkg}</code>}
                  </div>

                  <p className="mt-5 text-[1.25rem] leading-snug text-ink">{project.tagline}</p>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{project.description}</p>
                  <p className="mt-5 text-[1rem] text-muted">{project.highlights.join(' · ')}</p>
                </div>

                <dl className="grid shrink-0 grid-cols-3 gap-6 self-start lg:grid-cols-1 lg:gap-4 lg:text-right">
                  {[
                    { label: 'Version', value: project.version ? `v${project.version}` : '—' },
                    { label: 'License', value: project.license },
                    { label: 'Status', value: project.status },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className="eyebrow">{item.label}</dt>
                      <dd className="hand mt-0.5 text-[1.3rem] capitalize text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-dashed border-line-strong pt-6">
                {project.route && (
                  <Button to={project.route}>
                    Guide &amp; playground
                    <Icon name="arrowRight" />
                  </Button>
                )}
                <Button href={project.repo} variant="secondary">
                  GitHub
                  <Icon name="external" />
                </Button>
                {project.npm && (
                  <Button href={project.npm} variant="secondary">
                    npm
                    <Icon name="external" />
                  </Button>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <p className="hand mt-14 text-[1.3rem] text-muted">
        More to come. Found a bug? An issue on the repository is the fastest route to a fix.
      </p>
    </Section>
  </div>
);

export default OpenSource;
