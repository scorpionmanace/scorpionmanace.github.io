import React from 'react';
import { useJSONParser } from '../hooks/useJSONParser';
import { useWindowWidth } from '../hooks/useWindowWidth';

const JSONParser: React.FC = () => {
  const {
    inputJSON,
    formattedJSON,
    error,
    setInputJSON,
    parseJSON,
    isValid,
  } = useJSONParser();

  const { isMobile } = useWindowWidth(768);

  const containerStyle: React.CSSProperties = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const sectionStyle: React.CSSProperties = {
    flex: '1',
    minWidth: '300px',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '10px',
    color: '#333',
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: '"Courier New", monospace',
    fontSize: '14px',
    resize: 'vertical',
  };

  const readonlyTextareaStyle: React.CSSProperties = {
    ...textareaStyle,
    backgroundColor: '#f9f9f9',
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc3545',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const mobileContainerStyle: React.CSSProperties = {
    ...mainContainerStyle,
    flexDirection: 'column',
  };

  const mobileTextareaStyle: React.CSSProperties = {
    ...textareaStyle,
    height: '300px',
  };

  return (
    <div style={containerStyle}>
      <h1>JSON Parser</h1>
      <div style={isMobile ? mobileContainerStyle : mainContainerStyle}>
        <div style={sectionStyle}>
          <h2 style={headerStyle}>JSON Editor</h2>
          <textarea
            value={inputJSON}
            onChange={(e) => setInputJSON(e.target.value)}
            placeholder="Paste your JSON here (valid JSON or stringified JSON)"
            style={isMobile ? mobileTextareaStyle : textareaStyle}
          />
          <button
            onClick={parseJSON}
            style={{ ...buttonStyle, backgroundColor: isValid ? '#007bff' : '#dc3545' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isValid ? '#0056b3' : '#b02a37')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isValid ? '#007bff' : '#dc3545')}
          >
            Validate & Parse
          </button>
        </div>

        <div style={sectionStyle}>
          <h2 style={headerStyle}>Formatted View</h2>
          {error && <div style={errorStyle}>{error}</div>}
          <textarea
            value={formattedJSON}
            readOnly
            placeholder="Formatted JSON will appear here..."
            style={isMobile ? { ...mobileTextareaStyle, backgroundColor: '#f9f9f9' } : readonlyTextareaStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default JSONParser;
