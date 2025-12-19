const Preview = ({ data, onNavigate, onEdit }) => {
  return (
    <div style={{ padding: '1rem', height: '100%' }}>
      {onNavigate && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
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
      {onNavigate && <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Your Portfolio</h2>}
      <div style={{ borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', height: '100%', overflowY: 'auto', padding: '1.5rem' }}>
        <div style={{ borderRadius: '0.5rem', minHeight: '100vh', padding: '1.5rem' }}>
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
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Work Experience</h2>
            <div className="space-y-6">
              {data.workExperience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title || 'Job Title'}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{exp.company || 'Company'}</p>
                  <p className="text-gray-600 dark:text-gray-400">{exp.dates || 'Dates'}</p>
                  {exp.description && <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((proj, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} className="w-full h-32 object-cover rounded mb-2" />}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{proj.title || 'Project Title'}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{proj.tagline || 'Tagline'}</p>
                  {proj.description && <p className="text-gray-700 dark:text-gray-300 mt-2">{proj.description}</p>}
                  <div className="flex gap-2 mt-2">
                    {proj.demoLink && <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">Demo</a>}
                    {proj.sourceLink && <a href={proj.sourceLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">Source</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.category || 'Category'}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{skill.skills || 'Skills'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree || 'Degree'}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{edu.institution || 'Institution'}</p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.date || 'Date'}</p>
                  {edu.description && <p className="text-gray-700 dark:text-gray-300 mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Awards & Honors</h2>
            <div className="space-y-4">
              {data.awards.map((award, index) => (
                <div key={index} className="flex items-start gap-4">
                  {award.image && <img src={award.image} alt={award.title} className="w-16 h-16 object-cover rounded" />}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{award.title || 'Award Title'}</h3>
                    <p className="text-blue-600 dark:text-blue-400">{award.issuer || 'Issuer'}</p>
                    <p className="text-gray-600 dark:text-gray-400">{award.date || 'Date'}</p>
                    {award.description && <p className="text-gray-700 dark:text-gray-300 mt-2">{award.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        {(data.footerMessage || data.footerCtaText) && (
          <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            {data.footerMessage && <p className="text-gray-700 dark:text-gray-300 mb-4">{data.footerMessage}</p>}
            {data.footerCtaText && (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                {data.footerCtaText}
              </button>
            )}
            {data.copyrightText && <p className="text-gray-500 dark:text-gray-400 mt-4">{data.copyrightText}</p>}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Preview;