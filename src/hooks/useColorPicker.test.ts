import { renderHook, act } from '@testing-library/react';
import { useColorPicker } from './useColorPicker';

describe('useColorPicker', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useColorPicker());

    expect(result.current.state.selectedColor).toBeNull();
    expect(result.current.state.palettes).toEqual([]);
    expect(result.current.state.currentPalette).toBeNull();
    expect(result.current.state.colorWheelVisible).toBe(false);
  });

  it('should return predefined palettes', () => {
    const { result } = renderHook(() => useColorPicker());

    expect(result.current.predefinedPalettes).toHaveLength(4);
    expect(result.current.predefinedPalettes[0].name).toBe('Warm Tones');
    expect(result.current.predefinedPalettes[1].name).toBe('Cool Tones');
    expect(result.current.predefinedPalettes[2].name).toBe('Monochrome Pastels');
    expect(result.current.predefinedPalettes[3].name).toBe('Vivid Vibrants');
  });

  it('should select a color correctly', () => {
    const { result } = renderHook(() => useColorPicker());
    const color = result.current.predefinedPalettes[0].colors[0];

    act(() => {
      result.current.selectColor(color);
    });

    expect(result.current.state.selectedColor).toEqual(color);
  });

  it('should toggle color wheel visibility', () => {
    const { result } = renderHook(() => useColorPicker());

    expect(result.current.state.colorWheelVisible).toBe(false);

    act(() => {
      result.current.toggleColorWheel();
    });

    expect(result.current.state.colorWheelVisible).toBe(true);

    act(() => {
      result.current.toggleColorWheel();
    });

    expect(result.current.state.colorWheelVisible).toBe(false);
  });

  it('should generate a new palette', () => {
    const { result } = renderHook(() => useColorPicker());

    act(() => {
      result.current.generatePalette();
    });

    expect(result.current.state.palettes).toHaveLength(1);
    expect(result.current.state.palettes[0].type).toBe('generated');
    expect(result.current.state.palettes[0].colors).toHaveLength(6);
  });

  it('should generate color wheel with 36 colors', () => {
    const { result } = renderHook(() => useColorPicker());

    const wheelColors = result.current.generateColorWheel();

    expect(wheelColors).toHaveLength(36);
    wheelColors.forEach(color => {
      expect(color.hex).toBeDefined();
      expect(color.rgb).toBeDefined();
      expect(color.hsl).toBeDefined();
      expect(color.temperature).toBeDefined();
    });
  });

  it('should export CSV correctly', () => {
    const { result } = renderHook(() => useColorPicker());

    // Mock URL.createObjectURL and document functions
    const createObjectURLMock = jest.fn();
    const clickMock = jest.fn();
    const removeMock = jest.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.document.createElement = jest.fn().mockReturnValue({
      href: '',
      download: '',
      click: clickMock,
    });
    global.document.body.appendChild = jest.fn();
    global.document.body.removeChild = removeMock;

    const paletteId = 'warm-tones';

    act(() => {
      result.current.exportAsCSV(paletteId);
    });

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(removeMock).toHaveBeenCalled();
  });

  it('should export Figma JSON correctly', () => {
    const { result } = renderHook(() => useColorPicker());

    // Mock URL.createObjectURL and document functions
    const createObjectURLMock = jest.fn();
    const clickMock = jest.fn();
    const removeMock = jest.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.document.createElement = jest.fn().mockReturnValue({
      href: '',
      download: '',
      click: clickMock,
    });
    global.document.body.appendChild = jest.fn();
    global.document.body.removeChild = removeMock;

    const paletteId = 'cool-tones';

    act(() => {
      result.current.exportAsFigma(paletteId);
    });

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(removeMock).toHaveBeenCalled();
  });

  it('should categorize colors by temperature correctly', () => {
    const { result } = renderHook(() => useColorPicker());

    const warmPalette = result.current.predefinedPalettes.find(p => p.id === 'warm-tones');
    expect(warmPalette).toBeDefined();

    if (warmPalette) {
      const warmColors = warmPalette.colors.filter(c => c.temperature === 'warm');
      expect(warmColors.length).toBe(warmPalette.colors.length); // All colors in warm palette should be warm
    }

    const coolPalette = result.current.predefinedPalettes.find(p => p.id === 'cool-tones');
    expect(coolPalette).toBeDefined();

    if (coolPalette) {
      const coolColors = coolPalette.colors.filter(c => c.temperature === 'cool');
      expect(coolColors.length).toBe(coolPalette.colors.length); // All colors in cool palette should be cool
    }

    const neutralPalette = result.current.predefinedPalettes.find(p => p.id === 'mono-pastels');
    expect(neutralPalette).toBeDefined();

    if (neutralPalette) {
      const neutralColors = neutralPalette.colors.filter(c => c.temperature === 'neutral');
      expect(neutralColors.length).toBe(neutralPalette.colors.length); // All colors in neutral palette should be neutral
    }
  });
});
