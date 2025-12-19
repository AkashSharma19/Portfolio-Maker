import { useState } from 'react';

const Form = ({ onDataChange, onNavigate }) => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setData(prev => ({ ...prev, [name]: newValue }));
    onDataChange({ ...data, [name]: newValue });
  };

  const handleArrayChange = (section, index, field, value) => {
    setData(prev => {
      const newData = { ...prev };
      newData[section][index][field] = value;
      return newData;
    });
    onDataChange(data);
  };

  const addItem = (section, template) => {
    setData(prev => ({ ...prev, [section]: [...prev[section], { ...template }] }));
  };

  const removeItem = (section, index) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  return (
    <div>
      <button className="back-button" onClick={() => onNavigate('dashboard')}>Back to Dashboard</button>
      <h2>Portfolio Form</h2>

      <div className="section">
        <h3>Identity</h3>
        <div className="form-group">
          <label>Display Name</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="e.g., John Doe" required />
        </div>
        <div className="form-group">
          <label>Professional Headline</label>
          <input type="text" name="headline" value={data.headline} onChange={handleChange} placeholder="e.g., Senior Software Engineer" />
        </div>
        <div className="form-group">
          <label>About Me / Bio</label>
          <textarea name="bio" value={data.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="url" name="profilePicture" value={data.profilePicture} onChange={handleChange} placeholder="https://example.com/photo.jpg" />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={data.location} onChange={handleChange} placeholder="e.g., New York, NY" />
        </div>
        <div className="form-group">
          <label>Resume/CV</label>
          <input type="url" name="resume" value={data.resume} onChange={handleChange} placeholder="https://example.com/resume.pdf" />
        </div>
      </div>

      <div className="section">
        <h3>Social Presence</h3>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="your.email@example.com" />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="url" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
        </div>
        <div className="form-group">
          <label>GitHub URL</label>
          <input type="url" name="github" value={data.github} onChange={handleChange} placeholder="https://github.com/yourusername" />
        </div>
        <div className="form-group">
          <label>Custom Social Link</label>
          <input type="url" name="custom" value={data.custom} onChange={handleChange} placeholder="https://twitter.com/yourhandle" />
        </div>
        <div className="form-group">
          <label>Website / Blog</label>
          <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="https://yourwebsite.com" />
        </div>
      </div>

      <div className="section">
        <h3>Work Experience</h3>
        {data.workExperience.map((exp, index) => (
          <div className="item" key={index}>
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" value={exp.company} onChange={(e) => handleArrayChange('workExperience', index, 'company', e.target.value)} placeholder="e.g., Google" />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" value={exp.title} onChange={(e) => handleArrayChange('workExperience', index, 'title', e.target.value)} placeholder="e.g., Software Engineer" />
            </div>
            <div className="form-group">
              <label>Dates</label>
              <input type="text" value={exp.dates} onChange={(e) => handleArrayChange('workExperience', index, 'dates', e.target.value)} placeholder="e.g., Jan 2020 - Present" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={exp.description} onChange={(e) => handleArrayChange('workExperience', index, 'description', e.target.value)} placeholder="Describe your role and achievements..." />
            </div>
            <button className="remove" type="button" onClick={() => removeItem('workExperience', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('workExperience', { company: '', title: '', dates: '', description: '', metrics: [{ title: '', value: '' }] })}>Add Position</button>
      </div>

      <div className="section">
        <h3>Projects</h3>
        {data.projects.map((proj, index) => (
          <div className="item" key={index}>
            <div className="form-group">
              <label>Project Title</label>
              <input type="text" value={proj.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>One-Line Tagline</label>
              <input type="text" value={proj.tagline} onChange={(e) => handleArrayChange('projects', index, 'tagline', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Detailed Description</label>
              <textarea value={proj.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input type="text" value={proj.skills} onChange={(e) => handleArrayChange('projects', index, 'skills', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Live Demo Link</label>
              <input type="url" value={proj.demoLink} onChange={(e) => handleArrayChange('projects', index, 'demoLink', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Source Code Link</label>
              <input type="url" value={proj.sourceLink} onChange={(e) => handleArrayChange('projects', index, 'sourceLink', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Thumbnail Image</label>
              <input type="text" value={proj.thumbnail} onChange={(e) => handleArrayChange('projects', index, 'thumbnail', e.target.value)} />
            </div>
            <button className="remove" type="button" onClick={() => removeItem('projects', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('projects', { title: '', tagline: '', description: '', skills: '', demoLink: '', sourceLink: '', thumbnail: '' })}>Add Project</button>
      </div>

      <div className="section">
        <h3>Skills</h3>
        {data.skills.map((skill, index) => (
          <div className="item" key={index}>
            <div className="form-group">
              <label>Category Name</label>
              <input type="text" value={skill.category} onChange={(e) => handleArrayChange('skills', index, 'category', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input type="text" value={skill.skills} onChange={(e) => handleArrayChange('skills', index, 'skills', e.target.value)} placeholder="Comma separated" />
            </div>
            <button className="remove" type="button" onClick={() => removeItem('skills', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('skills', { category: '', skills: '' })}>Add Category</button>
      </div>

      <div className="section">
        <h3>Education</h3>
        {data.education.map((edu, index) => (
          <div className="item" key={index}>
            <div className="form-group">
              <label>Institution</label>
              <input type="text" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Degree / Major</label>
              <input type="text" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="text" value={edu.date} onChange={(e) => handleArrayChange('education', index, 'date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={edu.description} onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)} />
            </div>
            <button className="remove" type="button" onClick={() => removeItem('education', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('education', { institution: '', degree: '', date: '', description: '' })}>Add Education</button>
      </div>

      <div className="section">
        <h3>Awards & Honors</h3>
        {data.awards.map((award, index) => (
          <div className="item" key={index}>
            <div className="form-group">
              <label>Award Title</label>
              <input type="text" value={award.title} onChange={(e) => handleArrayChange('awards', index, 'title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Issuer / Organization</label>
              <input type="text" value={award.issuer} onChange={(e) => handleArrayChange('awards', index, 'issuer', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Date Received</label>
              <input type="text" value={award.date} onChange={(e) => handleArrayChange('awards', index, 'date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={award.description} onChange={(e) => handleArrayChange('awards', index, 'description', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Proof Link</label>
              <input type="url" value={award.proofLink} onChange={(e) => handleArrayChange('awards', index, 'proofLink', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Award Image</label>
              <input type="text" value={award.image} onChange={(e) => handleArrayChange('awards', index, 'image', e.target.value)} />
            </div>
            <button className="remove" type="button" onClick={() => removeItem('awards', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addItem('awards', { title: '', issuer: '', date: '', description: '', proofLink: '', image: '' })}>Add Award</button>
      </div>

      <div className="section">
        <h3>Footer & Closing</h3>
        <div className="form-group">
          <label>Footer Message</label>
          <input type="text" name="footerMessage" value={data.footerMessage} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Footer CTA Button Text</label>
          <input type="text" name="footerCtaText" value={data.footerCtaText} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Footer CTA Action</label>
          <input type="text" name="footerCtaAction" value={data.footerCtaAction} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Copyright Text</label>
          <input type="text" name="copyrightText" value={data.copyrightText} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Show Socials in Footer?</label>
          <input type="checkbox" name="showSocials" checked={data.showSocials} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Availability Badge</label>
          <input type="checkbox" name="availabilityBadge" checked={data.availabilityBadge} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Form;