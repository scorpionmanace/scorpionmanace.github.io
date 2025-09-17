/**
 * Cache versioning hook for automatic cache busting
 * Detects version changes and triggers cache invalidation
 */

import { useEffect, useState } from 'react';

const CACHE_VERSION_KEY = 'app-cache-version';
const CACHE_TIMESTAMP_KEY = 'app-cache-timestamp';

export const useCacheVersion = () => {
  const [cacheVersion, setCacheVersion] = useState<string>(() =>
    localStorage.getItem(CACHE_VERSION_KEY) || 'v1.0.0'
  );

  const [cacheTimestamp, setCacheTimestamp] = useState<number>(() =>
    parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0')
  );

  // Check for version update on app load
  useEffect(() => {
    const checkForVersionUpdate = () => {
      // Get the current version from a meta tag or environment variable
      const currentVersion = getAppVersion();

      if (currentVersion !== cacheVersion) {
        console.log('[Cache] Version changed:', cacheVersion, '->', currentVersion);
        handleVersionUpdate(currentVersion);
      }
    };

    checkForVersionUpdate();

    // Check periodically for updates (every 5 minutes)
    const interval = setInterval(checkForVersionUpdate, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [cacheVersion]);

  return { cacheVersion, cacheTimestamp, forceCacheRefresh };
};

// Get the current app version from package.json or meta tag
const getAppVersion = (): string => {
  // First try to get from meta tag
  const versionMeta = document.querySelector('meta[name="app-version"]');
  if (versionMeta && versionMeta.getAttribute('content')) {
    return versionMeta.getAttribute('content')!;
  }

  // Fallback to a more sophisticated approach
  // This could be injected by the build process
  const buildHash = getBuildHash();
  return `build-${buildHash}`;
};

// Extract build hash from current script
const getBuildHash = (): string => {
  try {
    // Try to get the build hash from current script URL
    const scripts = document.querySelectorAll('script[src]');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const src = script.getAttribute('src') || '';
      if (src.includes('/assets/index-')) {
        const hash = src.match(/\/assets\/index-([a-f0-9-]+\.js)/)?.[1];
        if (hash) {
          return hash;
        }
      }
    }
  } catch (error) {
    console.warn('[Cache] Failed to extract build hash:', error);
  }

  // Fallback to current timestamp
  return Date.now().toString(36);
};

// Handle version update operations
const handleVersionUpdate = (newVersion: string) => {
  console.log('[Cache] Processing version update to:', newVersion);

  // Update stored version
  setCacheVersion(newVersion);
  localStorage.setItem(CACHE_VERSION_KEY, newVersion);

  // Update timestamp
  const timestamp = Date.now();
  setCacheTimestamp(timestamp);
  localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());

  // Clear old cache entries
  clearOldCacheEntries(newVersion);

  // Notify service worker about the version change
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'VERSION_UPDATE',
      version: newVersion,
      timestamp: timestamp
    });
  }

  // Optional: Show user notification
  showVersionUpdateNotification();
};

// Clear cache entries that don't match the new version
const clearOldCacheEntries = (newVersion: string) => {
  try {
    // Find cache caches and clear ones that don't match version
    caches.keys().then(names => {
      names.forEach(name => {
        if (!name.includes(newVersion)) {
          console.log('[Cache] Clearing old cache:', name);
          caches.delete(name);
        }
      });
    });
  } catch (error) {
    console.warn('[Cache] Failed to clear old caches:', error);
  }
};

// Show notification to user about version update
const showVersionUpdateNotification = () => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #3498db;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    z-index: 10001;
    cursor: pointer;
    transition: all 0.3s ease;
  `;
  notification.innerHTML = '🔄 App updated with latest features!';

  notification.onclick = () => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  };

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);

  document.body.appendChild(notification);
};

// Force refresh of all caches (for debugging or emergencies)
const forceCacheRefresh = () => {
  console.log('[Cache] Forced cache refresh initiated');

  // Clear all application caches
  caches.keys().then(names => {
    return Promise.all(names.map(name => caches.delete(name)));
  }).then(() => {
    console.log('[Cache] All caches cleared, forcing page reload');
    window.location.reload();
  }).catch(error => {
    console.error('[Cache] Failed to clear caches:', error);
  });
};

// Export utility functions for external use
export const cacheUtils = {
  getCacheVersion: () => localStorage.getItem(CACHE_VERSION_KEY),
  getCacheTimestamp: () => parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0'),
  clearAllCaches: forceCacheRefresh,
  updateVersion: handleVersionUpdate
};

// Setters for state (used internally)
const setCacheVersion = (version: string) => {
  // This would normally update component state, but for now just logs
  console.log('[Cache] Version set to:', version);
};

const setCacheTimestamp = (timestamp: number) => {
  // This would normally update component state, but for now just logs
  console.log('[Cache] Timestamp set to:', timestamp);
};
