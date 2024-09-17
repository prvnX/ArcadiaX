import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../css/Categories.css';
import axios from "axios";
import { Commet } from "react-loading-indicators";
import Gamegrid from "../components/Gamegrid/Gamegrid";
const apiKey = process.env.REACT_APP_API_KEY; // API key

function Categories() {
  const location = useLocation();
  const { categoryId } = location.state || {}; 
  const [category, setCategory] = useState({}); 
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
            setLoading(true); 
          const response = await axios.get(`https://api.rawg.io/api/genres/${categoryId}?key=${apiKey}`);
          setCategory(response.data); 
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category", error);
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [categoryId]); // Add categoryId to the dependency array
  if (loading) {
    return (
      <div className="loading">
       <Commet color="#32cd32" size="large" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="categories">
      <div className="category-heading">
        <div className="text"><h1>{category.name}</h1></div>
        <img src={category.image_background} alt={category.name} />
      </div>
      <hr className="hrrule" />
      < Gamegrid type='popular' id={categoryId} />
      <hr className="hrrule" />
      < Gamegrid type='rated' id={categoryId} />
      <hr className="hrrule" />
      < Gamegrid type='released' id={categoryId} />
      <hr className="hrrule" />
      < Gamegrid type='torelease' id={categoryId} />
    </div>
  );
}

export default Categories;
