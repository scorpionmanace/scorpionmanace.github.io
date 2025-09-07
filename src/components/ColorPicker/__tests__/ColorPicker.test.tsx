import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker from '../ColorPicker';

// Mock the useColorPicker hook
jest.mock('../../../hooks/useColorPicker', () => ({
  useColorPicker: () => ({
    state: {
      selectedColor: {
        hex: '#FF6B6B',
        rgb: { r: 255, g: 107, b: 107 },
        hsl: { h: 0, s: 100, l: 70 },
        temperature: 'warm'
      },
      palettes: [],
      currentPalette: null,
      colorWheelVisible: true,
      manualPalette: [],
      canvasPreviewVisible: false,
    },
    predefinedPalettes: [
      {
        id: 'warm-tones',
        name: 'Warm Tones',
        type: 'manual',
        colors: [
          {
            hex: '#FF6B6B',
            rgb: { r: 255, g: 107, b: 107 },
            hsl: { h: 0, s: 100, l: 70 },
            temperature: 'warm'
          }
        ],
      },
    ],
    selectColor: jest.fn(),
    exportAsCSV: jest.fn(),
    exportAsFigma: jest.fn(),
    toggleColorWheel: jest.fn(),
    generatePalette: jest.fn(),
    addColorToManualPalette: jest.fn(),
    removeColorFromManualPalette: jest.fn(),
    createManualPalette: jest.fn(),
    toggleCanvasPreview: jest.fn(),
    generateColorWheel: jest.fn(() => [
      {
        hex: '#FF6B6B',
        rgb: { r: 255, g: 107, b: 107 },
        hsl: { h: 0, s: 100, l: 70 },
        temperature: 'warm'
      }
    ]),
  }),
}));

// Mock the ManualColorPicker component
jest.mock('../../ManualColorPicker/ManualColorPicker', () => {
  return function MockManualColorPicker() {
    return <div data-testid="manual-color-picker">Mock ManualColorPicker Component</div>;
  };
});

// Mock the ColorCanvas component
jest.mock('../../ColorCanvas/ColorCanvas', () => {
  return function MockColorCanvas() {
    return <div data-testid="color-canvas">Mock ColorCanvas Component</div>;
  };
});

