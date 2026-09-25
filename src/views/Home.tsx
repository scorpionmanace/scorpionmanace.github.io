import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTools } from '../hooks/useTools';
import resumeData from '../data/resume.json';
import { OPEN_SOURCE } from '../data/openSource';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Spotlight } from '../components/Spotlight';
import { Tape } from '../components/notebook/Tape';
import { InkArrow, InkLoop, InkUnderline } from '../components/notebook/Ink';
import { useMultiplane } from '../components/notebook/useMultiplane';
import portrait from '../assets/portrait.jpg';

/* ------------------------------------------------------------------
   Hero — the notebook lying open on its cloth
   ------------------------------------------------------------------ */

/** The pre-printed block at the head of every engineering-pad page. */
const PadHeader: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <div className="flex items-end justify-between gap-4 border-b-[1.5px] border-ink/70 pb-2">
    <span className="font-display text-[0.8125rem] font-[720] uppercase tracking-[0.12em] text-muted">
      {left}
    </span>
    <span className="font-display text-[0.8125rem] font-[720] uppercase tracking-[0.12em] text-muted">
      {right}
    </span>
  </div>
);

const Hero: React.FC = () => {
  const { ref, plane, drift } = useMultiplane<HTMLElement>(['start start', 'end start'], 'start');

  // Four planes, back to front.
  const clothY = plane(-1.2, 120);
  const spreadY = plane(0.3, 120);
  const printY = plane(1.1, 120);
  const noteY = plane(1.8, 120);
  // Rack focus: the far plane softens as the spread lifts toward you.
  const clothBlur = drift('blur(0px)', 'blur(3px)');
  const printRotate = drift(-2.5, -6);
  const noteRotate = drift(-3, -8);

  return (
    <section ref={ref} className="relative isolate overflow-hidden px-4 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-12">
      {/* Plane 0 — bookcloth */}
      <motion.div
        aria-hidden="true"
        className="cloth absolute -inset-y-24 inset-x-0 -z-10"
        style={{ y: clothY, filter: clothBlur }}
      />

      {/* Plane 1 — the open spread */}
      <motion.div
        style={{ y: spreadY }}
        className="relative mx-auto grid w-full max-w-content overflow-visible rounded-[3px] bg-canvas shadow-float lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
      >
        {/* Spine shadow between the two pages */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[41%] z-10 hidden w-16 -translate-x-1/2 lg:block"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgb(20 40 30 / 0.10) 42%, rgb(20 40 30 / 0.22) 50%, rgb(20 40 30 / 0.10) 58%, transparent)',
          }}
        />

        {/* Left page — the taped-in print */}
        <div className="grid-bg paper relative flex flex-col px-6 pb-10 pt-6 sm:px-10 lg:pb-40">
          <PadHeader left="Notebook of K. Khare" right="p. 1" />

          <div className="relative mx-auto mt-10 w-full max-w-[19rem] sm:max-w-[21rem] lg:mt-14">
            {/* Plane 2 — the print. Outer layer rides the scroll, inner layer
                lands on the page with a weighted spring. */}
            <motion.div style={{ y: printY, rotate: printRotate }}>
            <motion.figure
              className="print relative"
              initial={{ opacity: 0, y: -40, rotate: -8.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 110, damping: 11, mass: 1.1, delay: 0.15 }}
            >
              <img
                src={portrait}
                alt="Karan Khare, smiling, in a green shirt outdoors."
                width={760}
                height={760}
                fetchPriority="high"
                className="block aspect-square w-full object-cover"
              />
              <figcaption className="hand pt-3 text-center text-[1.3rem] leading-tight text-[#1a2150]">
                K. Khare — runs teams, still ships code
              </figcaption>

              {/* Plane 3 — the tape holding it down */}
              <motion.span
                className="absolute -top-3 left-1/2 block -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75, duration: 0.25 }}
              >
                <Tape className="relative -rotate-3" />
              </motion.span>
            </motion.figure>
            </motion.div>
          </div>
        </div>

        {/* Right page — the entry */}
        <div className="grid-bg paper relative flex flex-col px-6 pb-12 pt-6 sm:px-10 lg:pb-14 lg:pl-16">
          <PadHeader left="Entry — Sept 2026" right="p. 2" />

          <h1 className="mt-10 font-display text-[3.4rem] font-[820] uppercase leading-[0.88] tracking-[-0.005em] text-ink sm:text-[4.6rem] lg:mt-14 lg:text-[5.5rem]">
            I&rsquo;ve led engineering teams —{' '}
            <span className="relative inline-block whitespace-nowrap">
              and I still build.
              <InkUnderline
                className="absolute -bottom-5 left-0 h-3.5 w-full"
                tone="accent"
                strokeWidth={3}
                delay={0.9}
              />
            </span>
          </h1>

          <p className="mt-9 max-w-[34rem] text-[1.1875rem] leading-relaxed text-ink-soft">
            Twelve years across storage, fintech, autonomous driving, and generative AI. Today I
            build agentic AI at AWS as a core contributor to{' '}
            <span className="highlight font-semibold">Amazon Quick</span> — on desktop, mobile,
            and web.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="https://www.linkedin.com/in/karankhare/" size="lg">
              Get in touch
            </Button>
            <Button to="/about" variant="secondary" size="lg">
              Read the notebook
              <Icon name="arrowRight" />
            </Button>
          </div>

          {/* Margin note with scope, pointing back at the claim */}
          <div className="relative mt-12 flex items-start gap-3 lg:mt-auto lg:self-end lg:pt-10">
            <InkArrow className="mt-1 h-10 w-16 shrink-0 rotate-180" delay={1.3} />
            <p className="hand max-w-[16rem] -rotate-2 text-[1.3rem] leading-snug text-ink">
              managed a team of 9 · helped grow a data group from 4 to 20+
            </p>
          </div>
        </div>

        {/* Plane 3 — sticky note on the left page: what matters now */}
        <motion.div
          style={{ y: noteY, rotate: noteRotate }}
          className="absolute bottom-12 left-10 z-20 hidden w-48 lg:block"
        >
          <motion.aside
            aria-label="What I'm working on now"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 13, delay: 0.45 }}
            className="bg-highlight px-4 py-3.5 text-highlight-ink shadow-raised"
          >
            <p className="hand text-[1.2rem] leading-snug text-highlight-ink">
              Now: Quick Desktop, plus iOS, Android &amp; web
            </p>
          </motion.aside>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------------
   The ledger — scope, as a worked page rather than a stat strip
   ------------------------------------------------------------------ */

