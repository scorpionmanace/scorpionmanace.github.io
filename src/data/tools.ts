import type { Tool } from '../types';

/**
 * Single source of truth for the tool catalogue.
 *
 * Consumed by the tools index, the home page's featured strip, the header
 * command menu, and the breadcrumb labels — so a tool is added in exactly
 * one place.
 */
export const TOOLS: Tool[] = [
  {
    id: 'json-parser',
    name: 'JSON Parser',
    description:
      'Parse, validate, and beautify JSON with inline error reporting and a collapsible tree view.',
    tagline: 'Validate & beautify',
    icon: '{ }',
    route: '/json-parser',
    category: 'Data',
    tags: ['JSON', 'Validation', 'Formatting'],
    status: 'live',
    featured: true,
  },
  {
    id: 'api-tester',
    name: 'API Tester',
    description:
      'Fire REST requests with custom headers, auth, and bodies, then inspect status, timing, and response payloads.',
    tagline: 'Request & inspect',
    icon: '⇄',
    route: '/api-tester',
    category: 'Web',
    tags: ['REST', 'HTTP', 'Debugging'],
    status: 'live',
    featured: true,
  },
  {
    id: 'data-converter',
    name: 'Data Converter',
    description:
      'Convert between JSON, CSV, and XML with file upload, configurable delimiters, and one-click download.',
    tagline: 'JSON · CSV · XML',
    icon: '⇋',
    route: '/data-converter',
    category: 'Data',
    tags: ['CSV', 'XML', 'JSON'],
    status: 'live',
    featured: true,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description:
      'Sample colors from an image or build palettes by hand, with HEX/RGB/HSL readouts and CSV & Figma export.',
    tagline: 'Sample & export palettes',
    icon: '◐',
    route: '/color-picker',
    category: 'Design',
    tags: ['Palettes', 'HEX', 'Figma'],
    status: 'live',
    featured: true,
  },
  {
    id: 'code-playground',
    name: 'Code Playground',
    description:
      'Write HTML, CSS, and JavaScript side by side and render the result live in a sandboxed preview.',
    tagline: 'Live HTML/CSS/JS sandbox',
    icon: '▶',
    route: '/code-playground',
    category: 'Development',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'live',
    featured: true,
  },
  {
    id: 'code-formatter',
    name: 'Code Formatter',
    description:
      'Format and indent source across a range of languages, with configurable width and quote style.',
    tagline: 'Beautify any language',
    icon: '⌘',
    route: '/code-formatter',
    category: 'Development',
    tags: ['Prettier', 'Indentation'],
    status: 'live',
    featured: true,
  },
  {
    id: 'component-lab',
    name: 'Component Lab',
    description:
      'A living reference of the component primitives and interaction states used across these tools.',
    tagline: 'Component reference',
    icon: '◫',
    route: '/component-lab',
    category: 'Design',
    tags: ['Components', 'Design system'],
    status: 'live',
  },
  {
    id: 'text-utils',
    name: 'Text Utilities',
    description:
      'Case conversion, slugify, diffing, hashing, and encoding helpers in a single scratchpad.',
    tagline: 'Transform & inspect text',
    icon: '¶',
    route: '#',
    category: 'Text',
    tags: ['Encoding', 'Diff', 'Hashing'],
    status: 'planned',
  },
];

/** Category filter order for the tools index. */
export const TOOL_CATEGORIES = ['All', 'Data', 'Development', 'Design', 'Web', 'Text'] as const;

export const getToolByRoute = (route: string): Tool | undefined =>
  TOOLS.find((tool) => tool.route === route);
