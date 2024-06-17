
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from '../components/NavBar';
import SidebarComponent from '../components/SideBar';
import ContentComponent from '../components/Content';
import { getRoomById } from '../services/API';
const Room = () => {
    const [rooms, setRooms] = useState('')
    const params = useParams()


    return (
        <div className="d-flex flex-column h-100">
 
        </div>
    );
};

export default Room;
