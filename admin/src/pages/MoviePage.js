import React, { useState, useEffect } from 'react';
import { getMovieById } from '../services/API';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Nav, Modal } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { deleteMovieById } from '../services/API';
import UpdateMovie from './UpdateMovie';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const params = useParams();
  const nav = useNavigate();

  const booking = (showtime) => {
    nav(`/room/${showtime.room_id}?showtime_id=${showtime.id}`);
  }

  useEffect(() => {
    // Gọi API để lấy thông tin phim
    getMovieById(params.id)
      .then((res) => {
        setMovie(res.data.movie);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  //update Movie
  const handleUpdate = (e) => {
    e.preventDefault();
    nav(`/movie/updateMovie/${params.id}`);
  }

  //delete Movie
  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteMovieById(params.id);
      nav(`/allMovies`);
      alert('Deleted Movie successfully');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="d-flex flex-column h-100">
      <SidebarComponent />
      <NavbarComponent />
      <div style={{ marginTop: '70px', marginLeft: '280px' }}>

        <Container>
          <NavBar />
          <Row className="mt-2">
            <Col>
              <h2 style={{ marginBottom: 30, marginTop: 10 }}>{movie?.title}</h2>
            </Col>
            <Col>
              
            </Col>
            <Col>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Button onClick={handleUpdate}>
                Update
              </Button>
              
              <Button onClick={handleDelete}>
                Delete
              </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <img src={movie?.poster} alt="" style={{ width: 300 }} /> */}
              <iframe title="Trailer" width="600" height="315" src={movie.trailer} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{ marginBottom: '10px' }}></iframe>
              <div style={{ marginTop: 10, width: 600 }}>
                <h4>Giới thiệu</h4>
                <p>{movie?.description}</p>
              </div>
            </Col>
            <Col>
              <Row className='mt-2'>
                <Col className='col-md-5'>
                  <label>Ngày ra mắt:</label>
                </Col>
                <Col className='col-md-5'>
                  <label>{movie.release_date}</label>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <hr />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='col-md-5'>
                  <label>Thể loại:</label>
                </Col>
                <Col className='col-md-5'>
                  <label>{movie.genre}</label>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <hr />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='col-md-5'>
                  <label>Đạo diễn:</label>
                </Col>
                <Col className='col-md-5'>
                  <label>{movie?.director}</label>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <hr />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='col-md-5'>
                  <label>Diễn viên: </label>
                </Col>
                <Col className='col-md-5'>
                  <label>{movie?.actors}</label>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <hr />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='col-md-5'>
                  <label>Thời gian chiếu:</label>
                </Col>
                <Col className='col-md-5'>
                  <label>{movie?.duration}</label>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <hr />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='col-md-5 d-flex align-items-center'>
                  <label>Thời gian</label>
                </Col>
                <Col className='col-md-5 d-flex align-items-center'>
                  <label>Phòng</label>
                </Col>
                <Col classname='col-md-5 d-flex align-items-center'>

                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <hr />
                </Col>
              </Row>
              {
                movie.showtimes.map((showtime) => {
                  return (
                    <>
                      <Row className='mt-2'>
                        <Col className='col-md-5 d-flex align-items-center'>
                          <label>{showtime.start_time} - {showtime.end_time}</label>
                        </Col>
                        <Col className='col-md-5 d-flex align-items-center'>
                          <label>{showtime.name}</label>
                        </Col>
                        <Col classname='col-md-5 d-flex align-items-center'>
                          <Button onClick={() => booking(showtime)} className='btn btn-success' style={{ width: "100%" }}>Đặt vé</Button>
                        </Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>
                          <hr />
                        </Col>
                      </Row>
                    </>
                  )
                })
              }
            </Col>
          </Row>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default MoviePage;