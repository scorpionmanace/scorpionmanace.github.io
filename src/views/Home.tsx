import React from 'react';
import { motion } from 'framer-motion';
import { useTools } from '../hooks/useTools';
import resumeData from '../data/resume.json';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ToolCard } from '../components/ui/ToolCard';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { staggerParent, riseItem } from '../design/motion';

const STATS = [
  { value: '12+', label: 'Years building for the web' },
  { value: '9', label: 'Engineers led and mentored' },
  { value: '8+', label: 'Products taken to launch' },
  { value: '3', label: 'Peer-reviewed publications' },
];

const STACK = [
  'TypeScript',
  'React',
  'Node.js',
  'GraphQL',
  'AWS',
  'Vue',
  'Angular',
  'Redux Toolkit',
  'Kubernetes',
  'PostgreSQL',
  'Figma',
  'Cypress',
];

const Hero: React.FC = () => (
  <section className="relative overflow-hidden border-b border-line">
    <div className="grid-bg fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="relative mx-auto w-full max-w-content px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24">
      <motion.div initial="hidden" animate="visible" variants={staggerParent(0.09)}>
        <motion.div variants={riseItem}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
              Senior Front-End Engineer · Amazon
            </span>
          </span>
        </motion.div>

        <motion.h1
          variants={riseItem}
          className="mt-8 max-w-4xl font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl md:text-7xl"
        >
          I build interfaces that make
          <span className="text-accent italic"> complex systems </span>
          feel obvious.
        </motion.h1>

        <motion.p
          variants={riseItem}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          I&rsquo;m Karan Khare — an engineering leader with 12+ years across storage, fintech,
          autonomous driving, and generative AI. I design front-end architecture, grow the teams
          behind it, and ship the developer tooling that keeps both moving.
        </motion.p>

        <motion.div variants={riseItem} className="mt-10 flex flex-wrap items-center gap-3">
          <Button to="/tools" size="lg">
            Explore the tools
            <span aria-hidden="true">→</span>
          </Button>
          <Button to="/about" variant="secondary" size="lg">
            Read the full story
          </Button>
        </motion.div>
      </motion.div>
    </div>

    {/* Stack ticker */}
    <div className="relative border-t border-line bg-surface py-4">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <motion.ul
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
          aria-hidden="true"
        >
          {[...STACK, ...STACK].map((item, index) => (
            <li key={`${item}-${index}`} className="font-mono text-xs tracking-wider text-faint">
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
      <span className="sr-only">Core stack: {STACK.join(', ')}</span>
    </div>
  </section>
);

const Home: React.FC = () => {
  const { featured } = useTools();
  const recentRoles = resumeData.experience.slice(0, 4);

  return (
    <div className="flex flex-1 flex-col">
      <Hero />

      {/* Stats */}
      <Section tone="canvas">
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <p className="font-display text-4xl leading-none tracking-[-0.02em] text-ink md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-snug text-muted">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Tools */}
      <Section
        tone="surface"
        divider
        eyebrow="Built to be used"
        title="A working set of developer tools"
        lede="Small, focused utilities I reach for often — each one runs entirely in the browser, with no account and no data leaving your machine."
        action={
          <Button to="/tools" variant="secondary">
            View all tools
            <span aria-hidden="true">→</span>
          </Button>
        }
      >
        <RevealGroup
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </RevealGroup>
      </Section>

      {/* Experience */}
      <Section
        tone="canvas"
        divider
        eyebrow="Track record"
        title="Where I've been building"
        lede="Front-end architecture and engineering leadership across storage, autonomous vehicles, financial systems, and generative AI."
        action={
          <Button to="/about" variant="secondary">
            Full résumé
            <span aria-hidden="true">→</span>
          </Button>
        }
      >
        <RevealGroup className="flex flex-col" as="ul" stagger={0.08}>
          {recentRoles.map((role) => (
            <RevealItem key={`${role.company}-${role.period}`} as="li">
              <div className="group grid gap-2 border-t border-line py-7 transition-colors md:grid-cols-[10rem_1fr] md:gap-8 md:py-8">
                <p className="font-mono text-xs leading-relaxed tracking-wide text-faint md:pt-1.5">
                  {role.period}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{role.company}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {role.achievements[0]}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Closing CTA */}
      <Section tone="surface" divider>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-canvas px-6 py-14 text-center md:px-16 md:py-20">
            <div
              className="grid-bg fade-edges pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow">Say hello</span>
              <h2 className="mt-5 font-display text-3xl leading-[1.12] tracking-[-0.015em] text-ink md:text-5xl">
                Got something worth building?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                I&rsquo;m always glad to talk through front-end architecture, design systems, team
                structure, or an idea you can&rsquo;t stop thinking about.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="https://www.linkedin.com/in/karankhare/" size="lg">
                  Connect on LinkedIn
                </Button>
                <Button href="https://github.com/scorpionmanace" variant="secondary" size="lg">
                  Browse GitHub
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
};

export default Home;
