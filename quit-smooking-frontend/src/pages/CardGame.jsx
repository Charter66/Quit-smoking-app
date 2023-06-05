import React, { useState, useEffect } from 'react';
import '../styles/CardGame.css';

const MatchTheCardsGame = () => {
    const cardSymbols = ["♠", "♣", "♥", "♦", "♫", "♬", "♩", "♪"];
  
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isCheckingMatch,setIsCheckingMatch] = useState(false);
  
    useEffect(() => {
      // Initialize the game
      const newCards = generateCards();
      setCards(newCards);
    }, []);
  
    // Generate a new deck of cards
    const generateCards = () => {
      const doubledSymbols = cardSymbols.concat(cardSymbols);
      const shuffledSymbols = shuffle(doubledSymbols);
  
      return shuffledSymbols.map((symbol, index) => ({
        id: index,
        symbol: symbol,
        flipped: false,
        matched: false,
      }));
    };
  
    // Shuffle the array randomly
    const shuffle = (array) => {
      let currentIndex = array.length;
  
      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
  
      return array;
    };
  
    // Handle card click
    const handleCardClick = (card) => {
        if (!isCheckingMatch && !card.flipped && !card.matched) {
          const updatedCards = cards.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
          );
      
          setCards(updatedCards);
          setFlippedCards([...flippedCards, card]);
      
          if (flippedCards.length === 1) {
            setIsCheckingMatch(true);
            checkForMatch();
          } else if (flippedCards.length === 2) {
            setIsCheckingMatch(true);
            setTimeout(() => {
              const updatedCards = cards.map((c) =>
                flippedCards.includes(c) ? { ...c, flipped: false } : c
              );
      
              setCards(updatedCards);
              setFlippedCards([card]);
              setIsCheckingMatch(false);
            }, 1000);
          }
        }
      };
  
    // Check if the flipped cards match
    const checkForMatch = () => {
      if (flippedCards[0].symbol === flippedCards[1].symbol) {
        const updatedCards = cards.map((card) =>
          flippedCards.includes(card) ? { ...card, matched: true } : card
        );
  
        setCards(updatedCards);
        setMatchedCards([...matchedCards, flippedCards[0], flippedCards[1]]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            flippedCards.includes(card) ? { ...card, flipped: false } : card
          );
  
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    };

  return (
    <div className="match-the-cards-game">
      <div className="cards-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.symbol}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTheCardsGame;
