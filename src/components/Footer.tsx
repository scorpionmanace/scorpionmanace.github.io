import React from 'react';
import {
  Box,
  Text,
  Heading,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const gridTemplateColumns = useBreakpointValue({ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' });
  const spacing = useBreakpointValue({ base: '2rem', md: '3rem' });

  return (
    <Box
      as="footer"
      bg="#2d3748"
      color="#a0aec0"
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 12 }}
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      mt="auto"
    >
      <Box maxW="1200px" mx="auto">
        <Box
          display="grid"
          gridTemplateColumns={gridTemplateColumns}
          gap={spacing}
          alignItems="start"
        >
          {/* Brand Section */}
          <Box>
            <Heading
              size={{ base: 'md', md: 'lg' }}
              color="#e2e8f0"
              mb={{ base: 4, md: 4 }}
            >
              App Portfolio
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight="1.6"
              mb={{ base: 4, md: 0 }}
            >
              A collection of innovative web applications, games, and development tools
              built with modern technologies and best practices.
            </Text>
          </Box>

          {/* Quick Links */}
          <Box>
            <Heading
              size={{ base: 'sm', md: 'md' }}
              color="#e2e8f0"
              textTransform="uppercase"
              letterSpacing="0.5px"
              mb={{ base: 4, md: 4 }}
            >
              Quick Links
            </Heading>
            <Box display="flex" flexDirection="column" gap={{ base: 2, md: 2 }}>
              {[
                { href: "#home", text: "Home" },
                { href: "#tools", text: "Development Tools" },
                { href: "#about", text: "About" },
                { href: "#contact", text: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  color="#a0aec0"
                  textDecoration="none"
                  fontSize={{ base: 'sm', md: 'md' }}
                  _hover={{ color: '#e2e8f0' }}
                  transition="color 0.3s ease"
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Technologies */}
          <Box>
            <Heading
              size={{ base: 'sm', md: 'md' }}
              color="#e2e8f0"
              textTransform="uppercase"
              letterSpacing="0.5px"
              mb={{ base: 4, md: 4 }}
            >
              Built With
            </Heading>
            <Box display="flex" flexDirection="column" gap={{ base: 2, md: 2 }}>
              <Text fontSize={{ base: 'sm', md: 'md' }}>⚛️ React & TypeScript</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>⚡ Vite & Modern Tools</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>🎨 Styled Components</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>🌐 Web Standards</Text>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          mt={{ base: 8, md: 16 }}
          pt={6}
          borderTop="1px solid #4a5568"
          textAlign="center"
        >
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="#718096"
          >
            © {currentYear} App Portfolio. Built with ❤️ using modern web technologies.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
