import NavBar from "../NavBar";
import { Col, Container, Row, Table } from "react-bootstrap";
import QRCode from 'qrcode.react';
import { 
    updatePayment,
    getOrderById,
    deleteOrderById
 } from "../../services/API";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ReturnPage = () => {
    const parsedUrl = new URL(window.location.href);
    const queryParams = parsedUrl.searchParams;

    const params = useParams();

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getOrderById(params.id)
            .then((res) => {
                setOrder(res.data);
                setIsLoading(false);
            });
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (queryParams.get('vnp_TransactionStatus') == '00') {
        const qr = params.id;
        updatePayment(params.id);
        return (
            <Container fluid className='p-0 position-relative'>
                <NavBar />
                <Container>
                    <Container>
                        <div style={{marginBottom: 50, marginTop: 50}}>
                            <h2>Thanh toán thành công!</h2>
                            <p>Cảm ơn bạn đã mua hàng. Dưới đây là thông tin vé của bạn:</p>
                        </div>
                    </Container>
                    <Row>
                        <Col>
                            <QRCode value={qr} size={256}></QRCode>
                        </Col>
                        <Col className="col-md-9">
                            <Row>
                                <Col>Phim:</Col>
                                <Col>{order.movie.title}</Col>
                            </Row>
                            <Row className='mt-1'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Thể loại:</Col>
                                <Col>{order.movie.genre}</Col>
                            </Row>
                            <Row className='mt-1'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Lịch chiếu:</Col>
                                <Col>{order.showtime.start_time}  -  {order.showtime.end_time}</Col>
                            </Row>
                            <Row className='mt-1'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Phòng:</Col>
                                <Col>{order.room.name}</Col>
                            </Row>
                            <Row className='mt-1'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Table bordered responsive className="table-responsive" style={{marginTop: 15}}>
                                <thead>
                                    <tr>
                                        <th>Tên ghế</th>
                                        <th>Loại ghế</th>
                                        <th>Số tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                            {
                                order.seats.map((seat) => {
                                    return (
                                        <tr key={seat.seat_number}>
                                            <td>{seat.seat_number}</td>
                                            <td>{seat.seat_type}</td>
                                            <td>{seat.price}</td>
                                        </tr>
                                    )
                                })
                            }
                                </tbody>
                            </Table>
                            <Row className='mt-1'>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Tổng chi phí:</Col>
                                <Col>{order.amount}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
    else {
        const qr = params.id;
        deleteOrderById(params.id);
        return (
            <Container>
                <NavBar />
                <Container>
                    <div style={{marginBottom: 50, marginTop: 50}}>
                        <h2>Thanh toán thất bại!</h2>
                        <p>Hãy kiểm tra và thử lại sau nhé</p>
                    </div>
                </Container>
            </Container>
        )
    }
}

export default ReturnPage;