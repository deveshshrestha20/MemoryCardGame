import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import ButtonOpen from './ButtonOpen';


const AppComponent = () => {
  const DECK_API_URL = 'https://deckofcardsapi.com/api/deck';
  const NUM_CARDS = 6; // Number of unique cards to fetch
  const [images, setImages] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});
  const [matchedCards, setMatchedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = async () => {
    try {
      const response = await fetch(`${DECK_API_URL}/new/shuffle/?deck_count=1`);
      const data = await response.json();
      const deckId = data.deck_id;

      const drawResponse = await fetch(`${DECK_API_URL}/${deckId}/draw/?count=${NUM_CARDS}`);
      const drawData = await drawResponse.json();
      const fetchedCards = drawData.cards.map(card => card.image);

      const duplicatedCards = [...fetchedCards, ...fetchedCards];
      const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
      setImages(shuffledCards);

      const initialFlippedStates = shuffledCards.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
      }, {});
      setFlippedStates(initialFlippedStates);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (index) => {
    if (flippedStates[index] || selectedCards.length === 2) return;

    const newFlippedStates = { ...flippedStates, [index]: true };
    setFlippedStates(newFlippedStates);

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;
      if (images[firstIndex] === images[secondIndex]) {
        setMatchedCards(prev => [...prev, firstIndex, secondIndex]);
      } else {
        setTimeout(() => {
          setFlippedStates(prev => ({
            ...prev,
            [firstIndex]: false,
            [secondIndex]: false,
          }));
        }, 1000);
      }
      setSelectedCards([]);
    }
  };

  const handleButtonClick = () => {
    setFlippedStates(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key] = true;
      });
      return newState;
    });

    setTimeout(() => {
      setFlippedStates(prev => {
        const newState = { ...prev };
        Object.keys(newState).forEach(key => {
          if (!matchedCards.includes(parseInt(key))) {
            newState[key] = false;
          }
        });
        return newState;
      });
    }, 3000);
  };

  return (
    <div>
      <ButtonOpen handleClick={handleButtonClick} title="Open All Cards" />
      <div className='grid grid-cols-4 gap-2 p-2 place-items-stretch'>
        {isLoading ? (
          <h1>Loading ....</h1>
        ) : (
          images.map((image, index) => (
            <CardComponent
              key={index}
              image={image}
              isFlipped={flippedStates[index] || matchedCards.includes(index)}
              onCardClick={() => handleCardClick(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AppComponent;
