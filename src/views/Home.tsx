import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const bannerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const bannerContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  };

  const floatingIconsStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    opacity: 0.1,
  };

  const icon1Style: React.CSSProperties = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    fontSize: '48px',
    transform: 'rotate(15deg)',
    animation: 'float 6s ease-in-out infinite',
  };

  const icon2Style: React.CSSProperties = {
    position: 'absolute',
    top: '20%',
    right: '15%',
    fontSize: '36px',
    transform: 'rotate(-10deg)',
    animation: 'float 8s ease-in-out infinite reverse',
  };

  const icon3Style: React.CSSProperties = {
    position: 'absolute',
    bottom: '15%',
    left: '15%',
    fontSize: '42px',
    transform: 'rotate(25deg)',
    animation: 'float 7s ease-in-out infinite',
  };

  const icon4Style: React.CSSProperties = {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    fontSize: '38px',
    transform: 'rotate(-20deg)',
    animation: 'float 9s ease-in-out infinite reverse',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.4rem',
    marginBottom: '30px',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto 30px',
    lineHeight: '1.6',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid white',
    color: 'white',
    padding: '15px 40px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '50px auto 0',
    padding: '0 20px',
    alignItems: 'stretch',
  };

  const featureCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const featureIconStyle: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '20px',
    display: 'block',
  };

  const featureTitleStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  };

  const featureDescStyle: React.CSSProperties = {
    color: '#666',
    lineHeight: '1.5',
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>

      {/* Hero Banner Section */}
      <section style={bannerStyle}>
        <div style={floatingIconsStyle}>
          <div style={icon1Style}>📱</div>
          <div style={icon2Style}>🎮</div>
          <div style={icon3Style}>🛠️</div>
          <div style={icon4Style}>⚡</div>
        </div>
        <div style={bannerContainerStyle}>
          <h1 style={titleStyle}>Welcome to App Portfolio</h1>
          <p style={subtitleStyle}>
            Discover a collection of innovative applications, engaging games, and powerful development tools.
            From JSON parsing utilities to interactive experiences, explore our suite of modern web applications
            built with cutting-edge technologies.
          </p>
          <Link
            to="/json-parser"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explore Tools →
          </Link>
        </div>
      </section>

      {/* Features Grid Section */}
      <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '50px',
            color: '#333',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            What You Can Do
          </h2>
          <div style={gridStyle}>
            <Link
              to="/tools"
              className="feature-card-link"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                className="feature-card"
                style={featureCardStyle}
              >
                <span style={featureIconStyle}>🔧</span>
                <h3 style={featureTitleStyle}>Development Tools</h3>
                <p style={featureDescStyle}>
                  Powerful utilities for developers including JSON parsing, validation tools,
                  and code formatters to streamline your workflow.
                </p>
              </div>
            </Link>

            <div
              className="feature-card"
              style={featureCardStyle}
            >
              <span style={featureIconStyle}>🎯</span>
              <h3 style={featureTitleStyle}>Interactive Applications</h3>
              <p style={featureDescStyle}>
                Modern web applications with responsive design, real-time validation,
                and intuitive user interfaces for enhanced productivity.
              </p>
            </div>

            <div
              className="feature-card"
              style={featureCardStyle}
            >
              <span style={featureIconStyle}>🚀</span>
              <h3 style={featureTitleStyle}>Performance Optimized</h3>
              <p style={featureDescStyle}>
                Built with modern frameworks and optimized for speed, ensuring
                fast load times and smooth user experiences across all devices.
              </p>
            </div>

            <div
              className="feature-card"
              style={featureCardStyle}
            >
              <span style={featureIconStyle}>📊</span>
              <h3 style={featureTitleStyle}>Data Processing</h3>
              <p style={featureDescStyle}>
                Advanced data processing capabilities with JSON validation,
                formatting, and transformation tools for efficient data handling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
