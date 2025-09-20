import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Badge, useBreakpointValue } from '@chakra-ui/react';
import { useTheme } from '../contexts/ThemeContext';
import { Tool } from '../hooks/useTools';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { currentTheme } = useTheme();
  const iconSize = useBreakpointValue({ base: '3rem', md: '3.5rem' });
  const titleSize = useBreakpointValue({ base: '1.25rem', md: '1.5rem' });
  const descSize = useBreakpointValue({ base: '0.9rem', md: '1rem' });
  const paddingValue = useBreakpointValue({ base: 6, md: 8 });
  const categoryFontSize = useBreakpointValue({ base: '0.75rem', md: '0.8rem' });

  const isToolAvailable = tool.route !== '#';

  const cardBg = currentTheme === 'dark' ? 'gray.700' : 'white';
  const cardBorder = currentTheme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0';
  const titleColor = currentTheme === 'dark' ? 'white' : 'gray.900';
  const textColor = currentTheme === 'dark' ? 'gray.300' : 'gray.600';
  const linkColor = currentTheme === 'dark' ? '#60a5fa' : '#3182ce';
  const badgeBg = currentTheme === 'dark' ? 'gray.600' : '#edf2f7';
  const badgeColor = currentTheme === 'dark' ? 'gray.200' : '#4a5568';

  return (
    isToolAvailable ? (
      <Link
        to={tool.route}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box
          bg={cardBg}
          borderRadius="lg"
          p={paddingValue}
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.05)"
          border={cardBorder}
          transition="all 0.3s ease"
          cursor="pointer"
          display="block"
          position="relative"
          overflow="hidden"
          _hover={{ transform: 'translateY(-5px)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
        >
          <Text
            fontSize={iconSize}
            textAlign="center"
            mb={4}
            display="block"
          >
            {tool.icon}
          </Text>
          <Badge
            bg={badgeBg}
            color={badgeColor}
            px={3}
            py={1}
            borderRadius="full"
            fontSize={categoryFontSize}
            fontWeight="500"
            mx="auto"
            display="block"
            mb={3}
          >
            {tool.category}
          </Badge>
          <Text
            fontSize={titleSize}
            fontWeight="bold"
            color={titleColor}
            textAlign="center"
            mb={3}
          >
            {tool.name}
          </Text>
          <Text
            color={textColor}
            fontSize={descSize}
            lineHeight="1.6"
            textAlign="center"
            mb={5}
          >
            {tool.description}
          </Text>
          <Text
            textAlign="center"
            color={linkColor}
            fontWeight="500"
            fontSize={descSize}
          >
            Launch Tool →
          </Text>
        </Box>
      </Link>
    ) : (
      <Box
        bg={cardBg}
        borderRadius="lg"
        p={paddingValue}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.05)"
        border={cardBorder}
        transition="all 0.3s ease"
        cursor="default"
        display="block"
        position="relative"
        overflow="hidden"
        opacity={0.7}
      >
        <Text
          fontSize={iconSize}
          textAlign="center"
          mb={4}
          display="block"
        >
          {tool.icon}
        </Text>
        <Badge
          bg={badgeBg}
          color={badgeColor}
          px={3}
          py={1}
          borderRadius="full"
          fontSize={categoryFontSize}
          fontWeight="500"
          mx="auto"
          display="block"
          mb={3}
        >
          {tool.category}
        </Badge>
        <Text
          fontSize={titleSize}
          fontWeight="bold"
          color={titleColor}
          textAlign="center"
          mb={3}
        >
          {tool.name}
        </Text>
        <Text
          color={textColor}
          fontSize={descSize}
          lineHeight="1.6"
          textAlign="center"
          mb={5}
        >
          {tool.description}
        </Text>
        <Text
          textAlign="center"
          color={linkColor}
          fontWeight="500"
          fontSize={descSize}
        >
          Coming Soon
        </Text>
      </Box>
    )
  );
};

export default ToolCard;
