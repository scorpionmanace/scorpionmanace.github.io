import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#2d3748',
      color: '#a0aec0',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Brand Section */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#e2e8f0',
            marginBottom: '1rem',
            marginTop: 0
          }}>
            App Portfolio
          </h3>
          <p style={{
            fontSize: '0.95rem',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            A collection of innovative web applications, games, and development tools
            built with modern technologies and best practices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#e2e8f0',
            marginBottom: '1rem',
            marginTop: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Quick Links
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <a href="#home" style={{
              color: '#a0aec0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#e2e8f0'}
               onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#a0aec0'}>
              Home
            </a>
            <a href="#tools" style={{
              color: '#a0aec0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#e2e8f0'}
               onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#a0aec0'}>
              Development Tools
            </a>
            <a href="#about" style={{
              color: '#a0aec0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#e2e8f0'}
               onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#a0aec0'}>
              About
            </a>
            <a href="#contact" style={{
              color: '#a0aec0',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'color 0.3s ease'
            }} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#e2e8f0'}
               onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#a0aec0'}>
              Contact
            </a>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#e2e8f0',
            marginBottom: '1rem',
            marginTop: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Built With
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <span style={{
              color: '#a0aec0',
              fontSize: '0.9rem'
            }}>
              ⚛️ React & TypeScript
            </span>
            <span style={{
              color: '#a0aec0',
              fontSize: '0.9rem'
            }}>
              ⚡ Vite & Modern Tools
            </span>
            <span style={{
              color: '#a0aec0',
              fontSize: '0.9rem'
            }}>
              🎨 Styled Components
            </span>
            <span style={{
              color: '#a0aec0',
              fontSize: '0.9rem'
            }}>
              🌐 Web Standards
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #4a5568',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '0.85rem',
          color: '#718096',
          margin: 0
        }}>
          © {currentYear} App Portfolio. Built with ❤️ using modern web technologies.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
