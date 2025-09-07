import React from 'react';
import logo from '../assets/logo.svg';

const HelloWorld: React.FC = () => {
  const ecosystem = [
    { text: 'facebook/react', href: 'https://github.com/facebook/react' },
    { text: 'create-react-app', href: 'https://github.com/facebook/create-react-app' },
    { text: 'TypeScript', href: 'https://github.com/microsoft/TypeScript' },
  ];
  const importantLinks = [
    { text: 'React Docs', href: 'https://react.dev' },
    { text: 'GitHub', href: 'https://github.com/facebook/react' },
    { text: 'Tutorial', href: 'https://react.dev/learn' },
  ];
  const whatsNext = [
    { text: 'Explore components', href: 'https://react.dev/learn' },
    { text: 'Set up your project', href: 'https://create-react-app.dev' },
    { text: 'Get help', href: 'https://react.dev/support' },
  ];

  return (
    <div className="container">
      <div>
        <img src={logo} className="logo" alt="logo" style={{ width: '150px', height: '150px' }} />
      </div>
      <div>
        <h1>Welcome to React</h1>
        <p>
          For help and collaboration with other React developers,<br />please join our online
          <a href="https://react.dev/support" target="_blank" rel="noopener noreferrer">React Community</a>
        </p>
      </div>
      <div>
        <h2>What's next?</h2>
        <div className="grid">
          {whatsNext.map((next, i) => (
            <a key={i} href={next.href} target="_blank" rel="noopener noreferrer" className="button blue">
              {next.text}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2>Important Links</h2>
        <div className="grid">
          {importantLinks.map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="button green">
              {link.text}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2>Ecosystem</h2>
        <div className="grid">
          {ecosystem.map((eco, i) => (
            <a key={i} href={eco.href} target="_blank" rel="noopener noreferrer" className="button purple">
              {eco.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelloWorld;
