import React from 'react';
import PDFExportButton from '../components/PDFExportButton';
import resumeData from '../data/resume.json';

const About: React.FC = () => {
  const { personal, experience, technicalSkills, education, publications } = resumeData;

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#333',
      minHeight: '100vh',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <PDFExportButton />
        <div className="about-content">
          {/* Header Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)',
              height: '6px',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0'
            }}></div>
            <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0', color: '#2d3748', fontWeight: 'bold' }}>Karan Khare</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px', fontSize: '1.1rem' }}>
              <a href="mailto:karan53@msn.com" style={{ color: '#4285F4', textDecoration: 'none', fontWeight: '500' }}>📧 karan53@msn.com</a>
              <span>📱 (408) 796-9335</span>
              <a href="https://www.linkedin.com/in/karankhare/" target="_blank" rel="noopener noreferrer" style={{ color: '#4285F4', textDecoration: 'none', fontWeight: '500' }}>
                🔗 LinkedIn
              </a>
            </div>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#4a5568', fontStyle: 'italic', margin: '0' }}>
              Highly accomplished Software Development Leader with 12+ years of experience across diverse domains,
              including Storage, FinTech, Autonomous Driving, Education, E-commerce, and Generative AI. Proven track record
              of managing and mentoring engineering teams while delivering innovative solutions.
            </p>
          </div>

          {/* Experience Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#2d3748',
              marginTop: '0',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              💼 Professional Experience
            </h2>
            {experience.map((job, index) => (
              <div key={index} style={{
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: index < experience.length - 1 ? '1px solid #e2e8f0' : 'none'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#2d3748',
                  marginBottom: '5px',
                  fontWeight: '600'
                }}>
                  {job.title}
                </h3>
                <h4 style={{
                  fontSize: '1.2rem',
                  color: '#4285F4',
                  marginBottom: '5px',
                  fontWeight: '500'
                }}>
                  {job.company}
                </h4>
                <p style={{ color: '#718096', marginBottom: '15px', fontWeight: '500' }}>
                  {job.period}
                </p>
                <ul style={{ paddingLeft: '20px' }}>
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} style={{
                      marginBottom: '10px',
                      lineHeight: '1.6',
                      color: '#4a5568'
                    }}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#2d3748',
              marginTop: '0',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              🛠 Technical Skills
            </h2>
            {technicalSkills.map((skillCategory, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#2d3748',
                  marginBottom: '10px',
                  fontWeight: '600'
                }}>
                  {skillCategory.category}:
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skillCategory.skills.map((skill, idx) => {
                let gradient = '';
                if (typeof skill === 'string') {
                  gradient = 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)'; // grey for old format
                } else {
                  switch (skill.level) {
                    case 'expert':
                      gradient = 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'; // purple
                      break;
                    case 'proficient':
                      gradient = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'; // green
                      break;
                    case 'comfortable':
                      gradient = 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'; // yellow
                      break;
                    default:
                      gradient = 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)'; // grey
                  }
                }

                return (
                  <span key={idx} style={{
                    background: gradient,
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    display: 'inline-block',
                    marginRight: '6px',
                    marginBottom: '6px'
                  }}>
                    {typeof skill === 'string' ? skill : skill.name}
                    {typeof skill !== 'string' && (
                      <span style={{ marginLeft: '4px', fontSize: '0.8rem', opacity: '0.8' }}>
                        • {skill.level}
                      </span>
                    )}
                  </span>
                );
              })}
                </div>
              </div>
            ))}

            {/* Legend Section */}
            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                color: '#2d3748',
                marginBottom: '0',
                fontWeight: '600'
              }}>
                📖 Proficiency Legend
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)'
                  }}></div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#4a5568',
                    fontWeight: '500'
                  }}>
                    Expert
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
                  }}></div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#4a5568',
                    fontWeight: '500'
                  }}>
                    Proficient
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)'
                  }}></div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#4a5568',
                    fontWeight: '500'
                  }}>
                    Comfortable
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(107, 114, 128, 0.3)'
                  }}></div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#4a5568',
                    fontWeight: '500'
                  }}>
                    Low Proficiency
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#2d3748',
              marginTop: '0',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              🎓 Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} style={{
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: index < education.length - 1 ? '1px solid #e2e8f0' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    color: '#2d3748',
                    marginBottom: '5px',
                    fontWeight: '600'
                  }}>
                    {edu.degree}
                  </h3>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#4a5568',
                    margin: '0'
                  }}>
                    {edu.school}
                  </p>
                </div>
                <span style={{
                  color: '#718096',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}>
                  {edu.graduation}
                </span>
              </div>
            ))}
          </div>

          {/* Publications Section */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#2d3748',
              marginTop: '0',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              📚 Publications
            </h2>
            {publications.map((pub, index) => (
              <div key={index} style={{
                marginBottom: '20px',
                paddingBottom: '20px',
                borderBottom: index < publications.length - 1 ? '1px solid #e2e8f0' : 'none'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#2d3748',
                  marginBottom: '8px',
                  fontWeight: '600'
                }}>
                  "{pub.title}"
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#718096',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  {(pub.journal || pub.conference || '').split(',').slice(0, 1).join(',')} • {pub.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
