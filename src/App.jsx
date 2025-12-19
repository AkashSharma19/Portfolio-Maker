import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Preview from './components/Preview';

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
  }, []);

  const handleTemplateChange = (template) => {
    console.log('Template changed to:', template);
    // TODO: Implement template switching logic
  };

  return (
    <div className="app-container">
      {page === 'dashboard' ? (
        <Dashboard onNavigate={setPage} savedPortfolios={savedPortfolios} onView={(portfolio) => { setSelectedPortfolio(portfolio); setPage('view'); }} onEdit={(portfolio) => { setSelectedPortfolioForEdit(portfolio); setIsEditing(true); setFormData(portfolio); setPage('create'); }} onDelete={(portfolio) => { const newPortfolios = savedPortfolios.filter(p => p !== portfolio); localStorage.setItem('portfolios', JSON.stringify(newPortfolios)); setSavedPortfolios(newPortfolios); }} />
      ) : page === 'view' ? (
        <Preview data={selectedPortfolio} onNavigate={setPage} onEdit={(portfolio) => { setSelectedPortfolioForEdit(portfolio); setIsEditing(true); setFormData(portfolio); setPage('create'); }} />
      ) : (
        <div className="create-layout">
          <div className="form-panel">
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
          <div className="preview-panel">
            <Preview data={formData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
