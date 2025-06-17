import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router';


//import StarrySky from '../components/starrySky/StarrySky';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
//import Skills from '../components/sections/Skills';
//import Projects from '../components/sections/Projects';
//import Contact from '../components/sections/Contact';

import './home.css';


// Lazy load
const LazyStarrySky = lazy(() => import('../components/starrySky/StarrySky'));

const LazyAnimatedDivider = lazy(() => import('../components/common/AnimatedDivider'));

const LazyAbout = lazy(() => import('../components/sections/About'));
const LazySkills = lazy(() => import('../components/sections/Skills'));
const LazyProjects = lazy(() => import('../components/sections/Projects'));
const LazyContact = lazy(() => import('../components/sections/Contact'));


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
      <Suspense fallback={null}>
        <LazyStarrySky />
      </Suspense>
      
      <main>
          <Hero />
          

          <Suspense fallback={null}>
            <LazyAbout />
          </Suspense>
          
          {/* Lazy load Animated Divider */}
          <Suspense fallback={null}>
            <LazyAnimatedDivider />
          </Suspense>





          <Suspense fallback={null}>
            <LazySkills />
          </Suspense>

          <Suspense fallback={null}>
            <LazyProjects />
          </Suspense>

          <Suspense fallback={null}>
            <LazyContact />
          </Suspense>


      </main>
    </>
  );
};

export default Home;
