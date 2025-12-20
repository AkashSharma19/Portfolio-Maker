import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Preview from './components/Preview';
import Navbar from './components/NavBar';

function App() {
  const [page, setPage] = useState('dashboard');
  const [formData, setFormData] = useState({});
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPortfolioForEdit, setSelectedPortfolioForEdit] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolios');
    if (saved) {
      setSavedPortfolios(JSON.parse(saved));
    }
    const draft = localStorage.getItem('portfolioDraft');
    if (draft) {
      setFormData(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    if (page === 'create' && formData && Object.keys(formData).length > 0) {
      // Auto save draft
      localStorage.setItem('portfolioDraft', JSON.stringify(formData));
    }
  }, [formData, page]);

  const handleTemplateChange = (template) => {
    console.log('Template changed to:', template);
    // TODO: Implement template switching logic
  };

  const getActiveTab = () => {
    if (page === 'dashboard') return 'dashboard';
    if (page === 'create') return 'form';
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
    ...(page === 'create' && { paddingTop: '64px' })
  };

  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', overflowX: 'hidden', overflowY: page === 'view' ? 'hidden' : 'visible', ...appContainerStyle }}>
      {page === 'create' && <Navbar activeTab={getActiveTab()} onTabChange={handleTabChange} portfolioName={formData.name} onSave={() => {
        let newPortfolios;
        if (isEditing) {
          const index = savedPortfolios.findIndex(p => p === selectedPortfolioForEdit);
          newPortfolios = [...savedPortfolios];
          newPortfolios[index] = formData;
          setIsEditing(false);
          setSelectedPortfolioForEdit(null);
        } else {
          const newPortfolio = { id: Date.now(), ...formData };
          newPortfolios = [...savedPortfolios, newPortfolio];
        }
        localStorage.setItem('portfolios', JSON.stringify(newPortfolios));
        flushSync(() => setSavedPortfolios(newPortfolios));
        localStorage.removeItem('portfolioDraft'); // Clear draft after save
      }} />}
      {page === 'dashboard' ? (
        <Dashboard onNavigate={setPage} savedPortfolios={savedPortfolios} onView={(portfolio) => { setSelectedPortfolio(portfolio); setPage('view'); }} onEdit={(portfolio) => { setSelectedPortfolioForEdit(portfolio); setIsEditing(true); setFormData(portfolio); setPage('create'); }} onDelete={(portfolio) => { const newPortfolios = savedPortfolios.filter(p => p !== portfolio); localStorage.setItem('portfolios', JSON.stringify(newPortfolios)); setSavedPortfolios(newPortfolios); }} />
      ) : page === 'view' ? (
        <Preview data={selectedPortfolio} onNavigate={setPage} onEdit={(portfolio) => { setSelectedPortfolioForEdit(portfolio); setIsEditing(true); setFormData(portfolio); setPage('create'); }} />
      ) : page === 'create' ? (
        <div style={{ display: 'flex', flexDirection: window.innerWidth >= 1024 ? 'row' : 'column', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 40%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <Form onDataChange={setFormData} onNavigate={setPage} initialData={isEditing ? selectedPortfolioForEdit : null} onSave={(data) => {
              let newPortfolios;
              if (isEditing) {
                const index = savedPortfolios.findIndex(p => p === selectedPortfolioForEdit);
                newPortfolios = [...savedPortfolios];
                newPortfolios[index] = data;
                setIsEditing(false);
                setSelectedPortfolioForEdit(null);
              } else {
                const newPortfolio = { id: Date.now(), ...data };
                newPortfolios = [...savedPortfolios, newPortfolio];
              }
              localStorage.setItem('portfolios', JSON.stringify(newPortfolios));
              flushSync(() => setSavedPortfolios(newPortfolios));
            }} />
          </div>
          <div style={{ flex: window.innerWidth >= 1024 ? '0 0 60%' : '1', height: window.innerWidth >= 1024 ? '100vh' : '50vh', overflowY: 'hidden' }}>
            <Preview data={formData} />
          </div>
        </div>
      ) : page === 'customize' ? (
        <div>Customize page coming soon</div>
      ) : page === 'ai-tools' ? (
        <div>AI Tools page coming soon</div>
      ) : null}
    </div>
  );
}

export default App;
