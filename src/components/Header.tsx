import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Text, Flex, useBreakpointValue, Button } from '@chakra-ui/react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const logoSize = useBreakpointValue({ base: '30px', md: '40px' });
  const titleSize = useBreakpointValue({ base: '1.2rem', md: '1.5rem' });
  const padding = useBreakpointValue({ base: '1rem', md: '1rem 2rem' });

  const headerGradient = currentTheme === 'dark'
    ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';

  return (
    <Box
      as="header"
      bg={headerGradient}
      boxShadow={currentTheme === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.15)'}
      p={padding}
      className="relative"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    >
      {/* Left: Branding */}
      <Flex alignItems="center">
        <ReactRouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: logoSize,
              height: logoSize,
              marginRight: useBreakpointValue({ base: '12px', md: '16px' })
            }}
          />
          <Text
            fontSize={titleSize}
            fontWeight="bold"
            color="white"
            textDecoration="none"
          >
            Karan Khare
          </Text>
        </ReactRouterLink>
      </Flex>

      {/* Right: Theme Toggle */}
      <Button
        onClick={toggleTheme}
        size="sm"
        variant="outline"
        colorScheme="whiteAlpha"
        _hover={{ bg: 'whiteAlpha.200' }}
        display={{ base: 'none', md: 'inline-flex' }} // Hide on mobile for simplicity
      >
        {currentTheme === 'light' ? '🌙' : '☀️'}
      </Button>
    </Box>
  );
};

export default Header;
