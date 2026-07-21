import React, { useRef, useState } from 'react';
import '../styles/ParallaxImage.css';

export default function ParallaxImage({ src, alt, className = '' }) {
  const frameRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = px * 10;
    const rotateX = py * -10;
    const translateX = px * -18;
    const translateY = py * -18;

    setStyle({
      transform: `scale(1.1) translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transitionDuration: '0.6s',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'scale(1.03) translate(0px, 0px) rotateX(0deg) rotateY(0deg)',
      transitionDuration: '0.6s',
    });
  };

  return (
    <div
      ref={frameRef}
      className={`parallax-frame ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={alt} className="parallax-frame__img" style={style} />
    </div>
  );
}