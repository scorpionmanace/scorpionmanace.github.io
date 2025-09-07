import React, { useRef, useEffect, useCallback } from 'react';
import { Color } from '../../hooks/useColorPicker';
import { useColorCanvasStyles } from './hook/useColorCanvasStyles';
import { useBreakpointValue } from '@chakra-ui/react';

interface ColorCanvasProps {
  colors: Color[];
  width?: number;
  height?: number;
  pattern?: 'linear' | 'radial' | 'mosaic' | 'spiral';
}

const ColorCanvas: React.FC<ColorCanvasProps> = ({
  colors,
  width,
  height,
  pattern = 'linear'
}) => {
  const defaultWidth = useBreakpointValue({ base: 320, md: 640, lg: 800 });
  const defaultHeight = useBreakpointValue({ base: 240, md: 480, lg: 600 });
  const canvasWidth = width || defaultWidth || 800;
  const canvasHeight = height || defaultHeight || 600;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colorCanvasStyles } = useColorCanvasStyles();

  const generatePattern = useCallback((
    ctx: CanvasRenderingContext2D,
    canvasColors: Color[],
    canvasWidth: number,
    canvasHeight: number,
    canvasPattern: string
  ) => {
    if (canvasColors.length === 0) return;

    const rectangles = canvasWidth * canvasHeight;
    const colorsWithOpacities = canvasColors.map((color, index) => ({
      ...color,
      opacity: 1 - (index * 0.2) / canvasColors.length, // Gradient opacity
    }));

    switch (canvasPattern) {
      case 'mosaic':
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 15; j++) {
            const x = i * (canvasWidth / 20);
            const y = j * (canvasHeight / 15);
            const colorIndex = (i + j) % canvasColors.length;
            const color = colorsWithOpacities[colorIndex];

            ctx.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.opacity})`;
            ctx.fillRect(x, y, canvasWidth / 20, canvasHeight / 15);
          }
        }
        break;

      case 'spiral':
        const spiralCenterX = canvasWidth / 2;
        const spiralCenterY = canvasHeight / 2;
        const spiralMaxRadius = Math.min(canvasWidth, canvasHeight) / 2;

        for (let angle = 0; angle < 360; angle += 10) {
          for (let radius = 0; radius < spiralMaxRadius; radius += 10) {
            const x = spiralCenterX + Math.cos((angle * Math.PI) / 180) * radius;
            const y = spiralCenterY + Math.sin((angle * Math.PI) / 180) * radius;
            const colorIndex = Math.floor((angle + radius) / 50) % colorsWithOpacities.length;
            const color = colorsWithOpacities[colorIndex];

            ctx.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.opacity})`;
            ctx.fillRect(x, y, 12, 12);
          }
        }
        break;

      case 'radial':
        // Radial gradient pattern
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const maxRadius = Math.min(canvasWidth, canvasHeight) / 2;
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, maxRadius
        );

        colorsWithOpacities.forEach((color, index) => {
          const position = index / (colorsWithOpacities.length - 1);
          gradient.addColorStop(
            position,
            `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.opacity})`
          );
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Add concentric circles
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;

        for (let radius = 50; radius < maxRadius; radius += 50) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;

      case 'linear':
      default:
        // Linear interpolation pattern
        const gridSize = 20;
        for (let x = 0; x < canvasWidth; x += gridSize) {
          for (let y = 0; y < canvasHeight; y += gridSize) {
            const xRatio = x / canvasWidth;
            const yRatio = y / canvasHeight;
            const distance = Math.sqrt(xRatio * xRatio + yRatio * yRatio);
            const colorIndex = Math.floor(distance * colorsWithOpacities.length) % colorsWithOpacities.length;
            const color = colorsWithOpacities[colorIndex];

            ctx.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.opacity})`;
            ctx.fillRect(x, y, gridSize, gridSize);
          }
        }

        // Add color information text
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        colorsWithOpacities.forEach((color, index) => {
          const x = (index + 0.5) * (canvasWidth / colorsWithOpacities.length);
          const y = canvasHeight - 20;
          ctx.fillText(color.hex, x, y);
        });
        break;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Generate pattern
    generatePattern(ctx, colors, canvasWidth, canvasHeight, pattern);

  }, [colors, canvasWidth, canvasHeight, pattern, generatePattern]);

  return (
    <div className={colorCanvasStyles.container}>
      <h3 className={colorCanvasStyles.title}>
        🎨 Canvas Preview - {pattern.charAt(0).toUpperCase() + pattern.slice(1)} Pattern
      </h3>

      <div className={colorCanvasStyles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="block max-w-full"
          style={{ imageRendering: 'pixelated', height: 'auto' }}
        />
      </div>

      <div className={colorCanvasStyles.colorSwatches}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={colorCanvasStyles.colorSwatch}
            style={{ backgroundColor: color.hex }}
            title={`${color.hex} - Temperature: ${color.temperature}`}
          />
        ))}
      </div>

      <div className={colorCanvasStyles.infoText}>
        Palette with {colors.length} colors • Pattern: {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
      </div>
    </div>
  );
};

export default ColorCanvas;
