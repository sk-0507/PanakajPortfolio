// src/hooks/useCursor.js
// Tracks mouse position for the custom cursor

import { useState, useEffect } from 'react';

export function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const enlargeCursor = () => setIsLarge(true);
  const shrinkCursor = () => setIsLarge(false);

  return { pos, isLarge, enlargeCursor, shrinkCursor };
}
