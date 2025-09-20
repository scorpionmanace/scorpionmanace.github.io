import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <SubHeader />
      <Breadcrumbs />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Suspense fallback={
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              Loading...
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

      <Footer />
    </div>
  );
};

export default App;
