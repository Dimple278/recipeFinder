import React, { useState } from "react";
import SearchBox from "./SearchBox";
import RecipeList from "./RecipeList";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);

  const getRecipes = async (searchQuery) => {
    try {
      const res = await fetch(`${API_URL}?s=${searchQuery}`);
      const resJson = await res.json();
      if (resJson.meals) {
        setMeals(resJson.meals);
        setError(false);
      } else {
        setMeals([]);
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    getRecipes(searchQuery);
  };

  return (
    <div className="RecipeFinder">
      <SearchBox onSearch={handleSearch} />
      <RecipeList meals={meals} error={error} />
    </div>
  );
};

export default RecipeFinder;
