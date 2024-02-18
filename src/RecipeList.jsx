import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import RecipeDetails from "./RecipeDetails";

const RecipeList = ({ meals }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="recipe-list">
      {selectedRecipe ? (
        <RecipeDetails recipe={selectedRecipe} onBackClick={handleBackClick} />
      ) : (
        meals.map((meal, index) => (
          <Card key={index} className="recipe-card" sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={meal.strMealThumb}
              title={meal.strMeal}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {meal.strMeal}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Category: {meal.strCategory}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Area: {meal.strArea}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleViewRecipe(meal)}>
                View
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
};

export default RecipeList;
