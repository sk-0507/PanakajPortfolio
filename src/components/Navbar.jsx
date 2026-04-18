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
    { href: '#process', label: 'Process' },
    { href: '#testimonials', label: 'Clients' },
    { href: '#contact', label: 'Contact' },
    { href: '#about', label: 'About' },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${isVisible ? '' : ' navbar--hidden'}`}>
      <span className="navbar__logo">
        <a href='#hero' onClick={handleLinkClick} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
          StrokeFrames
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

      {/* Mobile Menu - Always rendered but hidden with CSS */}
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
    </nav>
  );
}
