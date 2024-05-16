import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { findMovie } from "../../services/API";
import CradLayout from "../../Home/CradLayout";
import NavBar from "../NavBar";

const FindMovie = () => {
  const [movies, setMovies] = useState();
  const [searchValue, setSearchValue] = useState("");
  
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await findMovie(location.search);
        setMovies(res.data.movies);
        console.log(res.data.movies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <Box margin="auto">
      <NavBar />
      <Typography variant="h4" padding={2} textAlign="center">
        Find Movies
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {movies &&
          movies.map((movie, index) => (
            <CradLayout
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              poster={movie.poster}
              description={movie.description}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default FindMovie;