import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import GameDetails from "./components/GameDetails";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories";



function App() {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/category" element={<Categories />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
