// Generate random star positions
export const generateStars = (count, vw, vh, MIN_STAR_RADIUS, MAX_STAR_RADIUS) => {

  return Array.from({ length: count }, () => ({
    cx: Math.floor(Math.random() * vw), // x pos
    cy: Math.floor(Math.random() * vh), // y pos
    r: Math.random() * (MAX_STAR_RADIUS - MIN_STAR_RADIUS) + MIN_STAR_RADIUS, // Circle radius
  }));

};

