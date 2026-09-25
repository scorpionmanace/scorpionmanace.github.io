import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Field, Input, Select, TextArea, ErrorBanner } from './ui/Field';

const SWATCHES = [
  { token: 'canvas', className: 'bg-canvas' },
  { token: 'surface', className: 'bg-surface' },
  { token: 'sunken', className: 'bg-sunken' },
  { token: 'line', className: 'bg-line' },
  { token: 'muted', className: 'bg-muted' },
  { token: 'ink', className: 'bg-ink' },
  { token: 'accent', className: 'bg-accent' },
  { token: 'cloth', className: 'bg-cloth' },
  { token: 'highlight', className: 'bg-highlight' },
  { token: 'witness', className: 'bg-witness' },
];

const Block: React.FC<{ title: string; hint?: string; children: React.ReactNode }> = ({
  title,
  hint,
  children,
}) => (
  <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
    <h2 className="eyebrow">{title}</h2>
    {hint && <p className="mt-2 max-w-xl text-sm text-muted">{hint}</p>}
    <div className="mt-6">{children}</div>
  </section>
);

/**
 * Living reference for the design system.
 *
 * This page used to demo Chakra UI components, which no longer ship with the
 * site — it now documents the actual primitives the tools are built from, so
 * it stays honest as the system changes.
 */
const ComponentLab: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col">
      <Block title="Color tokens" hint="Semantic tokens that flip automatically between light and dark.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SWATCHES.map((swatch) => (
            <li key={swatch.token}>
              <div className={`h-16 rounded-[3px] border border-line ${swatch.className}`} />
              <p className="mt-2 font-mono text-xs text-muted">{swatch.token}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Typography" hint="Sofia Sans for everything you read, its Extra Condensed cut as the pre-printed pad header, Kalam only in the margins, and a mono only for code.">
        <div className="flex flex-col gap-4">
          <p className="font-display text-5xl font-[820] uppercase leading-none text-ink">
            Display — Sofia Sans Extra Condensed
          </p>
          <p className="text-base leading-relaxed text-ink-soft">
            Body — Sofia Sans. Used for everything you actually read: descriptions, résumé bullets,
            and supporting copy throughout the site.
          </p>
          <p className="hand text-2xl text-ink">Margin — Kalam, for notes in the hand.</p>
          <p className="font-mono text-sm text-muted">Code — JetBrains Mono, only for code and data.</p>
          <p className="eyebrow">Label — pre-printed form and field labels</p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Block>

      <Block title="Form controls">
        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <Field label="Text input" htmlFor="lab-input" hint="Focus ring uses the accent token.">
            <Input
              id="lab-input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Type something…"
            />
          </Field>

          <Field label="Select" htmlFor="lab-select">
            <Select id="lab-select" defaultValue="one">
              <option value="one">Option one</option>
              <option value="two">Option two</option>
            </Select>
          </Field>

          <Field label="Textarea" htmlFor="lab-textarea" className="sm:col-span-2">
            <TextArea id="lab-textarea" rows={4} placeholder="Monospaced by default." />
          </Field>
        </div>
      </Block>

      <Block title="Feedback">
        <ErrorBanner message="Something went wrong — this is the shared error banner." />
      </Block>
    </div>
  );
};

export default ComponentLab;
