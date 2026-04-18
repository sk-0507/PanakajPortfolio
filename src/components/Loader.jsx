// src/components/Loader.jsx
// Landing page loader component with bouncing dot animation
// Minimal, clean loading visualization

import React, { useEffect, useState } from 'react';
import '../styles/Loader.css';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait until page is fully loaded
    const handleLoad = () => {
      // Add delay for animation completion
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Create animated dots
  const dots = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className={`loader-container ${!isVisible ? 'loader-fade-out' : ''}`}>
      {/* Background overlay */}
      <div className="loader-overlay" />

      {/* Main loader content */}
      <div className="loader-content">
        {/* Bouncing dots animation */}
        <div className="loader-dots-animation">
          {dots.map((dot) => (
            <span 
              key={dot} 
              className="dot-bounce"
              style={{
                animationDelay: `${dot * 0.1}s`,
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Animated gradient line at bottom */}
      <div className="loader-line" />
    </div>
  );
}
