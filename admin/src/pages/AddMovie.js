import React, { useState } from 'react';
import { addMovie } from '../services/API';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

const AddMovieForm = () => {
  const [movie, setMovie] = useState({
    actors: '',
    description: '',
    director: '',
    duration: '',
    genre: '',
    release_date: '',
    title: '',
    trailer: ''
  });

  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null); // For displaying the selected poster

  const handlePoster = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    setPosterPreview(URL.createObjectURL(file)); // Create a preview URL for the selected file
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in movie) {
        formData.append(key, movie[key]);
      }
      formData.append('poster', poster);
      const response = await addMovie(formData);
      alert('Movie added successfully');
      setMovie({
        actors: '',
        description: '',
        director: '',
        duration: '',
        genre: '',
        release_date: '',
        title: '',
        trailer: ''
      });
      setPoster(null);
      setPosterPreview(null); // Clear the poster preview

    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <SidebarComponent />
      <NavbarComponent />
      <div style={{ marginTop: '70px', marginLeft: '280px' }}>

        <div className="container mt-5">
          <h1 className="mb-4">Add a New Movie</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                value={movie.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="actors">Actors</label>
              <input
                type="text"
                className="form-control"
                id="actors"
                name="actors"
                placeholder="Actors"
                value={movie.actors}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
                value={movie.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="director">Director</label>
              <input
                type="text"
                className="form-control"
                id="director"
                name="director"
                placeholder="Director"
                value={movie.director}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                placeholder="Duration"
                value={movie.duration}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                name="genre"
                placeholder="Genre"
                value={movie.genre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="poster">Poster</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="poster"
                name="poster"
                placeholder="Poster"
                onChange={handlePoster}
                required
              />
            </div>
            {posterPreview && (
              <div className="form-group">
                <img src={posterPreview} alt="Poster Preview" style={{ padding: '10px', width: '100%', height: '150px', objectFit: 'contain', objectPosition: 'left' }} />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="release_date">Release Date</label>
              <input
                type="date"
                className="form-control"
                id="release_date"
                name="release_date"
                placeholder="Release Date"
                value={movie.release_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="trailer">Trailer URL</label>
              <input
                type="text"
                className="form-control"
                id="trailer"
                name="trailer"
                placeholder="Trailer URL"
                value={movie.trailer}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Movie</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
