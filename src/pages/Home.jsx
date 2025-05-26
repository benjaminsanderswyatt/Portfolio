import React, { useEffect } from 'react';
import { useLocation } from 'react-router';


import StarrySky from '../components/starrySky/StarrySky';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

import './home.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);


  return (
    <>
      <StarrySky />
      <main>
          <Hero />
          

          <About />
          <Skills />
          <Projects />
          <Contact />


      </main>
    </>
  );
};

export default Home;
