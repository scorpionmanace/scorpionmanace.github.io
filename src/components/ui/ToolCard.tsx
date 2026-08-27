import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Tool } from '../../types';
import { riseItem } from '../../design/motion';
import { cn } from './cn';

interface ToolCardProps {
  tool: Tool;
  /** Adds the index marker used on the tools index. */
  index?: number;
}

const CardBody: React.FC<{ tool: Tool; index?: number; interactive: boolean }> = ({
  tool,
  index,
  interactive,
}) => (
  <div
    className={cn(
      'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 md:p-7',
      interactive ? 'hover:border-line-strong' : 'opacity-70',
    )}
  >
    {/* Accent wash that fades in on hover */}
    {interactive && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    )}

    <div className="relative flex items-start justify-between gap-4">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas font-mono text-lg text-ink transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
        aria-hidden="true"
      >
        {tool.icon}
      </span>

      {typeof index === 'number' ? (
        <span className="font-mono text-xs text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      ) : null}
    </div>

    <div className="relative mt-5 flex flex-1 flex-col">
      <div className="flex items-center gap-2.5">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{tool.name}</h3>
        {tool.status === 'planned' && (
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-muted">
            Planned
          </span>
        )}
      </div>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>

      {tool.tags && tool.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-sunken px-2 py-1 font-mono text-[0.6875rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center gap-2 text-sm font-medium">
        {interactive ? (
          <>
            <span className="text-ink transition-colors group-hover:text-accent">Open tool</span>
            <span
              className="text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden="true"
            >
              →
            </span>
          </>
        ) : (
          <span className="text-faint">In the backlog</span>
        )}
      </div>
    </div>
  </div>
);

export const ToolCard: React.FC<ToolCardProps> = ({ tool, index }) => {
  const interactive = tool.route !== '#' && tool.status !== 'planned';

  return (
    <motion.div variants={riseItem} className="h-full">
      <motion.div
        className="h-full"
        whileHover={interactive ? { y: -4 } : undefined}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {interactive ? (
          <Link
            to={tool.route}
            className="block h-full rounded-2xl"
            aria-label={`Open ${tool.name}`}
          >
            <CardBody tool={tool} index={index} interactive />
          </Link>
        ) : (
          <CardBody tool={tool} index={index} interactive={false} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ToolCard;
