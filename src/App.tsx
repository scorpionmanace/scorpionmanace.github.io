import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="app-bar">
        <span className="headline">React MATERIAL DESIGN</span>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
