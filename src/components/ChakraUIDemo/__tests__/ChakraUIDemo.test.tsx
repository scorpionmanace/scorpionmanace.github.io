import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChakraUIDemo from '../ChakraUIDemo';

describe('ChakraUIDemo', () => {
  it('renders without crashing', () => {
    render(<ChakraUIDemo />);
  });

  it('displays the main heading', () => {
    render(<ChakraUIDemo />);
    expect(screen.getByText('🎨 Chakra UI + Tailwind CSS Demo')).toBeInTheDocument();
  });

  it('displays basic components section', () => {
    render(<ChakraUIDemo />);
    expect(screen.getByText('Basic Components')).toBeInTheDocument();
  });

  it('displays form elements section', () => {
    render(<ChakraUIDemo />);
    expect(screen.getByText('Form Elements')).toBeInTheDocument();
  });

  it('displays status indicators section', () => {
    render(<ChakraUIDemo />);
    expect(screen.getByText('Status Indicators')).toBeInTheDocument();
  });

  it('displays integration benefits section', () => {
    render(<ChakraUIDemo />);
    expect(screen.getByText('🚀 Seamless Integration')).toBeInTheDocument();
  });
});
