// src/components/Services.jsx

import React, { useState } from 'react';
import '../styles/Services.css';

const SERVICES = [
  {
    num: '01',
    title: 'Digital Design & Social Media',
    desc: 'Scroll-stopping visuals that connect brands with their audience.',
    tags: ['Social Media Creatives', 'Campaign Creatives', 'Digital Advertisements', 'Web Banners'],
  },
  {
    num: '02',
    title: 'Motion & Visual Storytelling',
    desc: 'Bringing stories to life through impactful motion, editing, and visual experiences.',
    tags: ['Video Editing', 'AI-Generated Videos', 'Promotional Videos', 'Reels & Shorts'],
  },
  {
    num: '03',
    title: '3D & Product Visualization',
    desc: 'Bringing products and ideas to life with immersive visuals.',
    tags: ['3D Product Renders', 'CGI Visuals ', 'Product Animations'],
  },
  {
    num: '04',
    title: 'E-commerce Creative Solutions',
    desc: 'Visuals that help products stand out and sell better.',
    tags: ['Marketplace Listing Images', 'A+ Content', 'Lifestyle Images'],
  },
   {
    num: '05',
    title: 'Print & Editorial Design',
    desc: 'Creating impactful physical brand experiences.',
    tags: ['Brochures', 'Magazines','Menus', 'Posters', 'Business Collaterals'],
  }
];

export default function Services({ onEnter, onLeave }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="services" className="services">
      <div className="services__header">
        <h2 className="services__title">Services</h2>
        <p className="services__sub">What we bring to the table</p>
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
