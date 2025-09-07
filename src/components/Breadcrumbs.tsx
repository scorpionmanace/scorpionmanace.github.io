import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Text, Flex, useBreakpointValue } from '@chakra-ui/react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/tools': 'Development Tools',
  '/json-parser': 'JSON Parser'
};

const skipBreadcrumbRoutes = ['/'];

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Don't show breadcrumbs on root/home routes
  if (skipBreadcrumbRoutes.includes(currentPath)) {
    return null;
  }

  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];
    const pathSegments = currentPath.split('/').filter(Boolean);

    // Always start with Home
    breadcrumbs.push({ label: 'Home', path: '/' });

    let accumulatedPath = '';
    pathSegments.forEach((segment, index) => {
      let accumulatedPath = '';
      pathSegments.forEach((segment, index) => {
        accumulatedPath += `/${segment}`;
        const label = routeLabels[accumulatedPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
        breadcrumbs.push({ label, path: accumulatedPath });
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  const py = useBreakpointValue({ base: 4, md: 6 });
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const paddingX = useBreakpointValue({ base: 2, md: 4 });
  const margin = useBreakpointValue({ base: 2, md: 4 });

  return (
    <Box as="nav" py={py} px={{ base: 4, md: 6 }}>
      <Flex align="center" wrap="wrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.path}>
            <Flex align="center">
              {index < breadcrumbs.length - 1 ? (
                <Link to={breadcrumb.path} style={{ color: '#3182ce', textDecoration: 'none' }}>
                  <Text
                    display="inline-block"
                    px={paddingX}
                    py={1}
                    borderRadius="sm"
                    _hover={{ bg: '#edf2f7' }}
                    transition="all 0.2s ease"
                    fontSize={fontSize}
                  >
                    {breadcrumb.label}
                  </Text>
                </Link>
              ) : (
                <Text
                  fontSize={fontSize}
                  color="#2d3748"
                  fontWeight="500"
                  px={paddingX}
                  py={1}
                >
                  {breadcrumb.label}
                </Text>
              )}
            </Flex>
            {index < breadcrumbs.length - 1 && (
              <Text
                mx={margin}
                color="#a0aec0"
                fontSize={fontSize}
              >
                /
              </Text>
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default Breadcrumbs;
