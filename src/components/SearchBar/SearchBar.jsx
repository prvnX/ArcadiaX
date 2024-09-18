import React, { useState,useEffect } from "react";
import axios from "axios";
import './SearchBar.css'
import { NavLink } from "react-router-dom";
import { BlinkBlur } from "react-loading-indicators";
const apiKey = process.env.REACT_APP_API_KEY; //api key

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = () => {
    setSearchTerm(''); // Clear the search query
    setIsDropdownOpen(false); // Close the dropdown
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (searchTerm.length >= 1) {
        setIsLoading(true);
        setIsDropdownOpen(true);
        try {
          const response = await axios.get(`https://api.rawg.io/api/games?search=${searchTerm}&page_size=5&key=${apiKey}`);
          setSearchResults(response.data.results);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]); // at leaset 3 characters required to search
        setIsDropdownOpen(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchGames();
    }, 500); // Debounce to limit API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  
  return (
    <div className="search-container">
       <input
        type="text"
        placeholder=" Search for games"
        onChange={handleChange}
        value={searchTerm}
      />
    <span className="search-icon"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg></span>

    {isDropdownOpen && searchTerm && searchResults.length > 0 && (
        <div className="dropdown">
          {isLoading ? (
            <div className='load'><BlinkBlur color="#32cd32" size="medium" text="" textColor="" /></div>
          ) : (
            searchResults.map((game) => (
              <div>
              <NavLink 
                to={`/games/${game.slug}`} 
                key={game.id} 
                className="dropdown-item"
                onClick={handleItemClick}
              >
                <img src={game.background_image} alt={game.name} />
                <span >{game.name}</span>
                <span className="release">{game?.released?.substring(0, 4) ?? game.released}</span>
              </NavLink>
              <hr className="line" />
              </div>
            ))
          )}
          
        </div>
      )}


    </div>
  );
}

export default SearchBar;
