import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './registerServiceWorker';

const container = document.getElementById('root');
if (!container) {
  console.error('Failed to find the root element');
}
const root = createRoot(container!);
console.log('Main.tsx executed, mounting React app');

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can register

// the service worker.

serviceWorker.register();
