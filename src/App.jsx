import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
// import "./App.css";

const App = () => {
  const [meals, setMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await res.json();
        if (data.meals) {
          setMeals(data.meals);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleSearch = (foundMeals) => {
    setMeals(foundMeals);
    setSelectedRecipe(null); // Reset selected recipe when a new search is performed
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="app-container">
      <h1>Recipe Finder</h1>
      {!selectedRecipe && <SearchBox onSearch={handleSearch} />}
      {error && <p style={{ color: "red" }}>Failed to fetch recipes.</p>}
      {selectedRecipe ? (
        <RecipeDetails recipe={selectedRecipe} onBackClick={handleBackClick} />
      ) : (
        <RecipeList meals={meals} onRecipeSelect={handleRecipeSelect} />
      )}
    </div>
  );
};

export default App;
