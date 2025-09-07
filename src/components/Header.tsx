import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Text, Flex, useBreakpointValue } from '@chakra-ui/react';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  const logoSize = useBreakpointValue({ base: '30px', md: '40px' });
  const titleSize = useBreakpointValue({ base: '1.2rem', md: '1.5rem' });
  const padding = useBreakpointValue({ base: '1rem', md: '1rem 2rem' });

  return (
    <Box
      as="header"
      bg="linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
      boxShadow="0 4px 12px rgba(0,0,0,0.15)"
      p={padding}
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    >
      {/* Centered Logo/Branding */}
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
    </Box>
  );
};

export default Header;
