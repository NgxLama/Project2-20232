import React, { useEffect, useState } from 'react';
import AddShowtime from "../components/AddShowtime"
import UpdateShowtime from '../components/UpdateShowtime';
import ShowtimeComponent from '../components/ShowtimeComponent';
import DeleteShowtime from '../components/DeleteShowtime';
import { getAllShowtimes, deleteShowtimeById, getAllRooms, getAllMovie } from '../services/API';
import { Table } from 'react-bootstrap';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

const Showtimes = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deleteid, setDeleteid] = useState('')

    useEffect(() => {
        getAllShowtimes()
            .then(response => {
                
                setShowtimes(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

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

    useEffect(() => {
        getAllMovie()
            .then((res) => {
                setMovies(res.data.movies)
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const loadShowtimes = () => {
        setIsLoading(true);
        getAllShowtimes()
            .then(response => {
                setShowtimes(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{ marginTop: '70px', marginLeft: '280px' }}>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', paddingBottom: '20px' }}>
                        <AddShowtime onAdd={loadShowtimes} />
                    </div>
                    <Table striped bordered hover style={{ maxWidth: '98%' }}>
                        <thead>
                            <tr>
                                <th>Movie Title</th>
                                <th>Room Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showtimes.map((showtime, index) => (
                                <tr key={showtime.id}>
                                    <td>{movies.find(movie => movie.id === showtime.movie_id)?.title}</td>
                                    <td>{rooms.find(room => room.id === showtime.room_id)?.name}</td>
                                    <td>{showtime.formattedStartTime}</td>
                                    <td>{showtime.formattedEndTime}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            {/* <UpdateShowtime showtime={showtime} onUpdate={loadShowtimes}/> */}
                                            <DeleteShowtime showtime={showtime} onDelete={loadShowtimes} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Showtimes;
