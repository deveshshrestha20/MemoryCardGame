import React from 'react';
import '../Card/card.css'; // Ensure the correct path to card.css

const pokerCardURL = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/780ab845019003.56078fc34c594.jpg";

const CardComponent = ({ image, isFlipped, onCardClick }) => {
  const cardInnerStyle = {
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  return (
    <div className="card h-44 w-32 cursor-pointer" onClick={onCardClick}>
      <div className="card-inner" style={cardInnerStyle}>
        <div className="card-front flex justify-center items-center h-44 w-32">
          <img
            src={pokerCardURL}
            alt="Cover"
            className="h-44 w-32 object-fill rounded-md"
          />
        </div>
        <div className="card-back flex justify-center items-center h-44 w-32">
          <img
            src={image}
            alt="Random Image"
            className="h-44 w-32 object-fill rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
