import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import '../SearchBar/SearchBar'
import SearchBar from "../SearchBar/SearchBar";



function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <NavLink to="/"><img src='/logo.png' className="logoimg" /></NavLink>
      </div>
      
      {/* Search Bar */}
      <div className="search-bar">
       <SearchBar />
      </div>
      
      {/* Categories Dropdown */}
      <div className="categories">
        <select>
          <option className="All"><div className="all">All Categories</div></option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="rpg">RPG (Role-Playing Game)</option>
          <option value="shooter">Shooter</option>
          <option value="strategy">Strategy</option>
          <option value="simulation">Simulation</option>
          <option value="sports">Sports</option>
          <option value="racing">Racing</option>
          <option value="puzzle">Puzzle</option>
          <option value="platformer">Platformer</option>
          <option value="fighting">Fighting</option>
          <option value="horror">Horror</option>
          <option value="music">Music</option>
          <option value="sandbox">Sandbox</option>
          <option value="survival">Survival</option>
          <option value="idle">Idle</option>
          <option value="visual-novel">Visual Novel</option>
          <option value="roguelike">Roguelike</option>
          <option value="moba">MOBA (Multiplayer Online Battle Arena)</option>
          <option value="battle-royale">Battle Royale</option>
          {/* Add more categories as needed */}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
