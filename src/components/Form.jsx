import { useState, useEffect, useRef } from 'react';
import { User, FileText, MapPin, Link as LinkIcon, ChevronDown, ChevronRight, Globe, Mail, Linkedin, Github, Twitter, Plus, Minus } from 'lucide-react';

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
    workExperience: [{ company: '', title: '', dates: '', description: '', metrics: [{ title: '', value: '' }, { title: '', value: '' }] }],
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

  const handleNestedArrayChange = (section, index, subSection, subIndex, field, value) => {
    const newData = { ...data };
    
    // Ensure the nested arrays exist
    if (!newData[section][index][subSection]) {
      newData[section][index][subSection] = [];
    }
    if (!newData[section][index][subSection][subIndex]) {
      newData[section][index][subSection][subIndex] = {};
    }
    
    newData[section][index][subSection][subIndex][field] = value;
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

                  {section.key === 'work' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {data.workExperience.map((experience, index) => (
                        <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Work Experience {index + 1}</h3>
                            {data.workExperience.length > 1 && (
                              <button onClick={() => removeItem('workExperience', index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <Minus style={{ width: '1.25rem', height: '1.25rem' }} />
                              </button>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                              <input
                                type="text"
                                value={experience.company}
                                onChange={(e) => handleArrayChange('workExperience', index, 'company', e.target.value)}
                                placeholder="Company Name"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Job Title</label>
                              <input
                                type="text"
                                value={experience.title}
                                onChange={(e) => handleArrayChange('workExperience', index, 'title', e.target.value)}
                                placeholder="Job Title"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dates</label>
                              <input
                                type="text"
                                value={experience.dates}
                                onChange={(e) => handleArrayChange('workExperience', index, 'dates', e.target.value)}
                                placeholder="Jan 2020 - Present"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                              <textarea
                                value={experience.description}
                                onChange={(e) => handleArrayChange('workExperience', index, 'description', e.target.value)}
                                rows={3}
                                placeholder="Describe your role and achievements"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Metrics</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                  type="text"
                                  value={experience.metrics[0]?.title || ''}
                                  onChange={(e) => handleNestedArrayChange('workExperience', index, 'metrics', 0, 'title', e.target.value)}
                                  placeholder="Metric Title 1"
                                  style={{
                                    flex: '1',
                                    padding: '0.5rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                  }}
                                />
                                <input
                                  type="text"
                                  value={experience.metrics[0]?.value || ''}
                                  onChange={(e) => handleNestedArrayChange('workExperience', index, 'metrics', 0, 'value', e.target.value)}
                                  placeholder="Value 1"
                                  style={{
                                    flex: '1',
                                    padding: '0.5rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                  }}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                  type="text"
                                  value={experience.metrics[1]?.title || ''}
                                  onChange={(e) => handleNestedArrayChange('workExperience', index, 'metrics', 1, 'title', e.target.value)}
                                  placeholder="Metric Title 2"
                                  style={{
                                    flex: '1',
                                    padding: '0.5rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                  }}
                                />
                                <input
                                  type="text"
                                  value={experience.metrics[1]?.value || ''}
                                  onChange={(e) => handleNestedArrayChange('workExperience', index, 'metrics', 1, 'value', e.target.value)}
                                  placeholder="Value 2"
                                  style={{
                                    flex: '1',
                                    padding: '0.5rem',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.875rem',
                                    outline: 'none'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addItem('workExperience', { company: '', title: '', dates: '', description: '', metrics: [{ title: '', value: '' }, { title: '', value: '' }] })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #7c3aed', color: '#7c3aed', padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', width: 'fit-content' }}>
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                        Add Work Experience
                      </button>
                    </div>
                  )}

                  {section.key === 'projects' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {data.projects.map((project, index) => (
                        <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Project {index + 1}</h3>
                            {data.projects.length > 1 && (
                              <button onClick={() => removeItem('projects', index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <Minus style={{ width: '1.25rem', height: '1.25rem' }} />
                              </button>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                                placeholder="Project Title"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tagline</label>
                              <input
                                type="text"
                                value={project.tagline}
                                onChange={(e) => handleArrayChange('projects', index, 'tagline', e.target.value)}
                                placeholder="Brief tagline"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                              <textarea
                                value={project.description}
                                onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                                rows={3}
                                placeholder="Describe the project"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills Used</label>
                              <input
                                type="text"
                                value={project.skills}
                                onChange={(e) => handleArrayChange('projects', index, 'skills', e.target.value)}
                                placeholder="React, Node.js, etc."
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Link</label>
                              <input
                                type="url"
                                value={project.demoLink}
                                onChange={(e) => handleArrayChange('projects', index, 'demoLink', e.target.value)}
                                placeholder="https://demo.example.com"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source Link</label>
                              <input
                                type="url"
                                value={project.sourceLink}
                                onChange={(e) => handleArrayChange('projects', index, 'sourceLink', e.target.value)}
                                placeholder="https://github.com/user/repo"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thumbnail</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
                                <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#e2e8f0', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }} onClick={() => document.getElementById(`thumbnail-${index}`).click()}>
                                  {project.thumbnail ? (
                                    <img src={project.thumbnail} alt="Thumbnail" style={{ width: '100%', height: '100%', borderRadius: '0.5rem', objectFit: 'cover' }} />
                                  ) : (
                                    <FileText style={{ width: '1.5rem', height: '1.5rem' }} />
                                  )}
                                </div>
                                <div style={{ flex: '1' }}>
                                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Project Thumbnail</p>
                                  <button style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => document.getElementById(`thumbnail-${index}`).click()}>
                                    Upload image
                                  </button>
                                </div>
                                <input id={`thumbnail-${index}`} type="file" style={{ display: 'none' }} onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const url = URL.createObjectURL(file);
                                    handleArrayChange('projects', index, 'thumbnail', url);
                                  }
                                }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addItem('projects', { title: '', tagline: '', description: '', skills: '', demoLink: '', sourceLink: '', thumbnail: '' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #7c3aed', color: '#7c3aed', padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', width: 'fit-content' }}>
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                        Add Project
                      </button>
                    </div>
                  )}

                  {section.key === 'skills' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {data.skills.map((skill, index) => (
                        <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Skill Category {index + 1}</h3>
                            {data.skills.length > 1 && (
                              <button onClick={() => removeItem('skills', index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <Minus style={{ width: '1.25rem', height: '1.25rem' }} />
                              </button>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                              <input
                                type="text"
                                value={skill.category}
                                onChange={(e) => handleArrayChange('skills', index, 'category', e.target.value)}
                                placeholder="e.g. Programming Languages"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills</label>
                              <input
                                type="text"
                                value={skill.skills}
                                onChange={(e) => handleArrayChange('skills', index, 'skills', e.target.value)}
                                placeholder="JavaScript, Python, etc."
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
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addItem('skills', { category: '', skills: '' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #7c3aed', color: '#7c3aed', padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', width: 'fit-content' }}>
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                        Add Skill Category
                      </button>
                    </div>
                  )}

                  {section.key === 'education' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {data.education.map((edu, index) => (
                        <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Education {index + 1}</h3>
                            {data.education.length > 1 && (
                              <button onClick={() => removeItem('education', index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <Minus style={{ width: '1.25rem', height: '1.25rem' }} />
                              </button>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Institution</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                placeholder="University Name"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label>
                              <input
                                type="text"
                                value={edu.date}
                                onChange={(e) => handleArrayChange('education', index, 'date', e.target.value)}
                                placeholder="2018 - 2022"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                              <textarea
                                value={edu.description}
                                onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                                rows={3}
                                placeholder="Describe your education"
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
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addItem('education', { institution: '', degree: '', date: '', description: '' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #7c3aed', color: '#7c3aed', padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', width: 'fit-content' }}>
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                        Add Education
                      </button>
                    </div>
                  )}

                  {section.key === 'awards' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {data.awards.map((award, index) => (
                        <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', backgroundColor: '#f9fafb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Award {index + 1}</h3>
                            {data.awards.length > 1 && (
                              <button onClick={() => removeItem('awards', index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <Minus style={{ width: '1.25rem', height: '1.25rem' }} />
                              </button>
                            )}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Award Title</label>
                              <input
                                type="text"
                                value={award.title}
                                onChange={(e) => handleArrayChange('awards', index, 'title', e.target.value)}
                                placeholder="Award Title"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Issuer</label>
                              <input
                                type="text"
                                value={award.issuer}
                                onChange={(e) => handleArrayChange('awards', index, 'issuer', e.target.value)}
                                placeholder="Issuing Organization"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</label>
                              <input
                                type="text"
                                value={award.date}
                                onChange={(e) => handleArrayChange('awards', index, 'date', e.target.value)}
                                placeholder="Month Year"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                              <textarea
                                value={award.description}
                                onChange={(e) => handleArrayChange('awards', index, 'description', e.target.value)}
                                rows={3}
                                placeholder="Describe the award"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proof Link</label>
                              <input
                                type="url"
                                value={award.proofLink}
                                onChange={(e) => handleArrayChange('awards', index, 'proofLink', e.target.value)}
                                placeholder="https://proof.example.com"
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
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Image</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
                                <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#e2e8f0', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }} onClick={() => document.getElementById(`award-image-${index}`).click()}>
                                  {award.image ? (
                                    <img src={award.image} alt="Award" style={{ width: '100%', height: '100%', borderRadius: '0.5rem', objectFit: 'cover' }} />
                                  ) : (
                                    <FileText style={{ width: '1.5rem', height: '1.5rem' }} />
                                  )}
                                </div>
                                <div style={{ flex: '1' }}>
                                  <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Award Image</p>
                                  <button style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => document.getElementById(`award-image-${index}`).click()}>
                                    Upload image
                                  </button>
                                </div>
                                <input id={`award-image-${index}`} type="file" style={{ display: 'none' }} onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const url = URL.createObjectURL(file);
                                    handleArrayChange('awards', index, 'image', url);
                                  }
                                }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addItem('awards', { title: '', issuer: '', date: '', description: '', proofLink: '', image: '' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid #7c3aed', color: '#7c3aed', padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', width: 'fit-content' }}>
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                        Add Award
                      </button>
                    </div>
                  )}

                  {section.key === 'footer' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Footer Message</label>
                        <textarea
                          name="footerMessage"
                          value={data.footerMessage}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Thank you for visiting my portfolio!"
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
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call to Action Text</label>
                        <input
                          type="text"
                          name="footerCtaText"
                          value={data.footerCtaText}
                          onChange={handleChange}
                          placeholder="Get In Touch"
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
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call to Action Action</label>
                        <input
                          type="text"
                          name="footerCtaAction"
                          value={data.footerCtaAction}
                          onChange={handleChange}
                          placeholder="mailto:your@email.com"
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
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Copyright Text</label>
                        <input
                          type="text"
                          name="copyrightText"
                          value={data.copyrightText}
                          onChange={handleChange}
                          placeholder="© 2025 Your Name. All rights reserved."
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
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="checkbox"
                          name="showSocials"
                          checked={data.showSocials}
                          onChange={handleChange}
                          style={{ width: '1rem', height: '1rem' }}
                        />
                        <label style={{ fontSize: '0.875rem', color: '#374151' }}>Show Social Links in Footer</label>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="checkbox"
                          name="availabilityBadge"
                          checked={data.availabilityBadge}
                          onChange={handleChange}
                          style={{ width: '1rem', height: '1rem' }}
                        />
                        <label style={{ fontSize: '0.875rem', color: '#374151' }}>Show Availability Badge</label>
                      </div>
                    </div>
                  )}

                  {section.key !== 'identity' && section.key !== 'social' && section.key !== 'work' && section.key !== 'projects' && section.key !== 'skills' && section.key !== 'education' && section.key !== 'awards' && section.key !== 'footer' && (
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