import DefaultTemplate from './templates/DefaultTemplate';
import DarkTemplate from './templates/DarkTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ColorfulTemplate from './templates/ColorfulTemplate';

const Preview = ({ data, onNavigate, onEdit, template = 'default' }) => {
  const themes = {
    default: {
      backgroundColor: '#ffffff',
      textColor: '#333',
      primaryColor: '#2563eb',
      secondaryColor: '#6b7280',
      accentColor: '#374151',
      cardBg: '#f9fafb',
      borderColor: '#e5e7eb'
    },
    dark: {
      backgroundColor: '#1f2937',
      textColor: '#f9fafb',
      primaryColor: '#3b82f6',
      secondaryColor: '#9ca3af',
      accentColor: '#d1d5db',
      cardBg: '#374151',
      borderColor: '#4b5563'
    },
    minimal: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      primaryColor: '#000000',
      secondaryColor: '#666666',
      accentColor: '#333333',
      cardBg: '#f5f5f5',
      borderColor: '#cccccc'
    },
    colorful: {
      backgroundColor: '#fff8f0',
      textColor: '#2d3748',
      primaryColor: '#e53e3e',
      secondaryColor: '#718096',
      accentColor: '#4a5568',
      cardBg: '#fed7d7',
      borderColor: '#feb2b2'
    }
  };

  const theme = themes[template] || themes.default;

  const renderTemplate = () => {
    switch (template) {
      case 'default':
        return <DefaultTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      case 'dark':
        return <DarkTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      case 'minimal':
        return <MinimalTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      case 'colorful':
        return <ColorfulTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      default:
        return <DefaultTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
    }
  };

  return (
    <div style={{ height: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: theme.backgroundColor, height: '100%', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: '#e0e0e0', height: '30px', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', padding: '0 10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
          </div>
        </div>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Preview;