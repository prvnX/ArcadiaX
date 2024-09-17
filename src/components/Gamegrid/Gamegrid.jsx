import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../Gamecard/Gamecard'; 
import './Gamegrid.css'; 
import { BlinkBlur } from 'react-loading-indicators';
const apiKey = process.env.REACT_APP_API_KEY; //api key

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(today.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;


const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 3); // Set future date 5 yr and 3 months ahead
const futureYear = futureDate.getFullYear() + 5;
const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
const futureDay = String(futureDate.getDate()).padStart(2, '0');
const endDateFuture = `${futureYear}-${futureMonth}-${futureDay}`;


const Gamegrid = ({ type }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1); // Initialize with page 1
    const [loading, setLoading] = useState(false);
      
    let heading = 'To be Released Games'; // Default heading
    let apiurl = `https://api.rawg.io/api/games?page_size=10&page=${page}&key=${apiKey}`;
  
    if (type === 'popular') {
      heading = '★ Popular Games';
    } else if (type === 'rated') {
      heading = '☆ Top Rated Games';
    } else if (type === 'released') {
      heading = ' Recent Released Games';
    } else if (type === 'torelease') {
      heading = 'Upcoming Games';
    }

    // API URL based on type and page
    const getApiUrl = () => {
      if (type === 'popular') {
        return `https://api.rawg.io/api/games?page_size=10&ordering=-popularity&page=${page}&key=${apiKey}`;
      } else if (type === 'rated') {
        return `https://api.rawg.io/api/games?page_size=10&ordering=-rating&page=${page}&key=${apiKey}`;
      } else if (type === 'released') {
        const startDate = `${year}-01-01`;
        return `https://api.rawg.io/api/games?ordering=-popularity&dates=${startDate},${currentDate}&page_size=10&page=${page}&key=${apiKey}`;
      } else if (type === 'torelease') {
        return `https://api.rawg.io/api/games?ordering=-rating&dates=${currentDate},${endDateFuture}&page_size=10&page=${page}&key=${apiKey}`;
      }
      return apiurl;
    };

    useEffect(() => {
      const fetchGames = async () => {
        setLoading(true);
        try {
          const response = await axios.get(getApiUrl());
          setGames(prevGames => [...prevGames, ...response.data.results]); // Append new games
        } catch (error) {
          console.error("Error fetching games:", error);
        }
        setLoading(false);
      };
      fetchGames();

    }, [page, type]); // Only fetch when `page` or `type` changes
  
    // Load more games when the user clicks the button
    const loadMoreGames = () => {
      setPage(prevPage => prevPage + 1); // Increment the page number
    };
  
    return (
      <div>
        <h1 className='game-grid-heading'>{heading}</h1>
        <div className="game-grid">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {loading && <div className='load'><BlinkBlur color="#32cd32" size="medium" text="" textColor="" /></div>}

        {!loading && (
         <div class='load'> <button onClick={loadMoreGames} className="load-more-btn">
            Load More
          </button></div>
        )}
      </div>
    );
  };
  
  export default Gamegrid;
