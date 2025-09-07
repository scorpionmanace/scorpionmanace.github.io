import React, { useState } from 'react';
import { Color } from '../../hooks/useColorPicker';
import { useManualColorPickerStyles } from './hook/useManualColorPickerStyles';

interface ManualColorPickerProps {
  colors: Color[];
  onAddColor: (color: Color) => void;
  onRemoveColor: (index: number) => void;
  onCreatePalette: (name: string) => void;
}

const ManualColorPicker: React.FC<ManualColorPickerProps> = ({
  colors,
  onAddColor,
  onRemoveColor,
  onCreatePalette,
}) => {
  const [hexInput, setHexInput] = useState('#');
  const [paletteName, setPaletteName] = useState('');
  const [rgbInput, setRgbInput] = useState({ r: 255, g: 107, b: 107 });
  const { manualColorPickerStyles } = useManualColorPickerStyles();

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    if (!hex.startsWith('#') || hex.length !== 7) return null;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const handleHexInputChange = (value: string) => {
    setHexInput(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgbInput(rgb);
    }
  };

  const handleRgbInputChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgbInput, [component]: value };
    setRgbInput(newRgb);
    setHexInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const addCurrentColor = () => {
    const rgb = hexToRgb(hexInput);
    if (rgb) {
      // Convert RGB to HSL for temperature detection
      const r = rgb.r / 255;
      const g = rgb.g / 255;
      const b = rgb.b / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l;

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

      const newColor: Color = {
        hex: hexInput.toUpperCase(),
        rgb,
        hsl: { h, s, l },
        temperature,
      };

      onAddColor(newColor);
      setHexInput('#');
      setRgbInput({ r: 255, g: 107, b: 107 });
    }
  };

  const removeColorFromPalette = (index: number) => {
    onRemoveColor(index);
  };

  const isValidHex = hexInput.startsWith('#') && hexInput.length === 7;

  return (
    <div className={manualColorPickerStyles.container}>
      <h3 className={manualColorPickerStyles.title}>
        🎨 Manual Color Picker
      </h3>

      {/* Color Selection Tools */}
      <div className={manualColorPickerStyles.colorTools}>
        <div className={manualColorPickerStyles.colorInputSection}>
          {/* Hex input with color picker */}
          <div className={manualColorPickerStyles.hexSection}>
            <label className={manualColorPickerStyles.label}>
              🎨 Hex Color
            </label>

            {/* Native color picker */}
            <input
              type="color"
              value={isValidHex ? hexInput : '#FF6B6B'}
              onChange={(e) => handleHexInputChange(e.target.value)}
              title="Click to open color picker or paste hex value"
              className={manualColorPickerStyles.colorInput}
            />

            {/* Hex text input */}
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexInputChange(e.target.value)}
              placeholder="#FF6B6B"
              title="Type or paste hex color code (e.g. #FF6B6B)"
              className={manualColorPickerStyles.hexTextInput(isValidHex)}
            />
          </div>

          {/* RGB Sliders */}
          <div className={manualColorPickerStyles.rgbSection}>
            <div className={manualColorPickerStyles.rgbSliderContainer}>
              <label className={manualColorPickerStyles.rgbLabel}>
                R
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbInput.r}
                onChange={(e) => handleRgbInputChange('r', parseInt(e.target.value))}
                className={manualColorPickerStyles.rgbSlider}
                style={{ background: 'linear-gradient(to right, #000000, #ff0000)' }}
              />
              <span className={manualColorPickerStyles.rgbValue}>
                {rgbInput.r}
              </span>
            </div>

            <div className={manualColorPickerStyles.rgbSliderContainer}>
              <label className={manualColorPickerStyles.rgbLabel}>
                G
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbInput.g}
                onChange={(e) => handleRgbInputChange('g', parseInt(e.target.value))}
                className={manualColorPickerStyles.rgbSlider}
                style={{ background: 'linear-gradient(to right, #000000, #00ff00)' }}
              />
              <span className={manualColorPickerStyles.rgbValue}>
                {rgbInput.g}
              </span>
            </div>

            <div className={manualColorPickerStyles.rgbSliderContainer}>
              <label className={manualColorPickerStyles.rgbLabel}>
                B
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbInput.b}
                onChange={(e) => handleRgbInputChange('b', parseInt(e.target.value))}
                className={manualColorPickerStyles.rgbSlider}
                style={{ background: 'linear-gradient(to right, #000000, #0000ff)' }}
              />
              <span className={manualColorPickerStyles.rgbValue}>
                {rgbInput.b}
              </span>
            </div>
          </div>

          {/* Add Color Button */}
          <button
            onClick={addCurrentColor}
            disabled={!isValidHex}
            className={manualColorPickerStyles.addButton(isValidHex)}
          >
            ➕ Add Color
          </button>
        </div>
      </div>

      {/* Current Manual Palette */}
      {colors.length > 0 && (
        <div className={manualColorPickerStyles.paletteSection}>
          <div className={manualColorPickerStyles.paletteHeader}>
            <h4 className={manualColorPickerStyles.paletteTitle}>
              🌈 Current Palette ({colors.length} colors)
            </h4>

            <div className={manualColorPickerStyles.paletteActions}>
              <input
                type="text"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                placeholder="Palette name"
                className={manualColorPickerStyles.paletteInput}
              />
              <button
                onClick={() => onCreatePalette(paletteName)}
                className={manualColorPickerStyles.saveButton}
              >
                💾 Save Palette
              </button>
            </div>
          </div>

          <div className={manualColorPickerStyles.paletteColors}>
            {colors.map((color, index) => (
              <div
                key={index}
                className={manualColorPickerStyles.colorItem}
              >
                <div
                  className={manualColorPickerStyles.colorSwatch}
                  style={{ backgroundColor: color.hex }}
                  title={`${color.hex} - ${color.temperature}`}
                />

                <button
                  onClick={() => removeColorFromPalette(index)}
                  className={manualColorPickerStyles.removeButton}
                  title="Remove color"
                >
                  ×
                </button>

                <span className={manualColorPickerStyles.colorHex}>
                  {color.hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualColorPicker;
