import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePxToRem } from '@core/hooks/usePxToRem';

// Route to breadcrumb label mapping
const ROUTE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/tools': 'Development Tools',
  '/json-parser': 'JSON Parser',
  '/color-picker': 'Color Picker',
  '/code-formatter': 'Code Formatter',
  '/code-playground': 'Code Playground',
  '/chakra-ui': 'Chakra UI Demo',
  '/data-converter': 'Data Converter',
  '/text-utils': 'Text Utilities',
  '/api-tester': 'API Tester'
};

// Routes to skip breadcrumb display
const SKIP_BREADCRUMB_ROUTES = ['/'];

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { pxToRem } = usePxToRem();

  // Don't show breadcrumbs on routes specified to skip
  const shouldShowBreadcrumbs = useMemo(() => {
    return !SKIP_BREADCRUMB_ROUTES.includes(currentPath);
  }, [currentPath]);

  // Define hierarchical relationships for tool routes
  const TOOL_ROUTES = [
    '/json-parser',
    '/color-picker',
    '/code-formatter',
    '/code-playground',
    '/chakra-ui'
  ];

  // Generate breadcrumb items from current path
  const breadcrumbs = useMemo(() => {
    if (currentPath === '/') return [];

    const breadcrumbItems: { label: string; path: string; isActive: boolean }[] = [
      { label: 'Home', path: '/', isActive: false }
    ];

    // Check if current route is a tool route that should show hierarchy
    const isToolRoute = TOOL_ROUTES.includes(currentPath);

    if (isToolRoute && currentPath !== '/tools') {
      // Add "Development Tools" to the hierarchy
      breadcrumbItems.push({
        label: 'Development Tools',
        path: '/tools',
        isActive: false
      });
    }

    // Add the current route
    const isActive = true;
    const label = ROUTE_LABELS[currentPath] ||
                 currentPath.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    breadcrumbItems.push({
      label,
      path: '',
      isActive
    });

    return breadcrumbItems;
  }, [currentPath]);

  if (!shouldShowBreadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: `${pxToRem(16)} ${pxToRem(24)}`,
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <ol
        style={{
          display: 'flex',
          listStyle: 'none',
          padding: 0,
          margin: '0 auto',
          alignItems: 'center',
          fontSize: pxToRem(14),
          maxWidth: pxToRem(1200)
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path || breadcrumb.label} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && (
              <span
                style={{
                  margin: `0 ${pxToRem(8)}`,
                  color: '#94a3b8',
                  fontSize: pxToRem(12),
                  userSelect: 'none'
                }}
                aria-hidden="true"
              >
                ›
              </span>
            )}

            {breadcrumb.isActive ? (
              <span
                style={{
                  color: '#1e293b',
                  fontWeight: '600',
                  padding: `${pxToRem(6)} ${pxToRem(12)}`,
                  borderRadius: pxToRem(6),
                  backgroundColor: '#f1f5f9',
                  cursor: 'default'
                }}
                aria-current="page"
              >
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  padding: `${pxToRem(6)} ${pxToRem(12)}`,
                  borderRadius: pxToRem(6),
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
