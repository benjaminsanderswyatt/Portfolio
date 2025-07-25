import React, { useEffect, Suspense, lazy, memo } from 'react';
import { useLocation } from 'react-router';

import './home.css';

//import StarrySky from '../components/starrySky/StarrySky';
import Hero from '../components/sections/Hero';
// import About from '../components/sections/About';
// import Skills from '../components/sections/Skills';
// import Projects from '../components/sections/Projects';
// import Contact from '../components/sections/Contact';



// Placeholder component
import SectionPlaceholder from '../components/common/placeholders/SectionPlaceholder';



// Lazy load
const LazyStarrySky = lazy(() => import('../components/starrySky/StarrySky'));

const LazySolarDivider = lazy(() => import('../components/common/dividers/SolarDivider'));
const LazyHelixDivider = lazy(() => import('../components/common/dividers/HelixDivider'));
const LazyWaveDivider = lazy(() => import('../components/common/dividers/WaveDivider'));

// Lazy load sections
const LazyAbout = lazy(() => import('../components/sections/About'));
const LazySkills = lazy(() => import('../components/sections/Skills'));
const LazyProjects = lazy(() => import('../components/sections/Projects'));
const LazyContact = lazy(() => import('../components/sections/Contact'));




const Home = () => {
  const location = useLocation();

  
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      let retryCount = 0;
      const maxRetries = 10;
      
      const scrollToSection = () => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState({}, document.title, window.location.pathname);
          return true;
        }
        return false;
      };

      // Initial try
      if (!scrollToSection()) {
        // Retry if section not loaded yet
        const retryInterval = setInterval(() => {
          if (scrollToSection() || retryCount >= maxRetries) {
            clearInterval(retryInterval);
          }
          retryCount++;
        }, 300);
      }
    }
  }, [location]);





  return (
    <>
      <Suspense fallback={null}>
        <LazyStarrySky />
      </Suspense>
      
      <main>
          {/* Critical (not lazy load) */}
          <Hero />


          {/* About section */}
          <Suspense fallback={<SectionPlaceholder height="115vh" />}>
            <LazyAbout />
            
            {/* Sub lazy divider */}
            <Suspense fallback={null}>
              <LazySolarDivider />
            </Suspense>
          </Suspense>
          

          {/* Skills section */}
          <Suspense fallback={<SectionPlaceholder height="80vh" />}>
            <LazySkills />
            
            {/* Sub lazy divider */}
            <Suspense fallback={null}>
              <LazyHelixDivider />
            </Suspense>
          </Suspense>





          <Suspense fallback={<SectionPlaceholder height="140vh" />}>
            <LazyProjects />

            {/* Sub lazy divider */}
            <Suspense fallback={null}>
              <LazyWaveDivider />
            </Suspense>
          </Suspense>


          <Suspense fallback={<SectionPlaceholder height="65vh" background='transparent' />}>
            <LazyContact />
          </Suspense>

         


      </main>
    </>
  );
};

export default memo(Home);
