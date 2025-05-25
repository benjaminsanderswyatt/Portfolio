import { useState, useEffect } from 'react';

// Adjust parallax speed based on screen width
const useParallaxSpeed = (baseSpeed) => {
const [speed, setSpeed] = useState(baseSpeed);

  useEffect(() => {
    const calculateSpeed = () => {
      const width = window.innerWidth;

      // Smaller screen gives greater scaling (exponential) (x3 scale cap)
      const scaleFactor = Math.min(1920 / width, 3);

      const scaledSpeed = baseSpeed * scaleFactor;

      setSpeed(scaledSpeed);
    };

    calculateSpeed(); // Initialise

    window.addEventListener('resize', calculateSpeed);

    // Cleanup
    return () => window.removeEventListener('resize', calculateSpeed);
  }, [baseSpeed]);

  return speed;
};

export default useParallaxSpeed;
