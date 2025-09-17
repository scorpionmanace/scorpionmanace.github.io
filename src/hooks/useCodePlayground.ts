import { useState, useCallback, useRef, useMemo } from 'react';

interface CodePlaygroundState {
  html: string;
  css: string;
  js: string;
  isRunning: boolean;
  error: string | null;
}

interface CodePlaygroundActions {
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setJs: (js: string) => void;
  runCode: () => void;
  resetCode: () => void;
  loadExample: (example: string) => void;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const useCodePlayground = (): CodePlaygroundState & CodePlaygroundActions => {
  const [html, setHtml] = useState(`<!DOCTYPE html>
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

  const [css, setCss] = useState(`#container {
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

  const [js, setJs] = useState(`// Simple JavaScript example
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


  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const examples = useMemo(() => ({
    'interactive-button': {
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
    'canvas-drawing': {
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
    'local-storage': {
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

  const runCode = useCallback(() => {
    setIsRunning(true);
    setError(null);

    if (iframeRef.current) {
      // Clear the iframe first
      iframeRef.current.srcdoc = '';

      try {
        // Sanitize and validate the content
        const sanitizedHtml = html.replace(/javascript:/gi, '').replace(/data:/gi, '');
        const sanitizedCss = css.replace(/javascript:/gi, '').replace(/data:/gi, '');
        const sanitizedJs = js.replace(/javascript:/gi, '').replace(/data:/gi, '');

        // Create the iframe content
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
  </script>
</body>
</html>`;

        // Set the iframe content
        iframeRef.current.srcdoc = iframeContent;

      } catch (err) {
        setError(`Execution error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }

    setIsRunning(false);
  }, [html, css, js]);

  const resetCode = useCallback(() => {
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

  const loadExample = useCallback((exampleName: string) => {
    if (exampleName in examples) {
      const example = examples[exampleName as keyof typeof examples];
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
