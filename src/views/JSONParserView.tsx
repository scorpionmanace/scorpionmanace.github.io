import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const JSONParserView: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <Breadcrumbs />
        <JSONParser />
      </div>
    </div>
  );
};

const JSONParser = React.lazy(() => import('../components/JSONParser'));

export default JSONParserView;
