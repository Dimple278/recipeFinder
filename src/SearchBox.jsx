import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Send";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

export default function SearchBox() {
  let [query, setQuery] = useState("");
  let [error, setError] = useState(false);

  let getRecipe = async () => {
    try {
      let res = await fetch(`${API_URL}?s=${query}`);
      let resJson = await res.json();
      console.log(resJson);

      let meals = resJson.meals;

      meals.forEach((meal, index) => {
        let name = meal.strMeal;
        let category = meal.strCategory;
        let area = meal.strArea;
        let ingredients = [];
        let instructions = meal.strInstructions;

        // Extracting ingredients and measures dynamically
        for (let i = 1; i <= 20; i++) {
          let ingredient = meal[`strIngredient${i}`];
          let measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${ingredient} - ${measure}`);
          }
        }

        console.log(`Meal ${index + 1}:`);
        console.log("Name:", name);
        console.log("Category:", category);
        console.log("Area:", area);
        console.log("Ingredients:", ingredients);
        console.log("Instructions:", instructions);
        console.log("--------");
      });

      setError(false);
      return resJson; // Return the response JSON directly
    } catch (error) {
      throw error;
    }
  };

  let handleChange = (event) => {
    setQuery(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setQuery("");
      let recipe = await getRecipe();
      // Handle recipe data here
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Meal Name"
          variant="outlined"
          required
          value={query}
          onChange={handleChange}
        />
        <Button variant="contained" endIcon={<SearchIcon />} type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>Recipe not Found</p>}
      </form>
    </div>
  );
}
