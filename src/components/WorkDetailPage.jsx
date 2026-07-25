// src/components/WorkDetailPage.jsx
// Full-screen split layout — opens when a Work grid tile is clicked.
// Left: Back button, title + year, description, tag pills.
// Right: a fixed-height "dial" showing exactly 3 thumbnails at a time —
// scroll up/down to cycle through images. Whichever thumbnail lands in
// the center is enlarged + sharp and becomes the large hero image;
// its immediate neighbor above/below shrinks and blurs.

import React, { useEffect, useMemo, useRef, useState } from 'react';
// import BackgroundGradient from './Backgroundgradient';
import '../styles/WorkDetailPage.css';
import { PROJECTS } from '../data/portfolio';

export default function WorkDetailPage({
  project,
  projects = PROJECTS,
  onClose,
  onNavigate,
  onEnter,
  onLeave,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [edgePad, setEdgePad] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [heroRatio, setHeroRatio] = useState(16 / 10);

  const thumbsRef = useRef(null);
  const itemRefs = useRef([]);
  const heroImgRefs = useRef([]);

  const {
    title,
    year,
    description,
    coverImage,
    images = [],
    tags = [],
    role,
    client,
    services = [],
  } = project || {};

  // Combine coverImage + images into one gallery, de-duplicated.
  const gallery = useMemo(() => {
    return Array.from(new Set(images.filter(Boolean)));
  }, [images]);

  // Description/services can be a single value applied to every slide,
  // or an array with one entry per gallery image — when it's an array,
  // it swaps in sync with whichever thumbnail is centered in the dial.
  const activeDescription = Array.isArray(description)
    ? description[Math.min(activeIndex, description.length - 1)] ?? ''
    : description;

  const activeServices = Array.isArray(services[0])
    ? services[Math.min(activeIndex, services.length - 1)] ?? []
    : services;

  // Only the centered tile and its direct neighbor (above/below) get
  // treated — anything farther just fades further, since the fixed
  // 3-slot window means it's barely visible anyway.
  const getThumbStyle = (i) => {
    const distance = Math.abs(i - activeIndex);
    let scale = 0.62;
    let blur = 5;
    let opacity = 0.2;

    if (distance === 0) {
      scale = 1.15;
      blur = 0;
      opacity = 1;
    } else if (distance === 1) {
      scale = 0.8;
      blur = 3;
      opacity = 0.45;
    }

    return {
      transform: `scale(${scale})`,
      filter: `blur(${blur}px)`,
      opacity,
      zIndex: gallery.length - distance,
    };
  };

  // Lock page scroll while the overlay is open, restore on close.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Reset to the first image whenever a new project is opened, and
  // snap the dial back to the top so it lines up with index 0.
  useEffect(() => {
    setActiveIndex(0);
    setHeroRatio(16 / 10);
    if (thumbsRef.current) thumbsRef.current.scrollTo({ top: 0 });
  }, [project?.id]);

  // Adopt the active hero image's real aspect ratio when it's already
  // loaded (covers dial-scroll / click / next-project changes).
  useEffect(() => {
    const img = heroImgRefs.current[activeIndex];
    if (img && img.complete && img.naturalWidth) {
      setHeroRatio(clampRatio(img.naturalWidth, img.naturalHeight));
    }
  }, [activeIndex]);
  // Only one hero video should ever play at once — pause every video
  // that isn't the currently active one whenever the active index changes.
  useEffect(() => {
    heroImgRefs.current.forEach((el, i) => {
      if (el && el.tagName === 'VIDEO' && i !== activeIndex) {
        el.pause();
      }
    });
  }, [activeIndex]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Pad the dial so the first and last thumbnails can still reach
  // dead-center — same trick as the horizontal carousel in Work.jsx.
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;

    const measure = () => {
      const first = container.querySelector('.work-detail__thumb');
      if (first) {
        setEdgePad(
          Math.max(0, container.clientHeight / 2 - first.offsetHeight / 2)
        );
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [gallery.length]);

  // Whichever thumbnail is nearest the vertical center of the dial
  // becomes the active one — this drives both the magnify effect
  // and which image shows large on the right.
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container || gallery.length === 0) return;

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
        if (best) {
          setActiveIndex(Number(best.target.dataset.thumbIndex));
        }
      },
      {
        root: container,
        rootMargin: '-42% 0px -42% 0px',
        threshold: buildThresholdList(),
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [gallery.length, edgePad, project?.id]);

  // Clicking a visible-but-off-center thumb scrolls it to the middle
  // of the dial instead of jumping the image instantly.
  const scrollToIndex = (i) => {
    const el = itemRefs.current[i];
    const container = thumbsRef.current;
    if (!el || !container) return;
    const target =
      el.offsetTop - container.clientHeight / 2 + el.offsetHeight / 2;
    container.scrollTo({ top: target, behavior: 'smooth' });
  };

  // Figure out the next project in the list (wraps to the first).
  const currentIndex = projects.findIndex((p) => p.id === project?.id);
  const nextProject =
    projects.length > 1 && currentIndex !== -1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  // Blur the current content out, swap the project once it's fully
  // faded, then let the fresh content's own entrance animation
  // blur it back in — smooth crossfade instead of a hard cut.
  const TRANSITION_MS = 480;
  const handleNext = () => {
    if (!nextProject || isLeaving) return;
    setIsLeaving(true);
    window.setTimeout(() => {
      onNavigate?.(nextProject.id);
      setIsLeaving(false);
    }, TRANSITION_MS);
  };

  if (!project) return null;

  return (
    <div className="work-detail">
      {/* <BackgroundGradient /> */}
      {/* ── Back ── */}
      <button
        className="work-detail__back"
        onClick={onClose}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className="work-detail__back-icon">&#8598;</span>
        Back
      </button>

      <div
        key={project?.id}
        className={`work-detail__content${isLeaving ? ' work-detail__content--leaving' : ''
          }`}
      >
        {/* ── Left: info ── */}
        <div className="work-detail__info">
          <div className="work-detail__title-row">
            <h1 className="work-detail__title">{title}</h1>
            {/* {year && <span className="work-detail__year">{year}</span>} */}
          </div>



          {tags.length > 0 && (
            <div className="work-detail__tags" key={`services-${activeIndex}`}>
              {activeServices.map((tag) => (
                <span key={tag} className='productdetails-meta-data' >
                  {tag},
                </span>
              ))}
            </div>

          )}
          {activeDescription && (
            <p className="work-detail__desc" key={`desc-${activeIndex}`}>{activeDescription}</p>
          )}
        </div>

        {/* ── Right: dial + hero image ── */}
        <div className="work-detail__visual">
          {gallery.length > 1 && (
            <div className="work-detail__dial-wrap">
              <div className="work-detail__thumbs" ref={thumbsRef}>
                <div
                  className="work-detail__thumb-track"
                  style={{ paddingTop: edgePad, paddingBottom: edgePad }}
                >
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      ref={(el) => (itemRefs.current[i] = el)}
                      data-thumb-index={i}
                      className={`work-detail__thumb${i === activeIndex ? ' work-detail__thumb--active' : ''
                        }`}
                      style={getThumbStyle(i)}
                      onClick={() => scrollToIndex(i)}
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      aria-label={`View image ${i + 1}`}
                    >
                      {/\.(mp4|webm|ogg|mov)$/i.test(src) ? (
                        <video src={src} muted playsInline preload="metadata" />
                      ) : (
                        <img src={src} alt="" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="work-detail__dial-fade work-detail__dial-fade--top" />
              <div className="work-detail__dial-fade work-detail__dial-fade--bottom" />
            </div>
          )}

          <div className="work-detail__hero-frame">
            {gallery.length > 0 ? (
              gallery.map((src, i) => {
                const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(src);

                return isVideo ? (
                  <video
                    key={src + i}
                    ref={(el) => (heroImgRefs.current[i] = el)}
                    className={`work-detail__hero-img${i === activeIndex ? " work-detail__hero-img--active" : ""
                      }`}
                    // autoPlay
                    controls
                    // muted
                    // loop
                    playsInline
                    onLoadedMetadata={(e) => {
                      if (i === activeIndex) {
                        setHeroRatio(
                          clampRatio(
                            e.target.videoWidth,
                            e.target.videoHeight
                          )
                        );
                      }
                    }}
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    key={src + i}
                    ref={(el) => (heroImgRefs.current[i] = el)}
                    src={src}
                    alt={title}
                    className={`work-detail__hero-img${i === activeIndex ? " work-detail__hero-img--active" : ""
                      }`}
                    onLoad={(e) => {
                      if (i === activeIndex) {
                        setHeroRatio(
                          clampRatio(
                            e.target.naturalWidth,
                            e.target.naturalHeight
                          )
                        );
                      }
                    }}
                  />
                );
              })
            ) : (
              <div className="work-detail__hero-img work-detail__hero-img--placeholder work-detail__hero-img--active" />
            )}
          </div>
        </div>
      </div>

      {/* ── Next project ── */}
      {nextProject && (
        <button
          type="button"
          className="work-detail__next"
          onClick={handleNext}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          Next: {nextProject.title}
          <span className="work-detail__next-arrow">&#8594;</span>
        </button>
      )}
    </div>
  );
}

function buildThresholdList() {
  const steps = 20;
  const list = [];
  for (let i = 0; i <= steps; i++) list.push(i / steps);
  return list;
}

// Uses the media's real aspect ratio, so the hero frame adapts
// to each image/video without cropping or stretching.
function clampRatio(w, h) {
  if (!w || !h) return 16 / 10;
  return w / h;
}

/* ============================================================
   WIRING NOTES
   ============================================================

   1) Add a `tags` array to each project in src/data/portfolio.js
      (these render as the pill badges, e.g. "GSAP", "LENIS"):

        {
          id: '01',
          title: 'Anima',
          year: '2026',
          description: 'Website about animal rights, created to practice
            web animations with tools like GSAP and Lenis.',
          tags: ['GSAP', 'Lenis'],
          coverImage: '/Assets/Work/anima-cover.jpg',
          images: [
            '/Assets/Work/anima-1.jpg',
            '/Assets/Work/anima-2.jpg',
            '/Assets/Work/anima-3.jpg',
          ],
        }

   2) App.jsx already passes `projects` and `onNavigate` down to
      WorkDetailPage — no changes needed there.

   3) Work.jsx / WorkItem.jsx need no changes — onItemClick(project.id)
      wiring is unchanged.
   ============================================================ */