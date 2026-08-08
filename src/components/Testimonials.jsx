// src/components/Testimonials.jsx
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import '../styles/Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Working with Pankaj for almost two years has been a great experience. His design strategy, creativity and impressive designs have significantly elevated our brand's social media presence. He understands brand aesthetics very well and delivers with professionalism, and is always open to feedback. I highly recommend him to anyone looking for a talented and reliable designer.",
    name: 'Hetvi Acharya',
    role: 'Marketing Head',
    company: 'Universal Cosmetics Industries',
    initial: 'HA',
    rating: 5,
    icon: 'cosmetics',
  },
  {
    id: 2,
    quote: 'Pankaj has consistently displayed professionalism, creativity, and a strong work ethic. We found him to be highly dedicated and reliable in all responsibilities entrusted.',
    name: 'Ruddhi Merchant',
    role: 'Founder & Creative Director',
    company: 'Studio Seesaw',
    initial: 'RM',
    rating: 5,
    icon: 'design',
  },
  {
    id: 3,
    quote: "He understands both the project's objectives and the client's perspective, bringing thoughtful ideas that align with business goals rather than just aesthetics. It's been great having him as our creative partner.",
    name: 'Nilesh Singh',
    role: 'Independent Creative Director',
    company: 'Freelanccer',
    initial: 'NS',
    rating: 5,
    icon: 'person',
  },
];

const ICONS = {
  cosmetics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 3h4v3H9z" />
      <path d="M8 6h6l1 3H7l1-3z" />
      <rect x="6" y="9" width="10" height="12" rx="2" />
      <path d="M9 13h4M9 16h4" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" />
      <path d="M14 6l3 3" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  ),
};

function Stars({ count = 5 }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`testimonial-card__star${i < count ? ' testimonial-card__star--filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * One testimonial card. Height is fully controlled by React state —
 * measured deterministically via two hidden "measurer" elements
 * (one clamped, one full text), instead of imperative DOM mutation.
 * This avoids timing/race-condition bugs.
 */
function TestimonialCard({ t, itemRef, dataSlideIndex }) {
  const cardRef = useRef(null);
  const clampedMeasureRef = useRef(null);
  const fullMeasureRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(null);
  const [expandedHeight, setExpandedHeight] = useState(null);
  const [canOverflow, setCanOverflow] = useState(false);

  const recalc = useCallback(() => {
    const card = cardRef.current;
    const clampedEl = clampedMeasureRef.current;
    const fullEl = fullMeasureRef.current;
    if (!card || !clampedEl || !fullEl) return;

    // Natural box height as governed by CSS aspect-ratio, measured
    // while nothing overrides it (baseHeight below is only used the
    // very first time; afterwards we reuse the state value so we
    // don't drift).
    const baseHeight = card.getBoundingClientRect().height;

    const clampedTextHeight = clampedEl.getBoundingClientRect().height;
    const fullTextHeight = fullEl.getBoundingClientRect().height;

    const overflow = fullTextHeight > clampedTextHeight + 1;
    setCanOverflow(overflow);

    setCollapsedHeight((prev) => prev ?? baseHeight);
    setExpandedHeight((prev) => {
      const base = prev !== null && collapsedHeight !== null ? collapsedHeight : baseHeight;
      return base - clampedTextHeight + fullTextHeight;
    });
  }, [collapsedHeight]);

  useLayoutEffect(() => {
    recalc();
  }, []);

  useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [recalc]);

  const style =
    collapsedHeight !== null
      ? { height: expanded ? expandedHeight ?? collapsedHeight : collapsedHeight }
      : undefined;

  return (
    <div ref={itemRef} data-slide-index={dataSlideIndex} className="testimonials__slide">
      <article
        ref={cardRef}
        className="testimonial-card"
        style={style}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="testimonial-card__top">
          <div className="testimonial-card__icon">{ICONS[t.icon] || ICONS.default}</div>
          <div className="testimonial-card__top-text">
            <Stars count={t.rating} />
            <span className="testimonial-card__company">{t.company}</span>
          </div>
        </div>

        <div className="testimonial-card__quote-wrap">
          {/* Visible text */}
          <p
            className={`testimonial-card__quote${
              expanded ? ' testimonial-card__quote--expanded' : ''
            }`}
          >
            {t.quote}
          </p>

          {!expanded && canOverflow && (
            <button
              type="button"
              className="testimonial-card__more"
              onClick={() => setExpanded(true)}
            >
              read more
            </button>
          )}

          {/* Hidden measurers — never visible, used only to compute heights */}
          <p
            ref={clampedMeasureRef}
            className="testimonial-card__quote testimonial-card__quote--measure"
            aria-hidden="true"
          >
            {t.quote}
          </p>
          <p
            ref={fullMeasureRef}
            className="testimonial-card__quote testimonial-card__quote--expanded testimonial-card__quote--measure"
            aria-hidden="true"
          >
            {t.quote}
          </p>
        </div>

        <div className="testimonial-card__author">
          <div className="testimonial-card__avatar">{t.initial}</div>
          <div className="testimonial-card__author-info">
            <span className="testimonial-card__name">{t.name}</span>
            <span className="testimonial-card__role">{t.role}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const copyWidthRef = useRef(0);
  const lockRef = useRef(false);
  const settleTimerRef = useRef(null);
  const rafRef = useRef(null);

  const n = TESTIMONIALS.length;

  const slides = useMemo(() => {
    if (n === 0) return [];
    const out = [];
    for (let copy = 0; copy < 3; copy++) {
      TESTIMONIALS.forEach((t, i) => {
        out.push({ ...t, _i: copy * n + i, _key: `${t.id}-${copy}` });
      });
    }
    return out;
  }, [n]);

  const [activeIndex, setActiveIndex] = useState(n);
  const [edgePad, setEdgePad] = useState(0);

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

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector('.testimonial-card');
    if (first) {
      setEdgePad(Math.max(0, track.clientWidth / 2 - first.offsetWidth / 2));
    }
    if (n > 0) {
      copyWidthRef.current = track.scrollWidth / 3;
    }
  }, [n]);

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

  useLayoutEffect(() => {
    if (n === 0) return;
    measure();
    const copyWidth = copyWidthRef.current;
    if (copyWidth) hardJumpTo(copyWidth);
  }, [n, measure, hardJumpTo]);

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
    const firstItem = track.querySelector('.testimonial-card');
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

  const realActive = ((activeIndex % n) + n) % n;

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">Testimonials</h2>
        <p className="testimonials__sub">What clients say</p>
      </div>

      <div className="testimonials__carousel">
        <button
          type="button"
          className="testimonials__nav testimonials__nav--prev"
          onClick={() => scrollByAmount(-1)}
          aria-label="Previous testimonial"
        >
          &larr;
        </button>

        <div
          className="testimonials__track"
          ref={trackRef}
          style={{ paddingLeft: edgePad, paddingRight: edgePad }}
        >
          {slides.map((t) => (
            <TestimonialCard
              key={t._key}
              t={t}
              dataSlideIndex={t._i}
              itemRef={(el) => (itemRefs.current[t._i] = el)}
            />
          ))}
        </div>

        <button
          type="button"
          className="testimonials__nav testimonials__nav--next"
          onClick={() => scrollByAmount(1)}
          aria-label="Next testimonial"
        >
          &#8594;
        </button>
      </div>

      <div className="testimonials__dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`testimonials__dot${i === realActive ? ' testimonials__dot--active' : ''}`}
            onClick={() => scrollToCenter(n + i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}