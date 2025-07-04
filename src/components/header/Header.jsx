import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';

import './header.css';

import { SOCIAL_LINKS } from '../../data/socials';

const CONFIG = {
  MAX_HEADER_OPACITY: 0.6, // Opacity of header (after hero)
  NAV_ITEMS: [ // Navbar items links to page sections
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  SCROLL_OFFSET_FACTOR: 0.5, // Trigger point for activating section
};



const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false); // Small screen menu toggle
  const [opacity, setOpacity] = useState(0); // Transparency for header
  const [activeSection, setActiveSection] = useState('');


  useEffect(() => {

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;

      // Change header transparency based on scroll
      setOpacity(Math.min(scrollY / maxScroll, 1) * CONFIG.MAX_HEADER_OPACITY);

      // Find active section based on scroll position
      const scrollPos = scrollY + window.innerHeight * CONFIG.SCROLL_OFFSET_FACTOR;
      let currentSection = '';

      for (const item of CONFIG.NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPos) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  // Close burger menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);


  // Get css variables for header colours
  const rgb =
    getComputedStyle(document.documentElement).getPropertyValue('--header-rgb') || '255, 255, 255';
  const borderRgb =
    getComputedStyle(document.documentElement).getPropertyValue('--border-rgb') || '0, 0, 0';


  // Scroll to the section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) 
      section.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigate to the section
  const handleSectionNavigation = (sectionId) => {
    if (location.pathname !== '/') { // Home page
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
    setMenuOpen(false); // Close menu after item clicked
  };


  return (
    <header
      className="header"
      style={{
        backgroundColor: `rgba(${rgb}, ${menuOpen ? CONFIG.MAX_HEADER_OPACITY : opacity})`,
        backdropFilter: menuOpen ? 'blur(10px)' : `blur(${opacity / CONFIG.MAX_HEADER_OPACITY * 10}px)`,
        boxShadow: (menuOpen || opacity > 0.1) ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        borderBottom: `1px solid rgba(${borderRgb}, ${menuOpen ? 0.3 : opacity})`,
      }}
    >

      <div className="header-social-links">

        {SOCIAL_LINKS.map((link) => ( // Display all social links in data

          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={link.iconFile}
              alt={link.name}
              className="header-social-icon"
              width={link.width}
              height={link.height}
              loading="lazy"
              decoding="sync"
            />
          </a>

        ))}

      </div>


      <div className="nav-container" ref={menuRef}>
        <button
          className={`nav-menu-button ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls='nav-menu'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          type='button'
        >
          <img
            src="/images/icons/burger.svg"
            alt={menuOpen ? 'Close menu' : 'Menu'}
            className="nav-burger-icon"
            width={45}
            height={36}
            loading="lazy"
            decoding="sync"
          />
        </button>

        <nav id="nav-menu" className={`nav-menu ${menuOpen ? 'open' : ''}`} role='navigation' aria-label='Primary navigation'>
          {CONFIG.NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'selected' : ''}`}
              onClick={() => handleSectionNavigation(item.id)}
              type='button'
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      
    </header>
  );
};

export default Header;
