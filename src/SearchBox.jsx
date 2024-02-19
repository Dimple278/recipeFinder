import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchRecipes = async (searchQuery) => {
    try {
      const res = await fetch(`${API_URL}?s=${searchQuery}`);
      const data = await res.json();
      if (data.meals) {
        onSearch(data.meals);
        setError(false);
      } else {
        onSearch([]);
        setError(true);
      }
      setSearching(false);
    } catch (error) {
      setError(true);
      setSearching(false);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    setSearching(true);
    if (value.trim() !== "") {
      fetchRecipes(value);
    } else {
      fetchRecipes(""); // Fetch all recipes if the input field is empty
    }
  };

  return (
    <div className="search-box">
      <TextField
        id="outlined-basic"
        label="Meal Name"
        variant="outlined"
        required
        value={query}
        onChange={handleChange}
      />
      {/* {searching && <p style={{ color: "blue" }}>Searching...</p>} */}
      {error && <p style={{ color: "red" }}>Recipe not Found</p>}
    </div>
  );
};

export default SearchBox;
