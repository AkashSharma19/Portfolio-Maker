import BentoTemplate from './templates/BentoTemplate';
import DarkTemplate from './templates/DarkTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ColorfulTemplate from './templates/ColorfulTemplate';
import React, { useState, useEffect, useRef } from 'react';

const Preview = ({ data, onNavigate, onEdit, template = 'bento' }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  
  const themes = {
    bento: {
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

  const theme = themes[template] || themes.bento;

  // 1. SCALING LOGIC
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const DESKTOP_WIDTH = 1200; // The fixed width of your Bento Template
        const padding = 40; // Extra breathing room
        
        // Calculate ratio
        const newScale = (parentWidth - padding) / DESKTOP_WIDTH;
        
        // Ensure we don't scale up unnecessarily (optional), but for "Desktop View" usually we just accept the ratio
        setScale(newScale < 1 ? newScale : 1);
      }
    };

    // Initial calculation
    calculateScale();

    // Listen for resize events on the container
    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const renderTemplate = () => {
    switch (template) {
      case 'bento':
        return <BentoTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      case 'dark':
        return <DarkTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      case 'minimal':
        return <MinimalTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      case 'colorful':
        return <ColorfulTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
      default:
        return <BentoTemplate data={data} theme={theme} onNavigate={onNavigate} onEdit={onEdit} />;
    }
  };

  return (
    <div style={{ 
      height: '100%', 
      width: '100%', 
      padding: '15px', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* BROWSER FRAME SHELL */}
      <div style={{ 
        backgroundColor: theme.backgroundColor, 
        height: '100%', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        border: '1px solid #e0e0e0'
      }}>
        
        {/* Browser Header (Traffic Lights) */}
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          height: '32px', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 12px', 
          flexShrink: 0, 
          borderBottom: '1px solid #e0e0e0' 
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28ca42' }}></div>
          </div>
          {/* Mock URL Bar */}
          <div style={{ 
            flex: 1, 
            marginLeft: '15px', 
            marginRight: '15px', 
            backgroundColor: '#fff', 
            height: '20px', 
            borderRadius: '4px', 
            border: '1px solid #ddd',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '10px',
            color: '#888'
          }}>
             {data?.name ? `${data.name.toLowerCase().replace(/\s+/g, '')}.com` : 'portfolio.com'}
          </div>
        </div>

        {/* SCALABLE VIEWPORT AREA */}
        <div 
          ref={containerRef} 
          style={{ 
            flex: 1, 
            overflow: 'hidden', // Hide native scrollbars of the parent
            position: 'relative',
            backgroundColor: '#e5e5e5' // Background behind the website
          }}
        >
          {/* THE SCALED WRAPPER */}
          <div style={{
            width: '1200px', // Force the Desktop Width
            height: '100%',
            position: 'absolute',
            top: 0,
            left: '50%', // Center horizontally
            transform: `translateX(-50%) scale(${scale})`, // Scale it
            transformOrigin: 'top center',
            overflowY: 'auto', // Scroll inside the scaled website
            overflowX: 'hidden',
            backgroundColor: theme.backgroundColor,
            // Hide scrollbar visual but allow scroll (optional aesthetic)
            scrollbarWidth: 'thin'
          }}>
            {/* Render the actual template inside */}
            <div style={{ 
              // We need to inverse the scale on height to make scrolling feel natural, 
              // or just let it flow. Usually standard flow works fine with overflowY: auto on parent.
              minHeight: '100%' 
            }}>
               {renderTemplate()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preview;