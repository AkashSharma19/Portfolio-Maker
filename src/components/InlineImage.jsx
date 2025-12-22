import React, { useState, useRef } from 'react';

const InlineImage = ({ 
  value, 
  onSave, 
  placeholder = "Click to upload image",
  style = {},
  width = "100%",
  height = "100%"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      onSave(imageData);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Error reading file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const baseStyles = {
    width,
    height,
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: dragOver ? '2px dashed #a855f7' : 'none',
    borderRadius: '40px'
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    borderRadius: '40px',
    cursor: 'pointer'
  };

  const containerStyles = {
    position: 'relative',
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: dragOver ? '2px dashed #a855f7' : '1px solid #e2e8f0'
  };

  const placeholderStyles = {
    color: '#94a3b8',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center'
  };

  const uploadingStyles = {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div
      style={containerStyles}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      {isUploading ? (
        <div style={uploadingStyles}>Uploading...</div>
      ) : value ? (
        <>
          <img
            src={value}
            alt="Profile"
            style={baseStyles}
            onMouseEnter={(e) => {
              e.target.parentElement.querySelector('.overlay').style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.target.parentElement.querySelector('.overlay').style.opacity = '0';
            }}
          />
          <div 
            className="overlay"
            style={overlayStyles}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0';
            }}
          >
            Click to change image
          </div>
        </>
      ) : (
        <div style={placeholderStyles}>
          📸 {placeholder}
        </div>
      )}
    </div>
  );
};

export default InlineImage;