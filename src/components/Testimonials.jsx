// src/components/Testimonials.jsx

import React, { useState } from 'react';
import '../styles/Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Pankaj completely transformed how we communicate our brand. The system he built is flexible enough to grow with us, but consistent enough that every touchpoint feels unmistakably ours.',
    name: 'Sarah Chen',
    role: 'CEO, Meridian Studio',
    initial: 'SC',
  },
  {
    id: 2,
    quote: 'Working with Pankaj felt less like hiring a designer and more like gaining a creative partner. He pushed back when our instincts were wrong and delivered work that exceeded what we thought was possible.',
    name: 'Marcus Webb',
    role: 'Founder, Volta Platform',
    initial: 'MW',
  },
  {
    id: 3,
    quote: 'The Noct editorial system Pankaj designed cut our layout time in half. It looks incredible and our team actually understands how to use it — that balance is rare.',
    name: 'Irina Sokolov',
    role: 'Creative Director, Noct Magazine',
    initial: 'IS',
  },
  {
    id: 4,
    quote: 'Precision is the word. Every decision had a reason, every component had a purpose. The dashboard he designed has become the gold standard our engineering team references.',
    name: 'James Okafor',
    role: 'Head of Product, Pulse',
    initial: 'JO',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">Testimonials</h2>
        <p className="testimonials__sub">What clients say</p>
      </div>

      <div className="testimonials__stage">
        {/* Large decorative quote mark */}
        <span className="testimonials__quote-mark">"</span>

        <blockquote key={active} className="testimonials__blockquote">
          {t.quote}
        </blockquote>

        <div className="testimonials__author">
          <div className="testimonials__avatar">{t.initial}</div>
          <div className="testimonials__author-info">
            <span className="testimonials__name">{t.name}</span>
            <span className="testimonials__role">{t.role}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="testimonials__nav">
          <button className="testimonials__btn" onClick={prev} aria-label="Previous">←</button>

          <div className="testimonials__dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot${i === active ? ' testimonials__dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button className="testimonials__btn" onClick={next} aria-label="Next">→</button>
        </div>
      </div>
    </section>
  );
}
