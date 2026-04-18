// src/hooks/useIntersection.js
// Returns a ref + boolean: true once the element has entered the viewport

import { useState, useEffect, useRef } from 'react';

export function useIntersection(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el); // fire once
      }
    }, { threshold: 0.3, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
