import React, { useState, useEffect, useRef } from 'react';

const InlineText = ({ 
  value, 
  onSave, 
  placeholder = "Click to edit", 
  tagName = "span",
  className = "",
  style = {},
  multiline = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const elementRef = useRef(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && elementRef.current) {
      // Set content and focus
      elementRef.current.textContent = tempValue;
      elementRef.current.focus();
      
      // Place cursor at the end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(elementRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditing, tempValue]);

  const handleBlur = () => {
    setIsEditing(false);
    const newValue = elementRef.current?.textContent || tempValue;
    setTempValue(newValue);
    onSave(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  const handleInput = () => {
    if (elementRef.current) {
      const text = elementRef.current.textContent || '';
      setTempValue(text);
    }
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
    border: '2px solid #a855f7',
    borderRadius: '4px',
    padding: '2px 4px',
    outline: 'none',
    cursor: 'text'
  };

  const Tag = tagName;

  if (isEditing) {
    return (
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
    );
  }

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
      title="Click to edit"
    >
      {value || (placeholder && <span style={{ opacity: 0.5 }}>{placeholder}</span>)}
    </Tag>
  );
};

export default InlineText;
