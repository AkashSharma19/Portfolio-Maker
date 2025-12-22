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
  const inputRef = useRef(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(tempValue.length, tempValue.length);
    }
  }, [isEditing, tempValue]);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(tempValue);
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

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
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
    cursor: 'text',
    position: 'relative'
  };

  const inputStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    font: 'inherit',
    padding: '0',
    margin: '0',
    zIndex: 10,
    caretColor: '#a855f7'
  };

  const Tag = tagName;

  if (isEditing) {
    return (
      <Tag
        ref={elementRef}
        style={{ ...baseStyles, ...editingStyles }}
        className={className}
        onBlur={handleBlur}
      >
        {tempValue}
        <input
          ref={inputRef}
          type="text"
          value={tempValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          style={inputStyles}
        />
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
