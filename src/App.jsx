import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Dashboard from './components/Dashboard';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import Templates from './components/Templates';

// Icons for global popups
const Mail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Linkedin = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Github = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
const Twitter = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>;
const Instagram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const Youtube = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;
const Facebook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Globe = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;

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

function App() {
  const [page, setPage] = useState('dashboard');
  const [formData, setFormData] = useState({});
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPortfolioForEdit, setSelectedPortfolioForEdit] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('bento');
  
  // Global popup states
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showUrlPopup, setShowUrlPopup] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [editingSocialLink, setEditingSocialLink] = useState(null);
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [demoUrlInput, setDemoUrlInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('portfolios');
    if (saved) {
      setSavedPortfolios(JSON.parse(saved));
    }
    const draft = localStorage.getItem('portfolioDraft');
    if (draft) {
      const draftData = JSON.parse(draft);
      setFormData(draftData);
      setSelectedTemplate(draftData.template || 'bento');
    }
  }, []);

  useEffect(() => {
    if (page === 'create' && formData && Object.keys(formData).length > 0) {
      // Auto save draft
      localStorage.setItem('portfolioDraft', JSON.stringify({ ...formData, template: selectedTemplate }));
    }
  }, [formData, selectedTemplate, page]);

  const handleInlineEdit = (updatedData) => {
    setFormData(updatedData);
    // Auto-save to localStorage
    localStorage.setItem('portfolioDraft', JSON.stringify({ ...updatedData, template: selectedTemplate }));
  };
  
  // Helper functions for global popups
  const handleSaveUrl = () => {
    if (urlInput.trim() && selectedPlatform && formData.socialLinks) {
      let updatedSocialLinks;
      
      if (editingSocialLink) {
        // Editing existing link
        updatedSocialLinks = formData.socialLinks.map(link => 
          link.id === editingSocialLink.id 
            ? { ...link, url: urlInput.trim() }
            : link
        );
      } else {
        // Adding new link
        const platform = availablePlatforms.find(p => p.id === selectedPlatform.id);
        const newSocialLink = {
          id: Date.now(),
          platform: selectedPlatform.id,
          url: urlInput.trim(),
          icon: platform?.icon || Globe
        };
        updatedSocialLinks = [...(formData.socialLinks || []), newSocialLink];
      }
      
      const updatedData = { ...formData, socialLinks: updatedSocialLinks };
      handleInlineEdit(updatedData);
      setShowUrlPopup(false);
      setSelectedPlatform(null);
      setUrlInput('');
      setEditingSocialLink(null);
    }
  };
  
  const handleSaveDemoUrl = () => {
    if (demoUrlInput.trim() && editingProjectIndex !== null && formData.projects) {
      const updatedProjects = [...formData.projects];
      if (updatedProjects[editingProjectIndex]) {
        updatedProjects[editingProjectIndex] = {
          ...updatedProjects[editingProjectIndex],
          demoLink: demoUrlInput.trim()
        };
      }
      const updatedData = { ...formData, projects: updatedProjects };
      handleInlineEdit(updatedData);
      setShowDemoPopup(false);
      setEditingProjectIndex(null);
      setDemoUrlInput('');
    }
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const getActiveTab = () => {
    if (page === 'dashboard') return 'dashboard';
    if (page === 'create') return 'form';
    if (page === 'customize') return 'customize';
    if (page === 'view') return 'form';
    return 'dashboard';
  };

  const handleTabChange = (tab) => {
    if (tab === 'dashboard') setPage('dashboard');
    else if (tab === 'form') setPage('create');
    else if (tab === 'customize') setPage('customize'); // placeholder
    else if (tab === 'ai-tools') setPage('ai-tools'); // placeholder
  };

  const appContainerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    ...((page === 'create' || page === 'customize') && { paddingTop: '64px' })
  };

  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', overflowX: 'hidden', overflowY: page === 'view' ? 'hidden' : 'visible', ...appContainerStyle }}>
      {(page === 'create' || page === 'customize') && <Navbar activeTab={getActiveTab()} onTabChange={handleTabChange} portfolioName={formData.name} onSave={() => {
        let newPortfolios;
        if (isEditing) {
          const index = savedPortfolios.findIndex(p => p === selectedPortfolioForEdit);
          newPortfolios = [...savedPortfolios];
          newPortfolios[index] = { ...formData, template: selectedTemplate };
          setIsEditing(false);
          setSelectedPortfolioForEdit(null);
        } else {
          const newPortfolio = { id: Date.now(), ...formData, template: selectedTemplate };
          newPortfolios = [...savedPortfolios, newPortfolio];
        }
        localStorage.setItem('portfolios', JSON.stringify(newPortfolios));
        flushSync(() => setSavedPortfolios(newPortfolios));
        localStorage.removeItem('portfolioDraft'); // Clear draft after save
        // Don't navigate away - stay on current page for continuous editing
      }} />}
      {page === 'dashboard' ? (
        <Dashboard onNavigate={setPage} savedPortfolios={savedPortfolios} onEdit={(portfolio) => { setSelectedPortfolioForEdit(portfolio); setIsEditing(true); setFormData(portfolio); setSelectedTemplate(portfolio.template || 'bento'); setPage('create'); }} onDelete={(portfolio) => { const newPortfolios = savedPortfolios.filter(p => p !== portfolio); localStorage.setItem('portfolios', JSON.stringify(newPortfolios)); setSavedPortfolios(newPortfolios); }} />
      ) : page === 'create' ? (
        <div style={{ height: 'calc(100vh - 80px)' }}>
          <Preview 
            data={formData} 
            template={selectedTemplate} 
            onDataChange={handleInlineEdit}
            popupStates={{
              showAddDropdown,
              showUrlPopup,
              selectedPlatform,
              urlInput,
              editingSocialLink,
              showDemoPopup,
              editingProjectIndex,
              demoUrlInput
            }}
            popupHandlers={{
              setShowAddDropdown,
              setShowUrlPopup,
              setSelectedPlatform,
              setUrlInput,
              setEditingSocialLink,
              setShowDemoPopup,
              setEditingProjectIndex,
              setDemoUrlInput
            }}
          />
        </div>
      ) : page === 'customize' ? (
        <div style={{ display: 'flex', flexDirection: window.innerWidth >= 1024 ? 'row' : 'column', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 40%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <Templates selectedTemplate={selectedTemplate} onTemplateChange={handleTemplateChange} />
          </div>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 60%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh' }}>
            <Preview 
              data={formData} 
              template={selectedTemplate} 
              onDataChange={handleInlineEdit}
              popupStates={{
                showAddDropdown,
                showUrlPopup,
                selectedPlatform,
                urlInput,
                editingSocialLink,
                showDemoPopup,
                editingProjectIndex,
                demoUrlInput
              }}
              popupHandlers={{
                setShowAddDropdown,
                setShowUrlPopup,
                setSelectedPlatform,
                setUrlInput,
                setEditingSocialLink,
                setShowDemoPopup,
                setEditingProjectIndex,
                setDemoUrlInput
              }}
            />
          </div>
        </div>
      ) : page === 'ai-tools' ? (
        <div>AI Tools page coming soon</div>
      ) : null}
      
      {/* GLOBAL POPUPS - Rendered at document level to avoid scroll issues */}
      {/* URL Input Popup */}
      {showUrlPopup && selectedPlatform && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <selectedPlatform.icon style={{ width: '24px', height: '24px', color: '#6b7280' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{editingSocialLink ? 'Edit' : 'Add'} {selectedPlatform.name} Link</h3>
            </div>
            
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={selectedPlatform.id === 'email' ? 'your@email.com' : 'https://example.com'}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                marginBottom: '20px'
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveUrl()}
            />
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowUrlPopup(false);
                  setSelectedPlatform(null);
                  setUrlInput('');
                  setEditingSocialLink(null);
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUrl}
                disabled={!urlInput.trim()}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: urlInput.trim() ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {editingSocialLink ? 'Update Link' : 'Add Link'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Demo Link Popup */}
      {showDemoPopup && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDemoPopup(false);
              setEditingProjectIndex(null);
              setDemoUrlInput('');
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            overflow: 'auto'
          }}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
                <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Add Project Demo Link</h3>
            </div>
            
            <input
              type="url"
              value={demoUrlInput}
              onChange={(e) => setDemoUrlInput(e.target.value)}
              placeholder="https://project-demo.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                marginBottom: '20px'
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveDemoUrl()}
            />
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowDemoPopup(false);
                  setEditingProjectIndex(null);
                  setDemoUrlInput('');
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDemoUrl}
                disabled={!demoUrlInput.trim()}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: demoUrlInput.trim() ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  cursor: demoUrlInput.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
