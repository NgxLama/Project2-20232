import NavBar from "../NavBar";
import { Col, Container, Row } from "react-bootstrap";
import QRCode from 'qrcode.react';
import { 
    updatePayment,
    getOrderById
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
        //updatePayment(params.id);
        return (
            <Container>
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
                            <Row>
                                <Col>Tên ghế</Col>
                                <Col>Loại ghế</Col>
                                <Col>Số tiền</Col>
                            </Row>
                            {
                                order.seats.map((seat) => {
                                    return (
                                        <>
                                            <Row className='mt-1'>
                                                <Col>
                                                
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>{seat.seat_number}</Col>
                                                <Col>{seat.seat_type}</Col>
                                                <Col>{seat.price}</Col>
                                            </Row>
                                        </>
                                    )
                                })
                            }
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