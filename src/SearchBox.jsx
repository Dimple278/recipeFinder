import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Send";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    setQuery("");
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
      </form>
    </div>
  );
};

export default SearchBox;
