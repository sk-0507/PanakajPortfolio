// src/components/OurProcess.jsx

import React from 'react';
import { useIntersection } from '../hooks/useIntersection';
import '../styles/OurProcess.css';

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We start by understanding your business, audience, and goals. Deep research, competitive analysis, and honest conversations about what success looks like.',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'Insights become a clear plan. We define the creative direction, project structure, and key milestones before a single pixel gets pushed.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Iterative design sprints with structured feedback loops. You see progress early and often — no big-reveal surprises at the end.',
  },
  {
    num: '04',
    title: 'Refinement',
    desc: 'Details matter. We polish, test, and stress-test every component until the work feels inevitable — like it couldn\'t have been any other way.',
  },
  {
    num: '05',
    title: 'Delivery',
    desc: 'Handoff is clean. Production-ready files, documentation, and a walkthrough so your team can hit the ground running.',
  },
];

function ProcessStep({ step, index }) {
  const [ref, visible] = useIntersection({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`process-step${visible ? ' process-step--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="process-step__connector">
        <span className="process-step__dot" />
        {index < STEPS.length - 1 && <span className="process-step__line" />}
      </div>

      <div className="process-step__content">
        <div className="process-step__num">{step.num}</div>
        <h3 className="process-step__title">{step.title}</h3>
        <p className="process-step__desc">{step.desc}</p>
      </div>
    </div>
  );
}

export default function OurProcess() {
  return (
    <section id="process" className="our-process">
      <div className="our-process__header">
        <h2 className="our-process__title">Our Process</h2>
        <p className="our-process__sub">How great work gets made</p>
      </div>

      <div className="our-process__steps">
        {STEPS.map((step, i) => (
          <ProcessStep key={step.num} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
