import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Preview from './components/Preview';
import NavBar from './components/NavBar';

function App() {
  const [page, setPage] = useState('dashboard');
  const [formData, setFormData] = useState({});

  const handleTemplateChange = (template) => {
    console.log('Template changed to:', template);
    // TODO: Implement template switching logic
  };

  return (
    <div className="app-container">
      <NavBar onNavigate={setPage} onTemplateChange={handleTemplateChange} />
      {page === 'dashboard' ? (
        <Dashboard onNavigate={setPage} />
      ) : (
        <div className="create-layout">
          <div className="form-panel">
            <Form onDataChange={setFormData} onNavigate={setPage} />
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
