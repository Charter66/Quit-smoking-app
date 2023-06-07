import React, { useEffect, useState } from 'react';
import "../styles/CardGame.css"
import One from '../images/1.png';
import Two from '../images/2.png';
import Three from '../images/3.png';
import Four from '../images/4.png';
import Five from '../images/5.png';
import Six from '../images/6.png';
import Back from '../images/back.png';
import SingleCard from '../components/SingleCard';
import Confetti from 'react-confetti';

const cardImages = [
  { src: One ,matched:false},
  { src: Two, matched:false},
  { src: Three, matched:false },
  { src: Four, matched:false},
  { src: Five ,matched:false},
  { src: Six, matched:false},
];

function CardMatch() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] =useState(null);
  const [disabled, setDisabled] = useState(false)


  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

const handleChoice=(card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

}
//compare two selected Cards
useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true)

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });
      resetTurn();
  } else {
    setTimeout(() => resetTurn(), 1000);
  }
  }
}, [choiceOne, choiceTwo]);
console.log(cards)

const resetTurn = () => {
  setChoiceOne(null);
  setChoiceTwo(null)
  setTurns(prevTurns =>  prevTurns + 1)
  setDisabled(false)

}

useEffect(()=>{
  shuffleCards()
},[])
const allCardsMatched = cards.every(card => card.matched);
  return (
    <div className="card">
      <div className="card-grid">
        {cards.map((card) => (
            <SingleCard
             key={card.id}
             card={card}
             handleChoice={handleChoice}
             flipped={card === choiceOne || card === choiceTwo || card.matched}
             disabled={disabled}
             />
             
        ))}

      </div>
      {allCardsMatched && <Confetti />}
      {allCardsMatched ?<div>
      <button className="NewGame"  onClick={shuffleCards}>New Game</button>

      <p className='turns'>Turns : {turns} </p>
      </div> : null}
      
    </div>
  );
}

export default CardMatch;
