import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ManualColorPicker from '../ManualColorPicker';

describe('ManualColorPicker', () => {
  const mockOnAddColor = jest.fn();
  const mockOnRemoveColor = jest.fn();
  const mockOnCreatePalette = jest.fn();

  const defaultProps = {
    colors: [],
    onAddColor: mockOnAddColor,
    onRemoveColor: mockOnRemoveColor,
    onCreatePalette: mockOnCreatePalette,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component title', () => {
    render(<ManualColorPicker {...defaultProps} />);
    expect(screen.getByText('🎨 Manual Color Picker')).toBeInTheDocument();
  });

  it('renders hex color input and text field', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const colorInput = screen.getByLabelText('🎨 Hex Color');
    expect(colorInput).toBeInTheDocument();
    
    const hexTextInput = screen.getByPlaceholderText('#FF6B6B');
    expect(hexTextInput).toBeInTheDocument();
  });

  it('renders RGB sliders', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const rSlider = screen.getByLabelText('R');
    const gSlider = screen.getByLabelText('G');
    const bSlider = screen.getByLabelText('B');
    
    expect(rSlider).toBeInTheDocument();
    expect(gSlider).toBeInTheDocument();
    expect(bSlider).toBeInTheDocument();
  });

  it('renders add color button', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const addButton = screen.getByText('➕ Add Color');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled(); // Disabled because hex input is invalid by default
  });

  it('enables add button when valid hex is entered', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const hexInput = screen.getByPlaceholderText('#FF6B6B');
    fireEvent.change(hexInput, { target: { value: '#FF0000' } });
    
    const addButton = screen.getByText('➕ Add Color');
    expect(addButton).toBeEnabled();
  });

  it('calls onAddColor when add button is clicked with valid hex', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const hexInput = screen.getByPlaceholderText('#FF6B6B');
    fireEvent.change(hexInput, { target: { value: '#FF0000' } });
    
    const addButton = screen.getByText('➕ Add Color');
    fireEvent.click(addButton);
    
    expect(mockOnAddColor).toHaveBeenCalledWith({
      hex: '#FF0000',
      rgb: { r: 255, g: 0, b: 0 },
      hsl: { h: 0, s: 100, l: 50 },
      temperature: 'warm' as const,
    });
  });

  it('renders palette section when colors are provided', () => {
    const colors = [
      {
        hex: '#FF0000',
        rgb: { r: 255, g: 0, b: 0 },
        hsl: { h: 0, s: 100, l: 50 },
        temperature: 'warm' as const,
      }
    ];
    
    render(<ManualColorPicker {...defaultProps} colors={colors} />);
    
    expect(screen.getByText('🌈 Current Palette (1 colors)')).toBeInTheDocument();
    expect(screen.getByText('#FF0000')).toBeInTheDocument();
  });

  it('calls onRemoveColor when remove button is clicked', () => {
    const colors = [
      {
        hex: '#FF0000',
        rgb: { r: 255, g: 0, b: 0 },
        hsl: { h: 0, s: 100, l: 50 },
        temperature: 'warm' as const,
      }
    ];
    
    render(<ManualColorPicker {...defaultProps} colors={colors} />);
    
    const removeButton = screen.getByTitle('Remove color');
    fireEvent.click(removeButton);
    
    expect(mockOnRemoveColor).toHaveBeenCalledWith(0);
  });

  it('calls onCreatePalette when save palette button is clicked', () => {
    const colors = [
      {
        hex: '#FF0000',
        rgb: { r: 255, g: 0, b: 0 },
        hsl: { h: 0, s: 100, l: 50 },
        temperature: 'warm' as const,
      }
    ];
    
    render(<ManualColorPicker {...defaultProps} colors={colors} />);
    
    const nameInput = screen.getByPlaceholderText('Palette name');
    fireEvent.change(nameInput, { target: { value: 'My Palette' } });
    
    const saveButton = screen.getByText('💾 Save Palette');
    fireEvent.click(saveButton);
    
    expect(mockOnCreatePalette).toHaveBeenCalledWith('My Palette');
  });

  it('updates RGB sliders when hex input changes', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const hexInput = screen.getByPlaceholderText('#FF6B6B');
    fireEvent.change(hexInput, { target: { value: '#00FF00' } });
    
    // Check that RGB values are updated
    expect(screen.getByText('0')).toBeInTheDocument(); // R value
    expect(screen.getByText('255')).toBeInTheDocument(); // G value
    expect(screen.getByText('0')).toBeInTheDocument(); // B value
  });

  it('updates hex input when RGB sliders change', () => {
    render(<ManualColorPicker {...defaultProps} />);
    
    const rSlider = screen.getByLabelText('R');
    fireEvent.change(rSlider, { target: { value: '128' } });
    
    const hexInput = screen.getByPlaceholderText('#FF6B6B');
    expect(hexInput).toHaveValue('#806B6B');
  });
});
