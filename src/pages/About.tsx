import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PrintResumeButton } from '../components/ui/PrintResumeButton';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Spotlight } from '../components/Spotlight';
import { ease } from '../design/motion';
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
      {/* Header */}
      <div className="relative overflow-hidden border-b border-line bg-surface">
        <div className="grid-bg fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-content px-5 py-12 sm:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

            <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              <img
                src={portraitSmall}
                alt={personal.name}
                width={320}
                height={320}
                className="h-28 w-28 shrink-0 rounded-2xl border border-line object-cover shadow-card md:h-36 md:w-36"
              />

              <div className="min-w-0 flex-1">
                <h1 className="font-display text-4xl leading-[1.06] tracking-[-0.02em] text-ink md:text-6xl">
                  {personal.name}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                  {personal.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  <Button href={personal.linkedin}>LinkedIn</Button>
                  <PrintResumeButton />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Spotlight />

      {/* Experience */}
      <Section
        tone="surface"
        divider
        eyebrow="Experience"
        title="Twelve years of shipping"
        lede="Front-end architecture and engineering leadership across storage, autonomous driving, financial systems, and now agentic AI."
      >
        <RevealGroup as="ul" className="flex flex-col" stagger={0.08}>
          {experience.map((role) => (
            <RevealItem as="li" key={`${role.company}-${role.period}`}>
              <article className="grid gap-4 border-t border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10 md:py-10">
                <div className="md:pt-1.5">
                  <p className="font-mono text-xs tracking-wide text-faint">{role.period}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{role.company}</p>

                  <ul className="mt-5 flex flex-col gap-3">
                    {role.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Skills */}
      <Section
        tone="canvas"
        divider
        eyebrow="Toolkit"
        title="What I work with"
        lede="Depth is marked in three tiers — expert, proficient, and comfortable — rather than a flat wall of logos."
      >
        <RevealGroup className="grid gap-5 md:grid-cols-2" stagger={0.07}>
          {(technicalSkills as Array<{ category: string; skills: Array<{ name: string; level: SkillLevel }> }>).map(
            (group) => (
              <RevealItem key={group.category}>
                <div className="h-full rounded-2xl border border-line bg-canvas p-6 md:p-7">
                  <h3 className="eyebrow">{group.category}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[0.8125rem] text-ink-soft"
                        title={`${skill.name} — ${skill.level}`}
                      >
                        {skill.name}
                        <SkillPips level={skill.level} />
                        <span className="sr-only">{skill.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ),
          )}
        </RevealGroup>

        <Reveal className="mt-8" delay={0.1}>
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted">
            {(['expert', 'proficient', 'comfortable'] as SkillLevel[]).map((level) => (
              <span key={level} className="inline-flex items-center gap-2 capitalize">
                <SkillPips level={level} />
                {level}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Education & publications */}
      <Section tone="surface" divider eyebrow="Background" title="Education & research">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="eyebrow">Education</h3>
            <RevealGroup as="ul" className="mt-6 flex flex-col" stagger={0.07}>
              {education.map((entry) => (
                <RevealItem as="li" key={entry.degree}>
                  <div className="border-t border-line py-6">
                    <p className="text-base font-semibold tracking-tight text-ink">{entry.degree}</p>
                    <p className="mt-1.5 text-sm text-muted">{entry.school}</p>
                    <p className="mt-2 font-mono text-xs text-faint">{entry.graduation}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div>
            <h3 className="eyebrow">Publications</h3>
            <RevealGroup as="ul" className="mt-6 flex flex-col" stagger={0.07}>
              {publications.map((entry) => (
                <RevealItem as="li" key={entry.title}>
                  <div className="border-t border-line py-6">
                    <p className="text-base font-semibold leading-snug tracking-tight text-ink">
                      {entry.title}
                    </p>
                    <p className="mt-1.5 text-sm text-muted">
                      {'conference' in entry ? entry.conference : entry.journal}
                    </p>
                    <p className="mt-2 font-mono text-xs text-faint">{entry.year}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="surface" divider>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-line bg-canvas px-6 py-12 md:flex-row md:items-center md:px-12">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl leading-snug tracking-[-0.01em] text-ink md:text-4xl">
                Let&rsquo;s talk about what you&rsquo;re building.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                Open to conversations about front-end architecture, design systems, and engineering
                leadership.
              </p>
            </div>
            <Button href={personal.linkedin} size="lg" className="no-print">
              Reach out
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
};

export default About;
