import { useState } from 'react';
import { Container, Form, FormGroup, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

export default function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{ marginTop: '70px', marginLeft: '280px' }}>
                <h2>Welcome to </h2>
            </div>
        </div>

    )

}