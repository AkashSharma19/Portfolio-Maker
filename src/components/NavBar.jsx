import React, { useState, useEffect } from 'react';

const templates = [
  { id: 'modern', name: 'Modern', icon: '🎨' },
  { id: 'minimal', name: 'Minimal', icon: '⚪' },
  { id: 'creative', name: 'Creative', icon: '✨' },
  { id: 'professional', name: 'Professional', icon: '💼' }
];

const NavBar = ({ onNavigate, onTemplateChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    onTemplateChange && onTemplateChange(template);
    setShowTemplateDropdown(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Profile Icon on the Left */}
        <div className="profile-icon">
          <div className="avatar">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="url(#avatarGradient)"/>
              <circle cx="16" cy="12" r="5" fill="white" opacity="0.9"/>
              <path d="M6 26c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="white" opacity="0.9"/>
              <defs>
                <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea"/>
                  <stop offset="100%" stopColor="#764ba2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Logo Centered */}
        <div className="navbar-logo">
          <h1>Portfolio Maker</h1>
        </div>

        {/* Template Selector */}
        <div className="template-selector">
          <button
            className="template-toggle"
            onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
            aria-label="Choose template"
          >
            <span className="template-icon">{selectedTemplate.icon}</span>
            <span className="template-name">{selectedTemplate.name}</span>
            <svg
              className={`dropdown-arrow ${showTemplateDropdown ? 'rotated' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showTemplateDropdown && (
            <div className="template-dropdown">
              {templates.map((template) => (
                <button
                  key={template.id}
                  className={`template-option ${selectedTemplate.id === template.id ? 'active' : ''}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <span className="template-icon">{template.icon}</span>
                  <span className="template-name">{template.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;