import React from 'react';
import ToolCard from './ToolCard';
import { Tool } from '../hooks/useTools';
import { Box, useBreakpointValue } from '@chakra-ui/react';

interface ToolGridProps {
  tools: Tool[];
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  const gridTemplateColumns = useBreakpointValue({ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' });
  const gap = useBreakpointValue({ base: '24px', md: '32px' });

  return (
    <Box px={{ base: 4, md: 6 }}>
      <Box
        display="grid"
        gridTemplateColumns={gridTemplateColumns}
        gap={gap}
      >
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </Box>
    </Box>
  );
};

export default ToolGrid;
