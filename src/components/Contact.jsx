// src/components/Contact.jsx

import React, { useState } from 'react';
import '../styles/Contact.css';

export default function Contact({ onEnter, onLeave }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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
        <p className="contact__sub">Enough about me, now it's your turn.</p>
      </div>

      <div className="contact__body">
        {/* Left — info */}
        <div className="contact__info">
          <p className="contact__tagline">
            Have a project in mind? <br />
            <em>Let’s bring it to life.</em>


          </p>
          <br />
          <p className="contact__sub">
            Share your vision with us, and we'll deliver something beyond your expectations.
          </p>
        </div>

        {/* Right — form */}
        <div className="contact__form-wrap">
          <ul className="contact__details">
            <li>
              <span className="contact__detail-label">Email</span>
           <a
             href="mailto:contact@studioinkframe.in"
  className="contact__detail-value"
  onMouseEnter={onEnter}
  onMouseLeave={onLeave}
>
                contact@studioinkframe.in
            </a>
            </li>
            <li>
              <span className="contact__detail-label">Meet in</span>
              <span className="contact__detail-value">Mumbai, India</span>
            </li>
            <li>
              <span className="contact__detail-label">Social handle</span>
              <span className="contact__detail-value contact__available">
                <span className="contact__available-dot" />
                <a href="https://www.linkedin.com/company/studioinkframe.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <img src="/Assets/Image/linkedin.png" alt="LinkedIn" style={{ width: "30px", height: "auto" }} />
                </a>
                <a href="https://www.behance.net/pankajvishwak21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <img src="/Assets/Image/Behance.png" alt="Behance" style={{ width: "30px", height: "auto" }} />
                </a>
                                <a href="https://www.instagram.com/studioinkframe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-icon"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <img src="/Assets/Image/insta.png" alt="Instagram" style={{ width: "30px", height: "auto" }} />
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
