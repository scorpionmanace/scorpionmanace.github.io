import { r as reactExports, j as jsxRuntimeExports } from "./vendor-B_PLRQVp.js";
import { u as usePxToRem } from "./usePxToRem-B-taVK49.js";
const useCodePlayground = () => {
  const [html, setHtml] = reactExports.useState(`<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
</head>
<body>
  <div id="container">
    <h1 id="title">Hello World!</h1>
    <p id="description">This is a sample HTML page.</p>
    <button onclick="changeTitle()">Change Title</button>
  </div>
</body>
</html>`);
  const [css, setCss] = reactExports.useState(`#container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}`);
  const [js, setJs] = reactExports.useState(`// Simple JavaScript example
function changeTitle() {
  const title = document.getElementById('title');
  title.textContent = 'Title Changed!';
  title.style.color = '#ff6b6b';

  const description = document.getElementById('description');
  description.textContent = 'JavaScript is running! 🎉';
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('container');

  // Add current date
  setInterval(function() {
    const now = new Date().toLocaleString();
    if (!document.getElementById('time')) {
      const timeElement = document.createElement('p');
      timeElement.id = 'time';
      timeElement.textContent = 'Current time: ' + now;
      timeElement.style.fontSize = '12px';
      timeElement.style.color = '#888';
      container.appendChild(timeElement);
    } else {
      document.getElementById('time').textContent = 'Current time: ' + now;
    }
  }, 1000);

  console.log('HTML/CSS/JS Code Playground is running!');
});`);
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const iframeRef = reactExports.useRef(null);
  const examples = reactExports.useMemo(() => ({
    "interactive-button": {
      html: `<!DOCTYPE html>
<html>
<body>
  <h2>Interactive Button Example</h2>
  <button id="clickMe">Click me!</button>
  <p id="counter">Clicks: 0</p>
  <div id="messages"></div>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f4;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
}

button:hover {
  background-color: #45a049;
}

#counter {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

#messages {
  margin-top: 20px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}`,
      js: `let count = 0;
const button = document.getElementById('clickMe');
const counter = document.getElementById('counter');
const messages = document.getElementById('messages');

button.addEventListener('click', () => {
  count++;
  counter.textContent = \`Clicks: \${count}\`;

  const message = document.createElement('p');
  message.textContent = \`Button clicked \${count} times!\`;
  messages.appendChild(message);

  // Change color based on count
  if (count % 3 === 0) {
    button.style.backgroundColor = '#ff6348';
  } else if (count % 2 === 0) {
    button.style.backgroundColor = '#4682b4';
  } else {
    button.style.backgroundColor = '#4CAF50';
  }
});`
    },
    "canvas-drawing": {
      html: `<!DOCTYPE html>
<html>
<body>
  <h2>HTML5 Canvas Drawing</h2>
  <canvas id="myCanvas"></canvas>
  <div>
    <button id="clear">Clear</button>
    <button id="save">Save Image</button>
  </div>
</body>
</html>`,
      css: `body {
  text-align: center;
  font-family: Arial, sans-serif;
}

canvas {
  border: 2px solid #333;
  background: white;
  cursor: crosshair;
}

button {
  margin: 10px;
  padding: 8px 16px;
  font-size: 14px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}`,
      js: `const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');

canvas.width = 400;
canvas.height = 300;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'canvas-drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});`
    },
    "local-storage": {
      html: `<!DOCTYPE html>
<html>
<body>
  <h2>Local Storage Demo</h2>
  <input type="text" id="nameInput" placeholder="Enter your name">
  <button id="saveBtn">Save Name</button>
  <button id="loadBtn">Load Name</button>
  <div id="output"></div>

  <h3>Counters</h3>
  <button id="increment">Increment: 0</button>
  <button id="reset">Reset Counter</button>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

input {
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  margin: 5px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #45a049;
}

#output {
  margin-top: 20px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 50px;
}`,
      js: `// Name storage functionality
const nameInput = document.getElementById('nameInput');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const output = document.getElementById('output');

function updateOutput(message, type = 'info') {
  output.innerHTML = \`<p style="color: \${type === 'error' ? 'red' : '#333'}">\${message}</p>\`;
}

saveBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem('savedName', name);
    updateOutput(\`Saved name: \${name}\`);
  } else {
    updateOutput('Please enter a name first', 'error');
  }
});

loadBtn.addEventListener('click', () => {
  const savedName = localStorage.getItem('savedName');
  if (savedName) {
    nameInput.value = savedName;
    updateOutput(\`Loaded name: \${savedName}\`);
  } else {
    updateOutput('No name found in storage', 'error');
  }
});

// Counter functionality with local storage
const incrementBtn = document.getElementById('increment');
const resetBtn = document.getElementById('reset');

function getCounterValue() {
  return parseInt(localStorage.getItem('counter') || '0');
}

function setCounterValue(value) {
  localStorage.setItem('counter', value.toString());
  incrementBtn.textContent = \`Increment: \${value}\`;
}

function updateCounter() {
  const currentValue = getCounterValue();
  const newValue = currentValue + 1;
  setCounterValue(newValue);
}

function resetCounter() {
  setCounterValue(0);
}

incrementBtn.addEventListener('click', updateCounter);
resetBtn.addEventListener('click', resetCounter);

// Initialize counter display
setCounterValue(getCounterValue());`
    }
  }), []);
  const runCode = reactExports.useCallback(() => {
    setIsRunning(true);
    setError(null);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = "";
      try {
        const sanitizedHtml = html.replace(/javascript:/gi, "").replace(/data:/gi, "");
        const sanitizedCss = css.replace(/javascript:/gi, "").replace(/data:/gi, "");
        const sanitizedJs = js.replace(/javascript:/gi, "").replace(/data:/gi, "");
        const iframeContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${sanitizedCss}</style>
</head>
<body>
  ${sanitizedHtml}
  <script>
    console.log('⚡ Executing JavaScript code...');
    try {
      ${sanitizedJs}
    } catch (error) {
      console.error('JavaScript execution failed:', error);
      document.body.innerHTML += '<div style="color: red; padding: 10px;"><strong>Execution Error:</strong> ' + error.message + '</div>';
    }
  <\/script>
</body>
</html>`;
        iframeRef.current.srcdoc = iframeContent;
      } catch (err) {
        setError(`Execution error: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }
    setIsRunning(false);
  }, [html, css, js]);
  const resetCode = reactExports.useCallback(() => {
    setHtml(`<!DOCTYPE html>
<html>
<body>
  <h1>Reset Complete!</h1>
  <p>Your code has been reset to a basic example.</p>
</body>
</html>`);
    setCss(`body {
  font-family: Arial, sans-serif;
  padding: 20px;
}`);
    setJs(`console.log('Page loaded!');`);
    setError(null);
  }, []);
  const loadExample = reactExports.useCallback((exampleName) => {
    if (exampleName in examples) {
      const example = examples[exampleName];
      setHtml(example.html);
      setCss(example.css);
      setJs(example.js);
      setError(null);
    }
  }, [examples]);
  return {
    html,
    css,
    js,
    isRunning,
    error,
    setHtml,
    setCss,
    setJs,
    runCode,
    resetCode,
    loadExample,
    iframeRef
  };
};
const getMessageType = (message) => {
  if (message.includes("✅")) return "success";
  if (message.includes("⚠️")) return "warning";
  return "error";
};
const getMessageStyle = (messageType) => {
  switch (messageType) {
    case "success":
      return {
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        textColor: "#166534",
        icon: "✅"
      };
    case "warning":
      return {
        backgroundColor: "#fefae8",
        borderColor: "#fcd34d",
        textColor: "#d97706",
        icon: "⚠️"
      };
    case "error":
      return {
        backgroundColor: "#fef2f2",
        borderColor: "#fecaca",
        textColor: "#dc2626",
        icon: "❌"
      };
  }
};
const getConditionalMessageStyle = (message) => {
  const messageType = getMessageType(message);
  const config = getMessageStyle(messageType);
  return {
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    backgroundColor: config.backgroundColor,
    border: `1px solid ${config.borderColor}`,
    color: config.textColor
  };
};
const StatusMessage = ({ message, className }) => {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: getConditionalMessageStyle(message),
      className,
      children: message
    }
  );
};
const useKeyboardShortcuts = () => {
  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
  const modifierKey = isMac ? "Cmd" : "Ctrl";
  const getModifierPressed = (event) => {
    return isMac ? event.metaKey : event.ctrlKey;
  };
  const shortcuts = [
    {
      key: "Enter",
      modifier: isMac ? "cmd" : "ctrl",
      action: "format",
      description: `${modifierKey}+Enter: Format current tab`
    },
    {
      key: "Enter",
      modifier: isMac ? "cmd" : "ctrl",
      action: "run",
      description: `${modifierKey}+Shift+Enter: Run code`
    }
  ];
  const createKeyboardHandler = (onFormat, onRun) => {
    return reactExports.useCallback((event) => {
      const modifierPressed = getModifierPressed(event);
      const { key, shiftKey } = event;
      if (modifierPressed && key === "Enter") {
        event.preventDefault();
        if (!shiftKey) {
          onFormat();
        } else {
          onRun();
        }
      }
    }, [onFormat, onRun]);
  };
  return {
    isMac,
    modifierKey,
    shortcuts,
    createKeyboardHandler,
    getModifierPressed
  };
};
const ShortcutTooltip = ({ onClose, className }) => {
  const { shortcuts } = useKeyboardShortcuts();
  const [isVisible, setIsVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target || !event.target.closest("[data-tooltip]")) {
        setIsVisible(false);
        onClose == null ? void 0 : onClose();
      }
    };
    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isVisible, onClose]);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-tooltip": true,
      style: {
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translate(-50%, 8px)",
        backgroundColor: "#374151",
        color: "white",
        padding: "12px",
        borderRadius: "6px",
        fontSize: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 20,
        minWidth: "180px",
        textAlign: "left"
      },
      className,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "bold", marginBottom: "8px", color: "#8b5cf6" }, children: "⌨️ Keyboard Shortcuts" }),
        shortcuts.map((shortcut, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "4px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#10b981" }, children: shortcut.key === "Enter" && !shortcut.description.includes("Shift") ? `${shortcut.modifier === "cmd" ? "Cmd" : "Ctrl"}+Enter:` : `${shortcut.modifier === "cmd" ? "Cmd" : "Ctrl"}+Shift+Enter:` }),
          " ",
          shortcut.description.split(": ")[1]
        ] }, `${shortcut.action}-${index}`)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "11px", color: "#9ca3af", marginTop: "6px" }, children: "Click anywhere to close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "absolute",
          top: "-6px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0",
          height: "0",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: "6px solid #374151"
        } })
      ]
    }
  );
};
const formatHTMLCode = (code) => {
  try {
    let formatted = code.split("\n").map((line) => line.trim()).filter((line) => line.length > 0).join("\n");
    formatted = formatted.replace(/(<[^/][^>]*>)/g, "\n$1").replace(/(<\/[^>]*>)/g, "$1\n").split("\n").map((line, index, lines) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      let indent = 0;
      for (let i = 0; i < index; i++) {
        const prev = lines[i];
        if (prev.includes("<") && !prev.includes("/>") && !prev.includes("</")) indent++;
        if (prev.includes("</") || prev.endsWith("/>")) indent = Math.max(0, indent - 1);
      }
      return "  ".repeat(indent) + trimmed;
    }).join("\n");
    return {
      formatted,
      changesMade: formatted !== code
    };
  } catch (error) {
    throw new Error("HTML formatting failed");
  }
};
const formatCSSCode = (code) => {
  try {
    let formatted = code.split("\n").map((line) => {
      const trimmed = line.trim();
      if (trimmed === "" || trimmed.includes("{") || trimmed.includes("}") || trimmed.includes("@media")) {
        return trimmed;
      }
      return "  " + trimmed;
    }).join("\n").replace(/\n\n\n+/g, "\n\n");
    formatted = formatted.replace(/([^:]):([^])/g, "$1: $2");
    return {
      formatted,
      changesMade: formatted !== code
    };
  } catch (error) {
    throw new Error("CSS formatting failed");
  }
};
const formatJSCode = (code) => {
  try {
    let formatted = code.split("\n").map((line, index, lines) => {
      const trimLine = line.trim();
      if (!trimLine) return "";
      let indentLevel = 0;
      for (let i = 0; i < lines.length && i < index; i++) {
        const prevTrim = lines[i].trim();
        if (prevTrim && (prevTrim.includes("{") || prevTrim.includes("(") && !prevTrim.includes(")"))) {
          indentLevel++;
        }
        if (prevTrim.includes("}") || prevTrim.includes(")") && !prevTrim.includes("(")) {
          indentLevel--;
        }
      }
      return "  ".repeat(Math.max(0, indentLevel)) + trimLine;
    }).join("\n");
    formatted = formatted.replace(/([^=!])=([^=])/g, "$1 = $2").replace(/([^=!])<([^<=])/g, "$1 < $2").replace(/([^=!])>([^>=])/g, "$1 > $2").replace(/([^=!])<=([^=])/g, "$1 <= $2").replace(/([^=!])>=([^=])/g, "$1 >= $2").replace(/([^=!])==([^=])/g, "$1 == $2").replace(/([^=!])!=([^=])/g, "$1 != $2");
    formatted = formatted.split("\n").map((line) => line.trimRight()).join("\n");
    return {
      formatted,
      changesMade: formatted !== code
    };
  } catch (error) {
    throw new Error("JavaScript formatting failed");
  }
};
const formatCodeByLanguage = (code, language) => {
  switch (language) {
    case "html":
      return formatHTMLCode(code);
    case "css":
      return formatCSSCode(code);
    case "javascript":
      return formatJSCode(code);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
const useCodeFormatting = () => {
  const [isFormatting, setIsFormatting] = reactExports.useState(false);
  const [formatStatus, setFormatStatus] = reactExports.useState(null);
  const getLanguageName = (activeTab) => {
    switch (activeTab) {
      case "html":
        return "HTML";
      case "css":
        return "CSS";
      case "javascript":
        return "JavaScript";
      default:
        return "Code";
    }
  };
  const formatCurrentTab = reactExports.useCallback(async (code, activeTab, setters) => {
    setIsFormatting(true);
    setFormatStatus(null);
    try {
      const languageName = getLanguageName(activeTab);
      if (!code.trim()) {
        return false;
      }
      const result = formatCodeByLanguage(code, activeTab);
      if (!result.changesMade) {
        setFormatStatus(`✅ ${languageName} code is already well formatted!`);
        return true;
      }
      setters[activeTab](result.formatted);
      setFormatStatus(`✅ ${languageName} code formatted successfully!`);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Formatting failed";
      setFormatStatus(errorMessage);
      return false;
    } finally {
      setIsFormatting(false);
    }
  }, []);
  const clearFormatStatus = reactExports.useCallback(() => {
    setFormatStatus(null);
  }, []);
  return {
    isFormatting,
    formatStatus,
    formatCurrentTab,
    clearFormatStatus
  };
};
const CodePlayground = () => {
  const {
    html,
    css,
    js,
    isRunning,
    error,
    setHtml,
    setCss,
    setJs,
    runCode,
    resetCode,
    loadExample,
    iframeRef
  } = useCodePlayground();
  const { pxToRem } = usePxToRem();
  const [activeTab, setActiveTab] = reactExports.useState("html");
  const [showShortcutsTooltip, setShowShortcutsTooltip] = reactExports.useState(false);
  const { modifierKey, createKeyboardHandler } = useKeyboardShortcuts();
  const { isFormatting, formatStatus, formatCurrentTab } = useCodeFormatting();
  const codeSetters = {
    html: setHtml,
    css: setCss,
    javascript: setJs
  };
  const getCurrentCode = () => {
    switch (activeTab) {
      case "html":
        return html;
      case "css":
        return css;
      case "javascript":
        return js;
    }
  };
  const handleFormat = async () => {
    const currentCode = getCurrentCode();
    await formatCurrentTab(currentCode, activeTab, codeSetters);
  };
  const handleKeyDown = createKeyboardHandler(handleFormat, runCode);
  const containerStyle = {
    padding: `${pxToRem(24)} ${pxToRem(24)}`,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    width: "100%"
  };
  const cardStyle = {
    maxWidth: pxToRem(1200),
    margin: "0 auto",
    background: "white",
    borderRadius: pxToRem(16),
    padding: pxToRem(24),
    boxShadow: "0 24px 48px rgba(0,0,0,0.15)"
  };
  const headerStyle = {
    textAlign: "center",
    marginBottom: pxToRem(32)
  };
  const titleStyle = {
    fontSize: pxToRem(32),
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: pxToRem(8)
  };
  const subtitleStyle = {
    fontSize: pxToRem(18),
    color: "#718096",
    marginBottom: pxToRem(16)
  };
  const editorContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: pxToRem(24),
    marginTop: pxToRem(24)
  };
  const editorPanelStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e2e8f0",
    borderRadius: pxToRem(8),
    overflow: "hidden"
  };
  const tabBarStyle = {
    display: "flex",
    backgroundColor: "#f7fafc",
    borderBottom: "1px solid #e2e8f0"
  };
  const tabStyle = (isActive) => ({
    flex: 1,
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: pxToRem(14),
    fontWeight: isActive ? "600" : "400",
    color: isActive ? "#3182ce" : "#4a5568",
    borderBottom: isActive ? "2px solid #3182ce" : "none",
    transition: "all 0.2s ease",
    borderRadius: 0
  });
  const textareaStyle = {
    width: "100%",
    height: "60vh",
    // Full height
    padding: pxToRem(16),
    border: "none",
    outline: "none",
    fontFamily: "Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace",
    fontSize: pxToRem(13),
    lineHeight: 1.5,
    resize: "vertical",
    backgroundColor: "#f8fafc",
    boxSizing: "border-box"
  };
  const buttonContainerStyle = {
    display: "flex",
    gap: pxToRem(12),
    marginBottom: pxToRem(16)
  };
  const buttonStyle = {
    padding: `${pxToRem(12)} ${pxToRem(20)}`,
    borderRadius: pxToRem(8),
    border: "none",
    cursor: "pointer",
    fontSize: pxToRem(14),
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: pxToRem(8)
  };
  const runButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#10b981",
    color: "white"
  };
  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f3f4f6",
    color: "#374151"
  };
  ({
    borderRadius: pxToRem(8)
  });
  const outputHeaderStyle = {
    backgroundColor: "#f1f5f9",
    padding: pxToRem(12),
    borderBottom: "1px solid #e2e8f0",
    fontSize: pxToRem(14),
    fontWeight: "600",
    color: "#2d3748"
  };
  const exampleButtonStyle = {
    padding: `${pxToRem(8)} ${pxToRem(16)}`,
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "none",
    borderRadius: pxToRem(6),
    cursor: "pointer",
    fontSize: pxToRem(12),
    transition: "all 0.2s ease"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: containerStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: headerStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        height: pxToRem(6),
        width: pxToRem(120),
        margin: "0 auto",
        borderRadius: pxToRem(3),
        marginBottom: pxToRem(24)
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: titleStyle, children: "🎮 Code Playground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: subtitleStyle, children: "Write HTML, CSS, and JavaScript code and see the results in real-time" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: buttonContainerStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: runCode,
          disabled: isRunning,
          style: {
            ...runButtonStyle,
            opacity: isRunning ? 0.7 : 1,
            transform: isRunning ? "scale(0.98)" : "scale(1)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isRunning ? "⏳" : "▶" }),
            isRunning ? "Running..." : "Run Code"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleFormat,
            disabled: isFormatting,
            style: {
              ...secondaryButtonStyle,
              backgroundColor: "#8b5cf6",
              color: "white"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isFormatting ? "⏳" : "✨" }),
              isFormatting ? "Formatting..." : "Format"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowShortcutsTooltip(!showShortcutsTooltip),
            style: {
              position: "absolute",
              top: pxToRem(-8),
              right: pxToRem(-8),
              width: pxToRem(20),
              height: pxToRem(20),
              borderRadius: "50%",
              border: "2px solid #8b5cf6",
              backgroundColor: "white",
              color: "#8b5cf6",
              cursor: "pointer",
              fontSize: pxToRem(12),
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              zIndex: 10
            },
            title: "Click to see keyboard shortcuts",
            children: "?"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShortcutTooltip,
          {
            onClose: () => setShowShortcutsTooltip(false)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: resetCode, style: secondaryButtonStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔄" }),
        "Reset"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => loadExample("interactive-button"),
          style: exampleButtonStyle,
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "#e5e7eb";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
          },
          children: "Click Counter"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => loadExample("canvas-drawing"),
          style: exampleButtonStyle,
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "#e5e7eb";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
          },
          children: "Canvas Drawing"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => loadExample("local-storage"),
          style: exampleButtonStyle,
          onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "#e5e7eb";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "#f3f4f6";
          },
          children: "Local Storage"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: pxToRem(16),
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: pxToRem(8),
      color: "#dc2626",
      marginBottom: pxToRem(16),
      fontSize: pxToRem(14)
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Error:" }),
      " ",
      error
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusMessage, { message: formatStatus }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: editorContainerStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: editorPanelStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: tabBarStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveTab("html"),
              style: tabStyle(activeTab === "html"),
              children: "HTML"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveTab("css"),
              style: tabStyle(activeTab === "css"),
              children: "CSS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveTab("javascript"),
              style: tabStyle(activeTab === "javascript"),
              children: "JavaScript"
            }
          )
        ] }),
        activeTab === "html" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: html,
            onChange: (e) => setHtml(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Enter your HTML here...",
            style: { ...textareaStyle, margin: 0 }
          }
        ),
        activeTab === "css" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: css,
            onChange: (e) => setCss(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Enter your CSS here...",
            style: { ...textareaStyle, margin: 0 }
          }
        ),
        activeTab === "javascript" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: js,
            onChange: (e) => setJs(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: "Enter your JavaScript here...",
            style: { ...textareaStyle, margin: 0 }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: editorPanelStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: outputHeaderStyle, children: "📺 Output" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            ref: iframeRef,
            title: "Code Playground Output",
            style: {
              flex: 1,
              border: "none",
              width: "100%",
              height: "400px"
            },
            sandbox: "allow-scripts allow-modals allow-forms allow-downloads"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginTop: pxToRem(24),
      padding: pxToRem(16),
      backgroundColor: "#f8fafc",
      borderRadius: pxToRem(8),
      fontSize: pxToRem(12),
      color: "#64748b",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "💡 Tip: Your code runs in a sandboxed environment for security. Try the examples or write your own HTML/CSS/JavaScript!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        marginTop: pxToRem(8),
        fontSize: pxToRem(11),
        color: "#6b7280"
      }, children: [
        "⌨️ ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          modifierKey,
          "+Enter"
        ] }),
        " Format current tab | ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          modifierKey,
          "+Shift+Enter"
        ] }),
        " Run code"
      ] })
    ] })
  ] }) });
};
export {
  CodePlayground as default
};
