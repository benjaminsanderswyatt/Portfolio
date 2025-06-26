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

const CardGroup = ({ cards = [], stagger = 0, amount = 1, flexDirection = "row" }) => {
  return (
    <div className={`card-group ${flexDirection === "column" ? "is-column" : ""}`}>
      {cards.map(({ title = "", content = "Content" }, i) => (
        <motion.div
          key={i}
          className="card-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 250, damping: 14 }}
        >

          <motion.div
            className="card-content"
            variants={cardContentVariants}
            initial="hidden"
            whileInView="visible"
            custom={{ i, stagger }}
            viewport={{ once: true, amount: amount }}
          >
            {title && <h3 className="card-title">{title}</h3>}
            <div className="card-body">{content}</div>
          </motion.div>
          
        </motion.div>
      ))}
    </div>
  );
};

export default CardGroup;
