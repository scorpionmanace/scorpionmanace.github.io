import React, { useState, useCallback, useEffect } from 'react';
import { useCodePlayground } from '../hooks/useCodePlayground';
import { usePxToRem } from '../hooks/usePxToRem';
import { useKeyboardShortcuts, useCodeFormatting, StatusMessage, ShortcutTooltip } from '../tools/code-playground';

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
  const [showShortcutsTooltip, setShowShortcutsTooltip] = useState(false);

  // Custom hooks for keyboard shortcuts and formatting
  const { modifierKey, createKeyboardHandler } = useKeyboardShortcuts();
  const { isFormatting, formatStatus, formatCurrentTab } = useCodeFormatting();

  // Code setters for formatting
  const codeSetters = {
    html: setHtml,
    css: setCss,
    javascript: setJs
  };

  // Current code based on active tab
  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'javascript': return js;
    }
  };

  // Handle format action with new hook
  const handleFormat = async () => {
    const currentCode = getCurrentCode();
    await formatCurrentTab(currentCode, activeTab, codeSetters);
  };

  // Create keyboard handler with new hook
  const handleKeyDown = createKeyboardHandler(handleFormat, runCode);



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
              onClick={handleFormat}
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
            <ShortcutTooltip
              onClose={() => setShowShortcutsTooltip(false)}
            />
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
        <StatusMessage message={formatStatus} />

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
