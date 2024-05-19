import React, { useState, useEffect } from 'react';
import { getMovieById } from '../../services/API';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import NavBar from '../NavBar';

function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <NavBar />
      <Row className="mt-2">
        <Col>
          <h2 style={{marginBottom: 30, marginTop: 10}}>{movie?.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <img src={movie?.poster} alt="" style={{ width: 300 }} /> */}
          <iframe title="Trailer" width="600" height="315" src={movie.trailer} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{ marginBottom: '10px' }}></iframe>
          <div style={{marginTop: 10, width: 600}}>
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
    </Container>
  );
}

export default MoviePage;