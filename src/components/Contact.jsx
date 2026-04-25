// src/components/Contact.jsx

import React, { useState } from 'react';
import '../styles/Contact.css';

export default function Contact({ onEnter, onLeave }) {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your own form submission logic (e.g. Formspree, EmailJS)
    console.log('Form submitted:', form);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__header">
        <h2 className="contact__title">Contact</h2>
        <p className="contact__sub">Let's build something great</p>
      </div>

      <div className="contact__body">
        {/* Left — info */}
        <div className="contact__info">
          <p className="contact__tagline">
            Got a project in mind?<br />
            <em>Let's talk.</em>
          </p>

          <ul className="contact__details">
            <li>
              <span className="contact__detail-label">Email</span>
              <a
                href="mailto:pankajvishwakarma8812@gmail.com"
                className="contact__detail-value"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                pankajvishwakarma8812@gmail.com
              </a>
            </li>
            <li>
              <span className="contact__detail-label">Based in</span>
              <span className="contact__detail-value">Charlotte, NC</span>
            </li>
            <li>
              <span className="contact__detail-label">Available</span>
              <span className="contact__detail-value contact__available">
                <span className="contact__available-dot" />
                Open to new projects
              </span>
            </li>
          </ul>
        </div>

        {/* Right — form */}
        <div className="contact__form-wrap">
          {submitted ? (
            <div className="contact__success">
              <span className="contact__success-icon">✦</span>
              <p>Message received. I'll be in touch shortly.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project…"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                />
              </div>

              <button
                type="submit"
                className="contact__submit"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                <span>Send message</span>
                <span className="contact__submit-arrow">↗</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
