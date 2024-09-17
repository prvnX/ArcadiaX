import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const categories = [
    { id: -1, name: "None" },
    { id: 4, name: "Action" },
    { id: 3, name: "Adventure" },
    { id: 11,name: "Arcade"},
    { id: 28,name: "Board Games"},
    { id: 17,name: "Card"},
    { id: 40,name: "Casual"},
    { id: 34,name: "Educational"},
    { id: 19,name: "Family"},    
    { id: 6,name: "Fighting"},
    { id: 51, name: "Indie" },
    { id: 59,name: "Multiplayer"},
    { id: 83,name: "Platformer"},
    { id: 7,name: "Puzzle"},
    { id: 1,name: "Racing"},
    { id: 5, name: "RPG" },
    { id: 2, name: "Shooter" },
    { id: 14,name: "Simulation"},
    { id: 10,name: "Strategy"},
    { id: 15,name: "Sports"}    
    ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  

  const handleCategorySelect = (category) => {
    setIsOpen(false); 
    if(category.id==-1){
      navigate('/');
    }else{
      navigate('/category', { state: { categoryId: category.id } }); 
    }
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        Filter By <span className="dropdown-arrow"></span>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="dropdown-option"
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
