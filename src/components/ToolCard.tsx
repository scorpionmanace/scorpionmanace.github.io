import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../hooks/useTools';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
  };

  const cardIconStyle: React.CSSProperties = {
    fontSize: '3.5rem',
    textAlign: 'center',
    marginBottom: '20px',
    display: 'block',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '12px',
    textAlign: 'center',
  };

  const cardDescriptionStyle: React.CSSProperties = {
    color: '#4a5568',
    fontSize: '1rem',
    lineHeight: '1.6',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const cardCategoryStyle: React.CSSProperties = {
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const actionStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#3182ce',
    fontWeight: '500',
    fontSize: '1rem',
  };

  const isToolAvailable = tool.route !== '#';

  const CardComponent = isToolAvailable ? Link : 'div';
  const cardProps = isToolAvailable
    ? {
        to: tool.route,
        className: "tool-card",
        onMouseEnter: (e: React.MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(-5px)';
          target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        },
        onMouseLeave: (e: React.MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(0)';
          target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        },
        style: cardStyle
      }
    : {
        className: "tool-card coming-soon",
        style: { ...cardStyle, opacity: 0.7 }
      };

  return (
    <CardComponent {...(cardProps as any)}>
      <span style={cardIconStyle}>{tool.icon}</span>
      <div style={cardCategoryStyle}>{tool.category}</div>
      <h3 style={cardTitleStyle}>{tool.name}</h3>
      <p style={cardDescriptionStyle}>{tool.description}</p>
      <div style={actionStyle}>
        {isToolAvailable ? 'Launch Tool →' : 'Coming Soon'}
      </div>
    </CardComponent>
  );
};

export default ToolCard;
