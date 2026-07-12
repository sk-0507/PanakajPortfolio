// src/components/Testimonials.jsx

import React, { useState } from 'react';
import '../styles/Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Working with Pankaj for almost two years has been a great experience. His design strategy, creativity and impressive designs have significantly elevated our brand's social media presence. He understands brand aesthetics very well and delivers with professionalism, and is always open to feedback. I highly recommend him to anyone looking for a talented and reliable designer.",
    name: 'Hetvi Acharya',
    role: 'Marketing Head, Universal Cosmetics Industries',
    initial: 'HA',
  },
  {
    id: 2,
    quote: 'Pankaj has consistently displayed professionalism, creativity, and a strong work ethic. We found him to be highly dedicated and reliable in all responsibilities entrusted.',
    name: 'Ruddhi Merchant',
    role: 'Founder & CD, Studio Seesaw',
    initial: 'RM',
  },
  {
    id: 3,
    quote: 'Pankaj understands what we actually need. He brings fresh ideas, pays attention to details, and always tries to create something that connects with our audience. It’s been great having him as our creative partner.',
    name: 'Lorem Ipsum',
    role: 'Owner, New National Jewellers',
    initial: 'IS',
  }
  
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
