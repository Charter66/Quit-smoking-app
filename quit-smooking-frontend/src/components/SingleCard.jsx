import Back from '../images/back.png';
import '../styles/SingleCard.css';

import React from 'react'
export default function SingleCard({ card }){ 
    return (
        <div className="card">
        <div>
        
          <img className="front" src={card.src} alt="card front" />
          <img className="back" src={Back} alt="card back" />
        </div>
        </div>
    )
}