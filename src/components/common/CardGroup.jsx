import React from 'react';
import { motion } from 'framer-motion';
import './card.css';

const cardContentVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: ({ i, stagger }) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: 'easeOut',
      delay: i * stagger,
    },
  }),
};

const CardGroup = ({ cards = [], stagger = 0, amount = 1 }) => {
  return (
    <div className="card-group">
      {cards.map(({ title = "Title", content = "Content" }, i) => (
        <div key={i} className="card-section">

          <motion.div
            className="card-content"
            variants={cardContentVariants}
            initial="hidden"
            whileInView="visible"
            custom={{ i, stagger }}
            viewport={{ once: true, amount: amount }}
          >
            <h3 className="card-title">{title}</h3>
            <div className="card-body">{content}</div>
          </motion.div>
          
        </div>
      ))}
    </div>
  );
};

export default CardGroup;
