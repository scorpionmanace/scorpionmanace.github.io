import { r as reactExports, j as jsxRuntimeExports } from "./vendor-DJ3ZJzoA.js";
const useJSONParser = () => {
  const [inputJSON, setInputJSON] = reactExports.useState("");
  const [formattedJSON, setFormattedJSON] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [isValid, setIsValid] = reactExports.useState(true);
  const clearError = reactExports.useCallback(() => {
    setError("");
    setIsValid(true);
  }, []);
  const parseJSON = reactExports.useCallback(() => {
    try {
      if (!inputJSON.trim()) {
        setError("Please enter some JSON data");
        setFormattedJSON("");
        setIsValid(false);
        return;
      }
      const parsed = JSON.parse(inputJSON);
      setFormattedJSON(JSON.stringify(parsed, null, 2));
      setError("");
      setIsValid(true);
    } catch (err) {
      setError("Invalid JSON format");
      setFormattedJSON("");
      setIsValid(false);
    }
  }, [inputJSON]);
  return {
    inputJSON,
    formattedJSON,
    error,
    setInputJSON,
    parseJSON,
    clearError,
    isValid
  };
};
const useWindowWidth = (mobileBreakpoint = 768, tabletBreakpoint = 1024) => {
  const [width, setWidth] = reactExports.useState(window.innerWidth);
  const updateWidth = reactExports.useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  reactExports.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);
  const isMobile = width <= mobileBreakpoint;
  const isTablet = width > mobileBreakpoint && width <= tabletBreakpoint;
  const isDesktop = width > tabletBreakpoint;
  return {
    width,
    isMobile,
    isTablet,
    isDesktop
  };
};
const JSONParser = () => {
  const {
    inputJSON,
    formattedJSON,
    error,
    setInputJSON,
    parseJSON,
    isValid
  } = useJSONParser();
  const { isMobile } = useWindowWidth(768);
  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  };
  const mainContainerStyle = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  };
  const sectionStyle = {
    flex: "1",
    minWidth: "300px"
  };
  const headerStyle = {
    marginBottom: "10px",
    color: "#333"
  };
  const textareaStyle = {
    width: "100%",
    height: "400px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontFamily: '"Courier New", monospace',
    fontSize: "14px",
    resize: "vertical"
  };
  const readonlyTextareaStyle = {
    ...textareaStyle,
    backgroundColor: "#f9f9f9"
  };
  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  };
  const errorStyle = {
    color: "#dc3545",
    marginBottom: "10px",
    fontWeight: "bold"
  };
  const mobileContainerStyle = {
    ...mainContainerStyle,
    flexDirection: "column"
  };
  const mobileTextareaStyle = {
    ...textareaStyle,
    height: "300px"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "JSON Parser" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: isMobile ? mobileContainerStyle : mainContainerStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: headerStyle, children: "JSON Editor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: inputJSON,
            onChange: (e) => setInputJSON(e.target.value),
            placeholder: "Paste your JSON here (valid JSON or stringified JSON)",
            style: isMobile ? mobileTextareaStyle : textareaStyle
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: parseJSON,
            style: { ...buttonStyle, backgroundColor: isValid ? "#007bff" : "#dc3545" },
            onMouseEnter: (e) => e.currentTarget.style.backgroundColor = isValid ? "#0056b3" : "#b02a37",
            onMouseLeave: (e) => e.currentTarget.style.backgroundColor = isValid ? "#007bff" : "#dc3545",
            children: "Validate & Parse"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: headerStyle, children: "Formatted View" }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: errorStyle, children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: formattedJSON,
            readOnly: true,
            placeholder: "Formatted JSON will appear here...",
            style: isMobile ? { ...mobileTextareaStyle, backgroundColor: "#f9f9f9" } : readonlyTextareaStyle
          }
        )
      ] })
    ] })
  ] });
};
export {
  JSONParser as default
};
