/**
 * Service worker registration.
 *
 * Previously this logic existed twice — once here and once inline in App.tsx,
 * with the inline copy injecting a hard-coded green toast. It now lives here
 * only, and the update prompt is rendered with the site's design tokens.
 */

const showUpdateNotification = (onAccept: () => void) => {
  if (document.getElementById('sw-update-toast')) return;

  const toast = document.createElement('button');
  toast.id = 'sw-update-toast';
  toast.type = 'button';
  toast.textContent = 'A new version is available — refresh';
  toast.setAttribute('aria-live', 'polite');
  toast.style.cssText = `
    position: fixed;
    inset-block-end: 1.5rem;
    inset-inline-start: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid var(--ui-line);
    border-radius: 999px;
    background: var(--ui-surface);
    color: var(--ui-ink);
    font: 500 0.875rem/1 var(--font-sans, system-ui);
    box-shadow: var(--ui-shadow-lg);
    cursor: pointer;
    transition: opacity 0.3s ease;
  `;

  const dismiss = () => {
    toast.style.opacity = '0';
    window.setTimeout(() => toast.remove(), 300);
  };

  toast.onclick = () => {
    onAccept();
    dismiss();
  };

  window.setTimeout(dismiss, 12000);
  document.body.appendChild(toast);
};

/** localhost, 127.0.0.1, and ::1 — where `vite preview` runs. */
const isLocalHost = (): boolean =>
  ['localhost', '127.0.0.1', '[::1]', '::1'].includes(window.location.hostname);

export const registerServiceWorker = async (): Promise<void> => {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  // `vite preview` serves a production build on localhost, which would register
  // this worker against localhost and then serve assets stale-while-revalidate.
  // That makes a rebuilt CSS bundle appear not to apply until a hard reload —
  // so keep the worker off local hosts entirely.
  if (isLocalHost()) {
    await unregisterServiceWorker();
    return;
  }

  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const registration = await navigator.serviceWorker.register(`${basePath}service-worker.js`, {
      scope: basePath,
    });

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        // Only prompt when an *existing* worker is being replaced; a first
        // install has nothing to refresh into.
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateNotification(() => newWorker.postMessage({ type: 'SKIP_WAITING' }));
        }
      });
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  } catch (error) {
    console.error('[SW] registration failed:', error);
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) return;
  // Not `.ready`, which never resolves when nothing is registered.
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));
};

export default { registerServiceWorker, unregisterServiceWorker };
