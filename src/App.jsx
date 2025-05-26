import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { ParallaxProvider } from 'react-scroll-parallax';
import { pageview } from './utils/gtag';

import CursorTrail from './components/cursor/CursorTrail';

import Layout from './pages/Layout';
import NoPage from './pages/NoPage';

import Home from './pages/Home';
import Project from './pages/Project';


import './styles/App.css';



function App() {

  return (
    <ParallaxProvider>
      <CursorTrail />

      <BrowserRouter>

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


function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
}


export default App;
