import Back from '../images/back.png';
import '../styles/SingleCard.css';

import React from 'react'
export default function SingleCard({ card , handleChoice, flipped, disabled}){
  
  const handleClick=()=>{
    if(!disabled){
    handleChoice(card)
    }
  }
    return (
        <div className="card">
        <div className={flipped ? 'flipped' : ''}>
        
          <img className="front" src={card.src} alt="card front" />
          <img 
           className="back"
            src={Back}
             alt="card back"
              onClick={handleClick} />
        </div>
        </div>
    )
}