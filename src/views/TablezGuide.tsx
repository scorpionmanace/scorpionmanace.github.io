import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getProject } from '../data/openSource';
import { EXAMPLES } from '../data/tablez/examples';
import { API_SECTIONS, FORMULA_FUNCTIONS, THEME_TOKENS } from '../data/tablez/api';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Reveal } from '../components/ui/Reveal';
import { PageHead } from '../components/notebook/PageHead';
import { Icon } from '../components/ui/Icon';
import { TablezPlayground } from '../components/tablez/TablezPlayground';
import { InlineCode } from '../components/tablez/InlineCode';
import { ease, springSoft } from '../design/motion';
import { cn } from '../components/ui/cn';

const project = getProject('tablez')!;

const CONTENTS = [
  { id: 'install', label: 'Install' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'playground', label: 'Playground' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'formulas', label: 'Formulas' },
  { id: 'theming', label: 'Theming' },
  { id: 'headless', label: 'Headless' },
  { id: 'api', label: 'API reference' },
];

const INSTALL = `npm install @scorpionmanace/tablez`;

const QUICK_START = `import { Table } from '@scorpionmanace/tablez';

const columns = [
  { key: 'id',     title: 'ID',   width: 70, sortable: true, align: 'right' },
  { key: 'name',   title: 'Name', width: 200, sortable: true, filterable: true },
  { key: 'salary', title: 'Salary', width: 130, align: 'right',
    type: 'number', format: { prefix: '$', decimals: 0 } },
];

const data = [
  { id: 1, name: 'Ada Lovelace', salary: 210000 },
  { id: 2, name: 'Grace Hopper', salary: 185000 },
];

export function People() {
  return (
    <Table
      data={data}
      columns={columns}
      settings={{ mode: 'client', resizable: true }}
      rowSettings={{ key: 'id' }}
      onDataChange={(rows) => console.log(rows)}
    />
  );
}`;

const CONCEPTS = [
  {
    title: 'Two required props',
    body: 'A table needs `data` and `columns`. Every other capability — sorting, grouping, virtualization, editing — is opt-in through `settings`, so you only pay for what you switch on.',
  },
  {
    title: 'Set a row key',
    body: 'Give `rowSettings.key` the name of a unique field. Selection, comments, and reordering all identify rows by this value; without it they fall back to array index and break when data is sorted or filtered.',
  },
  {
    title: 'Client or server mode',
    body: '`settings.mode` defaults to `client`, where tablez sorts and filters the array you pass. Switch to `server` when your backend does that work, and drive the table with the `sortState` and `filters` props.',
  },
  {
    title: 'Widths are numbers',
    body: 'Column `width` is a pixel number, not a CSS string. The resize and column-offset maths depends on it, so `width: "200px"` will not behave.',
  },
  {
    title: 'One change callback',
    body: '`onDataChange` fires whenever the table produces a new dataset — cell edits, CSV imports, row reordering, fill-handle drags. Keep your state in sync there; `onCellEdit` is the narrower hook for a single cell.',
  },
  {
    title: 'Virtualization needs a height',
    body: 'Setting `virtualized` alone is not enough — supply `containerHeight`, and make sure `rowSettings.height` matches the height rows actually render at, or the scroll window will drift.',
  },
];

const HEADLESS = `// Framework-agnostic engine — no React required
import { TablezEngine } from '@scorpionmanace/tablez';

const engine = new TablezEngine({ data, columns });

// Pure helpers are exported too
import {
  processData,            // sort + filter a dataset
  flattenTree,            // hierarchical rows -> flat list
  groupData,              // group rows by column value
  calculateVirtualization // visible window maths
} from '@scorpionmanace/tablez';`;

