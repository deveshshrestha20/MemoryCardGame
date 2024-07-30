import React, { useEffect, useState, useRef } from "react";
import CardComponent from "./Card/CardComponent";
import ButtonOpen from "./ButtonOpen";
import GuessCounter from "./GuessCounter";
import CountdownTimer from "./CountdownTimer";
import Confetti from "react-confetti";
import ModalComponent from "./ModalComponent";
import Loader from "./Loader";
import start from "../assets/start.wav"
import "bootstrap/dist/css/bootstrap.min.css";

const AppComponent = () => {
  const DECK_API_URL = "https://deckofcardsapi.com/api/deck";
  const NUM_CARDS = 6; // Number of unique cards to fetch
  const MAX_GUESSES = 10; // Maximum number of guesses allowed
  const [images, setImages] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});
  const [matchedCards, setMatchedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [guesses, setGuesses] = useState(0);
  const [countTimer, setCountTimer] = useState(40);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const timerId = useRef(null);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  

  const startSound = () => {
    new Audio(start).play()
  }

  const startTimer = () => {
    setIsTimerStarted(true);
    timerId.current = setInterval(() => {
      setCountTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerId.current);
          setShowModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(`${DECK_API_URL}/new/shuffle/?deck_count=1`);
      const data = await response.json();
      const deckId = data.deck_id;

      const drawResponse = await fetch(
        `${DECK_API_URL}/${deckId}/draw/?count=${NUM_CARDS}`
      );
      const drawData = await drawResponse.json();
      const fetchedCards = drawData.cards.map((card) => card.image);

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
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (matchedCards.length === images.length && images.length > 0) {
      setShowConfetti(true);
      setShowModal2(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [matchedCards, images.length]);

  const handleCardClick = (index) => {
    if (
      !gameStarted ||
      flippedStates[index] ||
      selectedCards.length === 2 ||
      guesses >= MAX_GUESSES ||
      !isTimerStarted
    )
      return;

    const newFlippedStates = { ...flippedStates, [index]: true };
    setFlippedStates(newFlippedStates);

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setGuesses((prevGuesses) => {
        const updatedGuesses = prevGuesses + 1;
        if (updatedGuesses >= MAX_GUESSES) {
          clearInterval(timerId.current);
          setShowModal3(true);
        }
        return updatedGuesses;
      });

      const [firstIndex, secondIndex] = newSelectedCards;
      if (images[firstIndex] === images[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      } else {
        setTimeout(() => {
          setFlippedStates((prev) => ({
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
    startSound()
    setGameStarted(true);
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
          if (!matchedCards.includes(parseInt(key))) {
            newState[key] = false;
          }
        });
        return newState;
      });
      
    }, 3000);
    
    startTimer();
  };

  const handleRestart = () => {
    setCountTimer(40);
    setShowModal(false);
    setShowModal2(false);
    setShowModal3(false);
    setMatchedCards([]);
    setSelectedCards([]);
    setGameStarted(false);
    setGuesses(0);
    setIsTimerStarted(false);
    setIsLoading(true);
    setShowConfetti(false);
    fetchCards();
    stopTimer();
  };

  return (
    <div className="relative flex h-screen w-screen bg-bgImage bg-cover justify-center items-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader />
        </div>
      )}

      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {showModal && (
        <ModalComponent
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            stopTimer();
          }}
          handleRestart={handleRestart}
          title="Time's Up!🕔"
          body="You ran out of time. Would you like to try again?"
          clearTime={stopTimer}
        />
      )}

      {showModal2 && (
        <ModalComponent
          show={showModal2}
          handleClose={() => setShowModal2(false)}
          handleRestart={handleRestart}
          title="Congratulations! 🎉🎉🎉🏆"
          body="You've matched all the cards! Would you like to play again?"
          clearTime={stopTimer}
        />
      )}

      {showModal3 && (
        <ModalComponent
          show={showModal3}
          handleClose={() => {
            setShowModal3(false);
            stopTimer();
          }}
          handleRestart={handleRestart}
          title="You have reached the Maximum number of Guesses.😞"
          body="Would you like to try again?"
          clearTime={stopTimer}
        />
      )}

      {!isLoading && (
        <div>
          <div className="absolute top-28 right-80">
            <CountdownTimer time={countTimer} startTimer={isTimerStarted} />
          </div>

          <div className="absolute top-48 right-80">
            <GuessCounter title="Guesses" count={guesses} />
          </div>
          <div className="absolute top-16 right-80">
            <ButtonOpen handleClick={handleButtonClick} title="Start" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 p-2">
        {!isLoading &&
          images.map((image, index) => (
            <CardComponent
              key={index}
              image={image}
              isFlipped={flippedStates[index] || matchedCards.includes(index)}
              onCardClick={() => handleCardClick(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default AppComponent;
