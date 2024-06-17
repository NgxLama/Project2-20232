import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { getLayoutById2 } from '../services/API';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

const Room = ({room}) => {
  const [seats, setSeats] = useState(null);
  const [seatsData, setSeatsData] = useState([]);
  const [pickedSeats, setPickedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const OrderedSeat = useRef(null);
  const [tongGia, setTongGia] = useState(0);
  const [seatString, setSeatString] = useState('');
  const params = useParams();

  useEffect(() => {
    getLayoutById2(room.id)
      .then((res) => {
        setSeats(res.data);
        setIsLoading(false); // Đánh dấu dữ liệu đã được tải thành công
      })
      .catch((error) => {
        console.error('Error fetching seats:', error);
        setIsLoading(false); // Đánh dấu lỗi khi tải dữ liệu
      });
  }, [room.id]);

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
      <Row className="justify-content-center mt-3 mb-3">
        <Col>
          <h2 className="text-center mt-3">Room: {room.name}</h2>
        </Col>
      </Row>

      {renderGhe()}
      <Row className="justify-content-center mt-3">
        <Col>
          <hr></hr>
        </Col>
      </Row>
    </Container>
  );
};

export default Room;