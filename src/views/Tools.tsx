import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTools } from '../hooks/useTools';
import { TOOL_CATEGORIES } from '../data/tools';
import { PageHead } from '../components/notebook/PageHead';
import { Icon } from '../components/ui/Icon';
import { ease, springSoft } from '../design/motion';
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
      <PageHead
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Tools' }]}
        folio="Contents"
        note="kept because I kept needing them"
        title="The tool drawer"
        lede="Everything here runs in your browser. Nothing you paste is uploaded, stored, or sent anywhere — open it, do the job, close the tab."
      />

      {/* Section tabs + search, pinned under the header */}
      <div className="sticky top-[4.5rem] z-30 border-y border-line bg-canvas/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-content flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:pl-[calc(11.5rem+5rem)] lg:pr-[5rem] xl:pr-[7rem]">
          <div className="-mx-1 flex flex-wrap items-center" role="tablist" aria-label="Filter tools by section">
            {TOOL_CATEGORIES.map((item) => {
              const isActive = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(item)}
                  className={cn(
                    'relative px-3 py-2 text-[1.0625rem] transition-colors',
                    isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item}
                  {isActive && (
                    <motion.svg
                      layoutId="tool-tab-ink"
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
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 border-b-[1.5px] border-ink/40 pb-1 focus-within:border-accent lg:w-72">
            <Icon name="search" className="h-4 w-4 text-muted" />
            <span className="sr-only">Search tools</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a tool…"
              className="w-full bg-transparent py-1.5 text-[1.0625rem] text-ink placeholder:text-faint focus:outline-none"
            />
          </label>
        </div>
      </div>

      {/* Contents */}
      <div className="grid-bg paper flex-1 px-5 py-12 sm:px-8 md:py-16">
        <div className="relative mx-auto w-full max-w-content">
          <span
            aria-hidden="true"
            className="margin-rule pointer-events-none absolute -bottom-16 -top-16 left-0 hidden w-[11.5rem] lg:block"
          />
          <div className="lg:grid lg:grid-cols-[11.5rem_1fr] lg:gap-x-12 lg:pr-12 xl:pr-20">
            <p className="hand hidden pr-6 pt-1 text-right text-lg text-muted lg:block" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            </p>

            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.ol
                  key={`${category}-${query}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col"
                >
                  {filtered.map((tool) => {
                    const live = tool.route !== '#' && tool.status !== 'planned';
                    const row = (
                      <>
                        <div className="flex items-baseline gap-3">
                          <span
                            className={cn(
                              'font-display text-[2rem] font-[760] leading-none transition-colors md:text-[2.4rem]',
                              live ? 'text-ink group-hover:text-accent' : 'text-faint line-through decoration-1',
                            )}
                          >
                            {tool.name}
                          </span>
                          <span aria-hidden="true" className="mb-1.5 flex-1 border-b-2 border-dotted border-line-strong" />
                          <span className="shrink-0 font-display text-[0.9rem] font-[720] uppercase tracking-[0.1em] text-muted">
                            {tool.category}
                          </span>
                        </div>
                        <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                          {tool.description}
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-faint">
                          {live ? (
                            <>
                              {tool.tags?.join(' · ')}
                              <Icon
                                name="arrowRight"
                                className="ml-auto h-5 w-5 text-accent opacity-0 transition-opacity group-hover:opacity-100"
                              />
                            </>
                          ) : (
                            <span className="hand text-[1.1rem] text-muted">still on the list — not built yet</span>
                          )}
                        </p>
                      </>
                    );

                    return (
                      <li key={tool.id} className="border-b border-line">
                        {live ? (
                          <Link to={tool.route} className="group block py-7">
                            {row}
                          </Link>
                        ) : (
                          <div className="py-7">{row}</div>
                        )}
                      </li>
                    );
                  })}
                </motion.ol>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="py-12"
                >
                  <p className="hand text-[1.8rem] text-ink">Nothing in the drawer by that name.</p>
                  <p className="mt-3 max-w-md text-[1.0625rem] text-muted">
                    Try another word, or clear the filter to see every tool.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setCategory('All');
                    }}
                    className="mt-6 font-semibold text-accent underline decoration-accent/30 underline-offset-[0.28em] hover:decoration-accent"
                  >
                    Clear the filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
