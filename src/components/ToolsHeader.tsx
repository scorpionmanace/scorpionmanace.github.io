import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { useTheme } from '../contexts/ThemeContext';

interface ToolsHeaderProps {
  title: string;
  subtitle: string;
}

const ToolsHeader: React.FC<ToolsHeaderProps> = ({ title, subtitle }) => {
  const { currentTheme, isInitialized } = useTheme();

  // Return minimal render until theme is initialized
  if (!isInitialized) {
    return (
      <Box textAlign="center" mb={{ base: 10, md: 12 }}>
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }} color="gray.900" mb={{ base: 4, md: 5 }} fontWeight="bold" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
          {title}
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" maxW="600px" mx="auto" lineHeight="1.6">
          {subtitle}
        </Text>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mb={{ base: 10, md: 12 }}>
      <Heading
        as="h1"
        size={{ base: 'xl', md: '2xl' }}
        color={currentTheme === 'dark' ? 'white' : 'gray.900'}
        mb={{ base: 4, md: 5 }}
        fontWeight="bold"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        {title}
      </Heading>
      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        color={currentTheme === 'dark' ? 'gray.300' : 'gray.600'}
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
