import React from 'react';

interface ToolsHeaderProps {
  title: string;
  subtitle: string;
}

const ToolsHeader: React.FC<ToolsHeaderProps> = ({ title, subtitle }) => {
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '50px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    color: '#4a5568',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  };

  return (
    <div style={headerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={subtitleStyle}>{subtitle}</p>
    </div>
  );
};

export default ToolsHeader;
