export function register() {
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const basePath = import.meta.env.BASE_URL || '/';
      const swScript = basePath + 'service-worker.js';
      navigator.serviceWorker.register(swScript).then(registration => {
        console.log(
          "App is being served from cache by a service worker.\n" +
            "For more details, visit https://goo.gl/AFskqB"
        );
      }).catch(error => {
        console.log('SW registration failed: ', error);
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

// For import * as serviceWorker, make it an object
const serviceWorker = { register, unregister };

export default serviceWorker;
