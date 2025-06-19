import React, { useMemo, memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

import "./animatedDivider.css";

// Gives a random starting location for the orbit
const randomRotation = () => Math.floor(Math.random() * 360);


const Orbit = memo(({ className, startRotation, duration, planetClassName, inView }) => (
    
    <motion.div
        className={`orbit ${className}`}
        initial={{ rotate: startRotation }}
        animate={inView ? { rotate: startRotation + 360 } : false } // Only animate when visable
        transition={inView ? { duration, repeat: Infinity, ease: "linear" } : {} }
    >

        <div className={`planet ${planetClassName}`} />

    </motion.div>
));



const AnimatedDivider = () => {
    // Gives the random rotation
    const startRotations = useMemo(() => [randomRotation(), randomRotation(), randomRotation()], []);
    
    // Check if in view
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: false, amount: 0.3 });


     return (
        <div 
            ref={containerRef} 
            className="divider-container" 
            aria-hidden="true" 
            role="presentation"
        >
            
            {/* Line */}
            <motion.div
                className="divider-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            />

                {/* Sun */}
                <motion.div 
                    className="divider-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                >
                <motion.div className="central-star"/>



                {/* Orbits */}
                <Orbit
                    className="orbit-1"
                    startRotation={startRotations[0]}
                    duration={20}
                    planetClassName="planet-1"
                    inView={inView}
                />

                <Orbit
                    className="orbit-2"
                    startRotation={startRotations[1]}
                    duration={35}
                    planetClassName="planet-2"
                    inView={inView}
                />

                <Orbit
                    className="orbit-3"
                    startRotation={startRotations[2]}
                    duration={50}
                    planetClassName="planet-3"
                    inView={inView}
                />

            </motion.div>

        </div>
    );
};

export default AnimatedDivider;
