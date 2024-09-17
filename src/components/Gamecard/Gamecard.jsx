import React from "react";
import './Gamecard.css'
import { Link } from 'react-router-dom'; // navigate to the game details page

const GameCard = ({ game }) => {
const renderRatingStars = (rating) => {
        let stars = '';
        const filledStars = Math.floor(rating);
        const emptyStars = 5 - filledStars;
    
        for (let i = 0; i < filledStars; i++) {
          stars += '★'; 
        }
        for (let i = 0; i < emptyStars; i++) {
          stars += '☆'; 
        }
        return stars;
    };
if(!game){
    return 'no game data'
}

  return (
    <div className="game-card">
    <Link to={`/games/${game.id}`} className="game-card-link">
      <div className="game-card-image-container">
        <img src={game.background_image} alt={game.name} className="game-card-image" />
        <div className="game-card-overlay">
          <div className="game-card-details">
            <p className="game-card-rating">

                <span className='star'>{renderRatingStars(game.rating)}</span> 
                
                
                {game.rating} / 5.0</p>
                <p> {game?.released?.substring(0, 4) ?? game.released}</p>
            <button className="game-card-btn">View Details</button>
          </div>
        </div>
      </div>
    </Link>
    <h2 className="game-card-title">{game.name}</h2>
  </div>
  );
};

export default GameCard;