const ApiTable: React.FC<{ rows: typeof API_SECTIONS[number]['rows'] }> = ({ rows }) => (
  <div className="overflow-x-auto rounded-[3px] border border-line">
    <table className="w-full min-w-[44rem] border-collapse text-left">
      <thead>
        <tr className="border-b border-line bg-sunken">
          {['Prop', 'Type', 'Default', 'Description'].map((heading) => (
            <th key={heading} className="eyebrow px-4 py-3 font-medium">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name} className="border-b border-line last:border-b-0">
            <td className="px-4 py-3 align-top">
              <code className="font-mono text-[0.8125rem] text-accent">{row.name}</code>
            </td>
            <td className="px-4 py-3 align-top">
              <code className="font-mono text-xs text-muted">{row.type}</code>
            </td>
            <td className="px-4 py-3 align-top">
              {row.default ? (
                <code className="font-mono text-xs text-faint">{row.default}</code>
              ) : (
                <span className="text-faint">—</span>
              )}
            </td>
            <td className="px-4 py-3 align-top text-sm leading-relaxed text-muted">
              {row.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TablezGuide: React.FC = () => {
  const [activeExample, setActiveExample] = useState(EXAMPLES[0]);

  return (
    <div className="flex flex-1 flex-col bg-canvas">
      <PageHead
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Open source', to: '/open-source' },
          { label: 'tablez' },
        ]}
        folio={`v${project.version} · ${project.license}`}
        note="a data table, built by hand"
        title="tablez"
        lede={project.description}
        aside={
          <p className="mt-5 text-[1rem] text-muted">
            <code className="font-mono text-[0.9rem] text-accent">{project.pkg}</code>
            <span className="mx-2 text-faint">·</span>0 runtime dependencies
            <span className="mx-2 text-faint">·</span>React 19 peer
          </p>
        }
        actions={
          <>
            <Button href={project.repo}>
              GitHub
              <Icon name="external" />
            </Button>
            <Button href={project.npm!} variant="secondary">
              npm
              <Icon name="external" />
            </Button>
          </>
        }
      />

      {/* On this page — the section tabs */}
      <nav
        aria-label="On this page"
        className="sticky top-[4.5rem] z-30 border-y border-line bg-canvas/95 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-content gap-1 overflow-x-auto px-5 py-2 sm:px-8 lg:pl-[calc(11.5rem+5rem)] lg:pr-[5rem] xl:pr-[7rem]">
          {CONTENTS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 px-3 py-2 text-[1rem] text-muted underline decoration-transparent underline-offset-[0.35em] transition-colors hover:text-ink hover:decoration-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Install */}
      <Section id="install" tone="canvas" title="Getting started">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <CodeBlock code={INSTALL} language="bash" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              tablez ships as ESM with zero runtime dependencies. It declares{' '}
              <InlineCode>react</InlineCode> and <InlineCode>react-dom</InlineCode> as peer
              dependencies at version 19, so install those alongside it.
            </p>
          </div>
          <div className="rounded-[3px] border border-line bg-surface p-5">
            <h3 className="font-display text-[1.6rem] font-[760] leading-tight text-ink">No stylesheet to import</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Styles are applied inline from the active theme, so there is no CSS file to load and
              nothing to configure in your bundler. Restyle the table through{' '}
              <InlineCode>settings.theme</InlineCode> instead.
            </p>
          </div>
        </div>
      </Section>

      {/* Quick start */}
      <Section
        id="quick-start"
        tone="surface"
        divider
       
        title="A table in twenty lines"
        lede="Pass rows and column definitions. Everything else is optional."
      >
        <CodeBlock code={QUICK_START} language="tsx" />
      </Section>

      {/* Playground */}
      <Section
        id="playground"
        tone="canvas"
        divider
       
        title="Try every feature"
        lede="These render the published package against editable configuration. Change the JSON and the table updates as you type."
      >
        {/* Example picker */}
        <div className="mb-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Examples">
          {EXAMPLES.map((example) => {
            const isActive = example.id === activeExample.id;

            return (
              <button
                key={example.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveExample(example)}
                className="relative px-3 py-2 text-[1.0625rem] transition-colors"
              >
                {isActive && (
                  <motion.svg
                    layoutId="tablez-example-ink"
                    transition={springSoft}
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-0 h-2 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="M2 6 C 22 3, 44 8, 64 5 S 90 3, 98 6" />
                  </motion.svg>
                )}
                <span
                  className={cn(
                    'relative transition-colors',
                    isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {example.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <TablezPlayground example={activeExample} />

          {/* Notes */}
          <aside className="rounded-[4px] border border-line bg-surface p-6 lg:sticky lg:top-32">
            <h3 className="font-display text-[1.7rem] font-[780] leading-tight text-ink">
              {activeExample.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{activeExample.summary}</p>

            <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
              {activeExample.notes.map((note) => (
                <li key={note} className="text-sm leading-relaxed text-muted">
                  <InlineMarkdown text={note} />
                </li>
              ))}
            </ul>

            {activeExample.tryIt && (
              <div className="mt-6 border-t border-line pt-5">
                <h4 className="text-[1.0625rem] font-semibold text-ink">Try it</h4>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {activeExample.tryIt.map((hint) => (
                    <li key={hint} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <InlineMarkdown text={hint} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {/* Concepts */}
      <Section
        id="concepts"
        tone="surface"
        divider
       
        title="Six things worth knowing"
        lede="The rules that explain most of the surprises people hit on first use."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {CONCEPTS.map((concept) => (
            <div key={concept.title} className="border-t border-line-strong/70 pt-5">
              <h3 className="font-display text-[1.6rem] font-[760] leading-tight text-ink">
                {concept.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                <InlineMarkdown text={concept.body} />
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulas */}
      <Section
        id="formulas"
        tone="canvas"
        divider
       
        title="Excel-like expressions"
        lede="Set column.formula to an expression starting with = and reference other columns as {key}. Formula columns are computed on read and never written back to your data."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <CodeBlock
            language="tsx"
            code={`{ key: 'total',  title: 'Total',
  formula: '={price} * {qty}' }

{ key: 'stock',  title: 'Stock',
  formula: "=IF({qty} < 20, 'Low', 'Healthy')" }

{ key: 'avatar', title: 'Photo',
  formula: "=IMG('/u/' + {user}, {user}, 40, 40)" }`}
          />

          <div className="overflow-x-auto rounded-[3px] border border-line">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-sunken">
                  <th className="eyebrow px-4 py-3 font-medium">Function</th>
                  <th className="eyebrow px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {FORMULA_FUNCTIONS.map((fn) => (
                  <tr key={fn.name} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-2.5 align-top">
                      <code className="font-mono text-xs text-accent">{fn.signature}</code>
                    </td>
                    <td className="px-4 py-2.5 align-top text-sm text-muted">{fn.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Theming */}
      <Section
        id="theming"
        tone="surface"
        divider
       
        title="Tokens first, overrides when you need them"
        lede="Most restyling is a dozen token values. Drop to per-slot CSS only for the details tokens cannot reach."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <CodeBlock
              language="tsx"
              code={`import { darkTheme } from '@scorpionmanace/tablez';

settings={{
  theme: {
    tokens: {
      primaryColor: '#c2410c',
      headerBackgroundColor: '#faf9f7',
      borderRadius: '10px',
      fontFamily: 'Inter, sans-serif',
    },
    // per-slot overrides
    headerCell: { textTransform: 'uppercase' },
    cell: { fontVariantNumeric: 'tabular-nums' },
  }
}}`}
            />
            <p className="text-sm leading-relaxed text-muted">
              The package exports <InlineCode>defaultTheme</InlineCode> and{' '}
              <InlineCode>darkTheme</InlineCode> — spread either one and adjust rather than starting
              from scratch. Overridable slots: <InlineCode>table</InlineCode>,{' '}
              <InlineCode>header</InlineCode>, <InlineCode>headerCell</InlineCode>,{' '}
              <InlineCode>row</InlineCode>, <InlineCode>cell</InlineCode>,{' '}
              <InlineCode>menu</InlineCode>, <InlineCode>menuItem</InlineCode>,{' '}
              <InlineCode>searchInput</InlineCode>, <InlineCode>editInput</InlineCode>,{' '}
              <InlineCode>toolbar</InlineCode>, <InlineCode>toolbarButton</InlineCode>,{' '}
              <InlineCode>pagination</InlineCode>.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[3px] border border-line">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-sunken">
                  <th className="eyebrow px-4 py-3 font-medium">Token</th>
                  <th className="eyebrow px-4 py-3 font-medium">Applies to</th>
                </tr>
              </thead>
              <tbody>
                {THEME_TOKENS.map((token) => (
                  <tr key={token.name} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-2.5 align-top">
                      <code className="font-mono text-xs text-accent">{token.name}</code>
                    </td>
                    <td className="px-4 py-2.5 align-top text-sm text-muted">
                      {token.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Headless */}
      <Section
        id="headless"
        tone="canvas"
        divider
       
        title="Beyond React"
        lede="The sorting, grouping, tree-flattening, and virtualization maths are exported as plain functions, and there is a framework-agnostic engine on top of them."
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <CodeBlock code={HEADLESS} language="ts" />
          <div className="rounded-[3px] border border-line bg-surface p-5">
            <h3 className="font-display text-[1.6rem] font-[760] leading-tight text-ink">React Native</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A native table is published under the <InlineCode>/native</InlineCode> subpath. It
              declares <InlineCode>react-native</InlineCode> as a peer dependency, so web-only
              projects can ignore it entirely.
            </p>
            <CodeBlock
              className="mt-4"
              language="tsx"
              copyable={false}
              code={`import { TableNative } from '@scorpionmanace/tablez/native';`}
            />
          </div>
        </div>
      </Section>

      {/* API reference */}
      <Section
        id="api"
        tone="surface"
        divider
       
        title="Every prop, in one place"
      >
        <div className="flex flex-col gap-12">
          {API_SECTIONS.map((section) => (
            <Reveal key={section.id}>
              <div id={section.id}>
                <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">
                  {section.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{section.intro}</p>
                <div className="mt-5">
                  <ApiTable rows={section.rows} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Footer CTA */}
      <Section tone="canvas" divider>
        <div className="flex flex-col items-start justify-between gap-6 rounded-[4px] border border-line bg-surface p-7 md:flex-row md:items-center md:p-9">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl tracking-[-0.01em] text-ink md:text-3xl">
              Found a bug, or want a feature?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              tablez is MIT licensed and developed in the open. Issues and pull requests are both
              welcome.
            </p>
          </div>
          <div className="flex gap-2">
            <Button href={`${project.repo}/issues`}>Open an issue</Button>
            <Button href={project.repo} variant="secondary">
              Browse source
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

/** Renders `backtick` spans inside plain documentation strings. */
const InlineMarkdown: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(`[^`]+`)/g).map((part, index) =>
      part.startsWith('`') && part.endsWith('`') ? (
        <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      ),
    )}
  </>
);

export default TablezGuide;
