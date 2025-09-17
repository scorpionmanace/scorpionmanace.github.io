import { useState, useCallback, useMemo } from 'react';
import { Color, ColorPalette } from '../types';

export interface ColorPickerState {
  selectedColor: Color | null;
  palettes: ColorPalette[];
  currentPalette: string | null;
  colorWheelVisible: boolean;
  manualPalette: Color[];
  canvasPreviewVisible: boolean;
}

export type { Color, ColorPalette };

export const useColorPicker = () => {
  const [state, setState] = useState<ColorPickerState>({
    selectedColor: null,
    palettes: [],
    currentPalette: null,
    colorWheelVisible: false,
    manualPalette: [],
    canvasPreviewVisible: false,
  });

  // Predefined color palettes
  const predefinedPalettes = useMemo<ColorPalette[]>(() => [
    {
      id: 'warm-tones',
      name: 'Warm Tones',
      type: 'manual',
      colors: [
        { hex: '#FF6B6B', rgb: { r: 255, g: 107, b: 107 }, hsl: { h: 0, s: 100, l: 70 }, temperature: 'warm' },
        { hex: '#FF8E53', rgb: { r: 255, g: 142, b: 83 }, hsl: { h: 23, s: 100, l: 66 }, temperature: 'warm' },
        { hex: '#FFCC02', rgb: { r: 255, g: 204, b: 2 }, hsl: { h: 52, s: 100, l: 51 }, temperature: 'warm' },
        { hex: '#FFB347', rgb: { r: 255, g: 179, b: 71 }, hsl: { h: 39, s: 100, l: 64 }, temperature: 'warm' },
        { hex: '#FF683B', rgb: { r: 255, g: 104, b: 59 }, hsl: { h: 14, s: 100, l: 61 }, temperature: 'warm' },
      ],
    },
    {
      id: 'cool-tones',
      name: 'Cool Tones',
      type: 'manual',
      colors: [
        { hex: '#4ECDC4', rgb: { r: 78, g: 205, b: 196 }, hsl: { h: 173, s: 56, l: 55 }, temperature: 'cool' },
        { hex: '#45B7D1', rgb: { r: 69, g: 183, b: 209 }, hsl: { h: 194, s: 60, l: 54 }, temperature: 'cool' },
        { hex: '#96CEB4', rgb: { r: 150, g: 206, b: 180 }, hsl: { h: 150, s: 56, l: 70 }, temperature: 'cool' },
        { hex: '#54C4C1', rgb: { r: 84, g: 196, b: 193 }, hsl: { h: 178, s: 49, l: 55 }, temperature: 'cool' },
        { hex: '#26C6DA', rgb: { r: 38, g: 198, b: 218 }, hsl: { h: 188, s: 68, l: 50 }, temperature: 'cool' },
      ],
    },
    {
      id: 'mono-pastels',
      name: 'Monochrome Pastels',
      type: 'manual',
      colors: [
        { hex: '#F8F9FA', rgb: { r: 248, g: 249, b: 250 }, hsl: { h: 210, s: 14, l: 97 }, temperature: 'neutral' },
        { hex: '#E9ECEF', rgb: { r: 233, g: 236, b: 239 }, hsl: { h: 210, s: 14, l: 93 }, temperature: 'neutral' },
        { hex: '#DEE2E6', rgb: { r: 222, g: 226, b: 230 }, hsl: { h: 210, s: 11, l: 89 }, temperature: 'neutral' },
        { hex: '#CED4DA', rgb: { r: 206, g: 212, b: 218 }, hsl: { h: 210, s: 11, l: 84 }, temperature: 'neutral' },
        { hex: '#ADB5BD', rgb: { r: 173, g: 181, b: 189 }, hsl: { h: 210, s: 10, l: 75 }, temperature: 'neutral' },
      ],
    },
    {
      id: 'vivid-colors',
      name: 'Vivid Vibrants',
      type: 'manual',
      colors: [
        { hex: '#FF0080', rgb: { r: 255, g: 0, b: 128 }, hsl: { h: 330, s: 100, l: 50 }, temperature: 'warm' },
        { hex: '#8000FF', rgb: { r: 128, g: 0, b: 255 }, hsl: { h: 270, s: 100, l: 50 }, temperature: 'cool' },
        { hex: '#00FF80', rgb: { r: 0, g: 255, b: 128 }, hsl: { h: 150, s: 100, l: 50 }, temperature: 'cool' },
        { hex: '#FF8000', rgb: { r: 255, g: 128, b: 0 }, hsl: { h: 30, s: 100, l: 50 }, temperature: 'warm' },
        { hex: '#0080FF', rgb: { r: 0, g: 128, b: 255 }, hsl: { h: 210, s: 100, l: 50 }, temperature: 'cool' },
      ],
    },
  ], []);

  // Generate color wheel points
  const generateColorWheel = useCallback(() => {
    const colors: Color[] = [];
    const steps = 36; // 36 colors around the wheel

    for (let i = 0; i < steps; i++) {
      const hue = (i * 360) / steps;
      const saturation = 70 + Math.random() * 30; // 70-100%
      const lightness = 45 + Math.random() * 10; // 45-55%

      // Convert HSL to RGB
      const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
      const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
      const m = lightness / 100 - c / 2;

      let r, g, b;

      if (hue >= 0 && hue < 60) {
        [r, g, b] = [c, x, 0];
      } else if (hue >= 60 && hue < 120) {
        [r, g, b] = [x, c, 0];
      } else if (hue >= 120 && hue < 180) {
        [r, g, b] = [0, c, x];
      } else if (hue >= 180 && hue < 240) {
        [r, g, b] = [0, x, c];
      } else if (hue >= 240 && hue < 300) {
        [r, g, b] = [x, 0, c];
      } else {
        [r, g, b] = [c, 0, x];
      }

      const finalR = Math.round((r + m) * 255);
      const finalG = Math.round((g + m) * 255);
      const finalB = Math.round((b + m) * 255);

      const hexValue = `#${finalR.toString(16).padStart(2, '0')}${finalG.toString(16).padStart(2, '0')}${finalB.toString(16).padStart(2, '0')}`;

      // Determine temperature
      let temperature: 'warm' | 'cool' | 'neutral' = 'neutral';
      if (hue > 0 && hue < 180) {
        temperature = 'warm';
      } else if (hue > 180 && hue < 360) {
        temperature = 'cool';
      }

      colors.push({
        hex: hexValue.toUpperCase(),
        rgb: { r: finalR, g: finalG, b: finalB },
        hsl: { h: Math.round(hue), s: Math.round(saturation), l: Math.round(lightness) },
        temperature,
      });
    }

    return colors;
  }, []);

  // Export palette as CSV
  const exportAsCSV = useCallback((paletteId: string) => {
    // Find in generated palettes first, then predefined palettes
    let palette = state.palettes.find(p => p.id === paletteId);
    if (!palette) {
      palette = predefinedPalettes.find(p => p.id === paletteId);
    }
    if (!palette) return;

    const csvContent = [
      'Color Name,Hex,RGB,HSL,Temperature',
      ...palette.colors.map((color, index) =>
        `${palette.name} ${index + 1},${color.hex},rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}),hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%),${color.temperature}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${palette.name.toLowerCase().replace(' ', '-')}-palette.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [predefinedPalettes, state.palettes]);

  // Export palette as Figma JSON
  const exportAsFigma = useCallback((paletteId: string) => {
    // Find in generated palettes first, then predefined palettes
    let palette = state.palettes.find(p => p.id === paletteId);
    if (!palette) {
      palette = predefinedPalettes.find(p => p.id === paletteId);
    }
    if (!palette) return;

    const figmaData = {
      name: palette.name,
      colors: palette.colors.map((color, index) => ({
        name: `${index + 1}`,
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
        temperature: color.temperature,
      })),
    };

    const jsonContent = JSON.stringify(figmaData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${palette.name.toLowerCase().replace(' ', '-')}-palette.fig`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [predefinedPalettes, state.palettes]);

  // Select a color
  const selectColor = useCallback((color: Color) => {
    setState(prev => ({ ...prev, selectedColor: color }));
  }, []);

  // Generate a new random palette
  const generatePalette = useCallback(() => {
    const newPalette: ColorPalette = {
      id: `generated-${Date.now()}`,
      name: 'Generated Palette',
      type: 'generated',
      colors: generateColorWheel().slice(0, 6),
    };

    setState(prev => ({
      ...prev,
      palettes: [...prev.palettes, newPalette],
    }));

    return newPalette;
  }, [generateColorWheel]);

  // Toggle color wheel visibility
  const toggleColorWheel = useCallback(() => {
    setState(prev => ({
      ...prev,
      colorWheelVisible: !prev.colorWheelVisible,
    }));
  }, []);

  // Add color to manual palette
  const addColorToManualPalette = useCallback((color: Color) => {
    setState(prev => ({
      ...prev,
      manualPalette: [...prev.manualPalette, color],
    }));
  }, []);

  // Remove color from manual palette
  const removeColorFromManualPalette = useCallback((colorIndex: number) => {
    setState(prev => ({
      ...prev,
      manualPalette: prev.manualPalette.filter((_, index) => index !== colorIndex),
    }));
  }, []);

  // Create palette from manual selection
  const createManualPalette = useCallback((name: string) => {
    if (state.manualPalette.length === 0) return null;

    const newPalette: ColorPalette = {
      id: `manual-${Date.now()}`,
      name: name || 'My Custom Palette',
      type: 'manual',
      colors: [...state.manualPalette],
    };

    setState(prev => ({
      ...prev,
      palettes: [...prev.palettes, newPalette],
      manualPalette: [], // Clear manual palette after creating
    }));

    return newPalette;
  }, [state.manualPalette]);

  // Toggle canvas preview visibility
  const toggleCanvasPreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      canvasPreviewVisible: !prev.canvasPreviewVisible,
    }));
  }, []);

  // Create a color from hex, rgb values
  const createColorFromHex = useCallback((hexValue: string): Color | null => {
    if (!hexValue.startsWith('#')) return null;

    const hex = hexValue.substring(1);
    const rgb = {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };

    // RGB to HSL conversion for temperature detection
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    // Determine temperature based on hue
    let temperature: 'warm' | 'cool' | 'neutral' = 'neutral';
    if (h > 0 && h < 180) {
      temperature = 'warm';
    } else if (h > 180 && h < 360) {
      temperature = 'cool';
    }

    return {
      hex: hexValue.toUpperCase(),
      rgb,
      hsl: { h, s, l },
      temperature,
    };
  }, []);

  return {
    state,
    predefinedPalettes,
    selectColor,
    exportAsCSV,
    exportAsFigma,
    generatePalette,
    toggleColorWheel,
    generateColorWheel,
    addColorToManualPalette,
    removeColorFromManualPalette,
    createManualPalette,
    toggleCanvasPreview,
    createColorFromHex,
  };
};
