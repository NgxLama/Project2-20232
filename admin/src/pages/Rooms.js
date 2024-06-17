import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from '../components/NavBar';
import SidebarComponent from '../components/SideBar';
import ContentComponent from '../components/Content';
import { getAllRooms } from '../services/API';
import Room from '../components/Room';

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams()
    const room_id = 'ypxBGv8qtsSv1lewaNxh'

    useEffect(() => {
        getAllRooms()
          .then((res) => {
            setRooms(res.data);
            setIsLoading(false); // Đánh dấu dữ liệu đã được tải thành công
          })
          .catch((error) => {
            console.error('Error fetching seats:', error);
            setIsLoading(false); // Đánh dấu lỗi khi tải dữ liệu
          });
      }, []);

    return (
        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{ marginTop: '70px', marginLeft: '280px' }}>
                {rooms.map((room, index) => (
                    <Room room={room}/> ) ) }
            </div>
        </div>
    );
};

export default Rooms;
