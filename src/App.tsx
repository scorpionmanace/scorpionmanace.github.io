import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

// Advanced service worker registration with cache busting
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      console.log('[SW] Service worker registered successfully:', registration);

      registration.addEventListener('updatefound', () => {
        console.log('[SW] New service worker found, installing...');
        const newWorker = registration.installing!;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('[SW] New version available! Refresh page to activate.');
              // Optional: Show user notification about update
              showUpdateNotification();
            } else {
              console.log('[SW] Service worker installed for the first time');
            }
          }
        });
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

    } catch (error) {
      console.error('[SW] Service worker registration failed:', error);
    }
  }
};

const showUpdateNotification = () => {
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #2ecc71;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    z-index: 10000;
    cursor: pointer;
    transition: opacity 0.3s ease;
  `;
  notification.innerHTML = '⚡ App updated! Click to refresh';

  notification.onclick = () => {
    navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  };

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }
  }, 10000);

  document.body.appendChild(notification);
};

// Lazy load components for better code splitting
const Home = React.lazy(() => import('./views/Home'));
const About = React.lazy(() => import('./pages/About'));
const JSONParserView = React.lazy(() => import('./tools/json-parser/components/JSONParserView'));
const ColorPickerView = React.lazy(() => import('./views/ColorPickerView'));
const DataConverterView = React.lazy(() => import('./tools/data-converter/components/DataConverterView'));
const Tools = React.lazy(() => import('./views/Tools'));
const ChakraUIView = React.lazy(() => import('./views/ChakraUIView'));
const CodeFormatter = React.lazy(() => import('./components/CodeFormatter'));
const CodePlayground = React.lazy(() => import('./components/CodePlayground'));

const App: React.FC = () => {
  // Register service worker for advanced cache busting
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors flex flex-col">
        <header role="banner">
          <Header />
        </header>

        <nav aria-label="Secondary navigation" role="navigation">
          <SubHeader />
        </nav>

        <nav aria-label="Breadcrumb navigation" role="navigation">
          <Breadcrumbs />
        </nav>

        <main
          id="main-content"
          className="flex-1 flex flex-col"
          role="main"
        >
          <Suspense fallback={
            <div
              className="flex-1 flex items-center justify-center min-h-[400px] dark:bg-gray-900"
              aria-live="polite"
              aria-label="Loading application content"
            >
              <div className="p-8 bg-white dark:bg-gray-800 border rounded-lg shadow-lg text-center transition-colors" role="status">
                <div className="sr-only">Loading Karan Khare's development portfolio and tools...</div>
                <span aria-hidden="true">Loading...</span>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/json-parser" element={<JSONParserView />} />
              <Route path="/color-picker" element={<ColorPickerView />} />
              <Route path="/data-converter" element={<DataConverterView />} />
              <Route path="/code-formatter" element={<CodeFormatter />} />
              <Route path="/code-playground" element={<CodePlayground />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/chakra-ui" element={<ChakraUIView />} />
            </Routes>
          </Suspense>
        </main>

        <footer role="contentinfo">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
