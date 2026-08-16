// src/components/Navbar.jsx
// Fixed top navigation with logo, live clock, and nav links.

import React, { useState } from 'react';
import { useLiveClock } from '../hooks/useLiveClock';
import { useScrollDirection } from '../hooks/useScrollDirection';
import '../styles/Navbar.css';

export default function Navbar({ onLinkEnter, onLinkLeave }) {
  const clock = useLiveClock();
  const isVisible = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    // { href: '#process', label: 'Process' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
    { href: '#about', label: 'About' },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${isVisible ? '' : ' navbar--hidden'}`}>
        <span className="navbar__logo">
          <a href='#hero' onClick={handleLinkClick} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
            <img src="/Assets/Image/inkframe.png" alt="InkFrame" style={{ width: "150px", height: "auto" }}/>
          </a>
        </span>

        {/* Desktop/Tablet Menu */}
        <ul className="navbar__links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu — rendered as a sibling of <nav>, not a child, so its
          backdrop-filter isn't nested inside the navbar's own backdrop-filter
          stacking context (nested backdrop-filter fails to render in most
          browsers). Always mounted, visibility controlled via CSS. */}
      <ul className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <a 
              href={href} 
              onClick={handleLinkClick}
              onMouseEnter={onLinkEnter} 
              onMouseLeave={onLinkLeave}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}