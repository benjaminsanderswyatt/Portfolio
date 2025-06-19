import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue } from "framer-motion";

import "./solarDivider.css";
import "./helixDivider.css";

const CONFIG = {
  EARTH_SPEED: 0.8, // Speed of the earth
  MOON_ORBIT_RADIUS: 32, // Radius of the moons orbit
  MOON_ORBIT_SPEED: 0.045, // Speed of moons orbit
  TRAIL_FADE_START: 0.8, // Trails fade of %
  BASE_TRAIL_WIDTH: 3, // Base width of trail
  PERSPECTIVE_SCALE_RANGE: 0.7, // Trail scale of orbit perspective (close orbit is bigger...)

  BASE_TRAIL_LENGTH: 500, // Base length for 1920px
  MIN_TRAIL_LENGTH: 200, // Min trail length
  MAX_TRAIL_LENGTH: 800, // Max trail length

  FADE_IN: 0.1, // Fade in starts at 10%
  FADE_OUT: 0.9, // Fade out starts at 90%
};

const EarthMoonHelixDivider = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Dimensions of container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const trailRef = useRef([]);
  const maxTrailPointsRef = useRef(CONFIG.BASE_TRAIL_LENGTH);
  const positionRef = useRef({ earthX: 0, orbitAngle: Math.PI });
  
  // Motion values for Earth and Moon
  const earthX = useMotionValue(0);
  const earthOpacity = useMotionValue(0);
  const moonX = useMotionValue(0);
  const moonY = useMotionValue(0);
  const moonScale = useMotionValue(1);
  const moonOpacity = useMotionValue(0);
  const moonZIndex = useMotionValue(5); // Whether moon is infront/behind earth in orbit

  // Track if visable
  const inView = useInView(containerRef, {
    once: false,
    amount: 0.3,
    margin: "100px"
  });

  

  useEffect(() => {
    const updateDimensions = () => {

      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;


        setDimensions((prev) => {
          if (prev.width !== width || prev.height !== height) { // Only update is changed
            // Change max trail based on width
            maxTrailPointsRef.current = Math.min(
              CONFIG.MAX_TRAIL_LENGTH,
              Math.max(
                CONFIG.MIN_TRAIL_LENGTH,
                Math.round(CONFIG.BASE_TRAIL_LENGTH * (width / 1920))
              )
            );

            // Resize canvas
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.width = width;
              canvas.height = height;
            }

            return { width, height };
          }
          return prev;
        });
      }
    };


    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions); // Cleanup
  }, []);




  // Calc fade
  const getFadeFactor = useCallback((x) => {
    if (!dimensions.width) return 1;

    const progress = x / dimensions.width;

    if (progress < CONFIG.FADE_IN) { // Fading in increase opacity
      return Math.pow(progress / CONFIG.FADE_IN, 0.5);
    }

    if (progress > CONFIG.FADE_OUT) { // Fading out decrease opacity
      return 1 - Math.pow((progress - CONFIG.FADE_OUT) / (1 - CONFIG.FADE_OUT), 0.5);
    }

    return 1; // Fully visable
  }, [dimensions.width]);



  // Draw trail on canvas
  const drawTrail = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) 
      return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const trail = trailRef.current;
    if (trail.length < 2) 
      return;

    const centerY = dimensions.height / 2;

    // Draw line through the trail points
    for (let i = 1; i < trail.length; i++) {
      const point = trail[i];
      const prevPoint = trail[i - 1];
      const progress = i / trail.length;

      // Calc fade based on position of points
      const fadeA = getFadeFactor(prevPoint.x);
      const fadeB = getFadeFactor(point.x);
      const positionFade = Math.min(fadeA, fadeB);

      let opacity = 0.7 * positionFade;

      if (progress < CONFIG.TRAIL_FADE_START) {
        const fadeProgress = progress / CONFIG.TRAIL_FADE_START;
        opacity *= Math.pow(fadeProgress, 3);
      }

      // Scale line width based on perspective of orbit
      const perspectiveScale = 1 - CONFIG.PERSPECTIVE_SCALE_RANGE * prevPoint.depthFactor;
      const lineWidth = CONFIG.BASE_TRAIL_WIDTH * (0.3 + 0.7 * progress) * perspectiveScale;

      // Get and set line colour
      const rootStyles = getComputedStyle(document.documentElement);
      const trailRGB = rootStyles.getPropertyValue('--moon-trail-color').trim() || "180, 200, 255";
      ctx.strokeStyle = `rgba(${trailRGB}, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';

      // Draw line segment
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, centerY + prevPoint.y);
      ctx.lineTo(point.x, centerY + point.y);
      ctx.stroke();
    }
  }, [dimensions.height, getFadeFactor]);


  // Animation loop
  useAnimationFrame(() => {
    if (!dimensions.width || !dimensions.height || !inView) { // Skip animation 
      earthOpacity.set(0);
      moonOpacity.set(0);
      return;
    }
    
    const { earthX: currentX, orbitAngle } = positionRef.current;

    let newEarthX = currentX + CONFIG.EARTH_SPEED; // Move earth
    const newOrbitAngle = orbitAngle + CONFIG.MOON_ORBIT_SPEED; // Update moon angle
    
    // Wrap around when Earth goes outside container
    if (newEarthX > dimensions.width + 50) {
      newEarthX = -50;
    }
    
    positionRef.current.earthX = newEarthX;
    positionRef.current.orbitAngle = newOrbitAngle;
    
    // Calc moons vertical
    const moonOffsetY = Math.cos(newOrbitAngle) * CONFIG.MOON_ORBIT_RADIUS;
    // Calc moon depth for perspective
    const depthFactor = (Math.sin(newOrbitAngle) + 1) / 2;

    const isBehind = Math.sin(newOrbitAngle) < 0;
    // Calc moon size based on orbit perspective
    const moonScaleValue = 0.7 + depthFactor * 0.5;
    // Calc fade in/off
    const fadeFactor = getFadeFactor(newEarthX);
    
    // Update Earth motion values
    earthX.set(newEarthX);
    earthOpacity.set(fadeFactor);
    
    // Update Moon motion values
    moonX.set(newEarthX);
    moonY.set(moonOffsetY);
    moonScale.set(moonScaleValue);
    moonOpacity.set(fadeFactor);
    moonZIndex.set(isBehind ? 3 : 5);
    
    // Add to trail
    trailRef.current.push({
      x: newEarthX + 3, // Offset to start trail under the moon
      y: moonOffsetY,
      depthFactor,
      scale: moonScaleValue,
      isBehind
    });
    
    // Limit trail length
    if (trailRef.current.length > maxTrailPointsRef.current) {
      trailRef.current.shift();
    }
    
    drawTrail();
  });

  return (
    <div className="helix-divider-holder">
      <div 
        ref={containerRef} 
        className="earth-moon-helix-divider"
        aria-hidden="true" 
        role="presentation"
      >
        {/* Line */}
        <motion.div
          className="divider-line divider-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Canvas for trail */}
        <canvas 
          ref={canvasRef} 
          className="moon-trail-canvas"
        />
        
        {/* Earth */}
        <motion.div 
          className="earth" 
          style={{ 
            x: earthX, 
            opacity: earthOpacity 
          }} 
        />
        
        {/* Moon */}
        <motion.div 
          className="moon" 
          style={{ 
            x: moonX, 
            y: moonY, 
            scale: moonScale, 
            opacity: moonOpacity, 
            zIndex: moonZIndex 
          }} 
        />
      </div>
    </div>
  );
};

export default EarthMoonHelixDivider;
