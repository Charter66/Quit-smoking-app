
import React, {useState, useEffect} from 'react'


const cardImages = [
    {"src": "../images/1.png"},
    {"src": "../images/2.png"},
    {"src": "../images/3.png"},
    {"src": "../images/4.png"},
    {"src": "../images/5.png"},
    {"src": "../images/6.png"},
    {"src": "../images/7.png"},
]

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
  
    useEffect(() => {

    console.log(cards);

    }, [cards]);
  
    console.log(turns);
  
    return (
      <div className="card">
        <button onClick={shuffleCards}>New Game</button>
        <div className="image-container">
          <img src="../images/2.png" alt="Image" />
        </div>
      </div>
    );
  }
  
  export default CardMatch;
  