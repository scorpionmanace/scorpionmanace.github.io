import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      accumulatedPath += `/${segment}`;
      const label = routeLabels[accumulatedPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path: accumulatedPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  const breadcrumbStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '0.9rem',
    color: '#666',
  };

  const breadcrumbItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const breadcrumbLinkStyle: React.CSSProperties = {
    color: '#3182ce',
    textDecoration: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  };

  const currentBreadcrumbStyle: React.CSSProperties = {
    color: '#2d3748',
    fontWeight: '500',
    padding: '4px 8px',
  };

  const separatorStyle: React.CSSProperties = {
    margin: '0 8px',
    color: '#a0aec0',
  };

  return (
    <nav style={breadcrumbStyle}>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          <div style={breadcrumbItemStyle}>
            {index < breadcrumbs.length - 1 ? (
              <Link
                to={breadcrumb.path}
                style={breadcrumbLinkStyle}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#edf2f7';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {breadcrumb.label}
              </Link>
            ) : (
              <span style={currentBreadcrumbStyle}>
                {breadcrumb.label}
              </span>
            )}
          </div>
          {index < breadcrumbs.length - 1 && (
            <span style={separatorStyle}>/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
