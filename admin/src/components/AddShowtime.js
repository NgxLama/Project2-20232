import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllRooms, getAllMovie, addShowtime } from '../services/API';

const CreateShowtimeModal = ({onAdd}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('Select a room');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('Select a movie');
    const [selectedMovieDuration, setSelectedMovieDuration] = useState(0);
    const [endTime, setEndTime] = useState('');
    const [showtimeData, setShowtimeData] = useState({
        room_id: '',
        start_time: '',
        movie_id: '',
        end_time: '',
    });
    const nav = useNavigate();

    //get movies
    useEffect(() => {
        getAllMovie()
            .then((res) => {
                setMovies(res.data.movies)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    //get rooms
    useEffect(() => {
        getAllRooms()
            .then((res) => {
                setRooms(res.data)
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'room_id') {
            const selectedRoom = rooms.find(room => room.id === value);
            setSelectedRoom(selectedRoom ? selectedRoom.name : 'Select a room');
        }
        if (name === 'movie_id') {
            const selectedMovie = movies.find(movie => movie.id === value);
            setSelectedMovie(selectedMovie ? selectedMovie.title : 'Select a movie');
            setSelectedMovieDuration(selectedMovie ? selectedMovie.duration : 0);
        }
        setShowtimeData({ ...showtimeData, [name]: value });
        
    };
    //calculate endTime
    useEffect(() => {
        if (showtimeData.start_time && selectedMovieDuration) {
            const start = new Date(showtimeData.start_time);
            const end = new Date(start.getTime() + selectedMovieDuration * 60000); // Calculate end time in milliseconds
            function formatTime(timeString) {
                const date = new Date(timeString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
              
                return `${year}-${month}-${day}T${hours}:${minutes}`;
              }
              const formattedTime = formatTime(end);
            setEndTime(formattedTime); // Format end time to match datetime-local input
            setShowtimeData({ ...showtimeData, end_time: formattedTime });
        } else {
            setEndTime('');
        }
    }, [showtimeData.start_time, selectedMovieDuration]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addShowtime(showtimeData);
              alert('Showtime added successfully');
              onAdd();
              setShowtimeData({
                room_id: '',
                start_time: '',
                movie_id: '',
                end_time: '',
              });
              setSelectedMovie("Select a movie");
              setSelectedRoom('Select a room');
          } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
                setShowtimeData({
                    room_id: '',
                    start_time: '',
                    movie_id: '',
                    end_time: '',
                  });
                  setSelectedMovie("Select a movie");
                  setSelectedRoom('Select a room');
            } else {
                alert('An unexpected error occurred');
            }
          }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow} >
                Add Showtime
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Showtime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="room_id">
                            <Form.Label>Room</Form.Label>
                            <Form.Control as="select" name="room_id" value={showtimeData.room_id} onChange={handleChange} required>
                                <option value="">{selectedRoom}</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>{room.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="movie_id">
                            <Form.Label>Movie</Form.Label>
                            <Form.Control as="select" name="movie_id" value={showtimeData.movie} onChange={handleChange} required>
                                <option value="">{selectedMovie}</option>
                                {movies.map((movie) => (
                                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="start_time">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="datetime-local" name="start_time" value={showtimeData.start_time} onChange={handleChange} required />
                        </Form.Group>
                        {endTime && (
                            <Form.Group controlId="end_time">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="datetime-local" name="end_time" value={endTime} onChange={handleChange} readOnly />
                            </Form.Group>
                        )}
                        <Button variant="primary" type="submit">
                            Add Showtime
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateShowtimeModal;
