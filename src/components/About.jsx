// src/components/About.jsx
// Bio and skills list section.

import React from 'react';
import { SKILLS } from '../data/portfolio';
import '../styles/About.css';

export default function About() {
  return (
    <section id="about" className="about">
      {/* Left — bio */}
      <div className="about__left">
        <h2 className="about__title">About</h2>
        <p className="about__bio">
          I'm <strong>Pankaj Vishwakarma</strong>, a designer based in Charlotte, NC. I
          specialize in building{' '}
          <strong>precise, high-impact digital experiences</strong> — from
          visual identities to complex interfaces.
          <br />
          <br />
          My work lives at the intersection of{' '}
          <strong>structure and energy</strong>. I believe the best design makes
          you feel something before you understand it.
        </p>
      </div>

      {/* Right — skills */}
      <div className="about__right">
        <ul className="skills-list">
          {SKILLS.map((skill) => (
            <li key={skill.label} className="skills-list__item">
              {skill.label}
              <span className="skills-list__sub">{skill.sub}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
