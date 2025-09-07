import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

interface ToolsHeaderProps {
  title: string;
  subtitle: string;
}

const ToolsHeader: React.FC<ToolsHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box textAlign="center" mb={{ base: 10, md: 12 }}>
      <Heading
        as="h1"
        size={{ base: 'xl', md: '2xl' }}
        color="#2d3748"
        mb={{ base: 4, md: 5 }}
        fontWeight="bold"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        {title}
      </Heading>
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        color="#4a5568"
        maxW="600px"
        mx="auto"
        lineHeight="1.6"
      >
        {subtitle}
      </Text>
    </Box>
  );
};

export default ToolsHeader;
