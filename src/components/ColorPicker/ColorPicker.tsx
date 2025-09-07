import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Badge,
  SimpleGrid,
  Alert,
} from '@chakra-ui/react';
import { useColorPicker, ColorPalette, Color } from '../../hooks/useColorPicker';
import { useColorPickerStyles } from './hook/useColorPickerStyles';
import ManualColorPicker from '../ManualColorPicker';
import ColorCanvas from '../ColorCanvas';

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
  const { colorPickerStyles } = useColorPickerStyles();
  const [currentPattern, setCurrentPattern] = useState<'linear' | 'radial' | 'mosaic' | 'spiral'>('linear');

  // Color swatch component
  const ColorSwatch: React.FC<{ color: Color; onClick: () => void; isSelected?: boolean }> = ({
    color,
    onClick,
    isSelected = false,
  }) => (
    <Box
      as="button"
      onClick={onClick}
      w="12"
      h="12"
      bg={color.hex}
      borderRadius="md"
      border={isSelected ? "3px solid" : "2px solid"}
      borderColor={isSelected ? "blue.500" : "gray.300"}
      _hover={{ shadow: "lg", transform: "scale(1.05)" }}
      transition="all 0.2s"
      title={`${color.hex} - HSL(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%) - ${color.temperature}`}
      cursor="pointer"
      p={0}
    />
  );

  // Color wheel component
  const ColorWheel: React.FC = () => {
    const { generateColorWheel } = useColorPicker();
    const wheelColors = generateColorWheel();

    return (
      <Card.Root mb={8}>
        <Card.Header>
          <Heading size="lg">
            🌀 Color Wheel - Full Spectrum
          </Heading>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 6, sm: 8, md: 12, lg: 16 }} gap={3}>
            {wheelColors.map((color, index) => (
              <ColorSwatch
                key={index}
                color={color}
                onClick={() => selectColor(color)}
                isSelected={state.selectedColor?.hex === color.hex}
              />
            ))}
          </SimpleGrid>
        </Card.Body>
      </Card.Root>
    );
  };

  // Palette display component
  const PaletteDisplay: React.FC<{ palette: ColorPalette }> = ({ palette }) => (
    <Card.Root mb={6}>
      <Card.Header>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Heading size="md">
            🎨 {palette.name}
          </Heading>

          <HStack gap={3}>
            <Button
              onClick={() => exportAsCSV(palette.id)}
              title={`Download "${palette.name}" palette as CSV file with color details`}
              colorScheme="green"
              size="sm"
            >
              📄 Export CSV
            </Button>

            <Button
              onClick={() => exportAsFigma(palette.id)}
              title={`Download "${palette.name}" palette as Figma-compatible JSON file`}
              colorScheme="blue"
              size="sm"
            >
              🎨 Export Figma
            </Button>
          </HStack>
        </Flex>
      </Card.Header>

      <Card.Body>
        <Flex wrap="wrap" gap={3} mb={4}>
          {palette.colors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              onClick={() => selectColor(color)}
              isSelected={state.selectedColor?.hex === color.hex}
            />
          ))}
        </Flex>

        {/* Temperature badges */}
        <HStack gap={2} wrap="wrap">
          {['warm', 'cool', 'neutral'].map(temp => {
            const count = palette.colors.filter(c => c.temperature === temp).length;
            if (count === 0) return null;
            return (
              <Badge
                key={temp}
                colorScheme={
                  temp === 'warm' ? 'red' :
                  temp === 'cool' ? 'blue' :
                  'gray'
                }
                variant="solid"
                p={2}
              >
                {temp.charAt(0).toUpperCase() + temp.slice(1)}: {count}
              </Badge>
            );
          })}
        </HStack>
      </Card.Body>
    </Card.Root>
  );

  // Selected color details
  const ColorDetails: React.FC = () => {
    if (!state.selectedColor) return null;

    return (
      <div className={colorPickerStyles.colorDetails}>
        <h4 className={colorPickerStyles.colorDetailsTitle}>
          🔥 Selected Color
        </h4>

        <div 
          className={colorPickerStyles.colorSwatch}
          style={{ backgroundColor: state.selectedColor.hex }}
        />

        <div className={colorPickerStyles.colorInfo}>
          <p className="m-0">
            <strong>Hex:</strong> {state.selectedColor.hex}
          </p>
          <p className="m-0">
            <strong>RGB:</strong> rgb({state.selectedColor.rgb.r}, {state.selectedColor.rgb.g}, {state.selectedColor.rgb.b})
          </p>
          <p className="m-0">
            <strong>HSL:</strong> hsl({state.selectedColor.hsl.h}, {state.selectedColor.hsl.s}%, {state.selectedColor.hsl.l}%)
          </p>
          <p className="m-0">
            <strong>Temperature:</strong> {state.selectedColor.temperature.charAt(0).toUpperCase() + state.selectedColor.temperature.slice(1)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={colorPickerStyles.container}>
      <ColorDetails />

      {/* Header */}
      <div className={colorPickerStyles.header}>
        <h1 className={colorPickerStyles.title}>
          🎨 Color Picker Studio
        </h1>
        <p className={colorPickerStyles.subtitle}>
          Discover, analyze, and export beautiful color palettes
        </p>

        {/* App Info Message */}
        <Alert.Root mb={6} status="info">
          <Alert.Indicator />
          <Alert.Title>🌟 Welcome to Color Picker Studio</Alert.Title>
          <Alert.Description>
            <strong>Get creative with colors!</strong> You can pick custom colors using the hex input and RGB sliders,
            explore our curated professional color palettes, or generate random color combinations.
            See real-time canvas previews of your chosen colors in multiple artistic patterns.
            Export your favorite palettes as CSV files or Figma-compatible JSON for use in your design projects.
          </Alert.Description>
        </Alert.Root>
      </div>

      {/* Controls */}
      <Flex gap={4} wrap="wrap" justify="center" align="center" p={4}>
        <Button
          onClick={generatePalette}
          title="Generate a new random color palette with 6 unique colors"
          colorScheme="blue"
          size="md"
          flex={{ base: 1, md: "auto" }}
          minW="200px"
        >
          🎲 Generate Random Palette
        </Button>

        <Button
          onClick={toggleColorWheel}
          title={state.colorWheelVisible
            ? "Hide the color wheel spectrum"
            : "Show full color wheel with 36 colors from the spectrum"
          }
          variant={state.colorWheelVisible ? "solid" : "outline"}
          colorScheme={state.colorWheelVisible ? "purple" : "gray"}
          size="md"
          flex={{ base: 1, md: "auto" }}
          minW="200px"
          _hover={{
            bg: state.colorWheelVisible ? "purple.600" : "gray.100"
          }}
        >
          {state.colorWheelVisible ? '🙈 Hide' : '🌀 Show'} Color Wheel
        </Button>

        <Button
          onClick={toggleCanvasPreview}
          title={state.canvasPreviewVisible
            ? "Hide canvas preview of your manual color palette"
            : "Show visual canvas preview of your manual color palette with different patterns"
          }
          variant={state.canvasPreviewVisible ? "solid" : "outline"}
          colorScheme={state.canvasPreviewVisible ? "teal" : "gray"}
          size="md"
          flex={{ base: 1, md: "auto" }}
          minW="200px"
          _hover={{
            bg: state.canvasPreviewVisible ? "teal.600" : "gray.100"
          }}
        >
          {state.canvasPreviewVisible ? '🎨 Hide' : '🎨 Show'} Canvas Preview
        </Button>
      </Flex>

      {/* Canvas Preview */}
      {state.canvasPreviewVisible && state.manualPalette.length > 0 && (
        <div className={colorPickerStyles.canvasPreview}>
          <h2 className={colorPickerStyles.canvasTitle}>
            🖼️ Canvas Preview
          </h2>

          <Flex gap={2} flexWrap="wrap" justify="center" mt={4}>
            {[
              { name: 'linear', desc: 'Simple gradient based on color distance' },
              { name: 'radial', desc: 'Circular gradient from center outwards' },
              { name: 'mosaic', desc: 'Grid pattern with color repetition' },
              { name: 'spiral', desc: 'Spiral gradient pattern' }
            ].map(pattern => (
              <Button
                key={pattern.name}
                onClick={() => setCurrentPattern(pattern.name as typeof currentPattern)}
                title={`Switch to ${pattern.desc} patterning algorithm`}
                colorScheme={currentPattern === pattern.name ? "blue" : "gray"}
                variant={currentPattern === pattern.name ? "solid" : "outline"}
                size="sm"
                flex={{ base: 1, sm: "auto" }}
                minW="100px"
              >
                {pattern.name.charAt(0).toUpperCase() + pattern.name.slice(1)}
              </Button>
            ))}
          </Flex>

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
        <div className={colorPickerStyles.paletteSection}>
          <h2 className={colorPickerStyles.paletteTitle}>
            ✨ Generated Palettes
          </h2>

          {state.palettes.map(palette => (
            <PaletteDisplay key={palette.id} palette={palette} />
          ))}
        </div>
      )}

      {/* Predefined Palettes */}
      <div className={colorPickerStyles.paletteSection}>
        <h2 className={colorPickerStyles.paletteTitle}>
          🌈 Curated Color Palettes
        </h2>

        <div className={colorPickerStyles.paletteContainer}>
          {predefinedPalettes.map(palette => (
            <PaletteDisplay key={palette.id} palette={palette} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
