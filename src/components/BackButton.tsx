import React from 'react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, text }) => {
  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#4a5568',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  return (
    <Link
      to={to}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2d3748';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#4a5568';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      ← {text}
    </Link>
  );
};

export default BackButton;
