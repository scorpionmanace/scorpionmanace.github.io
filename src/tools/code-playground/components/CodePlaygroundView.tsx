// Main view component for the Code Playground tool
import React, { useState, useCallback } from 'react';
import { useKeyboardShortcuts, useCodeFormatting } from '../hooks';
import { StatusMessage } from './StatusMessage';
import { ShortcutTooltip } from './ShortcutTooltip';
import { usePxToRem } from '../../../hooks/usePxToRem';

interface Language {
  key: string;
  name: string;
  extension: string;
  sample: string;
  formatter: string;
}

export const CodePlaygroundView: React.FC = () => {
  // Mock hooks for now - will be replaced with actual hooks
  const { modifierKey, createKeyboardHandler } = useKeyboardShortcuts();
  const { isFormatting, formatStatus, formatCurrentTab } = useCodeFormatting();
  const { pxToRem } = usePxToRem();

  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [showShortcutsTooltip, setShowShortcutsTooltip] = useState(false);
  const [html, setHtml] = useState('// Enter HTML code here\n<div>Hello World</div>');
  const [css, setCss] = useState('/* Enter CSS code here */\nbody { font-family: Arial; }');
  const [js, setJs] = useState('// Enter JavaScript code here\nconsole.log("Hello!")');

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

  // Handle format action
  const handleFormat = async () => {
    const currentCode = getCurrentCode();
    await formatCurrentTab(currentCode, activeTab, codeSetters);
  };

  // Create keyboard handler
  const handleKeyDown = createKeyboardHandler(handleFormat, () => {
    // Mock run function for demo
    console.log('Running code...');
  });

  // Mock functions - replace with actual implementations
  const handleRunCode = () => console.log('Running code...');
  const handleReset = () => {
    setHtml('// Enter HTML code here\n<div>Hello World</div>');
    setCss('/* Enter CSS code here */\nbody { font-family: Arial; }');
    setJs('// Enter JavaScript code here\nconsole.log("Hello!")');
  };

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

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: pxToRem(32) }}>
          <h1 style={{
            fontSize: pxToRem(32),
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: pxToRem(8)
          }}>
            🎮 Code Playground
          </h1>
          <p style={{
            fontSize: pxToRem(18),
            color: '#718096',
            marginBottom: pxToRem(16)
          }}>
            Write HTML, CSS, and JavaScript code and see the results in real-time
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: pxToRem(12), marginBottom: pxToRem(16) }}>
          <button
            onClick={handleRunCode}
            style={{
              padding: `${pxToRem(12)} ${pxToRem(20)}`,
              borderRadius: pxToRem(8),
              border: 'none',
              cursor: 'pointer',
              fontSize: pxToRem(14),
              fontWeight: '600',
              backgroundColor: '#10b981',
              color: 'white',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: pxToRem(8)
            }}
          >
            <span>▶</span>
            Run Code
          </button>

          {/* Format Button with Shortcuts Tooltip */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={handleFormat}
              disabled={isFormatting}
              style={{
                padding: `${pxToRem(12)} ${pxToRem(20)}`,
                borderRadius: pxToRem(8),
                border: 'none',
                cursor: isFormatting ? 'not-allowed' : 'pointer',
                fontSize: pxToRem(14),
                fontWeight: '600',
                backgroundColor: '#8b5cf6',
                color: 'white',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: pxToRem(8)
              }}
            >
              <span>{isFormatting ? '⏳' : '✨'}</span>
              {isFormatting ? 'Formatting...' : 'Format'}
            </button>

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

            <ShortcutTooltip
              onClose={() => setShowShortcutsTooltip(false)}
            />
          </div>

          <button
            onClick={handleReset}
            style={{
              padding: `${pxToRem(12)} ${pxToRem(20)}`,
              borderRadius: pxToRem(8),
              border: 'none',
              cursor: 'pointer',
              fontSize: pxToRem(14),
              fontWeight: '600',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: pxToRem(8)
            }}
          >
            <span>🔄</span>
            Reset
          </button>
        </div>

        {/* Formatting Status Display */}
        <StatusMessage message={formatStatus} />

        {/* Editors and Output Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: pxToRem(24),
          marginTop: pxToRem(24)
        }}>
          {/* Code Editors */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e2e8f0',
            borderRadius: pxToRem(8),
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              backgroundColor: '#f7fafc',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <button
                onClick={() => setActiveTab('html')}
                style={{
                  flex: 1,
                  padding: `${pxToRem(12)} ${pxToRem(16)}`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: pxToRem(14),
                  fontWeight: activeTab === 'html' ? '600' : '400',
                  color: activeTab === 'html' ? '#3182ce' : '#4a5568',
                  borderBottom: activeTab === 'html' ? '2px solid #3182ce' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                style={{
                  flex: 1,
                  padding: `${pxToRem(12)} ${pxToRem(16)}`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: pxToRem(14),
                  fontWeight: activeTab === 'css' ? '600' : '400',
                  color: activeTab === 'css' ? '#3182ce' : '#4a5568',
                  borderBottom: activeTab === 'css' ? '2px solid #3182ce' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab('javascript')}
                style={{
                  flex: 1,
                  padding: `${pxToRem(12)} ${pxToRem(16)}`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: pxToRem(14),
                  fontWeight: activeTab === 'javascript' ? '600' : '400',
                  color: activeTab === 'javascript' ? '#3182ce' : '#4a5568',
                  borderBottom: activeTab === 'javascript' ? '2px solid #3182ce' : 'none',
                  transition: 'all 0.2s ease'
                }}
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
                style={{
                  width: '100%',
                  height: '60vh',
                  padding: pxToRem(16),
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
                  fontSize: pxToRem(13),
                  lineHeight: 1.5,
                  resize: 'vertical',
                  backgroundColor: '#f8fafc',
                  boxSizing: 'border-box'
                }}
              />
            )}

            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your CSS here..."
                style={{
                  width: '100%',
                  height: '60vh',
                  padding: pxToRem(16),
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
                  fontSize: pxToRem(13),
                  lineHeight: 1.5,
                  resize: 'vertical',
                  backgroundColor: '#f8fafc',
                  boxSizing: 'border-box'
                }}
              />
            )}

            {activeTab === 'javascript' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your JavaScript here..."
                style={{
                  width: '100%',
                  height: '60vh',
                  padding: pxToRem(16),
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
                  fontSize: pxToRem(13),
                  lineHeight: 1.5,
                  resize: 'vertical',
                  backgroundColor: '#f8fafc',
                  boxSizing: 'border-box'
                }}
              />
            )}
          </div>

          {/* Output */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e2e8f0',
            borderRadius: pxToRem(8),
            overflow: 'hidden',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{
              backgroundColor: '#f1f5f9',
              padding: pxToRem(12),
              borderBottom: '1px solid #e2e8f0',
              fontSize: pxToRem(14),
              fontWeight: '600',
              color: '#2d3748'
            }}>
              📺 Output
            </div>
            <iframe
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
            ⌨️ <strong>{modifierKey}+Enter</strong> Format current tab | <strong>{modifierKey}+Shift+Enter</strong> Run code
          </div>
        </div>
      </div>
    </div>
  );
};
