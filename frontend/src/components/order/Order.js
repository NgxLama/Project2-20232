import NavBar from "../NavBar"
import { getAllOrdersOfUser, getOrderById } from "../../services/API";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Table, Row, Col } from 'react-bootstrap';
import QRCode from "qrcode.react";

export default function Order() {

    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    
    useEffect(() => {
        getAllOrdersOfUser(params.id)
            .then(async (res) => {
                const ids = res.data.orders;
                const promises = ids.map(id => getOrderById(id));
                await Promise.all(promises)
                    .then((responses) => {
                        const ordersData = responses.map(response => response.data);
                        setOrders(ordersData);
                        console.log(ordersData);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách đơn hàng:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!orders || orders.length === 0) {
        return (
            <Container fluid className='p-0 position-relative'>  
                <NavBar />

                <div style={{margin: 20}}>
                    <h2>Lịch sử đặt vé</h2>
                </div>
                <div style={{margin: 20}}>
                    <p>Hiện tại bạn chưa đặt vé nào, hãy lựa chọn phim và đặt vé nhé.</p>
                </div>
            </Container>
        )
    }

    return (
        <Container fluid className='p-0 position-relative'>          
            <NavBar />
            
            <div style={{margin: 20}}>
                <h2>Lịch sử đặt vé</h2>
            </div>

            <div style={{ width: '90%', margin: '0 auto' }}>
            <Table bordered responsive className="table-responsive" style={{maxWidth: '99%'}}>
                <thead>
                    <tr>
                        <th className="text-center" style={{ width: "20%" }}>QR</th>
                        <th className="text-center">Thông tin vé</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                    <tr key={order.id}>
                        <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <QRCode value = {order.id} size = {200}></QRCode>
                        </td>
                        <td>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>Phim:</Col>
                                        <Col>{order.movie.title}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Thể loại:</Col>
                                        <Col>{order.movie.genre}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Lịch chiếu:</Col>
                                        <Col>{order.showtime.start_time}  -  {order.showtime.end_time}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Phòng:</Col>
                                        <Col>{order.room.name}</Col>
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
                                    <Row>
                                        <Col>Tổng chi phí:</Col>
                                        <Col>{order.amount}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
        </Container>
    )
}