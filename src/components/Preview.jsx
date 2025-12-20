import { useRef } from 'react';

const Preview = ({ data, onNavigate, onEdit }) => {
  const scrollRef = useRef();

  const handleWheel = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
      e.preventDefault();
      e.stopPropagation();
    } else if (e.deltaY < 0 && scrollTop <= 1) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const content = (
    <div style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {onNavigate && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '1rem', flexShrink: 0 }}>
          <button style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.875rem' }} onClick={() => onNavigate('dashboard')}>
            ← Back to Dashboard
          </button>
          {onEdit && (
            <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }} onClick={() => onEdit(data)}>
              Edit Portfolio
            </button>
          )}
        </div>
      )}
      {onNavigate && <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', padding: '0 1rem', flexShrink: 0 }}>Your Portfolio</h2>}
      <div ref={scrollRef} onWheel={handleWheel} style={{ borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ borderRadius: '0.5rem', padding: '1.5rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {data.profilePicture && (
              <img src={data.profilePicture} alt="Profile" style={{ width: '8rem', height: '8rem', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />
            )}
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>{data.name || 'Your Name'}</h1>
            <p style={{ fontSize: '1.25rem', color: '#2563eb', marginBottom: '0.5rem' }}>{data.headline || 'Your Headline'}</p>
            <p style={{ color: '#6b7280' }}>{data.location || 'Your Location'}</p>
          </div>

        {/* Bio */}
        {data.bio && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333', borderBottom: '2px solid #2563eb', paddingBottom: '0.5rem' }}>About Me</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: '#374151' }}>{data.bio}</p>
          </div>
        )}

        {/* Social Links */}
        {(data.email || data.linkedin || data.github || data.website) && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Connect</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {data.email && <a href={`mailto:${data.email}`} style={{ color: '#2563eb', textDecoration: 'none' }}>Email</a>}
              {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>LinkedIn</a>}
              {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>GitHub</a>}
              {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>Website</a>}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience && data.workExperience.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Work Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {data.workExperience.map((exp, index) => (
                <div key={index} style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>{exp.title || 'Job Title'}</h3>
                  <p style={{ color: '#2563eb' }}>{exp.company || 'Company'}</p>
                  <p style={{ color: '#6b7280' }}>{exp.dates || 'Dates'}</p>
                  {exp.description && <p style={{ color: '#374151', marginTop: '0.5rem' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {data.projects.map((proj, index) => (
                <div key={index} style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem' }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '8rem', objectFit: 'cover', borderRadius: '0.25rem', marginBottom: '0.5rem' }} />}
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{proj.title || 'Project Title'}</h3>
                  <p style={{ color: '#2563eb' }}>{proj.tagline || 'Tagline'}</p>
                  {proj.description && <p style={{ color: '#374151', marginTop: '0.5rem' }}>{proj.description}</p>}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {proj.demoLink && <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: '#2563eb' }}>Demo</a>}
                    {proj.sourceLink && <a href={proj.sourceLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: '#2563eb' }}>Source</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <h3 style={{ fontWeight: '600', color: '#111827' }}>{skill.category || 'Category'}</h3>
                  <p style={{ color: '#374151' }}>{skill.skills || 'Skills'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{edu.degree || 'Degree'}</h3>
                  <p style={{ color: '#2563eb' }}>{edu.institution || 'Institution'}</p>
                  <p style={{ color: '#6b7280' }}>{edu.date || 'Date'}</p>
                  {edu.description && <p style={{ color: '#374151', marginTop: '0.5rem' }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Awards & Honors</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.awards.map((award, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  {award.image && <img src={award.image} alt={award.title} style={{ width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '0.25rem' }} />}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{award.title || 'Award Title'}</h3>
                    <p style={{ color: '#2563eb' }}>{award.issuer || 'Issuer'}</p>
                    <p style={{ color: '#6b7280' }}>{award.date || 'Date'}</p>
                    {award.description && <p style={{ color: '#374151', marginTop: '0.5rem' }}>{award.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        {(data.footerMessage || data.footerCtaText) && (
          <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
            {data.footerMessage && <p style={{ color: '#374151', marginBottom: '1rem' }}>{data.footerMessage}</p>}
            {data.footerCtaText && (
              <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                {data.footerCtaText}
              </button>
            )}
            {data.copyrightText && <p style={{ color: '#6b7280', marginTop: '1rem' }}>{data.copyrightText}</p>}
          </div>
        )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#ffffff', height: '100%', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#e0e0e0', height: '30px', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', padding: '0 10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Preview;