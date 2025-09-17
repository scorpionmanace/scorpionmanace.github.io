import { useMemo } from 'react';
import { Tool } from '../types';

export type { Tool };

export const useTools = () => {
  const tools: Tool[] = useMemo(() => [
    {
      id: 'json-parser',
      name: 'JSON Parser',
      description: 'Parse, validate, and format JSON data with real-time validation and beautification.',
      icon: '🔧',
      route: '/json-parser',
      category: 'Development Tools'
    },
    {
      id: 'code-formatter',
      name: 'Code Formatter',
      description: 'Format and beautify your code across multiple programming languages.',
      icon: '💻',
      route: '/code-formatter',
      category: 'Development Tools'
    },
    {
      id: 'data-converter',
      name: 'Data Converter',
      description: 'Convert between different data formats including JSON, XML, and CSV.',
      icon: '🔄',
      route: '#',
      category: 'Data Tools'
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      description: 'Pick, analyze, and generate color palettes for your projects with CSV and Figma exports.',
      icon: '🎨',
      route: '/color-picker',
      category: 'Design Tools'
    },
    {
      id: 'chakra-ui',
      name: 'Chakra UI Demo',
      description: 'Interactive demonstration of Chakra UI components with Tailwind CSS styling.',
      icon: '🧩',
      route: '/chakra-ui',
      category: 'Design Tools'
    },
    {
      id: 'code-playground',
      name: 'Code Playground',
      description: 'Run HTML, CSS, and JavaScript code interactively with real-time output rendering.',
      icon: '🎮',
      route: '/code-playground',
      category: 'Development Tools'
    },
    {
      id: 'text-utils',
      name: 'Text Utilities',
      description: 'Collection of text processing tools including formatting, validation, and transformations.',
      icon: '✏️',
      route: '#',
      category: 'Text Tools'
    },
    {
      id: 'api-tester',
      name: 'API Tester',
      description: 'Test and validate REST API endpoints with comprehensive request/response handling.',
      icon: '🌐',
      route: '#',
      category: 'Web Tools'
    }
  ], []);

  return { tools };
};
