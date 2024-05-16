import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovie } from "../../services/API";
import CradLayout from "../../Home/CradLayout";
import NavBar from "../NavBar";

const AllMovies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovie()
      .then((res) => setMovies(res.data.movies))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Box margin="auto">
      <NavBar />
      <Typography variant="h4" padding={2} textAlign="center">
        All Movies
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

export default AllMovies;