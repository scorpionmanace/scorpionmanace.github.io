import React, { useState } from 'react';
import { useColorPicker, ColorPalette, Color } from '../hooks/useColorPicker';
import ManualColorPicker from './ManualColorPicker/ManualColorPicker';
import ColorCanvas from './ColorCanvas/ColorCanvas';

const ColorPicker: React.FC = () => {
  const {
    state,
    predefinedPalettes,
    selectColor,
    exportAsCSV,
    exportAsFigma,
    generatePalette,
    toggleColorWheel,
    addColorToManualPalette,
    removeColorFromManualPalette,
    createManualPalette,
    toggleCanvasPreview,
  } = useColorPicker();
  const [currentPattern, setCurrentPattern] = useState<'linear' | 'radial' | 'mosaic' | 'spiral'>('linear');

  // Color swatch component
  const ColorSwatch: React.FC<{ color: Color; onClick: () => void; isSelected?: boolean }> = ({
    color,
    onClick,
    isSelected = false,
  }) => (
    <div
      onClick={onClick}
      style={{
        width: '60px',
        height: '60px',
        backgroundColor: color.hex,
        cursor: 'pointer',
        borderRadius: '8px',
        border: isSelected ? '3px solid #333' : '2px solid #ddd',
        transition: 'all 0.2s ease',
        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
      }}
      title={`${color.hex} - HSL(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%) - ${color.temperature}`}
    />
  );

  // Color wheel component
  const ColorWheel: React.FC = () => {
    const { generateColorWheel } = useColorPicker();
    const wheelColors = generateColorWheel();

    return (
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          🌀 Color Wheel - Full Spectrum
        </h3>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
        }}>
          {wheelColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              onClick={() => selectColor(color)}
              isSelected={state.selectedColor?.hex === color.hex}
            />
          ))}
        </div>
      </div>
    );
  };

  // Palette display component
  const PaletteDisplay: React.FC<{ palette: ColorPalette }> = ({ palette }) => (
    <div style={{
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#2c3e50',
          margin: 0,
        }}>
          🎨 {palette.name}
        </h3>

        <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => exportAsCSV(palette.id)}
              title={`Download "${palette.name}" palette as CSV file with color details`}
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
              📄 Export CSV
            </button>

            <button
              onClick={() => exportAsFigma(palette.id)}
              title={`Download "${palette.name}" palette as Figma-compatible JSON file`}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              🎨 Export Figma
            </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '15px',
      }}>
        {palette.colors.map((color, index) => (
          <ColorSwatch
            key={index}
            color={color}
            onClick={() => selectColor(color)}
            isSelected={state.selectedColor?.hex === color.hex}
          />
        ))}
      </div>

      {/* Temp classification */}
      <div style={{ marginTop: '15px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['warm', 'cool', 'neutral'].map(temp => {
            const count = palette.colors.filter(c => c.temperature === temp).length;
            if (count === 0) return null;
            return (
              <span
                key={temp}
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  color: '#495057',
                }}
              >
                {temp.charAt(0).toUpperCase() + temp.slice(1)}: {count}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Selected color details
  const ColorDetails: React.FC = () => {
    if (!state.selectedColor) return null;

    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        minWidth: '300px',
        zIndex: 1000,
      }}>
        <h4 style={{
          margin: '0 0 15px 0',
          color: '#2c3e50',
          fontSize: '1.2rem',
        }}>
          🔥 Selected Color
        </h4>

        <div style={{
          backgroundColor: state.selectedColor.hex,
          width: '100%',
          height: '80px',
          borderRadius: '8px',
          marginBottom: '15px',
        }} />

        <div style={{ fontSize: '0.9rem', color: '#495057' }}>
          <p style={{ margin: '5px 0' }}>
            <strong>Hex:</strong> {state.selectedColor.hex}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>RGB:</strong> rgb({state.selectedColor.rgb.r}, {state.selectedColor.rgb.g}, {state.selectedColor.rgb.b})
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>HSL:</strong> hsl({state.selectedColor.hsl.h}, {state.selectedColor.hsl.s}%, {state.selectedColor.hsl.l}%)
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Temperature:</strong> {state.selectedColor.temperature.charAt(0).toUpperCase() + state.selectedColor.temperature.slice(1)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      minHeight: '100vh',
    }}>
      <ColorDetails />

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: '10px',
        }}>
          🎨 Color Picker Studio
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6c757d',
          margin: '0',
        }}>
          Discover, analyze, and export beautiful color palettes
        </p>

        {/* App Info Message */}
        <div style={{
          maxWidth: '800px',
          margin: '20px auto',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            color: '#2c3e50',
            margin: '0 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            🌟 Welcome to Color Picker Studio
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: '#495057',
            lineHeight: '1.5',
            margin: '0',
            textAlign: 'left',
          }}>
            <strong>Get creative with colors!</strong> You can pick custom colors using the hex input and RGB sliders,
            explore our curated professional color palettes, or generate random color combinations.
            See real-time canvas previews of your chosen colors in multiple artistic patterns.
            Export your favorite palettes as CSV files or Figma-compatible JSON for use in your design projects.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <button
          onClick={generatePalette}
          title="Generate a new random color palette with 6 unique colors"
          style={{
            padding: '12px 24px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
          }}
        >
          🎲 Generate Random Palette
        </button>

        <button
          onClick={toggleColorWheel}
          title={state.colorWheelVisible
            ? "Hide the color wheel spectrum"
            : "Show full color wheel with 36 colors from the spectrum"
          }
          style={{
            padding: '12px 24px',
            backgroundColor: state.colorWheelVisible ? '#95a5a6' : '#9b59b6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(155, 89, 182, 0.3)',
          }}
        >
          {state.colorWheelVisible ? '🙈 Hide' : '🌀 Show'} Color Wheel
        </button>

        <button
          onClick={toggleCanvasPreview}
          title={state.canvasPreviewVisible
            ? "Hide canvas preview of your manual color palette"
            : "Show visual canvas preview of your manual color palette with different patterns"
          }
          style={{
            padding: '12px 24px',
            backgroundColor: state.canvasPreviewVisible ? '#95a5a6' : '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(243, 156, 18, 0.3)',
          }}
        >
          {state.canvasPreviewVisible ? '🎨 Hide' : '🎨 Show'} Canvas Preview
        </button>
      </div>

      {/* Canvas Preview */}
      {state.canvasPreviewVisible && state.manualPalette.length > 0 && (
        <div style={{ marginTop: '20px', marginBottom: '40px' }}>
          <h2 style={{
            textAlign: 'center',
            color: '#2c3e50',
            fontSize: '1.8rem',
            marginBottom: '20px',
          }}>
            🖼️ Canvas Preview
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}>
            {[
              { name: 'linear', desc: 'Simple gradient based on color distance' },
              { name: 'radial', desc: 'Circular gradient from center outwards' },
              { name: 'mosaic', desc: 'Grid pattern with color repetition' },
              { name: 'spiral', desc: 'Spiral gradient pattern' }
            ].map(pattern => (
              <button
                key={pattern.name}
                onClick={() => setCurrentPattern(pattern.name as typeof currentPattern)}
                title={`Switch to ${pattern.desc} patterning algorithm`}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentPattern === pattern.name ? '#3498db' : '#ecf0f1',
                  color: currentPattern === pattern.name ? 'white' : '#2c3e50',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {pattern.name.charAt(0).toUpperCase() + pattern.name.slice(1)}
              </button>
            ))}
          </div>

          <ColorCanvas colors={state.manualPalette} pattern={currentPattern} />
        </div>
      )}

      {/* Manual Color Picker */}
      <ManualColorPicker
        colors={state.manualPalette}
        onAddColor={addColorToManualPalette}
        onRemoveColor={removeColorFromManualPalette}
        onCreatePalette={createManualPalette}
      />

      {/* Color Wheel */}
      {state.colorWheelVisible && <ColorWheel />}

      {/* Generated Palettes */}
      {state.palettes.length > 0 && (
        <div style={{ marginTop: '40px', marginBottom: '20px' }}>
          <h2 style={{
            textAlign: 'center',
            color: '#2c3e50',
            fontSize: '1.8rem',
            marginBottom: '30px',
          }}>
            ✨ Generated Palettes
          </h2>

          {state.palettes.map(palette => (
            <PaletteDisplay key={palette.id} palette={palette} />
          ))}
        </div>
      )}

      {/* Predefined Palettes */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2c3e50',
          fontSize: '1.8rem',
          marginBottom: '30px',
        }}>
          🌈 Curated Color Palettes
        </h2>

        {predefinedPalettes.map(palette => (
          <PaletteDisplay key={palette.id} palette={palette} />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
