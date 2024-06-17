import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  deleteShowtimeById } from '../services/API';
import { Button, Modal } from 'react-bootstrap';

const DeleteShowtime = ({showtime, onDelete}) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteid, setDeleteid] = useState('')
    const nav = useNavigate();

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
            onDelete();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
    return (
        <>
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

export default DeleteShowtime;