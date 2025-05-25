import React from 'react';
import './cardGroup.css';

const CardGroup = ({ cards }) => {
  return (
    <div className="card-group">

      {cards.map((card, i) => (
        <div className="card" key={i}>

          <h3>{card.title}</h3>
          <p>{card.description}</p>
          {card.link && <a href={card.link}>Learn More</a>}
          
        </div>
      ))}

    </div>
  );
};

export default CardGroup;
