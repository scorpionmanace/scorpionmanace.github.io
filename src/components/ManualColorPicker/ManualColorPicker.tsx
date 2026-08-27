import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Color } from '../../hooks/useColorPicker';
import { Button } from '../ui/Button';
import { Field, Input } from '../ui/Field';

interface ManualColorPickerProps {
  colors: Color[];
  onAddColor: (color: Color) => void;
  onRemoveColor: (index: number) => void;
  onCreatePalette: (name: string) => void;
}

const HEX_PATTERN = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = HEX_PATTERN.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

const rgbToHsl = (r255: number, g255: number, b255: number) => {
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    default:
      h = (r - g) / d + 4;
  }

  return { h: Math.round((h / 6) * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

/** Warm reds/yellows vs cool blues/greens, with the extremes left neutral. */
const temperatureFor = (hue: number): Color['temperature'] => {
  if (hue > 0 && hue < 180) return 'warm';
  if (hue > 180 && hue < 360) return 'cool';
  return 'neutral';
};

const CHANNELS: Array<{ key: 'r' | 'g' | 'b'; label: string }> = [
  { key: 'r', label: 'R' },
  { key: 'g', label: 'G' },
  { key: 'b', label: 'B' },
];

const ManualColorPicker: React.FC<ManualColorPickerProps> = ({
  colors,
  onAddColor,
  onRemoveColor,
  onCreatePalette,
}) => {
  const [rgb, setRgb] = useState({ r: 255, g: 107, b: 107 });
  const [hexInput, setHexInput] = useState('#FF6B6B');
  const [paletteName, setPaletteName] = useState('');

  const isValidHex = hexToRgb(hexInput) !== null;

  const handleHexChange = (value: string) => {
    const next = value.startsWith('#') ? value : `#${value}`;
    setHexInput(next);
    const parsed = hexToRgb(next);
    if (parsed) setRgb(parsed);
  };

  const handleChannelChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const next = { ...rgb, [channel]: value };
    setRgb(next);
    setHexInput(rgbToHex(next.r, next.g, next.b).toUpperCase());
  };

  const addCurrentColor = () => {
    const parsed = hexToRgb(hexInput);
    if (!parsed) return;

    const hsl = rgbToHsl(parsed.r, parsed.g, parsed.b);

    onAddColor({
      hex: rgbToHex(parsed.r, parsed.g, parsed.b).toUpperCase(),
      rgb: parsed,
      hsl,
      temperature: temperatureFor(hsl.h),
    });
  };

  const handleCreatePalette = () => {
    const name = paletteName.trim();
    if (!name || colors.length === 0) return;
    onCreatePalette(name);
    setPaletteName('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Editor */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
        <div
          className="h-24 w-full shrink-0 rounded-xl border border-line lg:h-[4.5rem] lg:w-24"
          style={{ backgroundColor: isValidHex ? hexInput : 'transparent' }}
          aria-hidden="true"
        />

        <Field label="Hex" htmlFor="manual-hex" className="lg:w-40">
          <Input
            id="manual-hex"
            value={hexInput}
            onChange={(event) => handleHexChange(event.target.value)}
            maxLength={7}
            spellCheck={false}
            aria-invalid={!isValidHex}
            className="font-mono uppercase"
          />
        </Field>

        <div className="flex flex-1 flex-col gap-3">
          {CHANNELS.map((channel) => (
            <div key={channel.key} className="flex items-center gap-3">
              <label
                htmlFor={`channel-${channel.key}`}
                className="w-4 font-mono text-xs text-muted"
              >
                {channel.label}
              </label>
              <input
                id={`channel-${channel.key}`}
                type="range"
                min={0}
                max={255}
                value={rgb[channel.key]}
                onChange={(event) => handleChannelChange(channel.key, Number(event.target.value))}
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-line-strong accent-accent"
              />
              <span className="w-8 text-right font-mono text-xs text-ink-soft">
                {rgb[channel.key]}
              </span>
            </div>
          ))}
        </div>

        <Button onClick={addCurrentColor} disabled={!isValidHex}>
          Add color
        </Button>
      </div>

      {/* Working palette */}
      <div>
        <p className="eyebrow mb-3">
          Current palette {colors.length > 0 && `· ${colors.length}`}
        </p>

        {colors.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line-strong px-4 py-8 text-center text-sm text-faint">
            Add colors to start building a palette.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <motion.li
                key={`${color.hex}-${index}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="group relative"
              >
                <div
                  className="h-16 w-16 rounded-xl border border-line"
                  style={{ backgroundColor: color.hex }}
                  title={`${color.hex} · ${color.temperature}`}
                />
                <button
                  type="button"
                  onClick={() => onRemoveColor(index)}
                  aria-label={`Remove ${color.hex}`}
                  className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border border-line bg-surface text-xs text-muted opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 focus-visible:opacity-100"
                >
                  ✕
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Save */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Field label="Palette name" htmlFor="palette-name" className="sm:flex-1">
          <Input
            id="palette-name"
            value={paletteName}
            onChange={(event) => setPaletteName(event.target.value)}
            placeholder="e.g. Autumn UI"
          />
        </Field>
        <Button
          variant="secondary"
          onClick={handleCreatePalette}
          disabled={!paletteName.trim() || colors.length === 0}
        >
          Save palette
        </Button>
      </div>
    </div>
  );
};

export default ManualColorPicker;
