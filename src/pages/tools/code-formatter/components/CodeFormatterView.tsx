import React, { useRef, useMemo } from 'react';
import { usePxToRem } from '@core/hooks/usePxToRem';
import { useCodeFormatter } from '@/pages/tools/code-formatter/hooks/useCodeFormatter';

const CodeFormatterView: React.FC = () => {
  const { pxToRem } = usePxToRem();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    languages,
    selectedLanguage,
    codeInput,
    formattedCode,
    isFormatting,
    error,
    setCodeInput,
    formatCode,
    loadSample,
    copyToClipboard,
    quickSamples,
    canFormat,
    canCopy
  } = useCodeFormatter();

  const containerPadding = pxToRem(20);
  const gapSpacing = pxToRem(16);
  const inputPadding = pxToRem(12);
  const buttonPadding = pxToRem(12);
  const borderRadius = pxToRem(8);
  const minHeight = pxToRem(150);
  const fontSizeTitle = pxToRem(24);
  const sectionMarginBottom = pxToRem(24);

  const codeToFormat = useMemo(() => {
    return formattedCode || codeInput;
  }, [formattedCode, codeInput]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: containerPadding
    }}>
      <div style={{
        maxWidth: pxToRem(1000),
        margin: '0 auto',
        background: 'white',
        borderRadius: borderRadius,
        padding: containerPadding,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: sectionMarginBottom,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)',
            height: pxToRem(6),
            width: pxToRem(100),
            borderRadius: borderRadius
          }}></div>

          <h1 style={{
            fontSize: fontSizeTitle,
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: pxToRem(16)
          }}>
            🛠 Multi-Language Code Formatter
          </h1>

          <p style={{
            color: '#718096',
            fontSize: '1.1rem',
            marginBottom: pxToRem(20)
          }}>
            Format and beautify code for popular programming languages including JavaScript, TypeScript, Python, Java, Go, C++, CSS, and JSON
          </p>

          <div style={{
            display: 'flex',
            gap: gapSpacing,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: sectionMarginBottom
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#4a5568',
              fontWeight: '500'
            }}>
              Load samples:
            </span>
            {languages.slice(0, 6).map((lang) => (
              <button
                key={lang.key}
                onClick={() => loadSample(lang)}
                style={{
                  padding: `${pxToRem(4)} ${pxToRem(8)}`,
                  background: selectedLanguage?.key === lang.key ? '#3b82f6' : '#f3f4f6',
                  color: selectedLanguage?.key === lang.key ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: pxToRem(4),
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: sectionMarginBottom }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: pxToRem(8)
          }}>
            Select Programming Language:
          </label>

          <select
            value={selectedLanguage?.key || ''}
            onChange={(e) => {
              const lang = languages.find(l => l.key === e.target.value);
              if (lang) loadSample(lang);
            }}
            style={{
              width: '100%',
              padding: inputPadding,
              border: '1px solid #d1d5db',
              borderRadius: borderRadius,
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            {languages.map((lang) => (
              <option key={lang.key} value={lang.key}>
                {lang.name} ({lang.extension})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: sectionMarginBottom }}>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: pxToRem(8)
          }}>
            Code to Format:
          </label>

          <textarea
            ref={textareaRef}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            style={{
              width: '100%',
              minHeight: minHeight,
              padding: inputPadding,
              border: '1px solid #d1d5db',
              borderRadius: borderRadius,
              fontSize: '0.9rem',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
              resize: 'vertical',
              backgroundColor: '#f8f9fa'
            }}
            placeholder="Paste your code here to format it..."
          />
        </div>

        <div style={{
          display: 'flex',
          gap: gapSpacing,
          marginBottom: sectionMarginBottom
        }}>
          <button
            onClick={formatCode}
            disabled={isFormatting}
            style={{
              padding: buttonPadding,
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: borderRadius,
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isFormatting ? 'not-allowed' : 'pointer',
              opacity: isFormatting ? 0.6 : 1,
              flex: '1',
              transition: 'all 0.2s'
            }}
          >
            {isFormatting ? '🔄 Formatting...' : `✨ Format ${selectedLanguage?.name || 'Code'}`}
          </button>

          <button
            onClick={copyToClipboard}
            disabled={!canCopy}
            style={{
              padding: buttonPadding,
              backgroundColor: !canCopy ? '#d1d5db' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: borderRadius,
              fontSize: '1rem',
              fontWeight: '500',
              cursor: !canCopy ? 'not-allowed' : 'pointer',
              flex: '1',
              transition: 'all 0.2s'
            }}
          >
            📋 Copy Formatted Code
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: pxToRem(12),
            borderRadius: borderRadius,
            marginBottom: sectionMarginBottom,
            border: '1px solid #fecaca'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: pxToRem(8)
          }}>
            Formatted Code:
          </label>

          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: inputPadding,
            borderRadius: borderRadius,
            overflow: 'auto',
            fontFamily: 'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
            fontSize: '0.8rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {codeToFormat}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeFormatterView;
