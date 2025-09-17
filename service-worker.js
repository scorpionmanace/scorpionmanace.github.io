/**
 * Advanced Service Worker for Cache Busting
 * Features:
 * - Versioned cache for automatic invalidation
 * - Stale-while-revalidate for assets
 * - Network-first for API calls
 * - Automatic cleanup of old caches
 */

// Configuration
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const API_CACHE = `api-cache-${CACHE_VERSION}`;

// Assets to cache - Vite automatically handles hashing, so we'll cache what's available
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt'
];

// Files that may benefit from versioning
const CACHEABLE_PATTERNS = [
  /\/assets\//i,  // Vite assets
  /\.css$/i,      // Stylesheets
  /\.js$/i,       // JavaScripts
  /favicon\.ico$/i,
  /robots\.txt$/i,
  /manifest\.json$/i
];

// API endpoints that can be cached
const CACHEABLE_API_ENDPOINTS = [
  '/api/v1/',
  '/data/',
  '/config/'
];

// File patterns to never cache
const NEVER_CACHE_PATTERNS = [
  /\/\.well-known\//i, // ACME challenges
  / \/admin\//i,      // Admin pages
  /\.(php|jsp|jspx|asp|aspx|cgi|pl)$/i, // Server-side files
  /\?/,              // Files with query parameters (likely dynamic)
  /_nocache/i        // Explicitly marked to not cache
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');
  event.waitUntil(
    // Pre-cache static assets
    caches.open(STATIC_CACHE).then(cache => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(error => {
        console.warn('[SW] Some static assets failed to cache:', error);
        return Promise.resolve(); // Don't fail installation
      });
    }).then(() => {
      console.log('[SW] Service worker installed successfully');
      return self.skipWaiting(); // Skip waiting and activate immediately
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      cleanupOldCaches(),

      // Take control of all open clients
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] Service worker activated');
    })
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external domains
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip never-cache patterns
  if (shouldNeverCache(event.request.url)) {
    return;
  }

  // Handle API calls with network-first strategy
  if (isApiCall(url)) {
    event.respondWith(handleApiRequest(event));
    return;
  }

  // Handle static assets with stale-while-revalidate
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(event));
    return;
  }

  // Default fallback to network-first for pages
  event.respondWith(handlePageRequest(event));
});

// Clean up old caches
async function cleanupOldCaches() {
  const keys = await caches.keys();

  const oldVersions = keys.filter(key =>
    key.includes('app-cache-') && !key.includes(CACHE_VERSION) ||
    key.includes('static-cache-') && !key.includes(CACHE_VERSION) ||
    key.includes('api-cache-') && !key.includes(CACHE_VERSION)
  );

  if (oldVersions.length > 0) {
    console.log('[SW] Cleaning up old caches:', oldVersions);
    await Promise.all(oldVersions.map(key => caches.delete(key)));
  }
}

// Determine if request should never be cached
function shouldNeverCache(url) {
  return NEVER_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Check if it's an API call
function isApiCall(url) {
  return CACHEABLE_API_ENDPOINTS.some(endpoint =>
    url.pathname.startsWith(endpoint)
  );
}

// Check if it's a static asset
function isStaticAsset(url) {
  return CACHEABLE_PATTERNS.some(pattern =>
    pattern.test(url.pathname)
  );
}

// Handle API requests with network-first strategy
async function handleApiRequest(event) {
  const cache = await caches.open(API_CACHE);

  try {
    // Try network first
    const networkResponse = await fetch(event.request);
    if (networkResponse.ok) {
      // Cache the response
      cache.put(event.request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.warn('[SW] Network request failed, trying cache:', error);
  }

  // Fall back to cache
  const cachedResponse = await cache.match(event.request);
  if (cachedResponse) {
    console.log('[SW] Serving API response from cache');
    return cachedResponse;
  }

  // Return error response
  return new Response(JSON.stringify({ error: 'Network unavailable' }), {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle static assets with stale-while-revalidate
async function handleStaticAsset(event) {
  const cache = await caches.open(STATIC_CACHE);

  // Try cache first
  const cachedResponse = await cache.match(event.request);
  if (cachedResponse) {
    // Serve from cache immediately
    console.log('[SW] Serving static asset from cache:', event.request.url);

    // Then update cache in background if different hash
    updateAssetInBackground(event, cache);

    return cachedResponse;
  }

  // Cache missed, fetch from network
  try {
    const networkResponse = await fetch(event.request);
    if (networkResponse.ok) {
      cache.put(event.request, networkResponse.clone());
      console.log('[SW] Cached new static asset:', event.request.url);
      return networkResponse;
    }
  } catch (error) {
    console.error('[SW] Failed to fetch static asset:', error);
  }

  return new Response('Asset not found', { status: 404 });
}

// Handle page requests with network-first strategy
async function handlePageRequest(event) {
  try {
    // Try network first
    const networkResponse = await fetch(event.request);
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network unavailable, falling back to offline page');

    // Try to serve app shell from cache
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match('/');

    if (cachedResponse) {
      console.log('[SW] Serving app shell from cache');
      return cachedResponse;
    }

    // Final fallback
    return new Response('<h1>Offline</h1><p>Please check your internet connection and try again.</p>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Update asset in background for future requests
function updateAssetInBackground(event, cache) {
  fetch(event.request).then(response => {
    if (response.ok) {
      cache.put(event.request, response);
      console.log('[SW] Updated cached asset:', event.request.url);
    }
  }).catch(error => {
    console.debug('[SW] Background update failed:', error);
  });
}

// Handle version updates from the app
function handleVersionUpdate(newVersion, timestamp) {
  console.log('[SW] Processing version update:', newVersion, 'at', new Date(timestamp));

  // Ensure we have the updated version constants
  const updatedStaticCache = `static-cache-${newVersion}`;
  const updatedApiCache = `api-cache-${newVersion}`;

  // Clear any old caches that don't match the new version
  caches.keys().then(names => {
    names.forEach(name => {
      if (name.includes('static-cache-') && !name.includes(newVersion)) {
        console.log('[SW] Clearing old static cache:', name);
        caches.delete(name);
      }
      if (name.includes('api-cache-') && !name.includes(newVersion)) {
        console.log('[SW] Clearing old API cache:', name);
        caches.delete(name);
      }
    });
  });

  // Notify clients that version update is complete
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'VERSION_UPDATE_COMPLETE',
        version: newVersion,
        timestamp: timestamp
      });
    });
  });
}

// Utility functions for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skipping waiting for new service worker');
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[SW] Received cache clear request');
    cleanupOldCaches().then(() => {
      // Broadcast that cache has been cleared
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'CACHE_CLEARED',
            timestamp: Date.now()
          });
        });
      });
    });
  }

  if (event.data && event.data.type === 'VERSION_UPDATE') {
    console.log('[SW] Received version update:', event.data.version);
    handleVersionUpdate(event.data.version, event.data.timestamp);
  }
});

// Exported for potential future use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CACHE_VERSION,
    CACHE_NAME,
    shouldNeverCache,
    isApiCall,
    isStaticAsset
  };
}
