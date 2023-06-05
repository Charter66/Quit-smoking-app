import React, { useState } from 'react';
import "../styles/CardGame.css"
import One from '../images/1.png';
import Two from '../images/2.png';
import Three from '../images/3.png';
import Four from '../images/4.png';
import Five from '../images/5.png';
import Six from '../images/6.png';
import Seven from '../images/7.png';
import Back from '../images/back.png';
import SingleCard from '../components/SingleCard';

const cardImages = [
  { src: One },
  { src: Two },
  { src: Three },
  { src: Four },
  { src: Five },
  { src: Six },
  { src: Seven },
];

function CardMatch() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  console.log(turns);

  return (
    <div className="card">
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
            <SingleCard key={card.id} card={card}/>
        ))}
      </div>
    </div>
  );
}

export default CardMatch;
