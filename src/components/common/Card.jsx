import React from 'react';
import { motion } from 'framer-motion';

import './card.css';

const cardVariants = {
  hidden: { x: '-100%', opacity: 1 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 1.1, ease: 'easeOut' }
  }
};

const Card = ({ 
        amount = 1,
        title = "title",
        content
    }) => {
  
    return (
        <div className="card-section">
            <motion.div
                className="card-content"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: amount }}
            >

                <h3 className="card-title">{title}</h3>

                <div className="card-body">
                    {content}
                </div>

            </motion.div>
        </div>
    );
};

export default Card;
