import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CradLayout from "./CradLayout";
import { Container } from 'react-bootstrap';
import { getAllMovie } from '../services/API'

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovie()
      .then((res) => setMovies(res.data.movies))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box width="100%" height="100vh" marginTop={2} margin="auto">
      <Box margin={"auto"} width="80%" height="40%" padding={2} display="flex">
        <img
          src="https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg"
          alt="Rocketry"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        gap={5}
        margin="auto"
        width="80%"
        flexWrap={"wrap"}
        display="flex"
        justifyContent={"center"}
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
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
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          variant="outlined"
          LinkComponent={Link}
          to="/movies"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
}