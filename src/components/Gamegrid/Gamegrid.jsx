import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import GameCard from '../Gamecard/Gamecard'; 
import './Gamegrid.css'; 
import { BlinkBlur } from 'react-loading-indicators';

const apiKey = process.env.REACT_APP_API_KEY; // API key

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(today.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;

const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 3); // Set future date 3 months ahead
const futureYear = futureDate.getFullYear() + 5;
const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
const futureDay = String(futureDate.getDate()).padStart(2, '0');
const endDateFuture = `${futureYear}-${futureMonth}-${futureDay}`;

const Gamegrid = ({ type, id = '' }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1); // Initialize with page 1
    const [loading, setLoading] = useState(false);

    // Determine the heading based on type
    const heading = () => {
        if (type === 'popular') {
            return '★ Popular Games';
        } else if (type === 'rated') {
            return '☆ Top Rated Games';
        } else if (type === 'released') {
            return 'Recent Released Games';
        } else if (type === 'torelease') {
            return 'Upcoming Games';
        } else {
            return 'To be Released Games'; // Default heading
        }
    };

    const getApiUrl = useCallback(() => {
        if (id === '') {
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
        } else {
            if (type === 'popular') {
                return `https://api.rawg.io/api/games?page_size=10&genres=${id}&ordering=-popularity&page=${page}&key=${apiKey}`;
            } else if (type === 'rated') {
                return `https://api.rawg.io/api/games?page_size=10&genres=${id}&ordering=-rating&page=${page}&key=${apiKey}`;
            } else if (type === 'released') {
                const startDate = `${year}-01-01`;
                return `https://api.rawg.io/api/games?page_size=10&genres=${id}&dates=${startDate},${currentDate}&ordering=-popularity&page=${page}&key=${apiKey}`;
            } else if (type === 'torelease') {
                return `https://api.rawg.io/api/games?page_size=10&genres=${id}&dates=${currentDate},${endDateFuture}&ordering=-popularity&page=${page}&key=${apiKey}`;
            }
        }
        return `https://api.rawg.io/api/games?page_size=10&page=${page}&key=${apiKey}`;
    }, [type, id, page]);

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
    }, [getApiUrl]);

    const loadMoreGames = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div>
            <h1 className='game-grid-heading'>{heading()}</h1>
            <div className="game-grid">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {loading && (
                <div className='load'>
                    <BlinkBlur color="#32cd32" size="medium" text="" textColor="" />
                </div>
            )}

            {!loading && (
                <div className='load'>
                    <button onClick={loadMoreGames} className="load-more-btn">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Gamegrid;
