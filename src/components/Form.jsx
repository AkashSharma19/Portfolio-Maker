import { useState, useEffect, useRef } from 'react';
import { User, FileText, MapPin, Link as LinkIcon, ChevronDown, ChevronRight, Globe, Mail, Linkedin, Github, Twitter } from 'lucide-react';

const sections = [
  { name: 'Identity', key: 'identity' },
  { name: 'Social Presence', key: 'social' },
  { name: 'Work Experience', key: 'work' },
  { name: 'Projects', key: 'projects' },
  { name: 'Skills', key: 'skills' },
  { name: 'Education', key: 'education' },
  { name: 'Awards & Honors', key: 'awards' },
  { name: 'Footer & Closing', key: 'footer' }
];

const Form = ({ onDataChange, onNavigate, onSave, initialData }) => {
  const [openSections, setOpenSections] = useState({ identity: true });
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    // Identity
    name: '',
    headline: '',
    bio: '',
    profilePicture: '',
    location: '',
    resume: '',
    // Social Presence
    email: '',
    linkedin: '',
    github: '',
    twitter: '',
    custom: '',
    website: '',
    // Work Experience
    workExperience: [{ company: '', title: '', dates: '', description: '', metrics: [{ title: '', value: '' }] }],
    // Projects
    projects: [{ title: '', tagline: '', description: '', skills: '', demoLink: '', sourceLink: '', thumbnail: '' }],
    // Skills
    skills: [{ category: '', skills: '' }],
    // Education
    education: [{ institution: '', degree: '', date: '', description: '' }],
    // Awards
    awards: [{ title: '', issuer: '', date: '', description: '', proofLink: '', image: '' }],
    // Footer
    footerMessage: '',
    footerCtaText: '',
    footerCtaAction: '',
    copyrightText: '',
    showSocials: false,
    availabilityBadge: false
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      onDataChange(initialData);
    }
  }, [initialData, onDataChange]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    const newData = { ...data, [name]: newValue };
    setData(newData);
    onDataChange(newData);
  };

  const handleArrayChange = (section, index, field, value) => {
    const newData = { ...data };
    newData[section][index][field] = value;
    setData(newData);
    onDataChange(newData);
  };

  const addItem = (section, template) => {
    setData(prev => ({ ...prev, [section]: [...prev[section], { ...template }] }));
  };

  const removeItem = (section, index) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <div style={{ height: '100%', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Accordions */}
      <div style={{ flex: '1', padding: '1rem', overflowY: 'auto' }}>
        <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sections.map((section) => (
            <div key={section.key} style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
              <button
                onClick={() => toggleSection(section.key)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}
              >
                {section.name}
                {openSections[section.key] ? (
                  <ChevronDown style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                ) : (
                  <ChevronRight style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                )}
              </button>

              {openSections[section.key] && (
                <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                  {section.key === 'identity' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
                        <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
                          {data.profilePicture ? (
                            <img src={data.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                          ) : (
                            <User style={{ width: '1.5rem', height: '1.5rem' }} />
                          )}
                        </div>
                        <div style={{ flex: '1' }}>
                          <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Profile Photo</p>
                          <button style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => fileInputRef.current.click()}>
                            Upload new image
                          </button>
                        </div>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            handleChange({ target: { name: 'profilePicture', value: url } });
                          }
                        }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Display Name</label>
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Alex Rivera"
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                              boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                              e.target.style.boxShadow = '0 0 0 2px #7c3aed';
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Professional Headline - Current Role</label>
                          <input
                            type="text"
                            name="headline"
                            value={data.headline}
                            onChange={handleChange}
                            placeholder="Senior Product Manager & UX Enthusiast"
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                              boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                              e.target.style.boxShadow = '0 0 0 2px #7c3aed';
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About Me / Bio - Professional Headline</label>
                          <textarea
                            name="bio"
                            value={data.bio}
                            onChange={handleChange}
                            rows={4}
                            placeholder="I bridge the gap between engineering and design. Currently building accessible EdTech tools. Obsessed with clean UI and data-driven decisions."
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                              resize: 'none',
                              boxSizing: 'border-box'
                            }}
                            onFocus={(e) => {
                              e.target.style.boxShadow = '0 0 0 2px #7c3aed';
                            }}
                            onBlur={(e) => {
                              e.target.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
                            }}
                          />
                          <p style={{ fontSize: '0.75rem', textAlign: 'right', color: '#94a3b8' }}>{data.bio.length}/300</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</label>
                          <div style={{ position: 'relative' }}>
                            <MapPin style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', width: '1rem', height: '1rem', color: '#94a3b8' }} />
                            <input
                              type="text"
                              name="location"
                              value={data.location}
                              onChange={handleChange}
                              placeholder="San Francisco, CA"
                              style={{
                                width: '100%',
                                paddingLeft: '2.25rem',
                                paddingRight: '0.75rem',
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                outline: 'none',
                                transition: 'all 0.3s',
                                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #7c3aed';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
                              }}
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resume/CV</label>
                          <div style={{ position: 'relative' }}>
                            <FileText style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', width: '1rem', height: '1rem', color: '#94a3b8' }} />
                            <input
                              type="text"
                              name="resume"
                              value={data.resume}
                              onChange={handleChange}
                              placeholder="Alex_Rivera_Resume_2025.pdf"
                              style={{
                                width: '100%',
                                paddingLeft: '2.25rem',
                                paddingRight: '0.75rem',
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                outline: 'none',
                                transition: 'all 0.3s',
                                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                                boxSizing: 'border-box'
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #7c3aed';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.key === 'social' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: 'white', padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#64748b' }}>
                            <Mail style={{ width: '1.25rem', height: '1.25rem' }} />
                          </div>
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>Email Address</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="you@example.com" style={{
                              width: '100%',
                              padding: '0.625rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxSizing: 'border-box'
                            }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: 'white', padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#64748b' }}>
                            <Linkedin style={{ width: '1.25rem', height: '1.25rem' }} />
                          </div>
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>LinkedIn Profile</label>
                            <input type="url" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" style={{
                              width: '100%',
                              padding: '0.625rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxSizing: 'border-box'
                            }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: 'white', padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#64748b' }}>
                            <Github style={{ width: '1.25rem', height: '1.25rem' }} />
                          </div>
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>GitHub Profile</label>
                            <input type="url" name="github" value={data.github} onChange={handleChange} placeholder="https://github.com/yourusername" style={{
                              width: '100%',
                              padding: '0.625rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxSizing: 'border-box'
                            }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: 'white', padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#64748b' }}>
                            <Twitter style={{ width: '1.25rem', height: '1.25rem' }} />
                          </div>
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>Twitter Profile</label>
                            <input type="url" name="twitter" value={data.twitter} onChange={handleChange} placeholder="https://twitter.com/yourhandle" style={{
                              width: '100%',
                              padding: '0.625rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxSizing: 'border-box'
                            }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: 'white', padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#64748b' }}>
                            <Globe style={{ width: '1.25rem', height: '1.25rem' }} />
                          </div>
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>Website</label>
                            <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="https://yourwebsite.com" style={{
                              width: '100%',
                              padding: '0.625rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxSizing: 'border-box'
                            }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ backgroundColor: 'white', padding: '0.625rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', color: '#64748b' }}>
                            <LinkIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                          </div>
                          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151', textTransform: 'uppercase' }}>Custom Link</label>
                            <input type="url" name="custom" value={data.custom} onChange={handleChange} placeholder="https://customlink.com" style={{
                              width: '100%',
                              padding: '0.625rem',
                              border: '1px solid #cbd5e1',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              outline: 'none',
                              transition: 'all 0.3s',
                              boxSizing: 'border-box'
                            }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.key !== 'identity' && section.key !== 'social' && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                      Form fields for {section.name} will be implemented here.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Form;