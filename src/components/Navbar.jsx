import React, { useState } from 'react';
import {
  LayoutGrid,
  FileText,
  Palette,
  Sparkles,
  Share2,
  ChevronDown,
  MoreVertical,
  Check
} from 'lucide-react';

const Navbar = ({ activeTab, onTabChange, portfolioName, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mapping your IDs to the Icons & Labels seen in the design
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'form', label: 'Content', icon: FileText },
    { id: 'customize', label: 'Customize', icon: Palette },
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles },
  ];

  const navStyle = {
    width: '100%',
    height: '64px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '50',
    paddingLeft: '24px',
    paddingRight: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const tabsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const tabButtonStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    border: 'none',
    backgroundColor: isActive ? '#fdf2f8' : 'transparent',
    color: isActive ? '#dc2626' : '#4b5563',
    cursor: 'pointer'
  });

  const iconStyle = (isActive) => ({
    width: '16px',
    height: '16px',
    strokeWidth: isActive ? '2' : '1.5'
  });

  const rightContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const portfolioButtonStyle = {
    display: window.innerWidth >= 768 ? 'flex' : 'none',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const shareButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#0f172a',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s'
  };

  const moreButtonStyle = {
    padding: '8px',
    color: '#94a3b8',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };

  return (
    <nav style={navStyle}>

      {/* 1. LEFT: Navigation Tabs */}
      <div style={tabsContainerStyle}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={tabButtonStyle(isActive)}
            >
              <Icon style={iconStyle(isActive)} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. RIGHT: Actions & Portfolio Name */}
      <div style={rightContainerStyle}>

        {/* Portfolio Selector (Dropdown Style) */}
        <button style={portfolioButtonStyle}>
          <span>{portfolioName || 'Untitled Portfolio'}</span>
          <ChevronDown style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
        </button>

        {/* Save Button */}
        {onSave && (
          <button
            onClick={() => {
              setIsSaving(true);
              onSave();
              setTimeout(() => {
                setIsSaving(false);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }, 500);
            }}
            disabled={isSaving}
            style={{
              backgroundColor: saved ? '#059669' : '#10b981',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s',
              opacity: isSaving ? 0.7 : 1,
              transform: saved ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {isSaving ? 'Saving...' : saved ? (
              <>
                <Check style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} />
                Saved
              </>
            ) : 'Save'}
          </button>
        )}

        {/* Primary Action Button (Share) */}
        <button style={shareButtonStyle}>
          <span>Share</span>
          <Share2 style={{ width: '16px', height: '16px' }} />
        </button>

        {/* More Options Menu (Three Dots) */}
        <button style={moreButtonStyle}>
          <MoreVertical style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;