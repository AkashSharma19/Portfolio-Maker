import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Preview from './components/Preview';
import Navbar from './components/NavBar';
import Templates from './components/Templates';

function App() {
  const [page, setPage] = useState('dashboard');
  const [formData, setFormData] = useState({});
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPortfolioForEdit, setSelectedPortfolioForEdit] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('portfolios');
    if (saved) {
      setSavedPortfolios(JSON.parse(saved));
    }
    const draft = localStorage.getItem('portfolioDraft');
    if (draft) {
      const draftData = JSON.parse(draft);
      setFormData(draftData);
      setSelectedTemplate(draftData.template || 'default');
    }
  }, []);

  useEffect(() => {
    if (page === 'create' && formData && Object.keys(formData).length > 0) {
      // Auto save draft
      localStorage.setItem('portfolioDraft', JSON.stringify({ ...formData, template: selectedTemplate }));
    }
  }, [formData, selectedTemplate, page]);

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
      }} />}
      {page === 'dashboard' ? (
        <Dashboard onNavigate={setPage} savedPortfolios={savedPortfolios} onEdit={(portfolio) => { setSelectedPortfolioForEdit(portfolio); setIsEditing(true); setFormData(portfolio); setSelectedTemplate(portfolio.template || 'default'); setPage('create'); }} onDelete={(portfolio) => { const newPortfolios = savedPortfolios.filter(p => p !== portfolio); localStorage.setItem('portfolios', JSON.stringify(newPortfolios)); setSavedPortfolios(newPortfolios); }} />
      ) : page === 'create' ? (
        <div style={{ display: 'flex', flexDirection: window.innerWidth >= 1024 ? 'row' : 'column', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 40%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <Form onDataChange={setFormData} onNavigate={setPage} initialData={isEditing ? selectedPortfolioForEdit : null} onSave={(data) => {
              let newPortfolios;
              if (isEditing) {
                const index = savedPortfolios.findIndex(p => p === selectedPortfolioForEdit);
                newPortfolios = [...savedPortfolios];
                newPortfolios[index] = { ...data, template: selectedTemplate };
                setIsEditing(false);
                setSelectedPortfolioForEdit(null);
              } else {
                const newPortfolio = { id: Date.now(), ...data, template: selectedTemplate };
                newPortfolios = [...savedPortfolios, newPortfolio];
              }
              localStorage.setItem('portfolios', JSON.stringify(newPortfolios));
              flushSync(() => setSavedPortfolios(newPortfolios));
            }} />
          </div>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 60%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'hidden' }}>
            <Preview data={formData} template={selectedTemplate} />
          </div>
        </div>
      ) : page === 'customize' ? (
        <div style={{ display: 'flex', flexDirection: window.innerWidth >= 1024 ? 'row' : 'column', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 40%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <Templates selectedTemplate={selectedTemplate} onTemplateChange={handleTemplateChange} />
          </div>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 60%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'hidden' }}>
            <Preview data={formData} template={selectedTemplate} />
          </div>
        </div>
      ) : page === 'ai-tools' ? (
        <div>AI Tools page coming soon</div>
      ) : null}
    </div>
  );
}

export default App;
