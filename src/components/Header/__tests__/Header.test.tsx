import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('displays the logo text', () => {
    render(<Header />);
    expect(screen.getByText('Karan Khare')).toBeInTheDocument();
  });

  it('contains a link to home', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /karan khare/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
