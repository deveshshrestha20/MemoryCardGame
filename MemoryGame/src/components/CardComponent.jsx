import React, { useState } from "react";
import ButtonOpen from "./ButtonOpen";

const pokerCardURL = "https://img.pikbest.com/background/20220119/business-black-card-background_6219113.jpg!bw700";



const CardComponent = ({ image }) => {

  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
     
  };

  return (
    <div>
      
    <div
      className="flex justify-center items-center  h-40  w-full cursor-pointer"
      onClick={handleCardClick}
    >
      {isFlipped ? (
        <img
          src={pokerCardURL}
          alt="Cover"
          className="h-40 w-full object-cover rounded-md"
        />
      ) : (
        <img
          src={image}
          alt="Random Image"
          className="h-40 w-full object-cover rounded-md"
        />
      )}
      
    </div>
    </div>

  );
};

export default CardComponent;