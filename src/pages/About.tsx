import React from 'react';
import resumeData from '../data/resume.json';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PrintResumeButton } from '../components/ui/PrintResumeButton';
import { PageHead } from '../components/notebook/PageHead';
import { Tape } from '../components/notebook/Tape';
import { Icon } from '../components/ui/Icon';
import { Spotlight } from '../components/Spotlight';
import portraitSmall from '../assets/portrait-sm.jpg';
import { cn } from '../components/ui/cn';

type SkillLevel = 'expert' | 'proficient' | 'comfortable';

/** Filled pips out of three, so proficiency reads at a glance. */
const LEVEL_PIPS: Record<SkillLevel, number> = {
  expert: 3,
  proficient: 2,
  comfortable: 1,
};

const SkillPips: React.FC<{ level: SkillLevel }> = ({ level }) => (
  <span className="flex items-center gap-0.5" aria-hidden="true">
    {[0, 1, 2].map((pip) => (
      <span
        key={pip}
        className={cn(
          'h-1 w-1 rounded-full transition-colors',
          pip < LEVEL_PIPS[level] ? 'bg-accent' : 'bg-line-strong',
        )}
      />
    ))}
  </span>
);

const About: React.FC = () => {
  const { personal, experience, technicalSkills, education, publications } = resumeData;

  return (
    <div className="about-content flex flex-1 flex-col bg-canvas">
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        folio="Résumé"
        title={personal.name}
        lede={personal.summary}
        margin={
          <figure className="print relative rotate-[-3deg]">
            <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" />
            <img
              src={portraitSmall}
              alt={personal.name}
              width={320}
              height={320}
              className="block aspect-square w-full object-cover"
            />
          </figure>
        }
        aside={
          <div className="mt-8 flex items-center gap-4 lg:hidden">
            <img
              src={portraitSmall}
              alt=""
              width={320}
              height={320}
              className="print h-24 w-24 rotate-[-3deg] object-cover"
            />
          </div>
        }
        actions={
          <>
            <Button href={personal.linkedin}>
              LinkedIn
              <Icon name="external" />
            </Button>
            <PrintResumeButton />
          </>
        }
      />

      <Spotlight />

      {/* Experience — each role an entry, dated by hand in the margin */}
      <Section
        tone="surface"
        divider
        eyebrow="every role"
        title="Entries"
        lede="Front-end architecture and engineering leadership across storage, autonomous driving, financial systems, and now agentic AI."
        bleed
      >
        <ol className="flex flex-col">
          {experience.map((role, roleIndex) => (
            <li
              key={`${role.company}-${role.period}`}
              className="grid gap-2 border-t border-line py-9 lg:grid-cols-[11.5rem_1fr] lg:gap-12"
            >
              <p className="hand text-[1.25rem] leading-tight text-muted lg:pr-6 lg:text-right">
                {role.period.replace('Present', 'now')}
              </p>
              <article className="max-w-3xl">
                <h3 className="font-display text-[2rem] font-[760] leading-none text-ink md:text-[2.5rem]">
                  {role.title}
                </h3>
                <p className="mt-2 text-[1.0625rem] font-semibold text-accent">
                  {roleIndex === 0 ? (
                    <span className="highlight">{role.company}</span>
                  ) : (
                    role.company
                  )}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {role.achievements.map((achievement, index) => (
                    <li key={index} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-[0.72em] h-px w-3 shrink-0 bg-ink/50" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      {/* Skills — a ruled register, depth marked by filled dots */}
      <Section
        tone="canvas"
        divider
        eyebrow="the toolkit"
        title="What I work with"
        lede="Depth marked in three tiers — expert, proficient, comfortable — rather than a wall of logos."
      >
        <dl className="flex flex-col">
          {(technicalSkills as Array<{ category: string; skills: Array<{ name: string; level: SkillLevel }> }>).map(
            (group) => (
              <div
                key={group.category}
                className="grid gap-3 border-t border-line-strong/70 py-6 md:grid-cols-[13rem_1fr] md:gap-8"
              >
                <dt className="font-display text-[1.4rem] font-[760] leading-tight text-ink">
                  {group.category}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="inline-flex items-center gap-2 text-[1.0625rem] text-ink-soft"
                        title={`${skill.name} — ${skill.level}`}
                      >
                        {skill.name}
                        <SkillPips level={skill.level} />
                        <span className="sr-only">({skill.level})</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ),
          )}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-line-strong/70 pt-5 text-sm text-muted">
          {(['expert', 'proficient', 'comfortable'] as SkillLevel[]).map((level) => (
            <span key={level} className="inline-flex items-center gap-2 capitalize">
              <SkillPips level={level} />
              {level}
            </span>
          ))}
        </div>
      </Section>

      {/* Education & research */}
      <Section tone="surface" divider eyebrow="on file" title="Education & research">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Degrees</p>
            <ol className="mt-4 flex flex-col">
              {education.map((entry) => (
                <li key={entry.degree} className="border-t border-line py-5">
                  <p className="font-display text-[1.5rem] font-[740] leading-tight text-ink">{entry.degree}</p>
                  <p className="mt-1.5 text-[1.0625rem] text-ink-soft">{entry.school}</p>
                  <p className="hand mt-1 text-[1.1rem] text-muted">{entry.graduation}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="eyebrow">Publications</p>
            <ol className="mt-4 flex flex-col">
              {publications.map((entry) => (
                <li key={entry.title} className="border-t border-line py-5">
                  <p className="font-display text-[1.5rem] font-[740] leading-tight text-ink">
                    &ldquo;{entry.title}&rdquo;
                  </p>
                  <p className="mt-1.5 text-[1.0625rem] text-ink-soft">
                    {'conference' in entry ? entry.conference : entry.journal}
                  </p>
                  <p className="hand mt-1 text-[1.1rem] text-muted">{entry.year}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Close */}
      <Section tone="cloth" className="no-print">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-[2.8rem] font-[800] uppercase leading-[0.92] text-cloth-ink md:text-[3.6rem]">
              Let&rsquo;s talk about what you&rsquo;re building.
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-cloth-muted">
              Open to conversations about engineering leadership, agentic products, and front-end
              architecture.
            </p>
          </div>
          <Button href={personal.linkedin} size="lg" variant="paper">
            Reach out
            <Icon name="arrowRight" />
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default About;
