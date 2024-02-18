import React from "react";
import Button from "@mui/material/Button";

const RecipeDetails = ({ recipe, onBackClick }) => {
  // Extract ingredients and their measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.strMeal}</h2>
      <p>Category: {recipe.strCategory}</p>
      <p>Area: {recipe.strArea}</p>
      <p>Instructions: {recipe.strInstructions}</p>

      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};

export default RecipeDetails;
