import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { ParallaxProvider } from 'react-scroll-parallax';
import { useGoogleAnalytics, GA_TRACKING_ID } from './hooks/useGoogleAnalytics';

// import CursorTrail from './components/cursor/CursorTrail';

import Layout from './pages/Layout';
import NoPage from './pages/NoPage';

import Home from './pages/Home';
import Project from './pages/Project';


import './styles/App.css';



function App() {
  // Initialise google analytics
  useGoogleAnalytics();

  return (
    <ParallaxProvider>
      {/* <CursorTrail /> */}

      <BrowserRouter>

        {/* Component to track page route changes */}
        <RouteChangeTracker />

        <Routes>
          <Route path="/" element={<Layout />}>

            {/* Default route */}
            <Route index element={<Home />} />

            {/* Project Pages */}
            <Route path="project" element={<Project />}/>


            {/* Catch all invalid routes (404) */}
            <Route path="*" element={<NoPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </ParallaxProvider>
  );
}


// Component to track route changes for google analytics
function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}


export default App;
