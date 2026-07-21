// src/components/Work.jsx
// Selected projects horizontal focus carousel.
// The tile nearest the center of the track is sharp/full-opacity;
// every other tile blurs, dims, and scales down as it moves away from
// center. Fully dynamic; works with any PROJECTS length, no hardcoded
// indices anywhere. Click-to-open-detail-page behavior is unchanged:
// WorkItem still fires onItemClick(project.id) exactly as before.

import React, { useEffect, useRef, useState, useCallback } from 'react';
import WorkItem from './WorkItem';
import { PROJECTS } from '../data/portfolio';
import '../styles/Work.css';

export default function Work({ onItemEnter, onItemLeave, onItemClick }) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeId, setActiveId] = useState(PROJECTS[0]?.id ?? null);
  const [edgePad, setEdgePad] = useState(0);

  // Which slide is nearest the center of the track right now.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) setActiveId(best.target.dataset.projectId);
      },
      {
        root: track,
        rootMargin: '0px -38% 0px -38%',
        threshold: buildThresholdList(),
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Pad the track so first and last slides can center.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const first = track.querySelector('.work-item');
      if (first) {
        setEdgePad(Math.max(0, track.clientWidth / 2 - first.offsetWidth / 2));
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const scrollByAmount = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const firstItem = track.querySelector('.work-item');
    const step = firstItem ? firstItem.offsetWidth + 24 : 400;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  // Scrolls the clicked tile to the center of the track — same idea
  // as the thumbnail dial in WorkDetailPage.
  const scrollToCenter = useCallback((i) => {
    const track = trackRef.current;
    const el = itemRefs.current[i];
    if (!track || !el) return;
    const target =
      el.offsetLeft - track.clientWidth / 2 + el.offsetWidth / 2;
    track.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  const handleWheel = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      track.scrollLeft += e.deltaY;
    }
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
          onWheel={handleWheel}
          style={{ paddingLeft: edgePad, paddingRight: edgePad }}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (itemRefs.current[i] = el)}
              data-project-id={project.id}
              className={`work__slide${
                project.id === activeId ? ' work__slide--active' : ''
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
    () => scrollToCenter((i + 1) % PROJECTS.length),
    // 550
  );
}}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="work__nav work__nav--next"
          onClick={() => scrollByAmount(1)}
          onMouseEnter={onItemEnter}
          onMouseLeave={onItemLeave}
          aria-label="Next project"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}

function buildThresholdList() {
  const steps = 20;
  const list = [];
  for (let i = 0; i <= steps; i++) list.push(i / steps);
  return list;
}
