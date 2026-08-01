// src/components/About.jsx
// Bio and skills list section — offset 2x2 grid with image placeholders.

import React from 'react';
import '../styles/About.css';
import ParallaxImage from './ParallaxImage';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__grid__top">

        {/* Top-left — heading + bio */}
        <div className="about__block about__text about__text--one">
          <h2 className="about__title">About</h2>
          <p className="about__bio">
           <strong>InkFrame</strong>, is a <strong>multidisciplinary creative company</strong> <br />based in <strong>Mumbai-India</strong>, bringing together designers, <br />artists, and <strong>creative thinkers</strong> who specialize in delivering <br /><strong>end-to-end visual solutions</strong> tailored to your unique vision. 
           <br />We help ambitious brands <strong>look premium, launch confidently, and communicate strongly</strong> through design, motion, 3D, and storytelling
            <br />
            <br />
            InkFrame was built on the belief that great design <br />isn't invented—it's discovered.  <strong>It's hidden in ideas, <br />moments, and the beauty of everyday chaos.</strong> <br />Our role is to uncover it, frame it, and transform <br />it into meaningful experiences for <strong>the right audience, <br />at the right time, and with the right purpose.</strong>
          </p>
        </div>

        {/* Top-right — image */}
        <div className="about__block about__image about__image--one">
            <ParallaxImage src="/Assets/Image/About.png" alt="About" />
        </div>

      </div>
        <div className="about__grid__bottom">

        {/* Bottom-left — image */}
        <div className="about__block about__image about__image--two">
            <img src="/Assets/Image/Founder_Pankaj.jpg" alt="Founder Pankaj Vishwakarma" style={{width: "100%", height: "auto"}}/>
        </div>

        {/* Bottom-right — heading + bio */}
        <div className="about__block about__text about__text--two">
          <h2 className="about__title">Behind InkFrame</h2>
          <p className="about__bio">
            <strong>Hi, I'm Pankaj Vishwakarma, the Founder & Creative Head of InkFrame,</strong>{' '}
            <br />
            <br />
            My journey began with <strong>sketching,</strong> driven by <strong>curiosity</strong> and a passion for turning ideas into meaningful visuals. <br />Over the years, that passion has evolved into creating social campaigns, motion graphics, 3D visuals, <br />and many more  experiences that don't just look good—they <strong>communicate with purpose.</strong>
            <br />
            <br />
            One question guides every project I take on: <strong>"Does this solve the brand's problem?"</strong>{' '}
             <br />That mindset shapes every decision I make. I believe great design is built through storytelling, attention to detail, <br />emotion, and precision. It's not just about creating visually appealing work—it's about crafting experiences <br />that connect with people, build trust, and deliver real value.
             
            <br />
            <br />
            Having worked with creative agencies and collaborated with brands across <strong>diverse industries,</strong> <br />Every collaboration is driven by creativity, strategy, and precision, with one goal in mind: creating work <br />that is not only beautiful but also <strong>meaningful, memorable, and effective.</strong> 
            <br />
            <br />
            I’m building InkFrame with a simple vision: <strong>to grow alongside the people and brands I work with.</strong>
          </p>
        </div>

      </div>
    </section>
  );
}