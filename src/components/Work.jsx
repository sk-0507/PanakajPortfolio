// src/components/Work.jsx
// Selected projects horizontal focus carousel — loops infinitely.
// The tile nearest the center of the track is sharp/full-opacity;
// every other tile blurs, dims, and scales down as it moves away from
// center. Click-to-open-detail-page behavior is unchanged: WorkItem
// still fires onItemClick(project.id) exactly as before.
//
// HOW THE LOOP WORKS
// ------------------------------------------------------------------
// PROJECTS is rendered 3x back to back: [copy A][copy B][copy C].
// You always scroll inside copy B. When you scroll far enough that
// you've drifted into copy A or copy C, we instantly teleport you
// back into copy B by exactly one copy-width. Since A/B/C are pixel
// identical, you never see or feel the teleport — it just feels like
// the track has no start or end.

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import WorkItem from './WorkItem';
import { PROJECTS } from '../data/portfolio';
import '../styles/Work.css';

export default function Work({ onItemEnter, onItemLeave, onItemClick }) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const copyWidthRef = useRef(0);
  const lockRef = useRef(false);
  const settleTimerRef = useRef(null);
  const rafRef = useRef(null);

  const n = PROJECTS.length;

  // Three copies of the list, laid out back to back.
  const slides = useMemo(() => {
    if (n === 0) return [];
    const out = [];
    for (let copy = 0; copy < 3; copy++) {
      PROJECTS.forEach((project, i) => {
        out.push({ ...project, _i: copy * n + i, _key: `${project.id}-${copy}` });
      });
    }
    return out;
  }, [n]);

  const [activeIndex, setActiveIndex] = useState(n); // start at copy B, tile 0
  const [edgePad, setEdgePad] = useState(0);

  // Whichever rendered tile's center is closest to the track's visual
  // center right now becomes "active".
  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = null;
    let bestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const c = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    if (best !== null) setActiveIndex(best);
  }, []);

  // Instantly move the track to `left` — no smooth scroll, no native
  // snap re-adjustment. This is what makes the loop invisible.
  const hardJumpTo = useCallback(
    (left) => {
      const track = trackRef.current;
      if (!track) return;
      lockRef.current = true;

      const prevSnap = track.style.scrollSnapType;
      const prevBehavior = track.style.scrollBehavior;
      track.style.scrollSnapType = 'none';
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = left;

      requestAnimationFrame(() => {
        track.style.scrollSnapType = prevSnap;
        track.style.scrollBehavior = prevBehavior;
        requestAnimationFrame(() => {
          lockRef.current = false;
          updateActive();
        });
      });
    },
    [updateActive]
  );

  // Edge padding (so first/last tiles of a copy can reach dead-center)
  // + the pixel width of a single copy (needed for the loop math).
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector('.work-item');
    if (first) {
      setEdgePad(Math.max(0, track.clientWidth / 2 - first.offsetWidth / 2));
    }
    if (n > 0) {
      copyWidthRef.current = track.scrollWidth / 3;
    }
  }, [n]);

  // If we've drifted into copy A or copy C, jump back into copy B.
  const loopCheck = useCallback(() => {
    const track = trackRef.current;
    const copyWidth = copyWidthRef.current;
    if (!track || !copyWidth) return;

    const { scrollLeft } = track;
    if (scrollLeft < copyWidth * 0.5) {
      hardJumpTo(scrollLeft + copyWidth);
    } else if (scrollLeft > copyWidth * 1.5) {
      hardJumpTo(scrollLeft - copyWidth);
    } else {
      updateActive();
    }
  }, [hardJumpTo, updateActive]);

  // On mount: measure, then jump straight to the start of copy B
  // before the first paint (no flash of copy A).
  useLayoutEffect(() => {
    if (n === 0) return;
    measure();
    const copyWidth = copyWidthRef.current;
    if (copyWidth) hardJumpTo(copyWidth);
  }, [n, measure, hardJumpTo]);

  // Keep the same relative scroll position on resize.
  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (!track) return;
      const prevCopyWidth = copyWidthRef.current || 1;
      const ratio = track.scrollLeft / prevCopyWidth;
      measure();
      const newCopyWidth = copyWidthRef.current;
      if (newCopyWidth) hardJumpTo(newCopyWidth * ratio);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measure, hardJumpTo]);

  // Live-update the active tile while scrolling; once the gesture
  // settles, run the loop check.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (lockRef.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActive);

      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(loopCheck, 130);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateActive, loopCheck]);

  const scrollByAmount = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const firstItem = track.querySelector('.work-item');
    const step = firstItem ? firstItem.offsetWidth + 24 : 400;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  const scrollToCenter = useCallback((i) => {
    const track = trackRef.current;
    const el = itemRefs.current[i];
    if (!track || !el) return;
    const target = el.offsetLeft - track.clientWidth / 2 + el.offsetWidth / 2;
    track.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  return (
    <section id="work" className="work">
      <div className="work__header">
        <h2 className="work__title">Work</h2>
        <span className="work__count">Selected projects</span>
      </div>

      <div className="work__carousel">
        <button
          type="button"
          className="work__nav work__nav--prev"
          onClick={() => scrollByAmount(-1)}
          onMouseEnter={onItemEnter}
          onMouseLeave={onItemLeave}
          aria-label="Previous project"
        >
          &larr;
        </button>

        <div
          className="work__track"
          ref={trackRef}
          style={{ paddingLeft: edgePad, paddingRight: edgePad }}
        >
          {slides.map((project) => {
            const i = project._i;
            return (
              <div
                key={project._key}
                ref={(el) => (itemRefs.current[i] = el)}
                data-slide-index={i}
                data-project-id={project.id}
                className={`work__slide${
                  i === activeIndex ? ' work__slide--active' : ''
                }`}
              >
                <WorkItem
                  id={project.id}
                  title={project.title}
                  tag={project.tag}
                  coverImage={project.coverImage}
                  onEnter={onItemEnter}
                  onLeave={onItemLeave}
                  onItemClick={() => {
                    onItemClick(project.id);
                    window.setTimeout(
                      () => scrollToCenter(i + 1),
                      // 550
                    );
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="work__nav"
          onClick={() => scrollByAmount(1)}
          onMouseEnter={onItemEnter}
          onMouseLeave={onItemLeave}
          aria-label="Next project"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}