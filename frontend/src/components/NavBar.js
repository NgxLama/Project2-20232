import React, { createContext, useContext, useEffect, useState } from 'react'
import { Container, Form, Row, Col, Image, NavDropdown } from 'react-bootstrap'
import notification from '../assets/icons/notification.png'
import messenger from '../assets/icons/messenger.png'
import friends from '../assets/icons/friends.png'
import user from '../assets/icons/user.png'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/icons/logo.png'

/**
 * Represents the navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export default function NavBar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  }

  const handleProfile = () => {
    let id = localStorage.getItem('userId');
    navigate(`/profile/${id}`);
  }

  const handleOrder = () => {
    let id = localStorage.getItem('userId');
    navigate(`/order/${id}`);
  }

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/findMovie?search=${searchValue}`)
  };

  return (
    <Container className='p-2 border-bottom sticky-top' fluid style={{ height: '10%', backgroundColor: '#fff' }}>
      <Row>
        <Col>
          <Container className='p-0 d-flex'>
            <Link className='me-2 mt-1' to={'/'}>
              <Image src={logo} style={{ width: '40px' }} />
            </Link>
            <Form onSubmit={handleSearchSubmit}>
              <Form.Control 
                className='rounded-pill' 
                type="text" 
                placeholder="Tìm kiếm" 
                style={{ height: '50px', width: '500px' }} 
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Form>
          </Container>
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <NavDropdown title={<Image src={user} className='border p-1 ms-4' roundedCircle />} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleProfile}>Thông tin cá nhân</NavDropdown.Item>
            <NavDropdown.Item onClick={handleOrder}>Lịch sử đặt vé</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
          </NavDropdown>
          {/* <Image className='border p-1 ms-4' src={notification} roundedCircle />
          <Image className='border p-1 ms-4' src={messenger} roundedCircle />
          <Image className='border p-1 ms-4' src={friends} roundedCircle /> */}
        </Col>
      </Row>
    </Container>
  )
}
