/**
 * Application constants
 */

// App configuration
export const APP = {
  NAME: 'Scorpionman Developer Tools',
  DESCRIPTION: 'A collection of developer tools and utilities built with React',
  VERSION: '1.0.0'
};

// Tools configuration
export const TOOLS = {
  CODE_FORMATTER: '/code-formatter',
  JSON_PARSER: '/json-parser',
  COLOR_PICKER: '/color-picker',
  CHAKRA_UI: '/chakra-ui'
};

// API configuration
export const API = {
  BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://api.example.com'
    : 'http://localhost:3001'
};

// Cache configuration
export const CACHE = {
  CACHE_VERSION_KEY: 'app-cache-version',
  CACHE_TIMESTAMP_KEY: 'app-cache-timestamp',
  CACHE_UPDATE_INTERVAL: 5 * 60 * 1000 // 5 minutes
};

// UI configuration
export const UI = {
  MAX_CONTENT_WIDTH: 1200,
  MAX_TOOL_WIDTH: 1000,
  DEFAULT_SPACING_UNIT: 16,
  BORDER_RADIUS: 8
};

// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#3b82f6',
    SECONDARY: '#64748b',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    WHITE: '#ffffff',
    GRAY_50: '#f9fafb',
    GRAY_500: '#6b7280',
    GRAY_700: '#374151'
  }
};
