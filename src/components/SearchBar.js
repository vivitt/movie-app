import React, { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SearchBar = ({
  setFiltMovies,
  movies,
  setMovies,
  dataMovies,
  setBack,
  back,
  backToAll,
}) => {
  const sorts = ["Sort by...", "year", "rating"];
  const categories = [
    "Category...",
    "Action",
    "Adventure",
    "Horror",
    "Comedy",
    "Crime",
    "Drama",
    "Animation",
  ];
  const [category, setCategory] = useState("Category...");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Sort by...");

  function sortFilms() {
    setMovies([...dataMovies]);
    setFiltMovies([...movies]);
    if (sort == "year") {
      setFiltMovies(
        movies.sort((a, b) => {
          return b.year - a.year;
        })
      );
    } else if (sort === "rating") {
      setFiltMovies(
        movies.sort((a, b) => {
          return b.rating - a.rating;
        })
      );
    } else if (sort === "Sort by...") {
      setFiltMovies([...movies]);
      setBack(false);
    }
  }
  useEffect(() => {
    sortFilms();
  }, [sort]);

  function filtByCat() {
    setMovies([...dataMovies]);
    setFiltMovies([...movies]);
    if (category !== "Category...")
      setFiltMovies(movies.filter((item) => item.category === category));
    setBack(true);
  }
  useEffect(() => {
    filtByCat();
  }, [category]);

  function submitParams(event) {
    event.preventDefault();
    if (search !== "") setFiltMovies([...movies]);
    setFiltMovies(movies.filter(check));
    setSearch("");
    setBack(true);
  }

  useEffect(() => {
    setFiltMovies(movies.filter(check));
  }, [search]);

  function check(item) {
    if (
      item.year.toString() === search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase() === search.toLowerCase()
    ) {
      return item;
    }
  }

  return (
    <div className="search">
      <FormControl fullWidth="true" sx={{ m: 1 }}>
        <OutlinedInput
          id="search"
          type="text"
          value={search}
          placeholder="Search movies..."
          onChange={(event) => setSearch(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={submitParams} edge="end">
                <SearchIcon></SearchIcon>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className="selectInputs">
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <Select
              variant="outlined"
              labelId="filter"
              id="filter"
              value={sort}
              defaultValue="Sort by..."
              placeholder="Sort by..."
              onChange={(event) => setSort(event.target.value)}
            >
              {sorts.map((sort) => (
                <MenuItem value={sort}>{sort}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <Select
              variant="outlined"
              labelId="category"
              id="category"
              value={category}
              defaultValue="Category..."
              placeholder="Category..."
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
