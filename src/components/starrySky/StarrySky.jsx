import React, { useEffect, useRef, useState } from 'react';

import { generateStars } from './starsData';

import './starry-sky.css';

const CONFIG = {
  STAR_COUNT: 80,
  MIN_STAR_RADIUS: 0.8,
  MAX_STAR_RADIUS: 1.6,
  MIN_ANIMATION_DELAY_MS: 0,
  MAX_ANIMATION_DELAY_MS: 2000,
  MIN_ANIMATION_DURATION_MS: 3000,
  MAX_ANIMATION_DURATION_MS: 8000,
};


const StarrySky = ({ starCount = CONFIG.STAR_COUNT }) => {
  const [dimensions, setDimensions] = useState({ vw: window.innerWidth, vh: window.innerHeight }); // Screen dimention changes
  const [stars, setStars] = useState([]); // All of the stars
  const skyRef = useRef(null);

  // Generate stars (redo on screen size change)
  useEffect(() => {
    const { vw, vh } = dimensions;
    setStars(generateStars(starCount, vw, vh, CONFIG.MIN_STAR_RADIUS, CONFIG.MAX_STAR_RADIUS));
  }, [dimensions, starCount]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ vw: window.innerWidth, vh: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <svg id="sky" ref={skyRef} aria-hidden="true">
      {stars.map((star, i) => {
        // Each star has random animation delay and duration
        const delay = Math.random() * CONFIG.MAX_ANIMATION_DELAY_MS;
        const duration = CONFIG.MIN_ANIMATION_DURATION_MS + Math.random() * (CONFIG.MAX_ANIMATION_DURATION_MS - CONFIG.MIN_ANIMATION_DURATION_MS);

        return (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            className="star"
            style={{
              animationDelay: `${delay}ms`,
              animationDuration: `${duration}ms`,
            }}
          />
        );
      })}
    </svg>
  );
};

export default StarrySky;