// src/components/Work.jsx
// Selected projects grid section.

import React from 'react';
import WorkItem from './WorkItem';
import { PROJECTS } from '../data/portfolio';
import '../styles/Work.css';

export default function Work({ onItemEnter, onItemLeave }) {
  return (
    <section id="work" className="work">
      <div className="work__header">
        <h2 className="work__title">Work</h2>
        <span className="work__count">Selected projects</span>
      </div>

      <div className="work__grid">
        {PROJECTS.map((project) => (
          <WorkItem
            key={project.id}
            id={project.id}
            title={project.title}
            tag={project.tag}
            onEnter={onItemEnter}
            onLeave={onItemLeave}
          />
        ))}
      </div>
    </section>
  );
}
