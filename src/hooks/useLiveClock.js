// src/hooks/useLiveClock.js
// Returns a live-updating time string for Charlotte, NC (EST)

import { useState, useEffect } from 'react';

export function useLiveClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const format = () => {
      const opts = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/New_York',
      };
      return new Date().toLocaleTimeString('en-US', opts);
    };

    setTimeStr(format());
    const id = setInterval(() => setTimeStr(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return `Charlotte, NC — ${timeStr} EST`;
}
