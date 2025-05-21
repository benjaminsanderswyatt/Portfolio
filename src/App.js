import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";

import { ThemeProvider, useTheme } from './contexts/ThemeContext';


import Layout from './pages/Layout';
import NoPage from './pages/NoPage';

import Home from './pages/Home';
import Project from './pages/Project';


import './styles/App.css';



function App() {
  const { theme } = useTheme();

  // Set the theme from ThemeContext useTheme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
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
  );
}

// Wrap app in the theme and export that as the new app
const AppWithTheme = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithTheme;
