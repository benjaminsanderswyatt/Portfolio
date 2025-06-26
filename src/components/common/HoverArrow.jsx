import React from 'react';

import './hoverArrow.css';


const HoverArrow = () => {
  return (
    <div className="hover-visual-cue" aria-hidden="true">

      <div className="hover-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="arrow"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 8L6 14H18L12 8Z" fill="currentColor" />
        </svg>
      </div>
      
    </div>
  );
};

export default HoverArrow;
