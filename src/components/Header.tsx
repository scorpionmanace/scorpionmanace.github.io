import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useHeaderStyles } from './Header/hook/useHeaderStyles';

const Header: React.FC = () => {
  const { headerStyles } = useHeaderStyles();
  return (
    <header style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Centered Logo/Branding */}
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
    </header>
  );
};

export default Header;