const LEDGER: Array<{ item: string; value: string; note?: string; ring?: boolean }> = [
  { item: 'Years building software', value: '12+' },
  { item: 'Engineers led directly', value: '9', note: 'SDM III, Devices FinTech', ring: true },
  { item: 'Data-engineering group I helped grow', value: '4 → 20+' },
  { item: 'Front-end apps established', value: '8+', note: 'Devices FinTech' },
  { item: 'Customer growth, launched products', value: '200%+' },
  { item: 'Published papers', value: '3', note: 'IEEE BigData, ACIJ, SIPIJ' },
];

const Ledger: React.FC = () => (
  <Section
    tone="canvas"
    eyebrow="scope, tallied"
    title="Twelve years, in one ledger"
    lede="I have spent six of them at Amazon moving between managing and building — running a nine-person team in Devices FinTech, then returning to hands-on work on AWS's generative and agentic AI products. The job underneath stays the same: shape the architecture, grow the people, ship."
  >
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <table className="w-full border-collapse">
        <caption className="sr-only">Career scope</caption>
        <tbody>
          {LEDGER.map((row) => (
            <tr key={row.item} className="border-b border-line-strong/70">
              <th scope="row" className="py-4 pr-4 text-left align-baseline font-normal">
                <span className="text-[1.125rem] text-ink-soft">{row.item}</span>
                {row.note && <span className="block text-sm text-faint">{row.note}</span>}
              </th>
              <td className="whitespace-nowrap py-4 pl-4 text-right align-baseline font-display text-[2.2rem] font-[780] leading-none text-ink">
                {row.ring ? (
                  <span className="relative inline-block px-1">
                    {row.value}
                    <InkLoop className="absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)]" tone="witness" delay={0.2} />
                  </span>
                ) : (
                  row.value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-6">
        {/* Two other notebooks on the shelf */}
        <article className="relative rotate-[0.6deg] bg-raised p-6 shadow-raised">
          <Tape className="-top-3 left-6 -rotate-6" />
          <h3 className="font-display text-[1.7rem] font-[780] leading-none text-ink">The researcher</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            Published on gesture-based authentication for iPhone at IEEE BigData 2015, and on
            behavioural biometrics and remote-sensing visualization before that.
          </p>
        </article>
        <article className="relative -rotate-[0.8deg] bg-raised p-6 shadow-raised">
          <Tape className="-top-3 right-8 rotate-3" />
          <h3 className="font-display text-[1.7rem] font-[780] leading-none text-ink">The MBA</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            Boston University Questrom, 2022 — on top of an MS in Computer Science from San José
            State. Product and business sense sit next to the engineering.
          </p>
        </article>
      </div>
    </div>
  </Section>
);

/* ------------------------------------------------------------------
   Entries — the career, dated in the margin
   ------------------------------------------------------------------ */

const shortPeriod = (period: string) =>
  period
    .replace(/January|February|March|April|May|June|July|August|September|October|November|December/g, (m) =>
      m.slice(0, 3),
    )
    .replace('Present', 'now');

const Entries: React.FC = () => (
  <Section tone="surface" divider eyebrow="where I've been" title="Entries" bleed>
    <ol className="flex flex-col">
      {resumeData.experience.map((role, index) => {
        const current = index === 0;
        return (
          <li
            key={`${role.company}-${role.period}`}
            className="grid gap-2 border-t border-line py-8 lg:grid-cols-[11.5rem_1fr] lg:gap-12"
          >
            <p className="hand text-[1.25rem] leading-tight text-muted lg:pr-6 lg:text-right">
              {shortPeriod(role.period)}
            </p>
            <div className="max-w-3xl">
              <h3 className="font-display text-[2rem] font-[760] leading-none tracking-[-0.005em] text-ink md:text-[2.4rem]">
                <span className="relative inline-block">
                  {role.title}
                  {current && (
                    <InkUnderline className="absolute -bottom-3 left-0 h-3 w-full" tone="accent" strokeWidth={2.5} />
                  )}
                </span>
              </h3>
              <p className="mt-2 text-[1.0625rem] font-semibold text-accent">
                {current ? <span className="highlight">{role.company.replace(' LLC', '')}</span> : role.company.replace(' LLC', '').replace(' Inc', '')}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">{role.achievements[0]}</p>
            </div>
          </li>
        );
      })}
    </ol>
    <div className="mt-6 lg:ml-[calc(11.5rem+3rem)]">
      <Link
        to="/about"
        className="inline-flex items-center gap-2 text-[1.0625rem] font-semibold text-accent underline decoration-accent/30 underline-offset-[0.28em] hover:decoration-accent"
      >
        Every role, in full
        <Icon name="arrowRight" />
      </Link>
    </div>
  </Section>
);

/* ------------------------------------------------------------------
   Built by hand — the open-source printout and the tools contents page
   ------------------------------------------------------------------ */

const INSTALL_SNIPPET = `npm i @scorpionmanace/tablez

<Table
  data={people}
  columns={columns}
  settings={{
    virtualized: true,
    groupBy: ['team'],
  }}
/>`;

const BuiltByHand: React.FC = () => {
  const { featured } = useTools();
  const tablez = OPEN_SOURCE[0];
  const { ref, plane } = useMultiplane<HTMLDivElement>();
  const printoutY = plane(0.9, 110);

  return (
    <Section
      tone="canvas"
      divider
      eyebrow="the hands-on part"
      title="Built by hand"
      lede="An open-source data table I maintain, and a drawer of small browser tools I built because I kept needing them."
    >
      <div ref={ref} className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        {/* The printout */}
        <motion.article style={{ y: printoutY }} className="relative rotate-[-1deg]">
          <Tape className="-top-3 left-10 -rotate-3" />
          <Tape className="-top-3 right-10 rotate-6" />
          <div className="bg-raised px-6 pb-7 pt-8 shadow-raised">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-[2.4rem] font-[800] leading-none text-ink">
                {tablez.name}
              </h3>
              <span className="text-sm text-faint">
                v{tablez.version} · {tablez.license}
              </span>
            </div>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">{tablez.description}</p>
            <pre className="mt-6 overflow-x-auto border-y border-dashed border-line-strong py-4 font-mono text-[0.8125rem] leading-relaxed text-ink-soft">
              <code>{INSTALL_SNIPPET}</code>
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to={tablez.route!} size="md">
                Guide &amp; live playground
                <Icon name="arrowRight" />
              </Button>
              <Button href={tablez.repo} variant="secondary" size="md">
                Source
              </Button>
            </div>
          </div>
        </motion.article>

        {/* Contents page for the tools */}
        <div>
          <h3 className="font-display text-[2.2rem] font-[800] leading-none text-ink">Contents</h3>
          <ol className="mt-4">
            {featured.map((tool) => (
              <li key={tool.id}>
                <Link
                  to={tool.route}
                  className="group flex items-baseline gap-3 border-b border-line py-3.5"
                >
                  <span className="text-[1.1875rem] font-semibold text-ink transition-colors group-hover:text-accent">
                    {tool.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mb-1 flex-1 border-b-2 border-dotted border-line-strong"
                  />
                  <span className="text-[0.95rem] text-muted">{tool.tagline}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link
            to="/tools"
            className="mt-6 inline-flex items-center gap-2 text-[1.0625rem] font-semibold text-accent underline decoration-accent/30 underline-offset-[0.28em] hover:decoration-accent"
          >
            The whole drawer
            <Icon name="arrowRight" />
          </Link>
        </div>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */

const Home: React.FC = () => (
  <div className="flex flex-1 flex-col">
    <Hero />
    <Ledger />
    <Spotlight />
    <Entries />
    <BuiltByHand />
  </div>
);

export default Home;
