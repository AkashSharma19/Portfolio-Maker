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
      // Focus and select all text for immediate editing
      elementRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(elementRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const newValue = elementRef.current?.textContent?.trim() || tempValue;
    setTempValue(newValue);
    onSave(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    // Handle escape key
    if (e.key === "Escape") {
      setTempValue(value); // Reset to original value
      setIsEditing(false);
    }
  };

  const handleInput = () => {
    if (elementRef.current) {
      setTempValue(elementRef.current.textContent || '');
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
        onFocus={(e) => {
          // Show placeholder if empty
          if (!tempValue && placeholder) {
            e.target.textContent = '';
          }
        }}
      >
        {tempValue || (placeholder && <span style={{ opacity: 0.5 }}>{placeholder}</span>)}
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
