import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const NavbarComponent = () => {
    const location = useLocation();

    const getTitleText = () => {
        const pathParts = location.pathname.split("/");
    
        if (pathParts[0] === "" && pathParts[1] === "movie") {
          return "Movie";
        } else {
          switch (location.pathname) {
            case "/showtimes":
              return "Showtimes";
            case "/orders":
              return "Order";
            case "/rooms":
              return "Room";
            case "/user":
              return "User";
            default:
              return "Home";
          }
        }
      };

      const navigate = useNavigate()
      const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/login');
      }

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top" style={{ marginLeft: '250px', boxShadow: '0 6px 7px -4px rgba(0, 0, 0, 0.2)' }}>
            <Container>
                <Navbar.Brand >{getTitleText()}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Add your navbar links here */}
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link onClick={handleLogout} href="#">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;