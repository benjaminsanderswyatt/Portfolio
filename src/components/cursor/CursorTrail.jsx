import React, { useEffect, useRef, useState, useCallback } from "react";
import "./cursorTrail.css";



const CONFIG = {
  TRAIL_COUNT: 20, // Number of circles in the trail
  IDLE_TIMEOUT_MS: 1000, // Time (ms) before idle burst animation
  COLORS: [] // Gets filled in useEffect (edit in colours css variables)
};


// Get the colour css variables and fill the config
const getTrailColors = () => {
  const style = getComputedStyle(document.documentElement);
  const vars = [
    "--trail-1", "--trail-2", "--trail-3", "--trail-4", "--trail-5", "--trail-6"
  ];
  return vars.map(v => style.getPropertyValue(v).trim());
};


const CursorTrail = () => {
  const coords = useRef(null); // Current mouse location
  const circles = useRef([]); // All circle elements
  const animationFrame = useRef(null);
  const idleTimeout = useRef(null);
  const circleSize = useRef(4); // This changes based on css size
  const [isIdle, setIsIdle] = useState(false);

  // Sets idle toggling burst animation
  const setIdle = useCallback((idle) => {
    setIsIdle(prev => {
      if (prev === idle) return prev;
      applyClassToCircles("burst", idle);
      return idle;
    });
  }, []);


  // Resets the idle timer (when the mouse moves)
  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => setIdle(true), CONFIG.IDLE_TIMEOUT_MS);
  }, [setIdle]);


  // Handles adding and removing the classes to the trail
  const applyClassToCircles = (className, add) => {
    circles.current.forEach(circle => {
      circle?.classList.toggle(className, add);
    });
  };

  // Sets all circles to the same coords (used on first move)
  const updateCircleLocations = (x, y) => {
    circles.current.forEach((circle) => {
      if (!circle) 
        return;

      circle.style.left = `${x - circleSize.current}px`;
      circle.style.top = `${y - circleSize.current}px`;
      circle.x = x;
      circle.y = y;
      circle.style.opacity = 0.9;
    });
  };





  useEffect(() => {
    CONFIG.COLORS = getTrailColors();


    // Set the circle size based on css size
    if (circles.current[0]) {
      const rect = circles.current[0].getBoundingClientRect();
      circleSize.current = rect.width / 2;
    }

    // Update trail coords
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      if (!coords.current) {
        coords.current = { x, y };
        updateCircleLocations(x, y); // Set initial position
        return;
      }

      coords.current = { x, y };

      // Handle idle state
      if (isIdle) 
        setIdle(false);
      resetIdleTimer(); // Reset when mouse move
    };


    // Handle click animation
    const handleClick = (e) => {
      const { clientX: x, clientY: y } = e;
      coords.current = { x, y };

      setIdle(false);
      resetIdleTimer();

      circles.current.forEach((circle) => {
        if (!circle) 
          return;

        circle.classList.remove("burst");
        circle.classList.add("clicked");
        updateCircleLocations(x, y); // Reset position
        setTimeout(() => circle.classList.remove("clicked"), 300); // Remove animation after use
      });
    };

    // Handle mouse leaving screen (trigger idle burst)
    const handleMouseOut = (e) => {
      if (!e.relatedTarget) {
        coords.current = null;
        setIdle(true);
      }
    };


    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseout", handleMouseOut);

    // Initial circle styling
    circles.current.forEach((circle, i) => {
      if (!circle) 
        return;

      circle.style.zIndex = CONFIG.TRAIL_COUNT - i + 100000; // 1st item is infront
      circle.style.opacity = "0";
      circle.style.backgroundColor = CONFIG.COLORS[i % CONFIG.COLORS.length];
    });


    // Animation loop
    const animate = () => {
      if (!coords.current || isIdle) {
        animationFrame.current = requestAnimationFrame(animate);
        return;
      }

      let { x, y } = coords.current;

      circles.current.forEach((circle, i) => {
        if (!circle || circle.classList.contains("burst")) 
          return;

        circle.style.transition = "none";
        circle.style.left = `${x - circleSize.current}px`;
        circle.style.top = `${y - circleSize.current}px`;
        circle.style.scale = (CONFIG.TRAIL_COUNT - i) / CONFIG.TRAIL_COUNT;
        circle.style.opacity = `${1 - i / CONFIG.TRAIL_COUNT}`;
        circle.x = x;
        circle.y = y;

        // Transfer movement down the trail
        const next = circles.current[i + 1];
        if (next) {
          x += (next.x - x) * 0.3;
          y += (next.y - y) * 0.3;
        }
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrame.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame.current);
      clearTimeout(idleTimeout.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isIdle, resetIdleTimer, setIdle]);


  
  return (
    <>
      {Array.from({ length: CONFIG.TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="circle"
          ref={(el) => (circles.current[i] = el)}
          style={{
            "--rand-x": `${Math.random() * 2 - 1}`,
            "--rand-y": `${Math.random() * 2 - 1}`
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
