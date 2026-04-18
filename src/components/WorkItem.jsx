// src/components/WorkItem.jsx
// Single project card used inside the Work grid.

import React from 'react';

export default function WorkItem({ id, title, tag, onEnter, onLeave }) {
  return (
    <div
      className="work-item"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="work-item__bg" />
      <div className="work-item__inner">
        <div className="work-item__content">
          <div className="work-item__num">{id}</div>
          <div className="work-item__title">{title}</div>
          <div className="work-item__tag">{tag}</div>
        </div>
      </div>
    </div>
  );
}
