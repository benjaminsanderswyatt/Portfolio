import React from 'react';


import StarrySky from '../components/starrySky/StarrySky';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

import './home.css';

const Home = () => {
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