describe('ColorPicker', () => {
  beforeAll(() => {
    // Mock URL.createObjectURL and document functions for export tests
    global.URL.createObjectURL = jest.fn();
    global.document.createElement = jest.fn().mockReturnValue({
      href: '',
      download: '',
      click: jest.fn(),
    });
    global.document.body.appendChild = jest.fn();
    global.document.body.removeChild = jest.fn();
  });

  it('renders the color picker header and description', () => {
    render(<ColorPicker />);

    expect(screen.getByText('🎨 Color Picker Studio')).toBeInTheDocument();
    expect(screen.getByText('Discover, analyze, and export beautiful color palettes')).toBeInTheDocument();
  });

  it('renders control buttons', () => {
    render(<ColorPicker />);

    expect(screen.getByText('🎲 Generate Random Palette')).toBeInTheDocument();
    expect(screen.getByText('🌀 Show Color Wheel')).toBeInTheDocument();
  });

  it('renders color details panel when a color is selected', () => {
    render(<ColorPicker />);

    expect(screen.getByText('🔥 Selected Color')).toBeInTheDocument();
    expect(screen.getByText('Hex: #FF6B6B')).toBeInTheDocument();
    expect(screen.getByText('RGB: rgb(255, 107, 107)')).toBeInTheDocument();
    expect(screen.getByText('HSL: hsl(0, 100%, 70%)')).toBeInTheDocument();
    expect(screen.getByText('Temperature: Warm')).toBeInTheDocument();
  });

  it('renders predefined palettes section', () => {
    render(<ColorPicker />);

    expect(screen.getByText('🌈 Curated Color Palettes')).toBeInTheDocument();
    expect(screen.getByText('🎨 Warm Tones')).toBeInTheDocument();
  });

  it('renders export buttons for palettes', () => {
    render(<ColorPicker />);

    expect(screen.getByText('📄 Export CSV')).toBeInTheDocument();
    expect(screen.getByText('🎨 Export Figma')).toBeInTheDocument();
  });

  it('displays temperature classification tags', () => {
    render(<ColorPicker />);

    expect(screen.getByText('Warm: 1')).toBeInTheDocument();
  });

  it('calls generatePalette when button is clicked', () => {
    const mockGeneratePalette = jest.fn();
    jest.mock('../../../hooks/useColorPicker', () => ({
      useColorPicker: () => ({
        state: {
          selectedColor: null,
          palettes: [],
          currentPalette: null,
          colorWheelVisible: false,
          manualPalette: [],
          canvasPreviewVisible: false,
        },
        predefinedPalettes: [],
        selectColor: jest.fn(),
        exportAsCSV: jest.fn(),
        exportAsFigma: jest.fn(),
        toggleColorWheel: jest.fn(),
        generatePalette: mockGeneratePalette,
        addColorToManualPalette: jest.fn(),
        removeColorFromManualPalette: jest.fn(),
        createManualPalette: jest.fn(),
        toggleCanvasPreview: jest.fn(),
        generateColorWheel: jest.fn(),
      }),
    }));

    render(<ColorPicker />);
    fireEvent.click(screen.getByText('🎲 Generate Random Palette'));
    expect(mockGeneratePalette).toHaveBeenCalled();
  });

  it('calls toggleColorWheel when button is clicked', () => {
    const mockToggleColorWheel = jest.fn();
    jest.mock('../../../hooks/useColorPicker', () => ({
      useColorPicker: () => ({
        state: {
          selectedColor: null,
          palettes: [],
          currentPalette: null,
          colorWheelVisible: false,
          manualPalette: [],
          canvasPreviewVisible: false,
        },
        predefinedPalettes: [],
        selectColor: jest.fn(),
        exportAsCSV: jest.fn(),
        exportAsFigma: jest.fn(),
        toggleColorWheel: mockToggleColorWheel,
        generatePalette: jest.fn(),
        addColorToManualPalette: jest.fn(),
        removeColorFromManualPalette: jest.fn(),
        createManualPalette: jest.fn(),
        toggleCanvasPreview: jest.fn(),
        generateColorWheel: jest.fn(),
      }),
    }));

    render(<ColorPicker />);
    fireEvent.click(screen.getByText('🌀 Show Color Wheel'));
    expect(mockToggleColorWheel).toHaveBeenCalled();
  });

  it('calls exportAsCSV when CSV export button is clicked', () => {
    const mockExportAsCSV = jest.fn();
    const mockToggleColorWheel = jest.fn();
    jest.mock('../../../hooks/useColorPicker', () => ({
      useColorPicker: () => ({
        state: {
          selectedColor: null,
          palettes: [],
          currentPalette: null,
          colorWheelVisible: false,
          manualPalette: [],
          canvasPreviewVisible: false,
        },
        predefinedPalettes: [
          {
            id: 'warm-tones',
            name: 'Warm Tones',
            type: 'manual',
            colors: [
              {
                hex: '#FF6B6B',
                rgb: { r: 255, g: 107, b: 107 },
                hsl: { h: 0, s: 100, l: 70 },
                temperature: 'warm'
              }
            ],
          },
        ],
        selectColor: jest.fn(),
        exportAsCSV: mockExportAsCSV,
        exportAsFigma: jest.fn(),
        toggleColorWheel: mockToggleColorWheel,
        generatePalette: jest.fn(),
        addColorToManualPalette: jest.fn(),
        removeColorFromManualPalette: jest.fn(),
        createManualPalette: jest.fn(),
        toggleCanvasPreview: jest.fn(),
        generateColorWheel: jest.fn(),
      }),
    }));

    render(<ColorPicker />);
    fireEvent.click(screen.getAllByText('📄 Export CSV')[0]);
    expect(mockExportAsCSV).toHaveBeenCalled();
  });

  it('calls exportAsFigma when Figma export button is clicked', () => {
    const mockExportAsFigma = jest.fn();
    const mockToggleColorWheel = jest.fn();
    jest.mock('../../../hooks/useColorPicker', () => ({
      useColorPicker: () => ({
        state: {
          selectedColor: null,
          palettes: [],
          currentPalette: null,
          colorWheelVisible: false,
          manualPalette: [],
          canvasPreviewVisible: false,
        },
        predefinedPalettes: [
          {
            id: 'warm-tones',
            name: 'Warm Tones',
            type: 'manual',
            colors: [
              {
                hex: '#FF6B6B',
                rgb: { r: 255, g: 107, b: 107 },
                hsl: { h: 0, s: 100, l: 70 },
                temperature: 'warm'
              }
            ],
          },
        ],
        selectColor: jest.fn(),
        exportAsCSV: jest.fn(),
        exportAsFigma: mockExportAsFigma,
        toggleColorWheel: mockToggleColorWheel,
        generatePalette: jest.fn(),
        addColorToManualPalette: jest.fn(),
        removeColorFromManualPalette: jest.fn(),
        createManualPalette: jest.fn(),
        toggleCanvasPreview: jest.fn(),
        generateColorWheel: jest.fn(),
      }),
    }));

    render(<ColorPicker />);
    fireEvent.click(screen.getAllByText('🎨 Export Figma')[0]);
    expect(mockExportAsFigma).toHaveBeenCalled();
  });

  it('shows full color wheel when colorWheelVisible is true', () => {
    const mockToggleColorWheel = jest.fn();
    jest.mock('../../../hooks/useColorPicker', () => ({
      useColorPicker: () => ({
        state: {
          selectedColor: null,
          palettes: [],
          currentPalette: null,
          colorWheelVisible: true,
          manualPalette: [],
          canvasPreviewVisible: false,
        },
        predefinedPalettes: [
          {
            id: 'warm-tones',
            name: 'Warm Tones',
            type: 'manual',
            colors: [
              {
                hex: '#FF6B6B',
                rgb: { r: 255, g: 107, b: 107 },
                hsl: { h: 0, s: 100, l: 70 },
                temperature: 'warm'
              }
            ],
          },
        ],
        selectColor: jest.fn(),
        exportAsCSV: jest.fn(),
        exportAsFigma: jest.fn(),
        toggleColorWheel: mockToggleColorWheel,
        generatePalette: jest.fn(),
        addColorToManualPalette: jest.fn(),
        removeColorFromManualPalette: jest.fn(),
        createManualPalette: jest.fn(),
        toggleCanvasPreview: jest.fn(),
        generateColorWheel: jest.fn(),
      }),
    }));

    render(<ColorPicker />);
    expect(screen.getByText('🌀 Color Wheel - Full Spectrum')).toBeInTheDocument();
  });

  it('renders ManualColorPicker component', () => {
    render(<ColorPicker />);
    
    expect(screen.getByTestId('manual-color-picker')).toBeInTheDocument();
  });
});
