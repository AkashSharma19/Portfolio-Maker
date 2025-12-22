import React, { useState, useEffect, useRef } from 'react';

const InlineURL = ({ 
  value, 
  onSave, 
  placeholder = "Enter URL", 
  tagName = "span",
  className = "",
  style = {},
  validateUrl = true 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [error, setError] = useState('');
  const elementRef = useRef(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && elementRef.current) {
      elementRef.current.textContent = tempValue;
      elementRef.current.focus();
      
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(elementRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditing, tempValue]);

  const validateUrlFormat = (url) => {
    if (!validateUrl) return true;
    
    if (!url || url.trim() === '') return true;
    
    try {
      // Add protocol if missing
      let testUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        testUrl = 'https://' + url;
      }
      
      new URL(testUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    const newValue = elementRef.current?.textContent || tempValue;
    
    // Validate URL
    if (newValue && !validateUrlFormat(newValue)) {
      setError('Please enter a valid URL');
      return;
    }
    
    setError('');
    setTempValue(newValue);
    onSave(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setTempValue(value);
      setError('');
      setIsEditing(false);
    }
  };

  const handleInput = () => {
    if (elementRef.current) {
      const text = elementRef.current.textContent || '';
      setTempValue(text);
      if (error) setError(''); // Clear error on input
    }
  };

  const formatUrl = (url) => {
    if (!url) return '';
    
    // Add protocol if missing for display
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const baseStyles = {
    ...style,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '20px',
    display: 'inline-block'
  };

  const hoverStyles = {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: '4px',
    padding: '2px 4px'
  };

  const editingStyles = {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    border: `2px solid ${error ? '#ef4444' : '#a855f7'}`,
    borderRadius: '4px',
    padding: '2px 4px',
    outline: 'none',
    cursor: 'text'
  };

  const errorStyles = {
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const Tag = tagName || 'span';

  if (isEditing) {
    return (
      <div>
        <Tag
          ref={elementRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          style={{ ...baseStyles, ...editingStyles }}
          className={className}
          data-placeholder={placeholder}
        >
          {tempValue}
        </Tag>
        {error && <div style={errorStyles}>{error}</div>}
      </div>
    );
  }

  const displayValue = value ? formatUrl(value) : '';

  return (
    <Tag
      ref={elementRef}
      onClick={() => setIsEditing(true)}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyles);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, baseStyles);
      }}
      style={baseStyles}
      className={className}
      title="Click to edit URL"
    >
      {displayValue || (placeholder && <span style={{ opacity: 0.5 }}>{placeholder}</span>)}
    </Tag>
  );
};

export default InlineURL;