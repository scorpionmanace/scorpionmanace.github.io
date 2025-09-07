import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';

// Lazy load components for better code splitting
const Home = React.lazy(() => import('./views/Home'));
const About = React.lazy(() => import('./views/About'));
const JSONParserView = React.lazy(() => import('./views/JSONParserView'));
const Tools = React.lazy(() => import('./views/Tools'));

const App: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <SubHeader />

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
            <Route path="/tools" element={<Tools />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
