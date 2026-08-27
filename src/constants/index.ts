/**
 * Application-wide constants.
 */

export const APP = {
  NAME: 'Karan Khare',
  TAGLINE: 'Engineering Leader & Front-End Architect',
  DESCRIPTION:
    'Portfolio, résumé, and a set of free browser-based developer tools by Karan Khare.',
  URL: 'https://scorpionmanace.github.io',
} as const;

export const SOCIAL = {
  LINKEDIN: 'https://www.linkedin.com/in/karankhare/',
  GITHUB: 'https://github.com/scorpionmanace',
} as const;

export const CACHE = {
  CACHE_VERSION_KEY: 'app-cache-version',
  CACHE_TIMESTAMP_KEY: 'app-cache-timestamp',
  CACHE_UPDATE_INTERVAL: 5 * 60 * 1000,
} as const;
