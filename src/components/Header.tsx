import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Logo on the left */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ReactRouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '12px'
            }}
          />
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none'
          }}>
            Karan Khare
          </span>
        </ReactRouterLink>
      </div>

      {/* Navigation on the right */}
      <nav>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: '0',
          padding: '0',
          gap: '2rem'
        }}>
          <li>
            <ReactRouterLink
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </ReactRouterLink>
          </li>
          <li>
            <ReactRouterLink
              to="/about"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              About
            </ReactRouterLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
