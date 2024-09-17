import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY; //api key


const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then(response => setGame(response.data))
      .catch(error => console.error("Error fetching game details:", error));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-details">
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} />
      <p>{game.description_raw}</p>
      {/* Add other details like ratings, genres, system requirements, etc. */}
    </div>
  );
};

export default GameDetails;
