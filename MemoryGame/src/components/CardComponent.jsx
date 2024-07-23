import React from 'react';

const pokerCardURL = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/780ab845019003.56078fc34c594.jpg";

const CardComponent = ({ image, isFlipped, onCardClick }) => {
  return (
    <div
      className="flex justify-center items-center h-56 w-44 cursor-pointer  "
      onClick={onCardClick}
    >
      {!isFlipped ? (
        <img
          src={pokerCardURL}
          alt="Cover"
          className="h-56 w-44 object-fill rounded-md "
        />
      ) : (
        <img
          src={image}
          alt="Random Image"
          className="h-56 w-44 object-fill rounded-md"
        />
      )}
    </div>
  );
};

export default CardComponent;
