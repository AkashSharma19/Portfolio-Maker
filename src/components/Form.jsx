import { useState } from 'react';

const steps = [
  'Identity',
  'Social Presence',
  'Work Experience',
  'Projects',
  'Skills',
  'Education',
  'Awards & Honors',
  'Footer & Closing'
];

const Form = ({ onDataChange, onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="form-container">
      {/* Stepper */}
      <div className="form-header">
        <div className="form-header-content">
          <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
            ← Back to Dashboard
          </a>
          <h2 className="form-title">Create Portfolio</h2>
          <div></div>
        </div>
        <div className="stepper">
          {steps.map((step, index) => (
            <div key={step} className="step">
              <button
                onClick={() => handleStepClick(index)}
                className={`step-circle ${index === activeStep ? 'active' : index < activeStep ? 'completed' : 'pending'}`}
              >
                {index < activeStep ? '✓' : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className={`step-line ${index < activeStep ? 'completed' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="current-step">
          {steps[activeStep]}
        </div>
      </div>

      {/* Form Content */}
      <div className="form-content">
        {activeStep === 0 && (
          <div className="form-section">
            <h3>Identity</h3>
            <div className="form-group">
              <label>Display Name</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="e.g., John Doe" required className="form-input" />
            </div>
            <div className="form-group">
              <label>Professional Headline</label>
              <input type="text" name="headline" value={data.headline} onChange={handleChange} placeholder="e.g., Senior Software Engineer" className="form-input" />
            </div>
            <div className="form-group">
              <label>About Me / Bio</label>
              <textarea name="bio" value={data.bio} onChange={handleChange} placeholder="Tell us about yourself..." className="form-input form-textarea" />
            </div>
            <div className="form-group">
              <label>Profile Picture</label>
              <input type="url" name="profilePicture" value={data.profilePicture} onChange={handleChange} placeholder="https://example.com/photo.jpg" className="form-input" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={data.location} onChange={handleChange} placeholder="e.g., New York, NY" className="form-input" />
            </div>
            <div className="form-group">
              <label>Resume/CV</label>
              <input type="url" name="resume" value={data.resume} onChange={handleChange} placeholder="https://example.com/resume.pdf" className="form-input" />
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="form-section">
            <h3>Social Presence</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="your.email@example.com" className="form-input" />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input type="url" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" className="form-input" />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input type="url" name="github" value={data.github} onChange={handleChange} placeholder="https://github.com/yourusername" className="form-input" />
            </div>
            <div className="form-group">
              <label>Custom Social Link</label>
              <input type="url" name="custom" value={data.custom} onChange={handleChange} placeholder="https://twitter.com/yourhandle" className="form-input" />
            </div>
            <div className="form-group">
              <label>Website / Blog</label>
              <input type="url" name="website" value={data.website} onChange={handleChange} placeholder="https://yourwebsite.com" className="form-input" />
            </div>
          </div>
        )}

        {/* Placeholder for other steps */}
        {activeStep > 1 && (
          <div className="form-section">
            <h3>{steps[activeStep]}</h3>
            <p>Form fields for {steps[activeStep]} will be implemented here.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="nav-button secondary"
        >
          Back
        </button>
        <button
          onClick={activeStep === steps.length - 1 ? () => onNavigate('dashboard') : handleNext}
          className="nav-button primary"
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Form;