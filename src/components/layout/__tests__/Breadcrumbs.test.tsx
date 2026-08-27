import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';

const renderCrumbs = (items: Array<{ label: string; to?: string }>) =>
  render(
    <MemoryRouter>
      <Breadcrumbs items={items} />
    </MemoryRouter>,
  );

describe('Breadcrumbs', () => {
  it('links every crumb except the last', () => {
    renderCrumbs([{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools' }, { label: 'JSON Parser' }]);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Tools' })).toHaveAttribute('href', '/tools');
    expect(screen.queryByRole('link', { name: 'JSON Parser' })).toBeNull();
  });

  it('marks the final crumb as the current page', () => {
    renderCrumbs([{ label: 'Home', to: '/' }, { label: 'About' }]);
    expect(screen.getByText('About')).toHaveAttribute('aria-current', 'page');
  });

  it('never links the last crumb even when given a path', () => {
    renderCrumbs([{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools' }]);
    expect(screen.queryByRole('link', { name: 'Tools' })).toBeNull();
  });

  it('emits BreadcrumbList microdata positions in order', () => {
    const { container } = renderCrumbs([{ label: 'Home', to: '/' }, { label: 'Tools' }]);
    const positions = Array.from(container.querySelectorAll('meta[itemprop="position"]')).map(
      (node) => node.getAttribute('content'),
    );
    expect(positions).toEqual(['1', '2']);
  });
});
