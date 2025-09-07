import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const SubHeader: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderBottom: '1px solid #dee2e6',
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'sticky',
      top: '85px', // Height of main header (adjusted for simplified header)
      zIndex: 500,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      {/* Navigation centered */}
      <nav>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: '0',
          padding: '0',
          gap: '3rem'
        }}>
          <li>
            <ReactRouterLink
              to="/"
              style={{
                color: '#2d3748',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              🏠 Home
            </ReactRouterLink>
          </li>
          <li>
            <ReactRouterLink
              to="/tools"
              style={{
                color: '#2d3748',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              🔧 Development Tools
            </ReactRouterLink>
          </li>
          <li>
            <ReactRouterLink
              to="/about"
              style={{
                color: '#2d3748',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              📄 About
            </ReactRouterLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SubHeader;
