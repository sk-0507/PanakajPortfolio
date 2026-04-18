// src/hooks/useDraggableCard.js
// Encapsulates the drag, 3D tilt, momentum, and hover-tilt logic
// for the hero name card.

import { useRef, useCallback, useEffect } from 'react';

export function useDraggableCard() {
  const cardRef = useRef(null);

  // Mutable refs so we don't need state re-renders
  const state = useRef({
    isDragging: false,
    cardX: 0,
    cardY: 0,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
    animFrame: null,
  });

  const applyTransform = useCallback((x, y, rx = 0, ry = 0, transition = '') => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = transition;
    card.style.transform = `translate(${x}px, ${y}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, []);

  const onMouseDown = useCallback((e) => {
    const s = state.current;
    s.isDragging = true;
    s.startX = e.clientX - s.cardX;
    s.startY = e.clientY - s.cardY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    cancelAnimationFrame(s.animFrame);
    if (cardRef.current) cardRef.current.style.transition = 'box-shadow 0.3s ease';
  }, []);

  const onDoubleClick = useCallback(() => {
    const s = state.current;
    s.cardX = 0; s.cardY = 0; s.velX = 0; s.velY = 0;
    applyTransform(0, 0, 0, 0, 'transform 0.8s cubic-bezier(.2,.8,.3,1)');
  }, [applyTransform]);

  // Hover tilt (only when not dragging)
  const onMouseMove = useCallback((e) => {
    const s = state.current;
    if (s.isDragging) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    applyTransform(s.cardX, s.cardY, -dy * 8, dx * 8, 'transform 0.15s ease, box-shadow 0.3s ease');
  }, [applyTransform]);

  const onMouseLeave = useCallback(() => {
    const s = state.current;
    if (s.isDragging) return;
    applyTransform(s.cardX, s.cardY, 0, 0, 'transform 0.5s ease, box-shadow 0.3s ease');
  }, [applyTransform]);

  // Global mousemove / mouseup listeners
  useEffect(() => {
    const handleMove = (e) => {
      const s = state.current;
      if (!s.isDragging) return;
      s.velX = e.clientX - s.lastX;
      s.velY = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.cardX = e.clientX - s.startX;
      s.cardY = e.clientY - s.startY;
      const tiltX = Math.max(-20, Math.min(20, s.velY * 2));
      const tiltY = Math.max(-20, Math.min(20, -s.velX * 2));
      applyTransform(s.cardX, s.cardY, tiltX, tiltY);
    };

    const handleUp = () => {
      const s = state.current;
      if (!s.isDragging) return;
      s.isDragging = false;

      const inertia = () => {
        s.velX *= 0.85;
        s.velY *= 0.85;
        if (Math.abs(s.velX) < 0.3 && Math.abs(s.velY) < 0.3) {
          applyTransform(s.cardX, s.cardY, 0, 0, 'transform 0.6s cubic-bezier(.2,.8,.3,1), box-shadow 0.3s ease');
          return;
        }
        s.cardX += s.velX;
        s.cardY += s.velY;
        const tiltX = Math.max(-10, Math.min(10, s.velY));
        const tiltY = Math.max(-10, Math.min(10, -s.velX));
        applyTransform(s.cardX, s.cardY, tiltX, tiltY);
        s.animFrame = requestAnimationFrame(inertia);
      };
      inertia();
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [applyTransform]);

  return { cardRef, onMouseDown, onDoubleClick, onMouseMove, onMouseLeave };
}
