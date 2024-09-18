import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 import '../css/GameDetails.css';
 import { Commet } from 'react-loading-indicators';

const apiKey = process.env.REACT_APP_API_KEY; //api key
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

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [gamevideo, setGamevideo] = useState(null);
  const [gameimage, setGameimage] = useState(null);


  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}/movies?key=${apiKey}`)
      .then(response => setGamevideo(response.data))
      .catch(error => console.error("Error fetching game details:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`)
      .then(response => setGameimage(response.data))
      .catch(error => console.error("Error fetching game details:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then(response => setGame(response.data))
      .catch(error => console.error("Error fetching game details:", error));
  }, [id]);

  if (!game) {
    return(       
    <div className="loading">
    <Commet color="#32cd32" size="large" text="" textColor="" />
   </div>);
  }

  return (
    <div className="game-details">
    <div className="game-details-heading">
      <h1>{game.name}</h1>
      <div className="game-details-image">
      <img src={game.background_image} alt={game.name} />     
      </div>
      <hr className='hrrule'/>
      <p className='subheading'>Rating</p><p className='details'> <span className='stars'>{renderRatingStars(game.rating)}</span>{game.rating} / 5.0</p>
      <p className='subheading'>Released on</p><p className='details'> {game.released}</p>
      <hr className='hrrule'/>
      <p className='description'>{game.description_raw}</p>
      </div>
      <hr className='hrrule'/>
      <p className='subheading' >Genres </p><p className='more-details'> {game.genres.map(genre => genre.name).join(', ')}</p>
      <hr className='hrrule'/>
      <p className='subheading'>Playtime </p><p className='more-details'>{game.playtime} hours</p>
      <hr className='hrrule'/>
      <p className='subheading'>Platforms </p><p className='more-details'>   {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
      <hr className='hrrule'/>
      <p className='subheading'>Developers </p><p className='more-details'>  {game.developers.map(developer => developer.name).join(', ')}</p>
      <hr className='hrrule'/>
      <p className='subheading'>Publishers </p><p className='more-details'>  {game.publishers.map(publisher => publisher.name).join(', ')}</p>
      <hr className='hrrule'/>
      <p className='subheading'>Tags </p><p className='more-details'> {game.tags.map(tag => tag.name).join('  |  ')}</p>
      <hr className='hrrule'/>
      <p className='subheading'>Available on </p><p className='more-details'> {game.stores.map(store => store.store.name).join(', ')}</p>
      <hr className='hrrule'/>

      <p className='subheading'>Requirements</p>
      <p className='more-details-long'>{game.platforms.map(platform => platform.requirements.minimum).join('\n ')}</p>

      <p className='more-details-long'> {game.platforms.map(platform => platform.requirements.recommended).join('\n')}</p>
      <hr className='hrrule'/>
      <p className='subheading'>Last Updated on </p><p className='more-details'> {game.updated}</p>      
      <hr className='hrrule'/>

      <p className='subheading'>View more details on Official website </p><p> <a href={game.website}><button>Go to Official Website</button></a></p>
      <hr className='hrrule'/>

      <p className='subheading media-title'>Screenshots</p>
      <div className="game-details-image">
        {gameimage?.results.map(image => (
          <img key={image.id} src={image.image} alt={game.name} className='ss-image'/>
        ))}
      </div>
      <hr className='hrrule'/>

      <p className='subheading media-title'>Trailers</p>
      <div className="game-details-video">
        {gamevideo?.results.map(video => (
          <iframe
            key={video.id}
            src={video.data.max}
            title={video.name}
            allowFullScreen
            preventautoPlay        
          />
        ))}
      </div>
      <hr className='hrrule'/>
    </div>
  );
};

export default GameDetails;
