import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  console.error('Failed to find the root element');
} else {
  console.log('Found root element, mounting React app');
  const root = createRoot(container);
  console.log('Main.tsx executed, mounting React app');
  try {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Error during React render:', error);
  }
}

// If you want your app to work offline and load faster, you can register

// the service worker.

serviceWorker.register();
