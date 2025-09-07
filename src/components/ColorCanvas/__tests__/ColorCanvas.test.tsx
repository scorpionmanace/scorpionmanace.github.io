import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorCanvas from '../ColorCanvas';

describe('ColorCanvas', () => {
  const mockColors = [
    {
      hex: '#FF0000',
      rgb: { r: 255, g: 0, b: 0 },
      hsl: { h: 0, s: 100, l: 50 },
      temperature: 'warm' as const,
    },
    {
      hex: '#00FF00',
      rgb: { r: 0, g: 255, b: 0 },
      hsl: { h: 120, s: 100, l: 50 },
      temperature: 'cool' as const,
    }
  ];

  it('renders the component title with pattern name', () => {
    render(<ColorCanvas colors={mockColors} pattern="linear" />);
    expect(screen.getByText('🎨 Canvas Preview - Linear Pattern')).toBeInTheDocument();
  });

  it('renders the canvas element with correct dimensions', () => {
    render(<ColorCanvas colors={mockColors} width={400} height={300} />);
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '400');
    expect(canvas).toHaveAttribute('height', '300');
  });

  it('renders color swatches for each color', () => {
    render(<ColorCanvas colors={mockColors} />);
    
    const swatches = screen.getAllByTitle(/Temperature/);
    expect(swatches).toHaveLength(2);
    
    expect(swatches[0]).toHaveStyle('background-color: #FF0000');
    expect(swatches[1]).toHaveStyle('background-color: #00FF00');
  });

  it('renders info text with color count and pattern', () => {
    render(<ColorCanvas colors={mockColors} pattern="radial" />);
    expect(screen.getByText('Palette with 2 colors • Pattern: Radial')).toBeInTheDocument();
  });

  it('uses default dimensions when not provided', () => {
    render(<ColorCanvas colors={mockColors} />);
    const canvas = screen.getByRole('img');
    expect(canvas).toHaveAttribute('width', '800');
    expect(canvas).toHaveAttribute('height', '600');
  });

  it('uses default pattern when not provided', () => {
    render(<ColorCanvas colors={mockColors} />);
    expect(screen.getByText('🎨 Canvas Preview - Linear Pattern')).toBeInTheDocument();
  });

  it('renders correctly with empty colors array', () => {
    render(<ColorCanvas colors={[]} />);
    expect(screen.getByText('🎨 Canvas Preview - Linear Pattern')).toBeInTheDocument();
  });
});
