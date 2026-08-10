// src/components/AskButton.jsx
// Fixed bottom-right "Ask my work" button + mute/unmute music button.

import React, { useEffect, useRef, useState } from 'react';
import '../styles/Footer.css';

export default function AskButton({ onEnter, onLeave }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // ✅ Root-relative path — file must live at: public/audio/music.mp3 
    const audio = new Audio('/audio/music.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    // Browsers block autoplay before any user gesture.
    // We listen for the first interaction, then start music once.
    // const tryPlay = () => {
    //   audio.play()
    //     .then(() => setIsPlaying(true))
    //     .catch(() => {});
    //   window.removeEventListener('click',   tryPlay);
    //   window.removeEventListener('keydown', tryPlay);
    //   window.removeEventListener('scroll',  tryPlay);
    // };

    // // Attempt immediate autoplay first
    // audio.play()
    //   .then(() => setIsPlaying(true))
    //   .catch(() => {
    //     // Autoplay blocked by browser — start on first user interaction instead
    //     window.addEventListener('click',   tryPlay);
    //     window.addEventListener('keydown', tryPlay);
    //     window.addEventListener('scroll',  tryPlay);
    //   });

    // return () => {
    //   audio.pause();
    //   audio.src = '';
    //   window.removeEventListener('click',   tryPlay);
    //   window.removeEventListener('keydown', tryPlay);
    //   window.removeEventListener('scroll',  tryPlay);
    // };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.muted = true;
    }
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      {/* ── Ask my work ── */}
      <a
        href="mailto:pankajvishwakarma8812@gmail.com"
        className="ask-btn"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className="ask-btn__icon"></span>
        Let's talk
        <span className="ask-btn__shortcut"></span>
      </a>

      {/* ── Mute / Unmute ── */}
      <button
        className="mute-btn"
        onClick={toggleMute}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        title={isMuted ? 'Unmute music' : 'Mute music'}
      >
        <span className={`mute-btn__bars${isMuted ? ' mute-btn__bars--muted' : ''}`}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </span>
      </button>
    </>
  );
}
