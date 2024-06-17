import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovie } from "../services/API";
import CradLayout from "../components/CradLayout";
import { Button } from "react-bootstrap";
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

const AllMovies = () => {
  const [movies, setMovies] = useState();
  const nav = useNavigate();

  const handleCreateMovie = () => {
    nav("/movie/addMovie");
  };

  useEffect(() => {
    getAllMovie()
      .then((res) => setMovies(res.data.movies))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="d-flex flex-column h-100">
      <SidebarComponent />
      <NavbarComponent />
      <div style={{ marginTop: '70px', marginLeft: '280px' }}>

        <Box margin="auto">
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
            <Button onClick={handleCreateMovie}>Create Movie</Button>
          </div>
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
      </div>
    </div>
  );
};

export default AllMovies;