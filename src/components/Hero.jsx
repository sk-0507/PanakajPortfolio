import React, { useEffect, useRef, useState } from 'react';
import { useDraggableCard } from '../hooks/useDraggableCard';
import '../styles/Hero.css';

export default function Hero({ onCardEnter, onCardLeave }) {
  const heroRef = useRef(null);
  const inputRef = useRef(null);
  const sizerRef = useRef(null);
  const { cardRef, onMouseDown, onDoubleClick, onMouseMove, onMouseLeave } =
    useDraggableCard();
  const [editableText, setEditableText] = useState('');

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Sync input width to sizer span on every text change
  useEffect(() => {
    if (sizerRef.current && inputRef.current) {
      inputRef.current.style.width = sizerRef.current.offsetWidth + 'px';
    }
  }, [editableText]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const sy = window.scrollY;
      const vh = window.innerHeight;
      if (sy < vh) {
        const prog = sy / vh;
        hero.style.transform = `perspective(800px) rotateX(${prog * 25}deg) scale(${1 - prog * 0.1})`;
        hero.style.opacity = Math.max(0, 1 - prog * 1.5);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div
        ref={cardRef}
        className="hero__card"
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { onMouseLeave(); onCardLeave(); }}
        onMouseEnter={onCardEnter}
      >
        <div className="hero__welcome">
          Welcome, Future

          {/* Hidden sizer — mirrors input text pixel-perfectly */}
          <span
            ref={sizerRef}
            className="hero__welcome-sizer"
            aria-hidden="true"
          >
            {editableText || 'Billionaire'}
          </span>

          <input
            ref={inputRef}
            type="text"
            className="hero__welcome-input"
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            placeholder="Billionaire"
          />
        </div>
      </div>

      <p className="hero__subtitle">Purposeful strokes, unforgettable frames.</p>
      <div className="hero__scroll-hint">Scroll</div>
    </section>
  );
}