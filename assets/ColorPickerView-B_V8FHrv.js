import { r as reactExports, j as jsxRuntimeExports, A as AlertRoot, i as AlertIndicator, k as AlertTitle, l as AlertDescription, F as Flex, h as Button, m as CardRoot, n as CardHeader, H as Heading, o as CardBody, S as SimpleGrid, p as HStack, q as Badge, B as Box } from "./vendor-DJ3ZJzoA.js";
import { u as usePxToRem } from "./usePxToRem-B-taVK49.js";
const useColorPicker = () => {
  const [state, setState] = reactExports.useState({
    selectedColor: null,
    palettes: [],
    currentPalette: null,
    colorWheelVisible: false,
    manualPalette: [],
    canvasPreviewVisible: false
  });
  const predefinedPalettes = reactExports.useMemo(() => [
    {
      id: "warm-tones",
      name: "Warm Tones",
      type: "manual",
      colors: [
        { hex: "#FF6B6B", rgb: { r: 255, g: 107, b: 107 }, hsl: { h: 0, s: 100, l: 70 }, temperature: "warm" },
        { hex: "#FF8E53", rgb: { r: 255, g: 142, b: 83 }, hsl: { h: 23, s: 100, l: 66 }, temperature: "warm" },
        { hex: "#FFCC02", rgb: { r: 255, g: 204, b: 2 }, hsl: { h: 52, s: 100, l: 51 }, temperature: "warm" },
        { hex: "#FFB347", rgb: { r: 255, g: 179, b: 71 }, hsl: { h: 39, s: 100, l: 64 }, temperature: "warm" },
        { hex: "#FF683B", rgb: { r: 255, g: 104, b: 59 }, hsl: { h: 14, s: 100, l: 61 }, temperature: "warm" }
      ]
    },
    {
      id: "cool-tones",
      name: "Cool Tones",
      type: "manual",
      colors: [
        { hex: "#4ECDC4", rgb: { r: 78, g: 205, b: 196 }, hsl: { h: 173, s: 56, l: 55 }, temperature: "cool" },
        { hex: "#45B7D1", rgb: { r: 69, g: 183, b: 209 }, hsl: { h: 194, s: 60, l: 54 }, temperature: "cool" },
        { hex: "#96CEB4", rgb: { r: 150, g: 206, b: 180 }, hsl: { h: 150, s: 56, l: 70 }, temperature: "cool" },
        { hex: "#54C4C1", rgb: { r: 84, g: 196, b: 193 }, hsl: { h: 178, s: 49, l: 55 }, temperature: "cool" },
        { hex: "#26C6DA", rgb: { r: 38, g: 198, b: 218 }, hsl: { h: 188, s: 68, l: 50 }, temperature: "cool" }
      ]
    },
    {
      id: "mono-pastels",
      name: "Monochrome Pastels",
      type: "manual",
      colors: [
        { hex: "#F8F9FA", rgb: { r: 248, g: 249, b: 250 }, hsl: { h: 210, s: 14, l: 97 }, temperature: "neutral" },
        { hex: "#E9ECEF", rgb: { r: 233, g: 236, b: 239 }, hsl: { h: 210, s: 14, l: 93 }, temperature: "neutral" },
        { hex: "#DEE2E6", rgb: { r: 222, g: 226, b: 230 }, hsl: { h: 210, s: 11, l: 89 }, temperature: "neutral" },
        { hex: "#CED4DA", rgb: { r: 206, g: 212, b: 218 }, hsl: { h: 210, s: 11, l: 84 }, temperature: "neutral" },
        { hex: "#ADB5BD", rgb: { r: 173, g: 181, b: 189 }, hsl: { h: 210, s: 10, l: 75 }, temperature: "neutral" }
      ]
    },
    {
      id: "vivid-colors",
      name: "Vivid Vibrants",
      type: "manual",
      colors: [
        { hex: "#FF0080", rgb: { r: 255, g: 0, b: 128 }, hsl: { h: 330, s: 100, l: 50 }, temperature: "warm" },
        { hex: "#8000FF", rgb: { r: 128, g: 0, b: 255 }, hsl: { h: 270, s: 100, l: 50 }, temperature: "cool" },
        { hex: "#00FF80", rgb: { r: 0, g: 255, b: 128 }, hsl: { h: 150, s: 100, l: 50 }, temperature: "cool" },
        { hex: "#FF8000", rgb: { r: 255, g: 128, b: 0 }, hsl: { h: 30, s: 100, l: 50 }, temperature: "warm" },
        { hex: "#0080FF", rgb: { r: 0, g: 128, b: 255 }, hsl: { h: 210, s: 100, l: 50 }, temperature: "cool" }
      ]
    }
  ], []);
  const generateColorWheel = reactExports.useCallback(() => {
    const colors = [];
    const steps = 36;
    for (let i = 0; i < steps; i++) {
      const hue = i * 360 / steps;
      const saturation = 70 + Math.random() * 30;
      const lightness = 45 + Math.random() * 10;
      const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
      const x = c * (1 - Math.abs(hue / 60 % 2 - 1));
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
      const hexValue = `#${finalR.toString(16).padStart(2, "0")}${finalG.toString(16).padStart(2, "0")}${finalB.toString(16).padStart(2, "0")}`;
      let temperature = "neutral";
      if (hue > 0 && hue < 180) {
        temperature = "warm";
      } else if (hue > 180 && hue < 360) {
        temperature = "cool";
      }
      colors.push({
        hex: hexValue.toUpperCase(),
        rgb: { r: finalR, g: finalG, b: finalB },
        hsl: { h: Math.round(hue), s: Math.round(saturation), l: Math.round(lightness) },
        temperature
      });
    }
    return colors;
  }, []);
  const exportAsCSV = reactExports.useCallback((paletteId) => {
    let palette = state.palettes.find((p) => p.id === paletteId);
    if (!palette) {
      palette = predefinedPalettes.find((p) => p.id === paletteId);
    }
    if (!palette) return;
    const csvContent = [
      "Color Name,Hex,RGB,HSL,Temperature",
      ...palette.colors.map(
        (color, index) => `${palette.name} ${index + 1},${color.hex},rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}),hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%),${color.temperature}`
      )
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${palette.name.toLowerCase().replace(" ", "-")}-palette.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [predefinedPalettes, state.palettes]);
  const exportAsFigma = reactExports.useCallback((paletteId) => {
    let palette = state.palettes.find((p) => p.id === paletteId);
    if (!palette) {
      palette = predefinedPalettes.find((p) => p.id === paletteId);
    }
    if (!palette) return;
    const figmaData = {
      name: palette.name,
      colors: palette.colors.map((color, index) => ({
        name: `${index + 1}`,
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
        temperature: color.temperature
      }))
    };
    const jsonContent = JSON.stringify(figmaData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${palette.name.toLowerCase().replace(" ", "-")}-palette.fig`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [predefinedPalettes, state.palettes]);
  const selectColor = reactExports.useCallback((color) => {
    setState((prev) => ({ ...prev, selectedColor: color }));
  }, []);
  const generatePalette = reactExports.useCallback(() => {
    const newPalette = {
      id: `generated-${Date.now()}`,
      name: "Generated Palette",
      type: "generated",
      colors: generateColorWheel().slice(0, 6)
    };
    setState((prev) => ({
      ...prev,
      palettes: [...prev.palettes, newPalette]
    }));
    return newPalette;
  }, [generateColorWheel]);
  const toggleColorWheel = reactExports.useCallback(() => {
    setState((prev) => ({
      ...prev,
      colorWheelVisible: !prev.colorWheelVisible
    }));
  }, []);
  const addColorToManualPalette = reactExports.useCallback((color) => {
    setState((prev) => ({
      ...prev,
      manualPalette: [...prev.manualPalette, color]
    }));
  }, []);
  const removeColorFromManualPalette = reactExports.useCallback((colorIndex) => {
    setState((prev) => ({
      ...prev,
      manualPalette: prev.manualPalette.filter((_, index) => index !== colorIndex)
    }));
  }, []);
  const createManualPalette = reactExports.useCallback((name) => {
    if (state.manualPalette.length === 0) return null;
    const newPalette = {
      id: `manual-${Date.now()}`,
      name: name || "My Custom Palette",
      type: "manual",
      colors: [...state.manualPalette]
    };
    setState((prev) => ({
      ...prev,
      palettes: [...prev.palettes, newPalette],
      manualPalette: []
      // Clear manual palette after creating
    }));
    return newPalette;
  }, [state.manualPalette]);
  const toggleCanvasPreview = reactExports.useCallback(() => {
    setState((prev) => ({
      ...prev,
      canvasPreviewVisible: !prev.canvasPreviewVisible
    }));
  }, []);
  const createColorFromHex = reactExports.useCallback((hexValue) => {
    if (!hexValue.startsWith("#")) return null;
    const hex = hexValue.substring(1);
    const rgb = {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
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
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    let temperature = "neutral";
    if (h > 0 && h < 180) {
      temperature = "warm";
    } else if (h > 180 && h < 360) {
      temperature = "cool";
    }
    return {
      hex: hexValue.toUpperCase(),
      rgb,
      hsl: { h, s, l },
      temperature
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
    createColorFromHex
  };
};
const useColorPickerStyles = () => {
  const colorPickerStyles = reactExports.useMemo(() => ({
    container: "max-w-6xl mx-auto px-4 py-8 min-h-screen",
    header: "text-center mb-10",
    title: "text-4xl font-bold text-gray-800 mb-4",
    subtitle: "text-lg text-gray-600 max-w-2xl mx-auto",
    infoMessage: "max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl border border-gray-200 mb-10",
    infoTitle: "text-xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2",
    infoText: "text-gray-700 text-sm leading-relaxed text-left",
    controls: "flex flex-wrap gap-4 justify-center mb-10",
    controlButton: (isActive) => `px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 shadow-lg ${isActive ? "bg-gray-500 hover:bg-gray-600 transform hover:-translate-y-1" : "bg-red-500 hover:bg-red-600 transform hover:-translate-y-1"}`,
    canvasPreview: "mt-8 mb-12",
    canvasTitle: "text-3xl font-bold text-gray-800 text-center mb-6",
    patternButtons: "flex flex-wrap justify-center gap-3 mb-6",
    patternButton: (isActive) => `px-4 py-2 rounded-lg font-bold transition-all duration-200 ${isActive ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
    colorDetails: "fixed bottom-5 right-5 bg-white p-6 rounded-xl shadow-2xl min-w-[300px] z-50 border border-gray-200",
    colorDetailsTitle: "text-xl font-bold text-gray-800 mb-4",
    colorSwatch: "w-full h-20 rounded-lg mb-4",
    colorInfo: "text-sm text-gray-700 mb-1",
    colorWheel: "mt-10 p-8 bg-white rounded-xl shadow-lg",
    wheelTitle: "text-2xl font-bold text-gray-800 mb-6 text-center",
    wheelColors: "flex flex-wrap gap-2 justify-center",
    paletteSection: "mt-12 mb-10",
    paletteTitle: "text-3xl font-bold text-gray-800 text-center mb-8",
    paletteContainer: "space-y-12",
    paletteDisplay: "mb-10 p-6 bg-white rounded-xl shadow-lg",
    paletteHeader: "flex flex-wrap justify-between items-center mb-6 gap-4",
    paletteName: "text-2xl font-bold text-gray-800 m-0",
    paletteActions: "flex flex-wrap gap-3",
    exportButton: (type) => `px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 ${type === "csv" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`,
    paletteColors: "flex flex-wrap gap-3 mb-4",
    colorSwatchSmall: (isSelected) => `w-15 h-15 rounded-lg border-2 transition-all duration-200 cursor-pointer ${isSelected ? "border-gray-800 shadow-lg scale-110" : "border-gray-300 hover:border-gray-500 hover:shadow-md"}`,
    tempTags: "flex flex-wrap gap-2 mt-4",
    tempTag: "px-3 py-1 rounded-full text-xs font-medium",
    tempTagWarm: "bg-red-100 text-red-800",
    tempTagCool: "bg-blue-100 text-blue-800",
    tempTagNeutral: "bg-gray-100 text-gray-800"
  }), []);
  return { colorPickerStyles };
};
const ManualColorPicker = ({
  colors,
  onAddColor,
  onRemoveColor,
  onCreatePalette
}) => {
  const { pxToRem, pxToRemBatch } = usePxToRem();
  const [hexInput, setHexInput] = reactExports.useState("#");
  const [paletteName, setPaletteName] = reactExports.useState("");
  const [rgbInput, setRgbInput] = reactExports.useState({ r: 255, g: 107, b: 107 });
  const [
    marginTop,
    containerPadding,
    gapSpacing,
    marginBottom,
    borderRadius,
    boxShadowInset,
    titleSize,
    titleMarginBottom,
    inputWidth,
    buttonWidth,
    inputHeight
  ] = pxToRemBatch([
    40,
    25,
    20,
    30,
    // marginTop, containerPadding, gapSpacing, marginBottom
    16,
    4,
    // borderRadius, boxShadowInset
    24,
    20,
    // titleSize, titleMarginBottom
    120,
    100,
    40
    // inputWidth, buttonWidth, inputHeight
  ]);
  const hexToRgb = (hex) => {
    if (!hex.startsWith("#") || hex.length !== 7) return null;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  const handleHexInputChange = (value) => {
    setHexInput(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgbInput(rgb);
    }
  };
  const handleRgbInputChange = (component, value) => {
    const newRgb = { ...rgbInput, [component]: value };
    setRgbInput(newRgb);
    setHexInput(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };
  const addCurrentColor = () => {
    const rgb = hexToRgb(hexInput);
    if (rgb) {
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
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          default:
            h = 0;
        }
        h /= 6;
      }
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      let temperature = "neutral";
      if (h > 0 && h < 180) {
        temperature = "warm";
      } else if (h > 180 && h < 360) {
        temperature = "cool";
      }
      const newColor = {
        hex: hexInput.toUpperCase(),
        rgb,
        hsl: { h, s, l },
        temperature
      };
      onAddColor(newColor);
      setHexInput("#");
      setRgbInput({ r: 255, g: 107, b: 107 });
    }
  };
  const removeColorFromPalette = (index) => {
    onRemoveColor(index);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    marginTop,
    padding: containerPadding,
    backgroundColor: "white",
    borderRadius,
    boxShadow: `0 ${boxShadowInset} 0.75rem rgba(0,0,0,0.1)`
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: {
      fontSize: titleSize,
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: titleMarginBottom,
      textAlign: "center"
    }, children: "🎨 Manual Color Picker" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginBottom: "30px"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
          fontSize: "0.9rem",
          color: "#6c757d",
          marginBottom: "5px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }, children: "🎨 Hex Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "color",
            value: hexInput.startsWith("#") && hexInput.length === 7 ? hexInput : "#FF6B6B",
            onChange: (e) => handleHexInputChange(e.target.value),
            title: "Click to open color picker or paste hex value",
            style: {
              width: inputWidth,
              height: inputHeight,
              border: `0.125rem solid #dee2e6`,
              borderRadius: `0.5rem`,
              cursor: "pointer",
              background: hexInput.startsWith("#") && hexInput.length === 7 ? hexInput : "#FF6B6B",
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: pxToRem(8) + " " + pxToRem(12),
              boxShadow: `0 ${pxToRem(2)} ${pxToRem(4)} rgba(0,0,0,0.1)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: hexInput,
            onChange: (e) => handleHexInputChange(e.target.value),
            placeholder: "#FF6B6B",
            title: "Type or paste hex color code (e.g. #FF6B6B)",
            style: {
              marginTop: "10px",
              padding: "10px 12px",
              border: "2px solid #dee2e6",
              borderRadius: "8px",
              fontSize: "1rem",
              width: "120px",
              textAlign: "center",
              backgroundColor: hexInput.startsWith("#") && hexInput.length === 7 ? hexInput : "#fff",
              color: hexInput.startsWith("#") && hexInput.length === 7 ? "#fff" : "#2c3e50",
              fontWeight: "bold",
              textShadow: hexInput.startsWith("#") && hexInput.length === 7 ? "0 0 2px rgba(255,255,255,0.8)" : "none"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
            fontSize: "0.8rem",
            color: "#6c757d",
            marginBottom: "2px"
          }, children: "R" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "255",
              value: rgbInput.r,
              onChange: (e) => handleRgbInputChange("r", parseInt(e.target.value)),
              style: {
                width: "100px",
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #000000, #ff0000)",
                outline: "none",
                cursor: "pointer"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#2c3e50",
            marginTop: "2px"
          }, children: rgbInput.r })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
            fontSize: "0.8rem",
            color: "#6c757d",
            marginBottom: "2px"
          }, children: "G" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "255",
              value: rgbInput.g,
              onChange: (e) => handleRgbInputChange("g", parseInt(e.target.value)),
              style: {
                width: "100px",
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #000000, #00ff00)",
                outline: "none",
                cursor: "pointer"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#2c3e50",
            marginTop: "2px"
          }, children: rgbInput.g })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
            fontSize: "0.8rem",
            color: "#6c757d",
            marginBottom: "2px"
          }, children: "B" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "255",
              value: rgbInput.b,
              onChange: (e) => handleRgbInputChange("b", parseInt(e.target.value)),
              style: {
                width: "100px",
                height: "6px",
                borderRadius: "3px",
                background: "linear-gradient(to right, #000000, #0000ff)",
                outline: "none",
                cursor: "pointer"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#2c3e50",
            marginTop: "2px"
          }, children: rgbInput.b })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: addCurrentColor,
          disabled: !hexInput.startsWith("#") || hexInput.length !== 7,
          style: {
            padding: "12px 20px",
            backgroundColor: hexInput.startsWith("#") && hexInput.length === 7 ? "#3498db" : "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: hexInput.startsWith("#") && hexInput.length === 7 ? "pointer" : "not-allowed",
            fontSize: "0.9rem",
            fontWeight: "bold",
            marginTop: "20px"
          },
          children: "➕ Add Color"
        }
      )
    ] }) }),
    colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: {
          fontSize: "1.2rem",
          color: "#2c3e50",
          margin: 0
        }, children: [
          "🌈 Current Palette (",
          colors.length,
          " colors)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: paletteName,
              onChange: (e) => setPaletteName(e.target.value),
              placeholder: "Palette name",
              style: {
                padding: "6px 12px",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
                fontSize: "0.9rem"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onCreatePalette(paletteName),
              style: {
                padding: "8px 16px",
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold"
              },
              children: "💾 Save Palette"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        justifyContent: "center"
      }, children: colors.map((color, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: "60px",
                  height: "60px",
                  backgroundColor: color.hex,
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                  cursor: "pointer",
                  transition: "transform 0.2s ease"
                },
                onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.1)",
                onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)",
                title: `${color.hex} - ${color.temperature}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => removeColorFromPalette(index),
                style: {
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  lineHeight: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                title: "Remove color",
                children: "×"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              fontSize: "0.7rem",
              color: "#6c757d",
              marginTop: "4px",
              textAlign: "center",
              width: "60px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }, children: color.hex })
          ]
        },
        index
      )) })
    ] })
  ] });
};
const ColorCanvas = ({
  colors,
  width = 800,
  height = 600,
  pattern = "linear"
}) => {
  const canvasRef = reactExports.useRef(null);
  const generatePattern = reactExports.useCallback((ctx, canvasColors, canvasWidth, canvasHeight, canvasPattern) => {
    if (canvasColors.length === 0) return;
    const colorsWithOpacities = canvasColors.map((color, index) => ({
      ...color,
      opacity: 1 - index * 0.2 / canvasColors.length
      // Gradient opacity
    }));
    switch (canvasPattern) {
      case "mosaic":
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
      case "spiral":
        const spiralCenterX = canvasWidth / 2;
        const spiralCenterY = canvasHeight / 2;
        const spiralMaxRadius = Math.min(canvasWidth, canvasHeight) / 2;
        for (let angle = 0; angle < 360; angle += 10) {
          for (let radius = 0; radius < spiralMaxRadius; radius += 10) {
            const x = spiralCenterX + Math.cos(angle * Math.PI / 180) * radius;
            const y = spiralCenterY + Math.sin(angle * Math.PI / 180) * radius;
            const colorIndex = Math.floor((angle + radius) / 50) % colorsWithOpacities.length;
            const color = colorsWithOpacities[colorIndex];
            ctx.fillStyle = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.opacity})`;
            ctx.fillRect(x, y, 12, 12);
          }
        }
        break;
      case "radial":
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const maxRadius = Math.min(canvasWidth, canvasHeight) / 2;
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          maxRadius
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
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        for (let radius = 50; radius < maxRadius; radius += 50) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
      case "linear":
      default:
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
        ctx.fillStyle = "#ffffff";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        colorsWithOpacities.forEach((color, index) => {
          const x = (index + 0.5) * (canvasWidth / colorsWithOpacities.length);
          const y = canvasHeight - 20;
          ctx.fillText(color.hex, x, y);
        });
        break;
    }
  }, []);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    generatePattern(ctx, colors, width, height, pattern);
  }, [colors, width, height, pattern, generatePattern]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: {
      fontSize: "1.4rem",
      color: "#2c3e50",
      margin: 0,
      textAlign: "center"
    }, children: [
      "🎨 Canvas Preview - ",
      pattern.charAt(0).toUpperCase() + pattern.slice(1),
      " Pattern"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      border: "3px solid #34495e",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      backgroundColor: "#f8f9fa"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        width,
        height,
        style: {
          display: "block",
          imageRendering: "pixelated"
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "10px"
    }, children: colors.map((color, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: "40px",
          height: "40px",
          backgroundColor: color.hex,
          borderRadius: "8px",
          border: "2px solid #ddd",
          cursor: "pointer",
          position: "relative"
        },
        title: `${color.hex} - Temperature: ${color.temperature}`
      },
      index
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      fontSize: "1rem",
      color: "#6c757d",
      textAlign: "center",
      margin: "10px 0"
    }, children: [
      "Palette with ",
      colors.length,
      " colors • Pattern: ",
      pattern.charAt(0).toUpperCase() + pattern.slice(1)
    ] })
  ] });
};
const ColorPicker = () => {
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
    toggleCanvasPreview
  } = useColorPicker();
  const { colorPickerStyles } = useColorPickerStyles();
  const [currentPattern, setCurrentPattern] = reactExports.useState("linear");
  const ColorSwatch = ({
    color,
    onClick,
    isSelected = false
  }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      as: "button",
      onClick,
      w: "12",
      h: "12",
      bg: color.hex,
      borderRadius: "md",
      border: isSelected ? "3px solid" : "2px solid",
      borderColor: isSelected ? "blue.500" : "gray.300",
      _hover: { shadow: "lg", transform: "scale(1.05)" },
      transition: "all 0.2s",
      title: `${color.hex} - HSL(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%) - ${color.temperature}`,
      cursor: "pointer",
      p: 0
    }
  );
  const ColorWheel = () => {
    const { generateColorWheel } = useColorPicker();
    const wheelColors = generateColorWheel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { mb: 8, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { size: "lg", children: "🌀 Color Wheel - Full Spectrum" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { columns: { base: 6, sm: 8, md: 12, lg: 16 }, gap: 3, children: wheelColors.map((color, index) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ColorSwatch,
          {
            color,
            onClick: () => selectColor(color),
            isSelected: ((_a = state.selectedColor) == null ? void 0 : _a.hex) === color.hex
          },
          index
        );
      }) }) })
    ] });
  };
  const PaletteDisplay = ({ palette }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { mb: 6, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { justify: "space-between", align: "center", wrap: "wrap", gap: 4, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Heading, { size: "md", children: [
        "🎨 ",
        palette.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(HStack, { gap: 3, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => exportAsCSV(palette.id),
            title: `Download "${palette.name}" palette as CSV file with color details`,
            colorScheme: "green",
            size: "sm",
            children: "📄 Export CSV"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => exportAsFigma(palette.id),
            title: `Download "${palette.name}" palette as Figma-compatible JSON file`,
            colorScheme: "blue",
            size: "sm",
            children: "🎨 Export Figma"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardBody, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { wrap: "wrap", gap: 3, mb: 4, children: palette.colors.map((color, index) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ColorSwatch,
          {
            color,
            onClick: () => selectColor(color),
            isSelected: ((_a = state.selectedColor) == null ? void 0 : _a.hex) === color.hex
          },
          index
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HStack, { gap: 2, wrap: "wrap", children: ["warm", "cool", "neutral"].map((temp) => {
        const count = palette.colors.filter((c) => c.temperature === temp).length;
        if (count === 0) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            colorScheme: temp === "warm" ? "red" : temp === "cool" ? "blue" : "gray",
            variant: "solid",
            p: 2,
            children: [
              temp.charAt(0).toUpperCase() + temp.slice(1),
              ": ",
              count
            ]
          },
          temp
        );
      }) })
    ] })
  ] });
  const ColorDetails = () => {
    if (!state.selectedColor) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.colorDetails, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: colorPickerStyles.colorDetailsTitle, children: "🔥 Selected Color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: colorPickerStyles.colorSwatch,
          style: { backgroundColor: state.selectedColor.hex }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.colorInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Hex:" }),
          " ",
          state.selectedColor.hex
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "RGB:" }),
          " rgb(",
          state.selectedColor.rgb.r,
          ", ",
          state.selectedColor.rgb.g,
          ", ",
          state.selectedColor.rgb.b,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "HSL:" }),
          " hsl(",
          state.selectedColor.hsl.h,
          ", ",
          state.selectedColor.hsl.s,
          "%, ",
          state.selectedColor.hsl.l,
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Temperature:" }),
          " ",
          state.selectedColor.temperature.charAt(0).toUpperCase() + state.selectedColor.temperature.slice(1)
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ColorDetails, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: colorPickerStyles.title, children: "🎨 Color Picker Studio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: colorPickerStyles.subtitle, children: "Discover, analyze, and export beautiful color palettes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertRoot, { mb: 6, status: "info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertIndicator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "🌟 Welcome to Color Picker Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Get creative with colors!" }),
          " You can pick custom colors using the hex input and RGB sliders, explore our curated professional color palettes, or generate random color combinations. See real-time canvas previews of your chosen colors in multiple artistic patterns. Export your favorite palettes as CSV files or Figma-compatible JSON for use in your design projects."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { gap: 4, wrap: "wrap", justify: "center", align: "center", p: 4, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: generatePalette,
          title: "Generate a new random color palette with 6 unique colors",
          colorScheme: "blue",
          size: "md",
          flex: { base: 1, md: "auto" },
          minW: "200px",
          children: "🎲 Generate Random Palette"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: toggleColorWheel,
          title: state.colorWheelVisible ? "Hide the color wheel spectrum" : "Show full color wheel with 36 colors from the spectrum",
          variant: state.colorWheelVisible ? "solid" : "outline",
          colorScheme: state.colorWheelVisible ? "purple" : "gray",
          size: "md",
          flex: { base: 1, md: "auto" },
          minW: "200px",
          _hover: {
            bg: state.colorWheelVisible ? "purple.600" : "gray.100"
          },
          children: [
            state.colorWheelVisible ? "🙈 Hide" : "🌀 Show",
            " Color Wheel"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: toggleCanvasPreview,
          title: state.canvasPreviewVisible ? "Hide canvas preview of your manual color palette" : "Show visual canvas preview of your manual color palette with different patterns",
          variant: state.canvasPreviewVisible ? "solid" : "outline",
          colorScheme: state.canvasPreviewVisible ? "teal" : "gray",
          size: "md",
          flex: { base: 1, md: "auto" },
          minW: "200px",
          _hover: {
            bg: state.canvasPreviewVisible ? "teal.600" : "gray.100"
          },
          children: [
            state.canvasPreviewVisible ? "🎨 Hide" : "🎨 Show",
            " Canvas Preview"
          ]
        }
      )
    ] }),
    state.canvasPreviewVisible && state.manualPalette.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.canvasPreview, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: colorPickerStyles.canvasTitle, children: "🖼️ Canvas Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { gap: 2, flexWrap: "wrap", justify: "center", mt: 4, children: [
        { name: "linear", desc: "Simple gradient based on color distance" },
        { name: "radial", desc: "Circular gradient from center outwards" },
        { name: "mosaic", desc: "Grid pattern with color repetition" },
        { name: "spiral", desc: "Spiral gradient pattern" }
      ].map((pattern) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => setCurrentPattern(pattern.name),
          title: `Switch to ${pattern.desc} patterning algorithm`,
          colorScheme: currentPattern === pattern.name ? "blue" : "gray",
          variant: currentPattern === pattern.name ? "solid" : "outline",
          size: "sm",
          flex: { base: 1, sm: "auto" },
          minW: "100px",
          children: pattern.name.charAt(0).toUpperCase() + pattern.name.slice(1)
        },
        pattern.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorCanvas, { colors: state.manualPalette, pattern: currentPattern })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ManualColorPicker,
      {
        colors: state.manualPalette,
        onAddColor: addColorToManualPalette,
        onRemoveColor: removeColorFromManualPalette,
        onCreatePalette: createManualPalette
      }
    ),
    state.colorWheelVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorWheel, {}),
    state.palettes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.paletteSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: colorPickerStyles.paletteTitle, children: "✨ Generated Palettes" }),
      state.palettes.map((palette) => /* @__PURE__ */ jsxRuntimeExports.jsx(PaletteDisplay, { palette }, palette.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: colorPickerStyles.paletteSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: colorPickerStyles.paletteTitle, children: "🌈 Curated Color Palettes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: colorPickerStyles.paletteContainer, children: predefinedPalettes.map((palette) => /* @__PURE__ */ jsxRuntimeExports.jsx(PaletteDisplay, { palette }, palette.id)) })
    ] })
  ] });
};
const ColorPickerView = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-gray-100 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, {}) });
};
export {
  ColorPickerView as default
};
