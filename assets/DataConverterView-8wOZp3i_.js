import { r as reactExports, j as jsxRuntimeExports, B as Box, t as Container, o as CardRoot, p as CardHeader, F as Flex, L as Link, a as Button, k as Badge, H as Heading, T as Text, q as CardBody, v as Textarea } from "./vendor-B_PLRQVp.js";
const useFileUpload = () => {
  const [fileUploadState, setFileUploadState] = reactExports.useState({
    isLoading: false,
    error: ""
  });
  const handleFileUpload = reactExports.useCallback(async (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (!file) return null;
    setFileUploadState({ isLoading: true, error: "" });
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        const content = (_a2 = e.target) == null ? void 0 : _a2.result;
        setFileUploadState({ isLoading: false, error: "" });
        resolve(content);
      };
      reader.onerror = () => {
        setFileUploadState({ isLoading: false, error: "Failed to read file" });
        resolve(null);
      };
      reader.readAsText(file);
    });
  }, []);
  const clearError = reactExports.useCallback(() => {
    setFileUploadState((prev) => ({ ...prev, error: "" }));
  }, []);
  return {
    ...fileUploadState,
    handleFileUpload,
    clearError
  };
};
function jsonToCsv(jsonData) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    return "";
  }
  const headers = Array.from(new Set(jsonData.flatMap((obj) => Object.keys(obj))));
  const headerRow = headers.join(",");
  const rows = jsonData.map((obj) => {
    return headers.map((header) => {
      const value = obj[header];
      if (value === null || value === void 0) {
        return "";
      }
      const stringValue = String(value);
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(",");
  });
  return [headerRow, ...rows].join("\n");
}
function jsonToXml(jsonData, rootElement = "data") {
  function convertJsonToXml(obj, elementName = "item") {
    if (obj === null || obj === void 0) {
      return `<${elementName}></${elementName}>`;
    }
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      return `<${elementName}>${escapeXml(String(obj))}</${elementName}>`;
    }
    if (Array.isArray(obj)) {
      const items = obj.map(
        (item, index) => convertJsonToXml(item, singularize(elementName))
      );
      return `<${elementName}>${items.join("")}</${elementName}>`;
    }
    if (typeof obj === "object") {
      const children = Object.keys(obj).map((key) => {
        const value = obj[key];
        const childName = key.replace(/[^a-zA-Z0-9]/g, "_");
        return convertJsonToXml(value, childName);
      });
      return `<${elementName}>${children.join("")}</${elementName}>`;
    }
    return `<${elementName}></${elementName}>`;
  }
  function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "<";
        case ">":
          return ">";
        case "&":
          return "&";
        case "'":
          return "&#39;";
        case '"':
          return '"';
        default:
          return c;
      }
    });
  }
  function singularize(word) {
    if (word.endsWith("ies")) {
      return word.slice(0, -3) + "y";
    }
    if (word.endsWith("s") && word !== "s") {
      return word.slice(0, -1);
    }
    return word;
  }
  const xmlContent = convertJsonToXml(jsonData, rootElement);
  return `<?xml version="1.0" encoding="UTF-8"?>
${xmlContent}`;
}
function csvToJson(csvString, hasHeader = true) {
  var _a;
  const lines = csvString.trim().split("\n");
  if (lines.length === 0) {
    return [];
  }
  function parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    let i = 0;
    while (i < line.length) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
        i++;
      } else {
        current += char;
        i++;
      }
    }
    result.push(current);
    return result;
  }
  const parsedLines = lines.map((line) => parseCSVLine(line.trim()));
  if (!hasHeader) {
    const numColumns = ((_a = parsedLines[0]) == null ? void 0 : _a.length) || 0;
    const headers2 = Array.from({ length: numColumns }, (_, i) => `field_${i + 1}`);
    parsedLines.unshift(headers2);
  }
  const headers = parsedLines[0];
  const dataRows = parsedLines.slice(1).filter((row) => row.some((cell) => cell.trim() !== ""));
  return dataRows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      const cellValue = row[index] || "";
      obj[header] = guessDataType(cellValue);
    });
    return obj;
  });
}
function guessDataType(value) {
  if (value === "" || value.toLowerCase() === "null" || value.toLowerCase() === "undefined") {
    return null;
  }
  const numValue = parseFloat(value);
  if (!isNaN(numValue) && value.toString() === numValue.toString()) {
    return numValue;
  }
  if (value.toLowerCase() === "true") {
    return true;
  }
  if (value.toLowerCase() === "false") {
    return false;
  }
  return value;
}
const useDataConversion = () => {
  const [state, setState] = reactExports.useState({
    input: "",
    output: "",
    conversionType: "json-to-csv",
    error: ""
  });
  const setInput = reactExports.useCallback((input) => {
    setState((prev) => ({
      ...prev,
      input,
      error: "",
      // Clear error when input changes
      output: ""
      // Clear output when input changes
    }));
  }, []);
  const setConversionType = reactExports.useCallback((conversionType) => {
    setState((prev) => ({
      ...prev,
      conversionType,
      error: ""
      // Clear error when conversion type changes
    }));
  }, []);
  const autoDetectConversionType = reactExports.useCallback((fileExtension) => {
    switch (fileExtension.toLowerCase()) {
      case "json":
        return "json-to-csv";
      case "csv":
        return "csv-to-json";
      case "xml":
        return "json-to-csv";
      // Default for XML
      default:
        return "json-to-csv";
    }
  }, []);
  const performConversion = reactExports.useCallback(() => {
    if (!state.input.trim()) {
      setState((prev) => ({
        ...prev,
        error: "Please enter some data to convert",
        output: ""
      }));
      return false;
    }
    try {
      let result = "";
      switch (state.conversionType) {
        case "json-to-csv":
          const jsonData = JSON.parse(state.input);
          result = jsonToCsv(jsonData);
          break;
        case "json-to-xml":
          const jsonDataXml = JSON.parse(state.input);
          result = jsonToXml(jsonDataXml);
          break;
        case "csv-to-json":
          result = JSON.stringify(csvToJson(state.input), null, 2);
          break;
        default:
          throw new Error("Unsupported conversion type");
      }
      setState((prev) => ({
        ...prev,
        output: result,
        error: ""
      }));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid format";
      setState((prev) => ({
        ...prev,
        error: `Conversion failed: ${errorMessage}`,
        output: ""
      }));
      return false;
    }
  }, [state.input, state.conversionType]);
  reactExports.useCallback(async (fileUploadHandler) => {
  }, []);
  const clearError = reactExports.useCallback(() => {
    setState((prev) => ({ ...prev, error: "" }));
  }, []);
  return {
    ...state,
    setInput,
    setConversionType,
    autoDetectConversionType,
    performConversion,
    clearError
  };
};
const useDownload = () => {
  const downloadFile = reactExports.useCallback((content, conversionType) => {
    if (!content) return;
    let fileName = "converted_data";
    let mimeType = "text/plain";
    let fileExtension = "txt";
    switch (conversionType) {
      case "json-to-csv":
        fileExtension = "csv";
        mimeType = "text/csv";
        fileName = "converted_data";
        break;
      case "json-to-xml":
        fileExtension = "xml";
        mimeType = "application/xml";
        fileName = "converted_data";
        break;
      case "csv-to-json":
        fileExtension = "json";
        mimeType = "application/json";
        fileName = "converted_data";
        break;
      default:
        fileExtension = "txt";
        mimeType = "text/plain";
    }
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);
  return { downloadFile };
};
const useDataConverter = () => {
  const fileUpload = useFileUpload();
  const conversion = useDataConversion();
  const { downloadFile } = useDownload();
  const handleFileUploadWrapper = reactExports.useCallback(async (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const content = await fileUpload.handleFileUpload(event);
    if (content) {
      conversion.setInput(content);
      const fileExtension = file.name.toLowerCase().split(".").pop() || "";
      const detectedType = conversion.autoDetectConversionType(fileExtension);
      conversion.setConversionType(detectedType);
    }
  }, [fileUpload, conversion]);
  const handleConvert = reactExports.useCallback(() => {
    fileUpload.clearError();
    return conversion.performConversion();
  }, [fileUpload, conversion]);
  const handleDownload = reactExports.useCallback(() => {
    if (conversion.output) {
      downloadFile(conversion.output, conversion.conversionType);
    }
  }, [conversion.output, conversion.conversionType, downloadFile]);
  return {
    // Data conversion state
    input: conversion.input,
    output: conversion.output,
    conversionType: conversion.conversionType,
    error: conversion.error || fileUpload.error,
    // File upload state
    isLoading: fileUpload.isLoading,
    // Actions
    setInput: conversion.setInput,
    setConversionType: conversion.setConversionType,
    handleFileUpload: handleFileUploadWrapper,
    handleConvert,
    handleDownload,
    // Helpers
    clearError: () => {
      conversion.clearError();
      fileUpload.clearError();
    }
  };
};
const DataConverterView = () => {
  const {
    input,
    output,
    conversionType,
    error,
    isLoading,
    setInput,
    setConversionType,
    handleFileUpload,
    handleConvert
  } = useDataConverter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      minH: "100vh",
      bg: "gray.50",
      py: 8,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { maxW: "container.xl", py: 8, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardRoot, { mb: 8, boxShadow: "xl", borderRadius: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { py: 6, textAlign: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { justify: "space-between", align: "center", w: "full", mb: 4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/tools", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                bg: "gray.600",
                color: "white",
                px: 6,
                py: 3,
                borderRadius: "full",
                fontWeight: "500",
                _hover: {
                  bg: "gray.700",
                  transform: "translateY(-2px)",
                  shadow: "lg"
                },
                transition: "all 0.3s ease",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.2em", marginRight: "8px" }, children: "←" }),
                  "Back to Tools"
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { colorScheme: "purple", fontSize: "sm", px: 3, py: 1, borderRadius: "full", children: "⚡ Data Converter" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", flexDirection: "column", gap: 2, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heading,
              {
                as: "h1",
                size: "xl",
                textAlign: "center",
                bgGradient: "linear(135deg, #667eea 0%, #764ba2 100%)",
                bgClip: "text",
                children: "🔄 Data Converter"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "lg", color: "gray.600", textAlign: "center", children: "Seamlessly convert between JSON, CSV, and XML formats" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", flexDirection: "column", gap: 6, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Flex,
            {
              direction: ["column", "row"],
              gap: 6,
              w: "full",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { flex: ["1", "0.3"], boxShadow: "lg", borderRadius: "lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { size: "md", color: "blue.600", children: "📁 File Upload" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", flexDirection: "column", gap: 4, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Box,
                      {
                        border: "2px dashed",
                        borderColor: "gray.300",
                        borderRadius: "lg",
                        p: 6,
                        textAlign: "center",
                        _hover: { borderColor: "blue.400" },
                        transition: "all 0.3s ease",
                        bg: "gray.50",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "file",
                              accept: ".json,.csv,.xml",
                              onChange: handleFileUpload,
                              style: {
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                position: "absolute",
                                cursor: "pointer"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", flexDirection: "column", gap: 2, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "2xl", children: "📎" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "gray.600", children: "Drop files here or click to browse" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "sm", color: "gray.500", children: "JSON, CSV, XML supported" })
                          ] })
                        ]
                      }
                    ),
                    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { align: "center", justify: "center", gap: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "sm", color: "blue.600", children: "Loading file..." }) })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardRoot, { flex: ["1", "0.7"], boxShadow: "lg", borderRadius: "lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { size: "md", color: "green.600", children: "⚙️ Settings" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { display: "flex", flexDirection: "column", gap: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { w: "full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { mb: 2, fontWeight: "semibold", children: "Conversion Type:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: conversionType,
                        onChange: (e) => setConversionType(e.target.value),
                        style: {
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: "16px",
                          borderRadius: "12px",
                          border: "2px solid #e2e8f0",
                          backgroundColor: "white",
                          fontFamily: "monospace",
                          outline: "none",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        },
                        onMouseOver: (e) => {
                          e.currentTarget.style.borderColor = "#667eea";
                        },
                        onMouseOut: (e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "json-to-csv", children: "📊 JSON → CSV" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "json-to-xml", children: "📄 JSON → XML" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "csv-to-json", children: "🧠 CSV → JSON" })
                        ]
                      }
                    )
                  ] }) }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardRoot, { boxShadow: "xl", borderRadius: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { py: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { direction: ["column", "row"], gap: 6, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: 1, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { justify: "space-between", align: "center", mb: 4, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { size: "md", color: "teal.600", children: "📥 Input Data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { colorScheme: "gray", fontSize: "xs", children: "Input Format" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: `Paste your data here...

Example:
[
  {"name": "John", "age": 30},
  {"name": "Jane", "age": 25}
]`,
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  minH: "350px",
                  resize: "vertical",
                  fontFamily: "monospace",
                  fontSize: "sm",
                  border: "2px solid",
                  borderColor: "teal.100",
                  _focus: {
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                    bg: "teal.50"
                  },
                  bg: "gray.50",
                  borderRadius: "lg",
                  _hover: {
                    borderColor: "teal.200",
                    bg: "teal.25"
                  },
                  transition: "all 0.3s ease"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: 1, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { justify: "space-between", align: "center", mb: 4, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { size: "md", color: "purple.600", children: "📤 Output Data" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { colorScheme: "gray", fontSize: "xs", children: "Output Format" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: output,
                  readOnly: true,
                  minH: "350px",
                  placeholder: "Converted data will appear here...",
                  fontFamily: "monospace",
                  fontSize: "sm",
                  border: "2px solid",
                  borderColor: "purple.100",
                  _focus: {
                    borderColor: "purple.400",
                    boxShadow: "0 0 0 1px purple.400",
                    bg: "purple.50"
                  },
                  bg: output ? "purple.50" : "gray.50",
                  borderRadius: "lg",
                  transition: "all 0.3s ease"
                }
              )
            ] })
          ] }) }) }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(CardRoot, { boxShadow: "lg", borderRadius: "lg", bg: "red.50", border: "1px solid", borderColor: "red.100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { align: "center", gap: 3, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fontSize: "lg", children: "⚠️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "red.700", fontWeight: "medium", children: error })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardRoot, { boxShadow: "xl", borderRadius: "lg", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { py: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", flexDirection: "column", gap: 4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { color: "white", fontSize: "lg", textAlign: "center", fontWeight: "semibold", children: "Ready to convert your data?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { display: "flex", justifyContent: "center", alignItems: "center", gap: 6, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleConvert,
                  size: "lg",
                  bg: "white",
                  color: "blue.600",
                  px: 10,
                  py: 3,
                  borderRadius: "full",
                  fontWeight: "semibold",
                  shadow: "xl",
                  _hover: {
                    bg: "blue.50",
                    transform: "translateY(-2px)",
                    shadow: "2xl"
                  },
                  _active: {
                    transform: "translateY(0px)"
                  },
                  transition: "all 0.3s ease",
                  children: "⚡ Convert Data"
                }
              ),
              output && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: downloadOutput,
                  size: "lg",
                  bg: "green.500",
                  color: "white",
                  px: 10,
                  py: 3,
                  borderRadius: "full",
                  fontWeight: "semibold",
                  shadow: "xl",
                  _hover: {
                    bg: "green.600",
                    transform: "translateY(-2px)",
                    shadow: "2xl"
                  },
                  _active: {
                    transform: "translateY(0px)"
                  },
                  transition: "all 0.3s ease",
                  children: "📥 Download File"
                }
              )
            ] })
          ] }) }) })
        ] })
      ] })
    }
  );
};
export {
  DataConverterView as default
};
