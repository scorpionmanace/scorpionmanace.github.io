export interface OpenSourceProject {
  id: string;
  name: string;
  /** npm package name, when published. */
  pkg?: string;
  tagline: string;
  description: string;
  version?: string;
  license: string;
  language: string;
  status: 'stable' | 'beta' | 'experimental';
  /** Route to the guide on this site, when one exists. */
  route?: string;
  repo: string;
  npm?: string;
  highlights: string[];
  tags: string[];
}

export const OPEN_SOURCE: OpenSourceProject[] = [
  {
    id: 'tablez',
    name: 'tablez',
    pkg: '@scorpionmanace/tablez',
    tagline: 'A React data table with the features you usually pay for',
    description:
      'Virtual scrolling for 100,000+ rows, hierarchical tree rows, an Excel-like formula engine, grouping and aggregation, inline editors, sparklines, and token-based theming — with no runtime dependencies.',
    version: '1.0.0',
    license: 'MIT',
    language: 'TypeScript',
    status: 'stable',
    route: '/open-source/tablez',
    repo: 'https://github.com/scorpionmanace/tablez',
    npm: 'https://www.npmjs.com/package/@scorpionmanace/tablez',
    highlights: [
      'Virtual scrolling',
      'Tree rows',
      'Formula engine',
      'Grouping & aggregation',
      'Inline editors',
      'Zero runtime deps',
    ],
    tags: ['React', 'TypeScript', 'Data table', 'Headless'],
  },
];

export const getProject = (id: string): OpenSourceProject | undefined =>
  OPEN_SOURCE.find((project) => project.id === id);
