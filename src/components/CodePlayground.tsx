import React, { useState, useCallback, useEffect } from 'react';
import { useCodePlayground } from '../hooks/useCodePlayground';
import { usePxToRem } from '../hooks/usePxToRem';
interface Language {
  key: string;
  name: string;
  extension: string;
  sample: string;
  formatter: string;
}

const CodePlayground: React.FC = () => {
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
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');

  // Code formatting integration
  const [formattedCode, setFormattedCode] = useState<{ html: string; css: string; js: string }>({
    html: '',
    css: '',
    js: ''
  });
  const [isFormatting, setIsFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [showShortcutsTooltip, setShowShortcutsTooltip] = useState(false);

  // Platform detection for keyboard shortcuts
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
  const modifierKey = isMac ? 'Cmd' : 'Ctrl';

  // Formatting handlers
  const formatHTMLCode = useCallback(async (code: string): Promise<string> => {
    try {
      let formatted = code;

      // Basic HTML formatting
      formatted = formatted.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');

      // Add indentation for nested elements (simplified)
      formatted = formatted
        .replace(/(<[^/][^>]*>)/g, '\n$1')
        .replace(/(<\/[^>]*>)/g, '$1\n')
        .split('\n')
        .map((line, index, lines) => {
          const trimmed = line.trim();
          if (!trimmed) return '';

          let indent = 0;
          for (let i = 0; i < index; i++) {
            const prev = lines[i];
            if (prev.includes('<') && !prev.includes('/>') && !prev.includes('</')) indent++;
            if (prev.includes('</') || prev.endsWith('/>')) indent = Math.max(0, indent - 1);
          }

          return '  '.repeat(indent) + trimmed;
        })
        .join('\n');

      return formatted;
    } catch (error) {
      throw new Error('HTML formatting failed');
    }
  }, []);

  const formatCSSCode = useCallback(async (code: string): Promise<string> => {
    try {
      let formatted = code;

      // Ensure consistent indentation for CSS rules
      formatted = formatted.split('\n')
        .map(line => {
          const trimmed = line.trim();
          if (trimmed === '' ||
              trimmed.includes('{') ||
              trimmed.includes('}') ||
              trimmed.includes('@media')) {
            return trimmed;
          }
          return '  ' + trimmed;
        })
        .join('\n')
        .replace(/\n\n\n+/g, '\n\n'); // Clean up excessive blank lines

      // Ensure consistent spacing around colons
      formatted = formatted.replace(/([^:]):([^])/g, '$1: $2');

      return formatted;
    } catch (error) {
      throw new Error('CSS formatting failed');
    }
  }, []);

  const formatJSCode = useCallback(async (code: string): Promise<string> => {
    try {
      let formatted = code;

      // Basic indentation and spacing improvements
      formatted = formatted.split('\n')
        .map((line, index, lines) => {
          const trimLine = line.trim();
          if (!trimLine) return '';

          let indentLevel = 0;
          for (let i = 0; i < lines.length && i < index; i++) {
            const prevTrim = lines[i].trim();
            if (prevTrim && (prevTrim.includes('{') || prevTrim.includes('(') && !prevTrim.includes(')'))) {
              indentLevel++;
            }
            if (prevTrim.includes('}') || prevTrim.includes(')') && !prevTrim.includes('(')) {
              indentLevel--;
            }
          }

          return '  '.repeat(Math.max(0, indentLevel)) + trimLine;
        })
        .join('\n');

      // Basic spacing around operators
      formatted = formatted
        .replace(/([^=!])=([^=])/g, '$1 = $2')  // Add space around =
        .replace(/([^=!])<([^<=])/g, '$1 < $2') // Add space around <
        .replace(/([^=!])>([^>=])/g, '$1 > $2') // Add space around >
        .replace(/([^=!])<=([^=])/g, '$1 <= $2') // Add space around <=
        .replace(/([^=!])>=([^=])/g, '$1 >= $2') // Add space around >=
        .replace(/([^=!])==([^=])/g, '$1 == $2') // Add space around ==
        .replace(/([^=!])!=([^=])/g, '$1 != $2') // Add space around !=

      // Clean up excessive whitespace
      formatted = formatted.split('\n')
        .map(line => line.trimRight())
        .join('\n');

      return formatted;
    } catch (error) {
      throw new Error('JavaScript formatting failed');
    }
  }, []);

  const formatCurrentTab = useCallback(async () => {
    setIsFormatting(true);
    setFormatError(null);

    try {
      let currentCode = '';
      let formatter: (code: string) => Promise<string>;
      let setter: (state: string) => void;
      let tabName = '';

      switch (activeTab) {
        case 'html':
          currentCode = html;
          formatter = formatHTMLCode;
          setter = setHtml;
          tabName = 'HTML';
          break;
        case 'css':
          currentCode = css;
          formatter = formatCSSCode;
          setter = setCss;
          tabName = 'CSS';
          break;
        case 'javascript':
          currentCode = js;
          formatter = formatJSCode;
          setter = setJs;
          tabName = 'JavaScript';
          break;
        default:
          return;
      }

      if (!currentCode.trim()) return;

      const formatted = await formatter(currentCode);

      // Check if formatting changed anything
      if (formatted === currentCode) {
        setFormatError(`✅ ${tabName} code is already well formatted!`);
        return;
      }

      setter(formatted);
      setFormatError(`✅ ${tabName} code formatted successfully!`);
    } catch (err) {
      setFormatError(err instanceof Error ? err.message : 'Formatting failed');
    } finally {
      setIsFormatting(false);
    }
  }, [activeTab, html, css, js, formatHTMLCode, formatCSSCode, formatJSCode, setHtml, setCss, setJs]);

  // Keyboard event handlers
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Platform-specific modifier key
    const modKeyPressed = isMac ? event.metaKey : event.ctrlKey;

    // Cmd/Ctrl+Enter formats the current tab
    if (modKeyPressed && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formatCurrentTab();
    }
    // Cmd/Ctrl+Shift+Enter runs the code
    else if (modKeyPressed && event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      runCode();
    }
  }, [isMac, formatCurrentTab, runCode]);

  // Close tooltip when clicking outside
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (showShortcutsTooltip && event.target) {
      const helpIcon = document.querySelector(`[title="Click to see keyboard shortcuts"]`);
      const tooltip = document.querySelector('[style*="background-color: rgb(55, 65, 81)"]');

      // Close if clicked outside both the help icon and tooltip
      if (!helpIcon?.contains(event.target as Node) && !tooltip?.contains(event.target as Node)) {
        setShowShortcutsTooltip(false);
      }
    }
  }, [showShortcutsTooltip]);

  // Event listener for closing tooltip
  useEffect(() => {
    if (showShortcutsTooltip) {
      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [showShortcutsTooltip, handleOutsideClick]);

  const containerStyle: React.CSSProperties = {
    padding: `${pxToRem(24)} ${pxToRem(24)}`,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    width: '100%'
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: pxToRem(1200),
    margin: '0 auto',
    background: 'white',
    borderRadius: pxToRem(16),
    padding: pxToRem(24),
    boxShadow: '0 24px 48px rgba(0,0,0,0.15)'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: pxToRem(32)
  };

  const titleStyle: React.CSSProperties = {
    fontSize: pxToRem(32),
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: pxToRem(8)
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: pxToRem(18),
    color: '#718096',
    marginBottom: pxToRem(16)
  };

  const editorContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: pxToRem(24),
    marginTop: pxToRem(24)
  };

  const editorPanelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e2e8f0',
    borderRadius: pxToRem(8),
    overflow: 'hidden'
  };

  const tabBarStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#f7fafc',
    borderBottom: '1px solid #e2e8f0'
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: pxToRem(14),
    fontWeight: isActive ? '600' : '400',
    color: isActive ? '#3182ce' : '#4a5568',
    borderBottom: isActive ? '2px solid #3182ce' : 'none',
    transition: 'all 0.2s ease',
    borderRadius: 0
  });

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '60vh', // Full height
    padding: pxToRem(16),
    border: 'none',
    outline: 'none',
    fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
    fontSize: pxToRem(13),
    lineHeight: 1.5,
    resize: 'vertical',
    backgroundColor: '#f8fafc',
    boxSizing: 'border-box'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: pxToRem(12),
    marginBottom: pxToRem(16)
  };

  const buttonStyle: React.CSSProperties = {
    padding: `${pxToRem(12)} ${pxToRem(20)}`,
    borderRadius: pxToRem(8),
    border: 'none',
    cursor: 'pointer',
    fontSize: pxToRem(14),
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: pxToRem(8)
  };

  const runButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#10b981',
    color: 'white'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  };

  const dangerButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ef4444',
    color: 'white'
  };

  const outputContainerStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    borderRadius: pxToRem(8),
    overflow: 'hidden',
    backgroundColor: '#f8fafc'
  };

  const outputHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f1f5f9',
    padding: pxToRem(12),
    borderBottom: '1px solid #e2e8f0',
    fontSize: pxToRem(14),
    fontWeight: '600',
    color: '#2d3748'
  };

  const exampleButtonStyle: React.CSSProperties = {
    padding: `${pxToRem(8)} ${pxToRem(16)}`,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: pxToRem(6),
    cursor: 'pointer',
    fontSize: pxToRem(12),
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            height: pxToRem(6),
            width: pxToRem(120),
            margin: '0 auto',
            borderRadius: pxToRem(3),
            marginBottom: pxToRem(24)
          }}></div>
          <h1 style={titleStyle}>🎮 Code Playground</h1>
          <p style={subtitleStyle}>
            Write HTML, CSS, and JavaScript code and see the results in real-time
          </p>
        </div>



        {/* Action Buttons */}
        <div style={buttonContainerStyle}>
          <button
            onClick={runCode}
            disabled={isRunning}
            style={{
              ...runButtonStyle,
              opacity: isRunning ? 0.7 : 1,
              transform: isRunning ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <span>{isRunning ? '⏳' : '▶'}</span>
            {isRunning ? 'Running...' : 'Run Code'}
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={formatCurrentTab}
              disabled={isFormatting}
              style={{
                ...secondaryButtonStyle,
                backgroundColor: '#8b5cf6',
                color: 'white'
              }}
            >
              <span>{isFormatting ? '⏳' : '✨'}</span>
              {isFormatting ? 'Formatting...' : 'Format'}
            </button>

            {/* Help Icon for Keyboard Shortcuts */}
            <button
              onClick={() => setShowShortcutsTooltip(!showShortcutsTooltip)}
              style={{
                position: 'absolute',
                top: pxToRem(-8),
                right: pxToRem(-8),
                width: pxToRem(20),
                height: pxToRem(20),
                borderRadius: '50%',
                border: '2px solid #8b5cf6',
                backgroundColor: 'white',
                color: '#8b5cf6',
                cursor: 'pointer',
                fontSize: pxToRem(12),
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 10
              }}
              title="Click to see keyboard shortcuts"
            >
              ?
            </button>

            {/* Shortcuts Tooltip */}
            {showShortcutsTooltip && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translate(-50%, 8px)',
                backgroundColor: '#374151',
                color: 'white',
                padding: pxToRem(12),
                borderRadius: pxToRem(6),
                fontSize: pxToRem(12),
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 20,
                minWidth: pxToRem(180),
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: pxToRem(8), color: '#8b5cf6' }}>
                  ⌨️ Keyboard Shortcuts
                </div>
                <div style={{ marginBottom: pxToRem(4) }}>
                  <strong style={{ color: '#10b981' }}>{modifierKey}+Enter:</strong> Format current tab
                </div>
                <div style={{ marginBottom: pxToRem(4) }}>
                  <strong style={{ color: '#ef4444' }}>{modifierKey}+Shift+Enter:</strong> Run code
                </div>
                <div style={{ fontSize: pxToRem(11), color: '#9ca3af', marginTop: pxToRem(6) }}>
                  Click anywhere to close
                </div>

                {/* Arrow pointing up */}
                <div style={{
                  position: 'absolute',
                  top: pxToRem(-6),
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: pxToRem(6) + ' solid transparent',
                  borderRight: pxToRem(6) + ' solid transparent',
                  borderBottom: pxToRem(6) + ' solid #374151'
                }}></div>
              </div>
            )}
          </div>

          <button onClick={resetCode} style={secondaryButtonStyle}>
            <span>🔄</span>
            Reset
          </button>

          {/* Example Buttons */}
          <button
            onClick={() => loadExample('interactive-button')}
            style={exampleButtonStyle}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e5e7eb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
          >
            Click Counter
          </button>
          <button
            onClick={() => loadExample('canvas-drawing')}
            style={exampleButtonStyle}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e5e7eb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
          >
            Canvas Drawing
          </button>
          <button
            onClick={() => loadExample('local-storage')}
            style={exampleButtonStyle}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e5e7eb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
          >
            Local Storage
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            padding: pxToRem(16),
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: pxToRem(8),
            color: '#dc2626',
            marginBottom: pxToRem(16),
            fontSize: pxToRem(14)
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Formatting Status Display */}
        {formatError && (
          <div style={{
            padding: pxToRem(16),
            borderRadius: pxToRem(8),
            marginBottom: pxToRem(16),
            fontSize: pxToRem(14),
            // Different styling based on message type
            ...(formatError.includes('✅') ? {
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534'
            } : formatError.includes('⚠️') ? {
              backgroundColor: '#fefae8',
              border: '1px solid #fcd34d',
              color: '#d97706'
            } : {
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626'
            })
          }}>
            {formatError}
          </div>
        )}

        {/* Editors and Output Container */}
        <div style={editorContainerStyle}>
          {/* Code Editors */}
          <div style={editorPanelStyle}>
            <div style={tabBarStyle}>
              <button
                onClick={() => setActiveTab('html')}
                style={tabStyle(activeTab === 'html')}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                style={tabStyle(activeTab === 'css')}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab('javascript')}
                style={tabStyle(activeTab === 'javascript')}
              >
                JavaScript
              </button>
            </div>
            {activeTab === 'html' && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your HTML here..."
                style={{...textareaStyle, margin: 0}}
              />
            )}

            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your CSS here..."
                style={{...textareaStyle, margin: 0}}
              />
            )}

            {activeTab === 'javascript' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your JavaScript here..."
                style={{...textareaStyle, margin: 0}}
              />
            )}
          </div>

          {/* Output */}
          <div style={editorPanelStyle}>
            <div style={outputHeaderStyle}>📺 Output</div>
            <iframe
              ref={iframeRef}
              title="Code Playground Output"
              style={{
                flex: 1,
                border: 'none',
                width: '100%',
                height: '400px'
              }}
              sandbox="allow-scripts allow-modals allow-forms allow-downloads"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div style={{
          marginTop: pxToRem(24),
          padding: pxToRem(16),
          backgroundColor: '#f8fafc',
          borderRadius: pxToRem(8),
          fontSize: pxToRem(12),
          color: '#64748b',
          textAlign: 'center'
        }}>
          <div>
            💡 Tip: Your code runs in a sandboxed environment for security.
            Try the examples or write your own HTML/CSS/JavaScript!
          </div>
          <div style={{
            marginTop: pxToRem(8),
            fontSize: pxToRem(11),
            color: '#6b7280'
          }}>
            ⌨️ <strong>{modifierKey}+Enter</strong> Format current tab | <strong>{modifierKey}+Shift+Enter</strong> Run code
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
