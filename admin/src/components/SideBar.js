import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const SidebarComponent = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = React.useState(window.location.pathname);

  const handleClick = (path) => {
    navigate(path);
    setActiveLink(path); // Update active link state for highlighting
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: '250px', height: '100vh', position: 'fixed' }}
    >
      <span className="fs-3 mb-4">Movie Admin</span>
      <hr className="mb-3" />
      <Nav className="flex-column">
        <ul className="list-unstyled mb-4">
          <li className="mb-3">
            <Link
              to="/"
              className="text-white text-decoration-none d-block p-3 rounded"
              onClick={() => handleClick("/")}
              style={{ backgroundColor:`${activeLink === '/' ? 'rgba(0, 160, 255, 1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/movie"
              className="text-white text-decoration-none d-block p-3 rounded"
              style={{ backgroundColor:`${activeLink === '/movie' ? 'rgba(0, 160, 255, 1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              Movie
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/showtimes"
              className="text-white text-decoration-none d-block p-3 rounded"
              style={{ backgroundColor:`${activeLink === '/showtimes' ? 'rgba(0, 160, 255, 1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              Showtime
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/orders"
              className="text-white text-decoration-none d-block p-3 rounded"
              style={{ backgroundColor:`${activeLink === '/orders' ? 'rgba(0, 160, 255, 1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              Order
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/user"
              className="text-white text-decoration-none d-block p-3 rounded"
              style={{ backgroundColor:`${activeLink === '/user' ? 'rgba(0, 160, 255, 1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              User
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/rooms"
              className="text-white text-decoration-none d-block p-3 rounded"
              style={{ backgroundColor:`${activeLink === '/rooms' ? 'rgba(0, 160, 255, 1)' : 'rgba(0,0,0,0.1)'}` }}
            >
              Room
            </Link>
          </li>
          {/* Add more sidebar links here */}
        </ul>
      </Nav>
    </div>
  );
};

export default SidebarComponent;
