import { useMemo } from 'react';
import { TOOLS } from '../data/tools';
import { Tool } from '../types';

export type { Tool };

/** Reads the shared catalogue in `src/data/tools.ts`. */
export const useTools = () => {
  const tools = useMemo<Tool[]>(() => TOOLS, []);
  const featured = useMemo<Tool[]>(() => TOOLS.filter((tool) => tool.featured), []);
  const live = useMemo<Tool[]>(() => TOOLS.filter((tool) => tool.status !== 'planned'), []);

  return { tools, featured, live };
};
