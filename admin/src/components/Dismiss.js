import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  dismiss } from '../services/API';
import { Button, Modal } from 'react-bootstrap';

const Dismiss = ({user, onUpdate}) => {
    const [showModal, setShowModal] = useState(false);
    const [appointid, setAppoint] = useState('')
    const nav = useNavigate();


    const handleAppoint = (id) => (e) => {
        e.preventDefault();
        setAppoint(id);
        setShowModal(true);
    };
    const confirmAppoint = async (e) => {
        e.preventDefault();
        try {
            const response = await dismiss(appointid);
            alert('Dismiss successfully');
            onUpdate();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
    return (
        <>
            <Button onClick={handleAppoint(user.id)}>
                Dismiss this Admin
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Dismiss this Admin?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmAppoint}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Dismiss;