import React, { useState } from 'react';
import InlineText from '../InlineText';
import InlineImage from '../InlineImage';
import InlineURL from '../InlineURL';

// Icons (Lucide React)
const ArrowUpRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>;
const Mail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Linkedin = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Github = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
const Twitter = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>;
const Instagram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const Youtube = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;
const Facebook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Globe = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const Plus = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Edit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const MapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Briefcase = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const Send = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

const BentoTemplate = ({ data = {}, onDataChange, popupStates, popupHandlers }) => {
  const [formStatus, setFormStatus] = useState('idle');
  
  // Use global popup state
  const {
    showAddDropdown = false,
    showUrlPopup = false,
    selectedPlatform = null,
    urlInput = '',
    editingSocialLink = null,
    showDemoPopup = false,
    editingProjectIndex = null,
    demoUrlInput = ''
  } = popupStates || {};
  
  const {
    setShowAddDropdown,
    setShowUrlPopup,
    setSelectedPlatform,
    setUrlInput,
    setEditingSocialLink,
    setShowDemoPopup,
    setEditingProjectIndex,
    setDemoUrlInput
  } = popupHandlers || {};
  
  // Use external data only, show "Click to edit" placeholder when no user data
  const portfolioData = {
    name: data?.name || "",
    headline: data?.headline || "",
    bio: data?.bio || "",
    location: data?.location || "",
    email: data?.email || "",
    profilePicture: data?.profilePicture || null,
    socialLinks: data?.socialLinks || [
      { id: 1, platform: 'linkedin', url: '', icon: Linkedin },
      { id: 2, platform: 'github', url: '', icon: Github },
      { id: 3, platform: 'twitter', url: '', icon: Twitter },
    ],
    skills: data?.skills || [
      { skills: "Product Strategy, User Research, Figma" },
      { skills: "React, TypeScript, Node.js" },
      { skills: "Data Analytics, Python" }
    ],
    projects: data?.projects || [
      { 
        id: 1, 
        title: "Gainbase", 
        tagline: "Portfolio Analysis Tool", 
        skills: "React, Finance",
        demoLink: "#"
      },
      { 
        id: 2, 
        title: "LMS Dashboard", 
        tagline: "Student Management System", 
        skills: "UX Research, Figma",
        demoLink: "#"
      }
    ],
    workExperience: data?.workExperience || [
      {
        title: "Senior Product Manager",
        company: "TechCorp Inc.",
        dates: "2022 - Present"
      },
      {
        title: "UX Designer",
        company: "Design Studio",
        dates: "2020 - 2022"
      }
    ],
    education: data?.education || [
      {
        degree: "MBA in Product Management",
        institution: "Stanford University"
      },
      {
        degree: "BSc Computer Science",
        institution: "MIT"
      }
    ],
    availabilityStatus: data?.availabilityStatus || "",
    footerMessage: data?.footerMessage || "Got a project in mind? I'm currently open for new opportunities."
  };

  const safeData = portfolioData;

  // Helper functions to update data and notify parent
  const updateField = (field, value) => {
    const updatedData = { ...portfolioData, [field]: value };
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...portfolioData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    const updatedData = { ...portfolioData, projects: newProjects };
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const addNewProject = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Store current scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    const newProject = {
      id: Date.now(),
      title: "New Project",
      tagline: "Description...",
      skills: "Technology, Tools",
      demoLink: "#"
    };
    const updatedData = { ...portfolioData, projects: [...portfolioData.projects, newProject] };
    if (onDataChange) {
      onDataChange(updatedData);
    }
    
    // Restore scroll position after update
    setTimeout(() => {
      window.scrollTo(0, currentScroll);
      document.documentElement.scrollTop = currentScroll;
      document.body.scrollTop = currentScroll;
    }, 0);
  };

  const removeProject = (index) => {
    // Store current scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    const newProjects = portfolioData.projects.filter((_, i) => i !== index);
    const updatedData = { ...portfolioData, projects: newProjects };
    if (onDataChange) {
      onDataChange(updatedData);
    }
    
    // Restore scroll position after update
    setTimeout(() => {
      window.scrollTo(0, currentScroll);
      document.documentElement.scrollTop = currentScroll;
      document.body.scrollTop = currentScroll;
    }, 0);
  };

  const updateSocialLink = (index, field, value) => {
    const newSocialLinks = [...portfolioData.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    const updatedData = { ...portfolioData, socialLinks: newSocialLinks };
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const addSocialLink = () => {
    const newSocialLink = {
      id: Date.now(),
      platform: 'custom',
      url: '',
      icon: Globe
    };
    const updatedData = { ...portfolioData, socialLinks: [...portfolioData.socialLinks, newSocialLink] };
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const removeSocialLink = (index) => {
    const newSocialLinks = portfolioData.socialLinks.filter((_, i) => i !== index);
    const updatedData = { ...portfolioData, socialLinks: newSocialLinks };
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const availablePlatforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    { id: 'github', name: 'GitHub', icon: Github },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'website', name: 'Website', icon: Globe },
  ];

  // Filter platforms that are not already added
  const getFilteredPlatforms = () => {
    const addedPlatforms = safeData.socialLinks.map(link => link.platform);
    return availablePlatforms.filter(platform => !addedPlatforms.includes(platform.id));
  };

  const handleAddPlatform = (platform) => {
    setSelectedPlatform(platform);
    setShowAddDropdown(false);
    setShowUrlPopup(true);
    setUrlInput('');
    setEditingSocialLink(null);
  };

  const handleEditSocialLink = (socialLink) => {
    const platform = availablePlatforms.find(p => p.id === socialLink.platform);
    setSelectedPlatform(platform);
    setUrlInput(socialLink.url);
    setShowUrlPopup(true);
    setEditingSocialLink(socialLink);
    setShowAddDropdown(false);
  };



  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddDropdown && !event.target.closest('.add-dropdown-container')) {
        setShowAddDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAddDropdown]);

  const skillsList = safeData.skills 
    ? safeData.skills.flatMap(s => s.skills ? s.skills.split(',') : []) 
    : ["Product Strategy", "User Research", "Figma", "React", "Data Analytics"];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  // --- STYLES OBJECT ---
  const s = {
    page: {
      backgroundColor: '#f8fafc', // Slate-50
      color: '#0f172a', // Slate-900
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      minHeight: '100vh',
      paddingBottom: '80px',
    },
    navContainer: {
      position: 'fixed',
      top: '24px',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 100,
      pointerEvents: 'none'
    },
    nav: {
      pointerEvents: 'auto',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '999px',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    navItem: {
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#475569',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '99px',
      transition: 'color 0.2s'
    },
    navCta: {
      backgroundColor: '#0f172a',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '99px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginLeft: '8px'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '140px 20px 0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    gridRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '40px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      position: 'relative'
    },
    heroCard: {
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '400px',
      gridColumn: 'span 2' // Logic handled in grid style usually, but for inline Grid requires explicit track
    },
    profileCard: {
      minHeight: '400px',
      position: 'relative',
      backgroundColor: '#e2e8f0'
    },
    textGradient: {
      background: 'linear-gradient(to right, #9333ea, #e11d48)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    marqueeContainer: {
      backgroundColor: '#0f172a',
      borderRadius: '32px',
      padding: '32px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '30px',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#0f172a'
    },
    projectCard: {
      minHeight: '450px',
      backgroundColor: '#f1f5f9',
      borderRadius: '40px',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    contactSection: {
      backgroundColor: '#0f172a',
      borderRadius: '40px',
      padding: '64px',
      color: '#fff',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '48px'
    },
    input: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.1)',
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
      marginBottom: '16px'
    }
  };

  // Helper for responsive grid span
  const getGridStyle = (isHero = false) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '24px',
    // Fallback for older browsers or simple stack
  });

  return (
    <div style={s.page}>
      
      {/* 1. NAVIGATION */}
      <div style={s.navContainer}>
        <nav style={s.nav}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', borderRight: '1px solid #e2e8f0' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', marginRight: '8px' }}></div>
            <span style={{ fontWeight: '700', fontSize: '14px' }}>
              <InlineText 
                value={safeData.name?.split(' ')[0] || ''}
                onSave={(val) => updateField('name', val)}
                style={{ fontWeight: '700', fontSize: '14px' }}
                placeholder="Click to edit"
              />
            </span>
          </div>
          {['Home', 'Work', 'Experience', 'Contact'].map(item => (
            <button key={item} style={s.navItem} onClick={() => handleScroll(item.toLowerCase())}>{item}</button>
          ))}
          <button style={s.navCta} onClick={() => handleScroll('contact')}>
            Let's Talk <ArrowUpRight />
          </button>
        </nav>
      </div>

      <div style={s.main}>
        
        {/* 2. HERO SECTION */}
        <div id="home" className="responsive-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Intro Card */}
          <div style={{ ...s.card, ...s.heroCard, flex: '1.5 1 500px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', backgroundColor: '#f1f5f9', borderRadius: '99px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#475569', marginBottom: '24px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
                <InlineText 
                  value={safeData.availabilityStatus}
                  onSave={(val) => updateField('availabilityStatus', val)}
                  placeholder="Click to edit status"
                  style={{ textTransform: 'uppercase', color: '#475569', fontWeight: '600' }}
                />
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
                I'm <InlineText 
                  tagName="span" 
                  value={safeData.name} 
                  onSave={(val) => updateField('name', val)}
                  style={{ color: '#0f172a' }}
                  placeholder="Click to edit name"
                />, <br />
                <span style={s.textGradient}>
                  <InlineText 
                    value={safeData.headline} 
                    onSave={(val) => updateField('headline', val)}
                    placeholder="Click to edit headline"
                    style={{ 
                      background: 'transparent', 
                      WebkitBackgroundClip: 'unset',
                      WebkitTextFillColor: safeData.headline ? 'transparent' : '#9333ea'
                    }}
                  />
                </span>
              </h1>
              <div style={{ fontSize: '18px', lineHeight: '1.6', color: '#475569', maxWidth: '500px' }}>
                <InlineText 
                  multiline={true}
                  tagName="p"
                  value={safeData.bio} 
                  onSave={(val) => updateField('bio', val)}
                  placeholder="Click to edit bio"
                />
              </div>
            </div>
            
            {/* Social Dock */}
            <div style={{ marginTop: '48px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Connect with me</h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {safeData.socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  const displayUrl = social.platform === 'email' ? 
                    (social.url ? `mailto:${social.url}` : '') : 
                    social.url;
                  
                  return (
                    <div key={social.id} style={{ position: 'relative' }}>
                      {social.url ? (
                        <a 
                          href={displayUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="social-btn"
                          title={`Visit ${social.platform}`}
                        >
                          <IconComponent />
                        </a>
                      ) : (
                        <div className="social-btn" style={{ opacity: 0.5 }} title={`Add ${social.platform} link`}>
                          <IconComponent />
                        </div>
                      )}
                      
                      {/* Edit button */}
                      <button
                        onClick={() => handleEditSocialLink(social)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '-8px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#3b82f6',
                          border: 'none',
                          borderRadius: '50%',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s ease'
                        }}
                        className="edit-social-btn"
                        title="Edit link"
                      >
                        <Edit />
                      </button>
                      
                      {/* Remove button */}
                      <button
                        onClick={() => removeSocialLink(safeData.socialLinks.findIndex(s => s.id === social.id))}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#ef4444',
                          border: 'none',
                          borderRadius: '50%',
                          color: 'white',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s ease'
                        }}
                        className="remove-social-btn"
                        title="Remove link"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
                
                {/* Add button with dropdown */}
                <div style={{ position: 'relative', zIndex: '100' }} className="add-dropdown-container">
                  <button
                    onClick={() => setShowAddDropdown(!showAddDropdown)}
                    className="social-btn"
                    title="Add social link"
                    style={{ border: '2px dashed #cbd5e1', backgroundColor: 'transparent' }}
                  >
                    <Plus />
                  </button>
                  
                  {/* Dropdown */}
                  {showAddDropdown && (
                    <div style={{
                      position: 'fixed',
                      top: 'auto',
                      left: 'auto',
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      padding: '8px',
                      zIndex: '9999',
                      minWidth: '200px',
                      marginBottom: '8px'
                    }}>
                      {getFilteredPlatforms().length > 0 ? (
                        getFilteredPlatforms().map((platform) => {
                          const IconComponent = platform.icon;
                          return (
                            <button
                              key={platform.id}
                              onClick={() => handleAddPlatform(platform)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px 12px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#374151',
                                transition: 'background-color 0.2s ease'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              <IconComponent style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                              {platform.name}
                            </button>
                          );
                        })
                      ) : (
                        <div style={{
                          padding: '8px 12px',
                          fontSize: '14px',
                          color: '#6b7280',
                          textAlign: 'center'
                        }}>
                          All platforms added
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            

          </div>

          {/* Profile Image */}
          <div style={{ ...s.card, flex: '1 1 300px', minHeight: '400px', position: 'relative' }}>
             <InlineImage 
               value={safeData.profilePicture}
               onSave={(val) => updateField('profilePicture', val)}
               placeholder="Click to upload profile image"
               width="100%"
               height="100%"
             />
             { (
               <div style={{ position: 'absolute', bottom: '24px', left: '24px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '12px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                 <span style={{ color: '#e11d48' }}><MapPin /></span> <InlineText
                    value={safeData.location}
                    onSave={(val) => updateField('location', val)}
                    placeholder="Click to edit location"
                    style={{ fontWeight: '600' }}
                  />
               </div>
             )}
          </div>
        </div>

        {/* 3. MARQUEE */}
        {skillsList.length > 0 && (
          <div style={s.marqueeContainer}>
            <div className="marquee-content">
              {[...skillsList, ...skillsList, ...skillsList].map((skill, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: '#fff', fontSize: '20px', fontWeight: '700', marginRight: '48px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#a855f7', borderRadius: '50%' }}></span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4. WORK SECTION */}
        <div id="work">
          <h2 style={s.sectionTitle}>Selected Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {safeData.projects?.length > 0 ? (
              safeData.projects.map((project, i) => (
                <div key={project.id || i} style={s.projectCard} className="project-card-hover">
                   <div style={{ padding: '40px' }}>
                      <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
                        <InlineText 
                          value={project.title}
                          onSave={(val) => updateProject(i, 'title', val)}
                          placeholder="Click to edit project title"
                        />
                      </h3>
                      <div style={{ 
                        fontSize: '16px', 
                        color: '#64748b', 
                        lineHeight: '1.5', 
                        minHeight: '60px',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word'
                      }}>
                        <InlineText 
                          value={project.tagline}
                          onSave={(val) => updateProject(i, 'tagline', val)}
                          placeholder="Click to edit project description\n\nAdd multiple lines to describe your project in detail..."
                          multiline={true}
                          style={{ 
                            lineHeight: '1.5',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'break-word'
                          }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                        {(project.skills ? project.skills.split(',') : []).slice(0, 3).map((tag, t) => (
                          <span key={t} style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', padding: '6px 12px', backgroundColor: '#fff', borderRadius: '99px', color: '#475569', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <InlineText 
                              value={tag.trim()}
                              onSave={(val) => {
                                const newSkills = project.skills.split(',').map((skill, idx) => idx === t ? val : skill.trim());
                                updateProject(i, 'skills', newSkills.join(', '));
                              }}
                              placeholder="Skill"
                              style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}
                            />
                          </span>
                        ))}
                        {/* Add skill tag button */}
                        {(!project.skills || project.skills.split(',').length < 3) && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Store current scroll position
                              const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                              
                              const newSkills = project.skills ? project.skills + ', New Skill' : 'New Skill';
                              updateProject(i, 'skills', newSkills);
                              
                              // Restore scroll position after update
                              setTimeout(() => {
                                window.scrollTo(0, currentScroll);
                                document.documentElement.scrollTop = currentScroll;
                                document.body.scrollTop = currentScroll;
                              }, 0);
                            }}
                            style={{
                              fontSize: '12px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              padding: '6px 12px',
                              backgroundColor: 'transparent',
                              border: '2px dashed #cbd5e1',
                              borderRadius: '99px',
                              color: '#64748b',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            title="Add skill"
                          >
                            + Add Skill
                          </button>
                        )}
                      </div>
                   </div>
                   {/* Abstract Shape for visual */}
                   <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #fce7f3, #e0e7ff)' }}></div>
                   
                   <div 
                     style={{ 
                       position: 'absolute', 
                       top: '32px', 
                       right: '32px', 
                       width: '48px', 
                       height: '48px',
                       zIndex: 10
                     }}
                   >
                     {project.demoLink && project.demoLink !== '#' && project.demoLink.trim() ? (
                       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                         <a 
                           href={project.demoLink.startsWith('http') ? project.demoLink : `https://${project.demoLink}`}
                           target="_blank" 
                           rel="noreferrer"
                           className="social-btn demo-link-btn"
                           style={{ 
                             width: '100%',
                             height: '100%',
                             backgroundColor: '#fff', 
                             borderRadius: '50%', 
                             display: 'flex', 
                             alignItems: 'center', 
                             justifyContent: 'center', 
                             boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
                             color: '#0f172a',
                             textDecoration: 'none',
                             transition: 'all 0.2s ease'
                           }}
                           title="View project demo"
                         >
                           <ArrowUpRight />
                         </a>
                         
                         {/* Edit button for existing demo link */}
                         <button
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             setEditingProjectIndex(i);
                             setDemoUrlInput(project.demoLink || '');
                             setShowDemoPopup(true);
                           }}
                           style={{
                             position: 'absolute',
                             top: '-8px',
                             left: '-8px',
                             width: '20px',
                             height: '20px',
                             backgroundColor: '#3b82f6',
                             border: 'none',
                             borderRadius: '50%',
                             color: 'white',
                             cursor: 'pointer',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             opacity: 0,
                             transition: 'opacity 0.2s ease'
                           }}
                           className="edit-demo-btn"
                           title="Edit demo link"
                         >
                           <Edit />
                         </button>
                       </div>
                     ) : (
                       <div
                         onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setEditingProjectIndex(i);
                            setDemoUrlInput(safeData.projects[i]?.demoLink || '');
                            setShowDemoPopup(true);
                          }}
                         style={{ 
                           width: '100%',
                           height: '100%',
                           backgroundColor: 'transparent', 
                           borderRadius: '50%', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           color: '#94a3b8',
                           cursor: 'pointer',
                           border: '2px dashed #cbd5e1',
                           transition: 'all 0.2s ease',
                           fontSize: '16px',
                           userSelect: 'none'
                         }}
                         title="Add project demo link"
                       >
                         +
                       </div>
                     )}
                   </div>
                  <button 
                    onClick={() => removeProject(i)}
                    style={{
                      position: 'absolute',
                      top: '32px',
                      left: '32px',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#ef4444',
                      borderRadius: '50%',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}
                    title="Remove Project"
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              /* Empty state placeholder */
              <div style={{
                ...s.projectCard,
                border: '2px dashed #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                minHeight: '300px'
              }}>
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No projects yet</div>
                  <div style={{ fontSize: '14px' }}>Click "Add Your First Project" to get started</div>
                </div>
              </div>
            )}
            
            {/* Add New Button - Always Visible */}
            <div 
              onClick={(e) => addNewProject(e)}
              style={{
                ...s.projectCard,
                border: '2px dashed #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                minHeight: '300px'
              }}
            >
              <div style={{ textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>+</div>
                <div style={{ fontWeight: '600' }}>
                  {safeData.projects?.length > 0 ? 'Add Another Project' : 'Add Your First Project'}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* 5. EXPERIENCE */}
        <div id="experience" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
           <div style={{ flex: '2 1 400px' }}>
              <h2 style={s.sectionTitle}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {safeData.workExperience?.map((exp, i) => (
                  <div key={i} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '48px', height: '48px', backgroundColor: '#f3e8ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
                            <Briefcase />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '18px', fontWeight: '700' }}>{exp.title}</h4>
                            <p style={{ color: '#64748b' }}>{exp.company}</p>
                          </div>
                       </div>
                       <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#f8fafc', padding: '4px 12px', borderRadius: '99px', height: 'fit-content', color: '#94a3b8' }}>{exp.dates}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           
           <div style={{ flex: '1 1 300px' }}>
              <h2 style={s.sectionTitle}>Education</h2>
              <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '40px', border: '1px solid #e2e8f0' }}>
                 {safeData.education?.map((edu, i) => (
                   <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ marginTop: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fb7185', boxShadow: '0 0 0 4px #fff1f2' }}></div>
                      <div>
                        <h5 style={{ fontWeight: '700', fontSize: '16px' }}>{edu.degree}</h5>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>{edu.institution}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* 6. CONTACT */}
        <div id="contact" style={s.contactSection}>
           <div>
             <h2 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
               Let's build <br />
               <span style={{ color: '#a855f7' }}>something epic.</span>
             </h2>
             <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.6', marginBottom: '32px' }}>
               {safeData.footerMessage || "Got a project in mind? I'm currently open for new opportunities."}
             </p>
             <div style={{ display: 'flex', gap: '12px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <Mail color="#a855f7" /> <InlineText
                    value={safeData.email}
                    onSave={(val) => updateField('email', val)}
                    placeholder="your@email.com"
                    style={{ color: '#fff' }}
                  />
               </div>
             </div>
           </div>

           <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '32px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                 <input type="text" placeholder="Name" style={s.input} />
                 <input type="email" placeholder="Email" style={s.input} />
              </div>
              <textarea rows="4" placeholder="Tell me about your project..." style={{ ...s.input, resize: 'none' }}></textarea>
              <button disabled={formStatus !== 'idle'} style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: '#fff', color: '#0f172a', fontWeight: '700', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {formStatus === 'idle' ? <>Send Message <Send /></> : formStatus === 'sending' ? 'Sending...' : 'Sent!'}
              </button>
           </form>
        </div>

        {/* FOOTER */}
        <footer style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '14px' }}>
           <p>© {new Date().getFullYear()} {safeData.name}. All rights reserved.</p>
           <div style={{ display: 'flex', gap: '24px' }}>
             <span>Twitter</span>
             <span>LinkedIn</span>
           </div>
        </footer>

      </div>

      {/* CRITICAL CSS ANIMATIONS & INTERACTIONS */}
      <style>{`
        /* Reset */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* Smooth Scroll */
        html { scroll-behavior: smooth; }
        
        /* Marquee Animation */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          display: inline-block;
          animation: scroll 20s linear infinite;
        }

        /* Social Button Hovers */
        .social-btn {
          width: 48px; height: 48px;
          border-radius: 50%;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex; align-items: center; justify-content: center;
          color: #475569;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .social-btn:hover {
          background-color: #0f172a;
          color: #fff;
          transform: translateY(-2px);
        }
        
        /* Edit and Remove Social Buttons */
        .edit-social-btn,
        .remove-social-btn {
          transition: opacity 0.2s ease;
        }
        
        .social-btn:hover + .edit-social-btn,
        .edit-social-btn:hover,
        .social-btn:hover + .edit-social-btn + .remove-social-btn,
        .remove-social-btn:hover {
          opacity: 1 !important;
        }
        
        /* Edit Demo Button */
        .edit-demo-btn {
          transition: opacity 0.2s ease;
        }
        
        .demo-link-btn:hover + .edit-demo-btn,
        .edit-demo-btn:hover {
          opacity: 1 !important;
        }
        
        /* Dropdown Animation and Positioning */
        .add-dropdown-container {
          position: relative;
        }
        
        .add-dropdown-container > div:first-child {
          animation: fadeInScale 0.2s ease-out;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 9999;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Ensure dropdown isn't clipped */
        .add-dropdown-container {
          overflow: visible !important;
        }

        /* Project Card Hover */
        .project-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        
        /* Inline Text Hover */
        .inline-text-hover:hover {
          background-color: rgba(168, 85, 247, 0.1);
          border-radius: 4px;
          padding: 2px 4px;
        }
      `}</style>
    </div>
  );
};

export default BentoTemplate;