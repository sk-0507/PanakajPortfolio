// src/components/Cursor.jsx
// Custom mouse cursor with a "You" label that follows the pointer.

import React from 'react';
import '../styles/Cursor.css';

export default function Cursor({ pos, isLarge }) {
  return (
    <>
      <div
        className={`cursor${isLarge ? ' cursor--large' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      {/* <div
        className="cursor-label"
        style={{ left: pos.x, top: pos.y }}
      >
        You
      </div> */}
    </>
  );
}
