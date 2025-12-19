import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Preview from './components/Preview';

function App() {
  const [page, setPage] = useState('dashboard');
  const [formData, setFormData] = useState({});

  if (page === 'dashboard') {
    return <Dashboard onNavigate={setPage} />;
  }

  return (
    <div className="app">
      <div className="form-section">
        <Form onDataChange={setFormData} onNavigate={setPage} />
      </div>
      <div className="preview-section">
        <Preview data={formData} />
      </div>
    </div>
  );
}

export default App;
