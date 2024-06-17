import React, { useEffect, useState } from 'react';
import UpdateShowtime from '../components/UpdateShowtime';
import {  deleteShowtimeById, getMovieById } from '../services/API';
import { Button, Modal } from 'react-bootstrap';

const ShowtimeComponent = ({showtime, room, movie}) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteid, setDeleteid] = useState('')
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //delete showtime
    const handleDelete = (id) => (e) => {
        e.preventDefault();
        setDeleteid(id);
        setShowModal(true);
    };
    const confirmDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteShowtimeById(deleteid);
            alert('Deleted Showtime successfully');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
    return (
        <>
            <strong>{movie?.title}</strong> - {room?.name} - from {(showtime.start_time)} to {showtime.end_time}
            <UpdateShowtime showtime={showtime} />
            <Button onClick={handleDelete(showtime.id)}>
                Delete
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this showtime?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShowtimeComponent;