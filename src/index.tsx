import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import App from './App';
import './index.css';

const system = createSystem(defaultConfig);

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
        <ChakraProvider value={system}>
          <HashRouter>
            <App />
          </HashRouter>
        </ChakraProvider>
      </React.StrictMode>
    );
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Error during React render:', error);
  }
}

// Service worker removed as it's not needed for GitHub Pages
// and was causing caching issues
