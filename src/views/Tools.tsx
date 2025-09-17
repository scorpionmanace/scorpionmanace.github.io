import React from 'react';
import { useTools } from '../hooks/useTools';
import ToolsHeader from '../components/ToolsHeader';
import ToolGrid from '../components/ToolGrid';
import Breadcrumbs from '../components/Breadcrumbs';

const Tools: React.FC = () => {
  const { tools } = useTools();

  const containerStyle: React.CSSProperties = {
    padding: '3.75rem 1.25rem',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    flex: 1,
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '75rem',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0.25rem;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .tool-card:hover::before {
          transform: scaleX(1);
        }

        .tool-card.coming-soon {
          opacity: 0.7;
        }
      `}</style>

      <div style={contentStyle}>
        <Breadcrumbs />

        <ToolsHeader
          title="Development Tools"
          subtitle="Explore our comprehensive collection of web development tools designed to streamline your workflow and boost productivity."
        />

        <ToolGrid tools={tools} />
      </div>
    </div>
  );
};

export default Tools;
