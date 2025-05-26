import React from 'react';

import { Parallax } from 'react-scroll-parallax';
import useParallaxSpeed from '../../hooks/parallaxSpeed';

import './hero.css';


const Hero = () => {
  
  const moonSpeed = useParallaxSpeed(-300);
  const backSpeed = useParallaxSpeed(-10);
  const midSpeed = useParallaxSpeed(-5);
  const frontSpeed = useParallaxSpeed(0);

  return (
    <section id='hero' className='section hero-section'>
      <div className="hero-visuals">

        {/* Moon */}
        <Parallax speed={moonSpeed} className="svg-item layer-moon">
          <img 
            src="/images/moonv2.svg" 
            alt="Layer moon" 
            width={336} 
            height={336} 
            loading="eager" // Prioritised load
          />
          <h1>Benjamin<br />Sanders-Wyatt</h1>
        </Parallax>


        {/* Mountains */}

        <Parallax speed={backSpeed} className="svg-item layer-mountain mountain-back">
            <img 
              src="/images/mountain/back-mid.svg" 
              alt="Layer mountain" 
              width={1920} 
              height={925} 
            />
        </Parallax>

        <Parallax speed={midSpeed} className="svg-item layer-mountain mountain-middle">
            <img 
              src="/images/mountain/middle-mid.svg" 
              alt="Layer mountain" 
              width={1920} 
              height={759} 
            />
        </Parallax>

        <Parallax speed={frontSpeed} className="svg-item layer-mountain mountain-front">
          <img 
            src="/images/mountain/front-mid.svg" 
            alt="Layer mountain" 
            width={1920} 
            height={757} 
            loading="eager" // Prioritised load
          />
        </Parallax>





      </div>

      
    
    </section>
  );
};

export default Hero;
