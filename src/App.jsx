// src/App.jsx
// Root component — composes all sections and provides cursor context
// to interactive child elements.

import React from 'react';
import { useCursor } from './hooks/useCursor';

import Loader       from './components/Loader';
import Cursor       from './components/Cursor';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Statement    from './components/Statement';
import Work         from './components/Work';
import Services     from './components/Services.jsx';
import OurProcess   from './components/OurProcess';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import About        from './components/About';
import Footer       from './components/Footer';
import AskButton    from './components/AskButton';
import BackgroundGradient from './components/Backgroundgradient.jsx';

export default function App() {
  const { pos, isLarge, enlargeCursor, shrinkCursor } = useCursor();

  return (
    <>
      <BackgroundGradient/>
      {/* Page loader on initial load */}
      <Loader />

      {/* Custom cursor — rendered outside the page flow */}
      <Cursor pos={pos} isLarge={isLarge} />

      {/* Fixed navigation */}
      <Navbar
        onLinkEnter={enlargeCursor}
        onLinkLeave={shrinkCursor}
      />

      {/* Page sections */}
      <main>
        <Hero
          onCardEnter={enlargeCursor}
          onCardLeave={shrinkCursor}
        />

        <Statement />

        <Work
          onItemEnter={enlargeCursor}
          onItemLeave={shrinkCursor}
        />

        <Services
          onEnter={enlargeCursor}
          onLeave={shrinkCursor}
        />

        {/* <OurProcess /> */}

        <Testimonials />
         <About />
        <Contact
          onEnter={enlargeCursor}
          onLeave={shrinkCursor}
        />

       
      </main>

      <Footer />

      {/* Fixed floating CTA */}
      <AskButton
        onEnter={enlargeCursor}
        onLeave={shrinkCursor}
      />
    </>
  );
}
