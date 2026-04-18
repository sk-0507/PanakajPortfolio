// src/components/Services.jsx

import React, { useState } from 'react';
import '../styles/Services.css';

const SERVICES = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'From strategy to final assets — logos, typography, color systems, and brand guidelines that give your company a clear, ownable visual language.',
    tags: ['Logo Design', 'Brand Strategy', 'Style Guides', 'Asset Production'],
  },
  {
    num: '02',
    title: 'UI / UX Design',
    desc: 'Interfaces that are precise, fast, and intuitive. I design for real users — mapping flows, wireframing structure, and delivering pixel-perfect screens.',
    tags: ['Web Design', 'Mobile Apps', 'Wireframing', 'Prototyping'],
  },
  {
    num: '03',
    title: 'Art Direction',
    desc: 'Visual storytelling across campaigns, editorial layouts, and digital touchpoints. Coherent, bold, and always on-brand.',
    tags: ['Campaign Direction', 'Editorial Design', 'Photography', 'Content Systems'],
  },
  {
    num: '04',
    title: 'Design Systems',
    desc: 'Scalable component libraries and token architectures that keep teams aligned and products consistent — from Figma to production code.',
    tags: ['Component Libraries', 'Design Tokens', 'Figma Systems', 'Documentation'],
  },
];

export default function Services({ onEnter, onLeave }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="services" className="services">
      <div className="services__header">
        <h2 className="services__title">Services</h2>
        <p className="services__sub">What I bring to the table</p>
      </div>

      <div className="services__list">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            className={`service-item${activeIndex === i ? ' service-item--open' : ''}`}
            onMouseEnter={() => { setActiveIndex(i); onEnter && onEnter(); }}
            onMouseLeave={() => { setActiveIndex(null); onLeave && onLeave(); }}
          >
            <div className="service-item__row">
              <span className="service-item__num">{s.num}</span>
              <h3 className="service-item__title">{s.title}</h3>
              <span className="service-item__arrow">↗</span>
            </div>

            <div className="service-item__body">
              <p className="service-item__desc">{s.desc}</p>
              <div className="service-item__tags">
                {s.tags.map((tag) => (
                  <span key={tag} className="service-item__tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
