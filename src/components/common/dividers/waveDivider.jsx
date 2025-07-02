import React from "react";

import "./waveDivider.css";

const WaveDivider = () => {
    
     return (
        <div
            className="wave-wrapper"
            aria-hidden="true" 
            role="presentation"
        >
           
        <img 
            className='wave-divider'
            src="/images/wave.svg"
            width={1920} 
            height={150}
        />


        </div>
    );
};

export default WaveDivider;
