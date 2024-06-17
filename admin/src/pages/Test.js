
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from '../components/NavBar';
import SidebarComponent from '../components/SideBar';
import ContentComponent from '../components/Content';
import { getRoomById } from '../services/API';
const Test = () => {
    const [rooms, setRooms] = useState('')
    const params = useParams()

    useEffect(() => {
        getRoomById('ypxBGv8qtsSv1lewaNxh')
          .then((res) => {
            setRooms(res.data);
          })
          .catch(error => {

          });
      }, []);

    return (
        <div className="d-flex flex-column h-100">
 
        </div>
    );
};

export default Test;
