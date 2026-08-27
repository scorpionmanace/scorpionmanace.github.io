import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import ScrollProgress from './components/layout/ScrollProgress';
import { ThemeProvider } from './contexts/ThemeContext';
import { registerServiceWorker } from './registerServiceWorker';
import { pageVariants } from './design/motion';

const Home = React.lazy(() => import('./views/Home'));
const About = React.lazy(() => import('./pages/About'));
const Tools = React.lazy(() => import('./views/Tools'));
const JSONParserView = React.lazy(() => import('./tools/json-parser/components/JSONParserView'));
const ColorPickerView = React.lazy(() => import('./views/ColorPickerView'));
const DataConverterView = React.lazy(
  () => import('./tools/data-converter/components/DataConverterView'),
);
const APITesterView = React.lazy(() => import('./tools/api-tester/components/APITesterView'));
const CodeFormatter = React.lazy(() => import('./components/CodeFormatter'));
const CodePlayground = React.lazy(() => import('./components/CodePlayground'));
const ComponentLabView = React.lazy(() => import('./views/ComponentLabView'));
const NotFound = React.lazy(() => import('./views/NotFound'));

/** Skeleton shown while a route chunk downloads. */
const RouteFallback: React.FC = () => (
  <div
    className="flex flex-1 items-center justify-center px-5 py-32"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-4">
      <motion.span
        className="h-8 w-8 rounded-full border-2 border-line border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      />
      <span className="eyebrow">Loading</span>
    </div>
  </div>
);

/** Resets scroll position on every navigation. */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-1 flex-col"
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/json-parser" element={<JSONParserView />} />
            <Route path="/color-picker" element={<ColorPickerView />} />
            <Route path="/data-converter" element={<DataConverterView />} />
            <Route path="/api-tester" element={<APITesterView />} />
            <Route path="/code-formatter" element={<CodeFormatter />} />
            <Route path="/code-playground" element={<CodePlayground />} />
            <Route path="/component-lab" element={<ComponentLabView />} />
            {/* Former route, kept so existing links and search results resolve. */}
            <Route path="/chakra-ui" element={<Navigate to="/component-lab" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <ThemeProvider>
      <ScrollProgress />
      <ScrollToTop />

      <div className="flex min-h-screen flex-col bg-canvas text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main-content" className="flex flex-1 flex-col">
          <AnimatedRoutes />
        </main>

        <SiteFooter />
      </div>
    </ThemeProvider>
  );
};

export default App;
