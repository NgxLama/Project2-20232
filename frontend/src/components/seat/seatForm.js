import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { getAllSeatsOfRoom } from '../../services/API';
import NavBar from '../NavBar';
const SeatForm = () => {

  const [seats, setSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  
  const OrderedSeat = useRef(null);
  const [tongGia, setTongGia] = useState(0);
  const params = useParams();
  const room_id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    getAllSeatsOfRoom(room_id)
      .then((res) => {
        setSeats(res.data.seats);
        setIsLoading(false); // Đánh dấu dữ liệu đã được tải thành công
      })
      .catch((error) => {
        console.error('Error fetching seats:', error);
        setIsLoading(false); // Đánh dấu lỗi khi tải dữ liệu
      });
  }, [room_id]);

  useEffect(() => {
    tinhTongGia();
  }, [seats]);

    const updateStatusSeat = async (seat_number, xo) => {
        try {
            if (xo === '' || xo == null) {
            setSeats((prevSeats) => {
                return prevSeats.map((seat) => {
                if (seat?.seat_number === seat_number) {
                    return { ...seat, picked: true };
                }
                return seat;
                });
            });
            } else if (xo === '/cancel') {
            setSeats((prevSeats) => {
                return prevSeats.map((seat) => {
                if (seat?.seat_number === seat_number) {
                    return { ...seat, picked: false };
                }
                return seat;
                });
            });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const datCho = (seat_number) => {
        OrderedSeat.current = seats.find((seat) => seat?.seat_number === seat_number);
        let xo = '';
        if (OrderedSeat.current?.picked === true) {
            xo = '/cancel';
        }
        updateStatusSeat(seat_number, xo);
    };

    const huyCho = (seat_number) => {
        OrderedSeat.current = seats.find((seat) => seat?.seat_number === seat_number);
        if (OrderedSeat.current?.seat_number) {
            updateStatusSeat(seat_number, '/cancel');
        }
    };

    const tinhTongGia = () => {
        let tongGiaMoi = 0;
        seats?.forEach((seat) => {
          if (seat.picked === true) {
            tongGiaMoi += parseInt(seat.price);
          }
        });
        setTongGia(tongGiaMoi);
      };

  const renderGhe = () => {
    if (isLoading) {
        return <div>Loading...</div>;
      }
  
      if (!seats) {
        return <div>No seats available.</div>;
      }
    const sortedSeats = seats.slice().sort((a, b) => {
    const [rowA, colA] = a.seat_number.split('');
    const [rowB, colB] = b.seat_number.split('');

    if (rowA === rowB) {
        return parseInt(colA) - parseInt(colB);
    }

    return rowA.localeCompare(rowB);
    });    
    
    const rows = [];
    let currentRow = [];
    let currentRowNumber = -1;

    sortedSeats.forEach((seat) => {
      const row = seat.seat_number[0];

      if (currentRowNumber !== row) {
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [seat];
        currentRowNumber = row;
      } else {
        currentRow.push(seat);
      }
    });

    // Push the last row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    const gheJSX = rows.map((row, rowIndex) => (
      <Row key={`row-${rowIndex}`} className="justify-content-center mb-3">
        {row.map((seat) => {
          let gheClassName = 'seat';
          let gheVariant = 'light';
  
          if (seat.picked) {
              gheClassName = 'OrderedSeat';
              gheVariant = 'success';
          } else if (seat.status) {
              gheClassName = 'lockedSeat';
              gheVariant = 'secondary';
          }

          return (
            <Col key={seat.seat_number} className={gheClassName} xs={1}>
              <Button
                variant={gheVariant}
                onClick={() => datCho(seat.seat_number)}
                onDoubleClick={() => huyCho(seat.seat_number)}
                disabled={gheClassName.includes('lockedSeat')}
              >
                {seat.seat_number}
              </Button>
            </Col>
          );
        })}
      </Row>
    ));
    return <>{gheJSX}</>;
  };



  return (
    <Container className="giao-dien-dat-cho">
        <NavBar />
      <Row className="justify-content-center mt-3 mb-3">
        <Col>
          <h2 className="text-center mt-3">SEATS ORDER</h2>
        </Col>
      </Row>

      {renderGhe()}
      <Row className="justify-content-center mt-3">
        <Col>
          <hr></hr>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col className="col-md-9">
          <Button className="btn btn-success mt-3" onClick={() => {}} style={{ width: '100%' }}>
            Thanh toán
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="light" disabled />
        <span className="col-md-3 ml-1">Ghế trống</span>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="success" disabled />
        <span className="col-md-3 ml-1">Ghế chọn</span>
        <span className="col-md-1 ml-1">Tổng giá:</span>
        <span className="col-md-1">{tongGia}</span>
      </Row>
      <Row className="mt-3">
        <Button className="col-md-1" variant="secondary" disabled />
        <span className="col-md-3 ml-1">Ghế đã được đặt</span>
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <div className="mb-3" style={{ textAlign: "center" }}>
            <label htmlFor="notify" className="form-label" style={{ fontSize: "30px" }}>You must log in to continue</label>
          </div>
        </Modal.Body>
        <Modal.Footer id="LFooter">
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SeatForm;