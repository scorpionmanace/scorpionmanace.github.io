import React from 'react';


const JSONParserView: React.FC = () => {
  return (
    <div style={{
      padding: '1.25rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '75rem',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '1.875rem',
        boxShadow: '0 0.625rem 1.875rem rgba(0, 0, 0, 0.1)'
      }}>
        <JSONParser />
      </div>
    </div>
  );
};

const JSONParser = React.lazy(() => import('../components/JSONParser'));

export default JSONParserView;
