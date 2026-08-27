import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useColorPicker, ColorPalette, Color } from '../../hooks/useColorPicker';
import ManualColorPicker from '../ManualColorPicker';
import ColorCanvas from '../ColorCanvas';
import { Button } from '../ui/Button';
import { cn } from '../ui/cn';
import { ease } from '../../design/motion';

type Pattern = 'linear' | 'radial' | 'mosaic' | 'spiral';

const PATTERNS: Pattern[] = ['linear', 'radial', 'mosaic', 'spiral'];

/** Pick readable text for a swatch from its perceived luminance. */
const readableOn = (color: Color): string => {
  const { r, g, b } = color.rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#14130f' : '#ffffff';
};

const Swatch: React.FC<{
  color: Color;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ color, isSelected, onSelect }) => (
  <motion.button
    type="button"
    onClick={onSelect}
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2, ease }}
    aria-label={`Select ${color.hex}`}
    aria-pressed={isSelected}
    className={cn(
      'group relative flex h-20 items-end justify-start overflow-hidden rounded-xl border p-2 transition-shadow',
      isSelected ? 'border-accent shadow-raised' : 'border-line hover:shadow-card',
    )}
    style={{ backgroundColor: color.hex }}
  >
    <span
      className="font-mono text-[0.625rem] tracking-wide opacity-0 transition-opacity group-hover:opacity-100"
      style={{ color: readableOn(color) }}
    >
      {color.hex}
    </span>
    {isSelected && (
      <span
        className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full text-[0.625rem]"
        style={{ backgroundColor: readableOn(color), color: color.hex }}
        aria-hidden="true"
      >
        ✓
      </span>
    )}
  </motion.button>
);

const PaletteBlock: React.FC<{
  palette: ColorPalette;
  selectedHex?: string;
  onSelect: (color: Color) => void;
  onExportCsv: () => void;
  onExportFigma: () => void;
}> = ({ palette, selectedHex, onSelect, onExportCsv, onExportFigma }) => (
  <div className="rounded-2xl border border-line bg-canvas p-5">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h3 className="text-sm font-semibold tracking-tight text-ink">{palette.name}</h3>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onExportCsv}
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          CSV
        </button>
        <button
          type="button"
          onClick={onExportFigma}
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          Figma
        </button>
      </div>
    </div>

    <div className="grid grid-cols-5 gap-2">
      {palette.colors.map((color) => (
        <Swatch
          key={color.hex}
          color={color}
          isSelected={selectedHex === color.hex}
          onSelect={() => onSelect(color)}
        />
      ))}
    </div>
  </div>
);

const ColorPicker: React.FC = () => {
  const {
    state,
    predefinedPalettes,
    selectColor,
    exportAsCSV,
    exportAsFigma,
    generatePalette,
    addColorToManualPalette,
    removeColorFromManualPalette,
    createManualPalette,
    toggleCanvasPreview,
  } = useColorPicker();

  const [pattern, setPattern] = useState<Pattern>('linear');

  const allPalettes = [...predefinedPalettes, ...state.palettes];
  const selected = state.selectedColor;

  return (
    <div className="flex flex-col gap-8">
      {/* Selected color readout */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.hex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="flex flex-col gap-5 rounded-2xl border border-line bg-canvas p-5 sm:flex-row sm:items-center"
          >
            <div
              className="h-24 w-full shrink-0 rounded-xl border border-line sm:w-32"
              style={{ backgroundColor: selected.hex }}
              aria-hidden="true"
            />
            <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
              {[
                { label: 'Hex', value: selected.hex },
                {
                  label: 'RGB',
                  value: `${selected.rgb.r}, ${selected.rgb.g}, ${selected.rgb.b}`,
                },
                {
                  label: 'HSL',
                  value: `${selected.hsl.h}°, ${selected.hsl.s}%, ${selected.hsl.l}%`,
                },
                { label: 'Temperature', value: selected.temperature },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="eyebrow">{item.label}</dt>
                  <dd className="mt-1.5 font-mono text-sm capitalize text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" onClick={generatePalette}>
          Generate palette
        </Button>
        <Button
          variant="secondary"
          onClick={toggleCanvasPreview}
          disabled={state.manualPalette.length === 0}
        >
          {state.canvasPreviewVisible ? 'Hide canvas' : 'Preview on canvas'}
        </Button>
      </div>

      {/* Manual palette builder */}
      <section>
        <h2 className="eyebrow mb-4">Build a palette</h2>
        <div className="rounded-2xl border border-line bg-canvas p-5">
          <ManualColorPicker
            colors={state.manualPalette}
            onAddColor={addColorToManualPalette}
            onRemoveColor={removeColorFromManualPalette}
            onCreatePalette={createManualPalette}
          />
        </div>
      </section>

      {/* Canvas preview */}
      <AnimatePresence>
        {state.canvasPreviewVisible && state.manualPalette.length > 0 && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <h2 className="eyebrow mr-2">Pattern</h2>
              {PATTERNS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPattern(item)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[0.8125rem] capitalize transition-colors',
                    pattern === item
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line text-muted hover:border-line-strong hover:text-ink',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-line bg-canvas p-5">
              <ColorCanvas colors={state.manualPalette} pattern={pattern} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Palette library */}
      <section>
        <h2 className="eyebrow mb-4">Palette library</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {allPalettes.map((palette) => (
            <PaletteBlock
              key={palette.id}
              palette={palette}
              selectedHex={selected?.hex}
              onSelect={selectColor}
              onExportCsv={() => exportAsCSV(palette.id)}
              onExportFigma={() => exportAsFigma(palette.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ColorPicker;
