// src/components/BackgroundGradient.jsx
// Ambient interactive background inspired by bg_gradient1.mp4:
// soft, blurred red/black gradient masses that are ALWAYS drifting on
// their own (no interaction required), with two layers of reactivity
// stacked on top of that ambient float:
//   1) POINTER — each blob gets pulled toward the cursor, at its own strength
//   2) SCROLL  — each blob drifts vertically as the page scrolls
//
// Implementation note: earlier version used canvas + a 60px CSS blur,
// which made the drift amplitude visually imperceptible. This version
// animates real DOM elements via translate3d on every rAF frame —
// GPU-accelerated, and the motion amplitudes below are large enough to
// read clearly at a glance.

import React, { useEffect, useRef } from 'react';
import '../styles/BackgroundGradient.css';

// orbitX/orbitY  -> amplitude (px) of the blob's own ambient drift loop
// speed          -> how fast it moves through that loop (bigger = faster)
// depth          -> how far it gets pulled toward the pointer (px)
// scrollDepth    -> how far it drifts across full page scroll (px)
const BLOBS = [
  { xPct: 0.72, yPct: 0.28, size: 900, orbitX: 180, orbitY: 140, speed: 0.55, depth: 140, scrollDepth: 260,  hue: 4,  alpha: 0.60, delay: 0 },
  { xPct: 0.18, yPct: 0.65, size: 760, orbitX: 140, orbitY: 200, speed: 0.40, depth: 100, scrollDepth: -220, hue: 10, alpha: 0.45, delay: 2.1 },
  { xPct: 0.55, yPct: 0.92, size: 680, orbitX: 220, orbitY: 120, speed: 0.65, depth: 70,  scrollDepth: 320,  hue: 16, alpha: 0.35, delay: 4.4 },
  { xPct: 0.92, yPct: 0.78, size: 520, orbitX: 120, orbitY: 160, speed: 0.32, depth: 50,  scrollDepth: -160, hue: 0,  alpha: 0.30, delay: 1.3 },
];

export default function BackgroundGradient() {
  const blobRefs = useRef([]);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Live pointer target + eased (lerped) follower, so movement is fluid.
    const pointer = { x: width / 2, y: height / 2 };
    const pointerEased = { x: width / 2, y: height / 2 };

    // Live scroll target (0..1 across full page) + eased follower.
    let scrollTarget = 0;
    let scrollEased = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    const handlePointer = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = x;
      pointer.y = y;
    };

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointer, { passive: true });
    window.addEventListener('touchmove', handlePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let raf;
    let t = 0;
    const speedMul = reduceMotion ? 0.15 : 1;

    const tick = () => {
      t += 0.016 * speedMul;

      // Ease pointer/scroll toward their live targets — never snaps.
      pointerEased.x += (pointer.x - pointerEased.x) * 0.06;
      pointerEased.y += (pointer.y - pointerEased.y) * 0.06;
      scrollEased += (scrollTarget - scrollEased) * 0.08;

      // Pointer offset from viewport center, normalized to -1..1
      const px = (pointerEased.x - width / 2) / (width / 2);
      const py = (pointerEased.y - height / 2) / (height / 2);

      BLOBS.forEach((b, i) => {
        const el = blobRefs.current[i];
        if (!el) return;

        // Ambient float — runs continuously, entirely independent of
        // pointer or scroll. This is what keeps it "alive" at rest.
        const floatX = Math.cos(t * b.speed + b.delay) * b.orbitX;
        const floatY = Math.sin(t * b.speed * 0.85 + b.delay) * b.orbitY;

        // Pointer parallax layer
        const pointerX = px * b.depth;
        const pointerY = py * b.depth;

        // Scroll drift layer
        const scrollY = (scrollEased - 0.5) * 2 * b.scrollDepth;

        // Gentle breathing scale, also fully ambient
        const breathe = 1 + Math.sin(t * b.speed * 1.3 + b.delay) * 0.07;

        const x = floatX + pointerX;
        const y = floatY + pointerY + scrollY;

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${breathe})`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('touchmove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className="bg-gradient__blob"
          style={{
            left: `${b.xPct * 100}%`,
            top: `${b.yPct * 100}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, hsla(${b.hue},100%,55%,${b.alpha}) 0%, hsla(${b.hue},100%,45%,${b.alpha * 0.4}) 45%, transparent 72%)`,
          }}
        />
      ))}
      <div className="bg-gradient__grain" />
    </div>
  );
}