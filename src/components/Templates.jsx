import React from 'react';

const Templates = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    {
      id: 'default',
      name: 'Default',
      description: 'Clean and professional design',
      preview: 'Light background with blue accents'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Modern dark theme',
      preview: 'Dark background with blue highlights'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant',
      preview: 'Black and white with clean lines'
    },
    {
      id: 'colorful',
      name: 'Colorful',
      description: 'Vibrant and energetic',
      preview: 'Warm colors with red accents'
    }
  ];

  const templateStyles = {
    default: { backgroundColor: '#ffffff', border: '2px solid #2563eb' },
    dark: { backgroundColor: '#1f2937', border: '2px solid #3b82f6' },
    minimal: { backgroundColor: '#ffffff', border: '2px solid #000000' },
    colorful: { backgroundColor: '#fff8f0', border: '2px solid #e53e3e' }
  };

  return (
    <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Choose a Template</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            style={{
              ...templateStyles[template.id],
              padding: '1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              border: selectedTemplate === template.id ? '3px solid #10b981' : '2px solid #e2e8f0',
              boxShadow: selectedTemplate === template.id ? '0 0 0 2px #10b981' : 'none',
              transition: 'all 0.3s'
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: template.id === 'dark' ? '#f9fafb' : '#111827' }}>
              {template.name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: template.id === 'dark' ? '#9ca3af' : '#6b7280', marginBottom: '0.5rem' }}>
              {template.description}
            </p>
            <p style={{ fontSize: '0.75rem', color: template.id === 'dark' ? '#d1d5db' : '#374151' }}>
              {template.preview}
            </p>
            {selectedTemplate === template.id && (
              <div style={{ marginTop: '0.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: '600' }}>
                ✓ Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;