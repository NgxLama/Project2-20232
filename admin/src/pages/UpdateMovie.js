import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMovieById, getMovieById } from '../services/API';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

const UpdateMovie = () => {
  const [movie, setMovie] = useState({
    actors: '',
    description: '',
    director: '',
    duration: '',
    genre: '',
    release_date: '',
    title: '',
    trailer: '',
  });
  // const [movie, setMovie] = useState(null)
  const params = useParams();
  const nav = useNavigate();

  useEffect(() => {
    getMovieById(params.id)
      .then((res) => {
        const { poster, showtimes, ...rest } = res.data.movie
        setMovie(rest)
        setPosterPreview(res.data.movie.poster)
        console.log(movie)
      })
      .catch((error) => console.log(error));
  }, []);

  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [changePoster, setChangePoster] = useState(null);
  const handlePoster = (e) => {
    const file = e.target.files[0];
    setPoster(file);
    setPosterPreview(URL.createObjectURL(file));
    setChangePoster(true);
  }

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
      if (changePoster) {
        formData.append('poster', poster);
      } else {
        formData.append('poster', posterPreview);
      }

      const response = await updateMovieById(params.id, formData);
      alert('Movie updated successfully');
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
      setPosterPreview(null);

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
          <h1 className="mb-4">Update Movie</h1>
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
                // value={movie.poster}
                onChange={handlePoster}
              />
              <div className="form-group">
                <img src={posterPreview} alt="Poster Preview" style={{ padding: '10px', width: '100%', height: '150px', objectFit: 'contain', objectPosition: 'left' }} />
              </div>
            </div>
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
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
