import React, { useState } from 'react';

// Icons (Lucide React)
const ArrowUpRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>;
const Mail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Linkedin = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Github = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
const MapPin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Briefcase = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const Send = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

const BentoTemplate = ({ data = {} }) => {
  const [formStatus, setFormStatus] = useState('idle');
  const safeData = data || {};

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
      height: '450px',
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
            <span style={{ fontWeight: '700', fontSize: '14px' }}>{safeData.name?.split(' ')[0] || 'Portfolio'}</span>
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
                Available for work
              </div>
              <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
                I'm {safeData.name || 'Akash'}, <br />
                <span style={s.textGradient}>
                  {safeData.headline || 'Product Designer'}
                </span>
              </h1>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#475569', maxWidth: '500px' }}>
                {safeData.bio || 'Building digital products, brands, and experiences.'}
              </p>
            </div>
            
            {/* Social Dock */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
              {[
                 { icon: Linkedin, link: safeData.linkedin },
                 { icon: Github, link: safeData.github },
                 { icon: Mail, link: safeData.email ? `mailto:${safeData.email}` : '#' }
              ].map((social, i) => (
                social.link && (
                  <a key={i} href={social.link} target="_blank" rel="noreferrer" className="social-btn">
                    <social.icon />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div style={{ ...s.card, flex: '1 1 300px', minHeight: '400px' }}>
             {safeData.profilePicture ? (
               <img src={safeData.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             ) : (
               <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Image</div>
             )}
             {safeData.location && (
               <div style={{ position: 'absolute', bottom: '24px', left: '24px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '12px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                 <span style={{ color: '#e11d48' }}><MapPin /></span> {safeData.location}
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
        {safeData.projects?.length > 0 && (
          <div id="work">
            <h2 style={s.sectionTitle}>Selected Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              {safeData.projects.map((project, i) => (
                <div key={i} style={s.projectCard} className="project-card-hover">
                   <div style={{ padding: '40px' }}>
                      <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{project.title}</h3>
                      <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>{project.tagline}</p>
                      
                      <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                        {project.skills?.split(',').slice(0, 3).map((tag, t) => (
                          <span key={t} style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', padding: '6px 12px', backgroundColor: '#fff', borderRadius: '99px', color: '#475569', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{tag}</span>
                        ))}
                      </div>
                   </div>
                   {/* Abstract Shape for visual */}
                   <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #fce7f3, #e0e7ff)' }}></div>
                   
                   <a href={project.demoLink} target="_blank" rel="noreferrer" style={{ position: 'absolute', top: '32px', right: '32px', width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', color: '#0f172a' }}>
                     <ArrowUpRight />
                   </a>
                </div>
              ))}
            </div>
          </div>
        )}

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
                 <Mail color="#a855f7" /> {safeData.email || 'hello@example.com'}
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
        }
        .social-btn:hover {
          background-color: #0f172a;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Project Card Hover */
        .project-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default BentoTemplate;