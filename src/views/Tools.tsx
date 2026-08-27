import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTools } from '../hooks/useTools';
import { TOOL_CATEGORIES } from '../data/tools';
import { ToolCard } from '../components/ui/ToolCard';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ease, springSoft, staggerParent } from '../design/motion';
import { cn } from '../components/ui/cn';

const Tools: React.FC = () => {
  const { tools } = useTools();
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;

      const haystack = [tool.name, tool.description, tool.category, ...(tool.tags ?? [])]
        .join(' ')
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [tools, category, query]);

  return (
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
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Tools' }]} />

            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] tracking-[-0.02em] text-ink md:text-6xl">
              Developer tools, built for the browser
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Everything here runs client-side. Nothing you paste is uploaded, stored, or sent
              anywhere — open a tab, do the job, close it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-line bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-content flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter tools by category">
            {TOOL_CATEGORIES.map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(item)}
                  className="relative rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="tool-filter-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={springSoft}
                    />
                  )}
                  <span
                    className={cn(
                      'relative transition-colors',
                      isActive ? 'font-medium text-canvas' : 'text-muted hover:text-ink',
                    )}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative lg:w-72">
            <span
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-faint"
              aria-hidden="true"
            >
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools…"
              aria-label="Search tools"
              className="h-10 w-full rounded-full border border-line bg-surface pl-9 pr-4 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto w-full max-w-content flex-1 px-5 py-12 sm:px-8 md:py-16">
        <p className="eyebrow mb-8" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'tool' : 'tools'}
          {category !== 'All' && ` in ${category}`}
        </p>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${category}-${query}`}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={staggerParent(0.05)}
            >
              {filtered.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="rounded-2xl border border-dashed border-line-strong px-6 py-20 text-center"
            >
              <p className="font-display text-2xl text-ink">Nothing matches that</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
                Try a different search term, or clear the filters to see the full catalogue.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="mt-7 inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-ink/40 hover:bg-surface"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tools;
