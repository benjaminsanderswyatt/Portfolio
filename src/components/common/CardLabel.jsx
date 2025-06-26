import React, { useEffect, useRef, useState } from 'react';

import './cardLabel.css';


const CardLabel = ({ children }) => {
  const ref = useRef();
  const [delay, setDelay] = useState('0s');

  useEffect(() => {
    const x = ref.current?.getBoundingClientRect().left || 0;
    const screenWidth = window.innerWidth || 1;
    const delayInSeconds = (x / screenWidth) * 2.5; // 2.5 scaler
    setDelay(`${delayInSeconds.toFixed(2)}s`);
  }, []);

  
  return (
    <span
      ref={ref}
      className="card-label"
      style={{ '--glint-delay': delay }}
    >
      {children}
    </span>
  );
};

export default CardLabel;
