import React, { useState } from 'react';
import { Color } from '../hooks/useColorPicker';

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

  return (
    <div style={{
      marginTop: '40px',
      padding: '25px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        🎨 Manual Color Picker
      </h3>

      {/* Color Selection Tools */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '30px',
      }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Hex input with color picker */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{
              fontSize: '0.9rem',
              color: '#6c757d',
              marginBottom: '5px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🎨 Hex Color
            </label>

            {/* Native color picker */}
            <input
              type="color"
              value={hexInput.startsWith('#') && hexInput.length === 7 ? hexInput : '#FF6B6B'}
              onChange={(e) => handleHexInputChange(e.target.value)}
              title="Click to open color picker or paste hex value"
              style={{
                width: '120px',
                height: '40px',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                cursor: 'pointer',
                background: hexInput.startsWith('#') && hexInput.length === 7 ? hexInput : '#FF6B6B',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />

            {/* Hex text input */}
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexInputChange(e.target.value)}
              placeholder="#FF6B6B"
              title="Type or paste hex color code (e.g. #FF6B6B)"
              style={{
                marginTop: '10px',
                padding: '10px 12px',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                fontSize: '1rem',
                width: '120px',
                textAlign: 'center',
                backgroundColor: hexInput.startsWith('#') && hexInput.length === 7 ? hexInput : '#fff',
                color: hexInput.startsWith('#') && hexInput.length === 7 ? '#fff' : '#2c3e50',
                fontWeight: 'bold',
                textShadow: hexInput.startsWith('#') && hexInput.length === 7 ? '0 0 2px rgba(255,255,255,0.8)' : 'none',
              }}
            />
          </div>

          {/* RGB Sliders */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{
                fontSize: '0.8rem',
                color: '#6c757d',
                marginBottom: '2px',
              }}>
                R
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbInput.r}
                onChange={(e) => handleRgbInputChange('r', parseInt(e.target.value))}
                style={{
                  width: '100px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'linear-gradient(to right, #000000, #ff0000)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginTop: '2px',
              }}>
                {rgbInput.r}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{
                fontSize: '0.8rem',
                color: '#6c757d',
                marginBottom: '2px',
              }}>
                G
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbInput.g}
                onChange={(e) => handleRgbInputChange('g', parseInt(e.target.value))}
                style={{
                  width: '100px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'linear-gradient(to right, #000000, #00ff00)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginTop: '2px',
              }}>
                {rgbInput.g}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{
                fontSize: '0.8rem',
                color: '#6c757d',
                marginBottom: '2px',
              }}>
                B
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbInput.b}
                onChange={(e) => handleRgbInputChange('b', parseInt(e.target.value))}
                style={{
                  width: '100px',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'linear-gradient(to right, #000000, #0000ff)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginTop: '2px',
              }}>
                {rgbInput.b}
              </span>
            </div>
          </div>

          {/* Add Color Button */}
          <button
            onClick={addCurrentColor}
            disabled={!hexInput.startsWith('#') || hexInput.length !== 7}
            style={{
              padding: '12px 20px',
              backgroundColor: hexInput.startsWith('#') && hexInput.length === 7 ? '#3498db' : '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: hexInput.startsWith('#') && hexInput.length === 7 ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              marginTop: '20px',
            }}
          >
            ➕ Add Color
          </button>
        </div>
      </div>

      {/* Current Manual Palette */}
      {colors.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <h4 style={{
              fontSize: '1.2rem',
              color: '#2c3e50',
              margin: 0,
            }}>
              🌈 Current Palette ({colors.length} colors)
            </h4>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                placeholder="Palette name"
                style={{
                  padding: '6px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                }}
              />
              <button
                onClick={() => onCreatePalette(paletteName)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                }}
              >
                💾 Save Palette
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: color.hex,
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  title={`${color.hex} - ${color.temperature}`}
                />

                <button
                  onClick={() => removeColorFromPalette(index)}
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Remove color"
                >
                  ×
                </button>

                <span style={{
                  fontSize: '0.7rem',
                  color: '#6c757d',
                  marginTop: '4px',
                  textAlign: 'center',
                  width: '60px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
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
