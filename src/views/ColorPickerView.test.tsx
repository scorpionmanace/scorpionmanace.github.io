import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorPickerView from './ColorPickerView';

// Mock the ColorPicker component
jest.mock('../components/ColorPicker', () => {
  return function MockColorPicker() {
    return <div data-testid="color-picker">Mock ColorPicker Component</div>;
  };
});

describe('ColorPickerView', () => {
  it('renders the ColorPickerView with correct styling', () => {
    render(<ColorPickerView />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.style.backgroundColor).toBe('background-color: #f8f9fa');
    expect(mainElement.style.minHeight).toBe('min-height: 100vh');
  });

  it('renders the ColorPicker component', () => {
    render(<ColorPickerView />);

    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
    expect(screen.getByText('Mock ColorPicker Component')).toBeInTheDocument();
  });
});
