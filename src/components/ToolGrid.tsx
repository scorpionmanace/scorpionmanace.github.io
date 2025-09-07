import React from 'react';
import ToolCard from './ToolCard';
import { Tool } from '../hooks/useTools';

interface ToolGridProps {
  tools: Tool[];
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    padding: '0 20px',
  };

  return (
    <div style={gridStyle}>
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};

export default ToolGrid;
