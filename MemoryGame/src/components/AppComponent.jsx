import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import ButtonOpen from './ButtonOpen';

const AppComponent = () => {
  const BASE_URL = 'https://picsum.photos/';
  const NUM_IMAGES = 6;
  const [images, setImages] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = [];
        for (let i = 0; i < NUM_IMAGES; i++) {
          const imageUrl = `${BASE_URL}${200 + i * 50}/${300}`;
          fetchedImages.push(imageUrl);
        }
        const duplicatedImages = [...fetchedImages, ...fetchedImages];
        const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);
        setImages(shuffledImages);
        
        const initialFlippedStates = shuffledImages.reduce((acc, _, index) => {
          acc[index] = false;
          return acc;
        }, {});
        setFlippedStates(initialFlippedStates);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchImages();
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
      <div className='grid grid-cols-3 gap-2 p-4 place-items-stretch'>
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
