// src/components/WorkItem.jsx
// Single project card used inside the Work grid.

import React from 'react';
import '../styles/WorkItem.css';

export default function WorkItem({ id, title, tag, coverImage, onEnter, onLeave, onItemClick }) {
  return (
    <div
      className="work-item"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onItemClick}
    >
      <div className="work-item__bg" />
      <div className="work-item__inner" style={{
        "--bg-image": `url(${coverImage})`,
      }}>
        <div className="work-item__content">
          <div className="work-item__num">{id}</div>
          <div className="work-item__title">{title}</div>
          <div className="work-item__tag">{tag}</div>
        </div>
      </div>
    </div>
  );
}