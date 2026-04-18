// src/components/Statement.jsx
// Full-viewport statement section with scroll-triggered reveal animation.

import React from 'react';
import { useIntersection } from '../hooks/useIntersection';
import '../styles/Statement.css';

export default function Statement() {
  const [numRef, numVisible] = useIntersection();
  const [textRef, textVisible] = useIntersection();

  return (
    <section id="statement" className="statement">
      <div
        ref={numRef}
        className={`statement__number${numVisible ? ' statement__number--visible' : ''}`}
      >
        01
      </div>

      <p
        ref={textRef}
        className={`statement__text${textVisible ? ' statement__text--visible' : ''}`}
      >
        I design for those who crave <em>clarity</em> without sacrificing{' '}
        <em>energy.</em>
      </p>
    </section>
  );
}
