import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import ButtonOpen from './ButtonOpen';

const AppComponent = () => {
  const DECK_API_URL = 'https://deckofcardsapi.com/api/deck';
  const NUM_CARDS = 6; // Number of unique cards to fetch
  const [images, setImages] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});

  const fetchCards = async () => {
    try {
      // Fetch a new shuffled deck
      const response = await fetch(`${DECK_API_URL}/new/shuffle/?deck_count=1`);
      const data = await response.json();
      const deckId = data.deck_id;

      // Draw cards from the deck
      const drawResponse = await fetch(`${DECK_API_URL}/${deckId}/draw/?count=${NUM_CARDS}`);
      const drawData = await drawResponse.json();
      const fetchedCards = drawData.cards.map(cards => cards.image);

      // Duplicate and shuffle the cards
      const duplicatedCards = [...fetchedCards, ...fetchedCards];
      const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
      setImages(shuffledCards);

      // Initialize flipped states
      const initialFlippedStates = shuffledCards.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
      }, {});
      setFlippedStates(initialFlippedStates);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (index) => {
    setFlippedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleButtonClick = () => {
    setFlippedStates((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = true;
      });
      return newState;
    });

    setTimeout(() => {
      setFlippedStates((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((key) => {
          newState[key] = false;
        });
        return newState;
      });
    }, 3000);
  };

  return (
    <div>
      <ButtonOpen handleClick={handleButtonClick} title="Open All Cards" />
      <div className='grid grid-cols-4 gap-2 p-2 place-items-stretch  '>
        {images.map((image, index) => (
          <CardComponent
            key={index}
            image={image}
            isFlipped={flippedStates[index]}
            onCardClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AppComponent;
