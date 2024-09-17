import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import '../SearchBar/SearchBar'
import SearchBar from "../SearchBar/SearchBar";
import Category from "../Category/Category"




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
    <Category />
    </nav>
  );
}


export default Navbar;
