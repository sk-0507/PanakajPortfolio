// src/hooks/usePageLoader.js
// Hook to manage page loader visibility state
// Returns boolean to show/hide loader based on page load status

import { useEffect, useState } from 'react';

export function usePageLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check if page has already finished loading
    if (document.readyState === 'complete') {
      setShowLoader(true); // Still show it for the animation delay
    }

    // Set timeout to hide loader after animation completes
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3300); // Matches loader animation duration

    return () => clearTimeout(timer);
  }, []);

  return showLoader;
}
