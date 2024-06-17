import { getAllOrdersOfUser, getOrderById, getAllOrders, getProfileByUserId } from "../services/API";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Table, Row, Col } from 'react-bootstrap';
import DeleteOrder from "../components/DeleteOrder";
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

export default function Order() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    const [users, setUsers] = useState({});

    useEffect(() => {
        getAllOrders()
            .then(async (res) => {
                const ids = res.data.orders;
                const promises = ids.map(id => getOrderById(id));
                await Promise.all(promises)
                    .then(async (responses) => {
                        const ordersData = responses.map(response => response.data);
                        setOrders(ordersData);
                        // Fetch user details for each order
                        const userPromises = ordersData.map(order => getProfileByUserId(order.user_id));
                        const userResponses = await Promise.all(userPromises);
                        // Create a map of user ID to user details
                        const userMap = {};
                        userResponses.forEach(user => {
                            userMap[user.data.user_id] = user.data.user;
                        });
                        setUsers(userMap);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching order details:', error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setIsLoading(false);
            });
    }, []);

    const loadOrders = () => {
        setIsLoading(true);
        getAllOrders()
        .then(async (res) => {
            const ids = res.data.orders;
            const promises = ids.map(id => getOrderById(id));
            await Promise.all(promises)
                .then(async (responses) => {
                    const ordersData = responses.map(response => response.data);
                    setOrders(ordersData);
                    // Fetch user details for each order
                    const userPromises = ordersData.map(order => getProfileByUserId(order.user_id));
                    const userResponses = await Promise.all(userPromises);
                    // Create a map of user ID to user details
                    const userMap = {};
                    userResponses.forEach(user => {
                        userMap[user.data.user_id] = user.data.user;
                    });
                    setUsers(userMap);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching order details:', error);
                    setIsLoading(false);
                });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!orders || orders.length === 0) {
        return (
            <Container fluid className='p-0 position-relative'>
                <div style={{ margin: 20 }}>
                    <p>Currently, there are no ticket orders!</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{ marginTop: '70px', marginLeft: '280px' }}>

                <Container fluid className='p-0 position-relative'>
                    <div style={{ width: '90%', margin: '0 auto' }}>
                        <Table bordered responsive className="table-responsive" style={{ maxWidth: '99%' }}>
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "20%" }}>Customer</th>
                                    <th className="text-center">Order Information</th>
                                    <th className="text-center" style={{ width: "10%" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} >
                                        <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {users[order.user_id] ? (
                                                <div style={{ height: '300px' }}>
                                                    <p>Name: {users[order.user_id].firstName} {users[order.user_id].lastName}</p>
                                                    <p>Email: {users[order.user_id].email}</p>
                                                </div>
                                            ) : (
                                                <p>Loading user info...</p>
                                            )}
                                        </td>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col>Movie:</Col>
                                                        <Col>{order.movie.title}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Genre:</Col>
                                                        <Col>{order.movie.genre}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Showtime:</Col>
                                                        <Col>{order.showtime.start_time} - {order.showtime.end_time}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>Room:</Col>
                                                        <Col>{order.room.name}</Col>
                                                    </Row>
                                                    <Table bordered responsive className="table-responsive" style={{ marginTop: 15 }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Seat Name</th>
                                                                <th>Seat Type</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.seats.map((seat) => (
                                                                <tr key={seat.seat_number}>
                                                                    <td>{seat.seat_number}</td>
                                                                    <td>{seat.seat_type}</td>
                                                                    <td>{seat.price}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                    <Row>
                                                        <Col>Total Cost:</Col>
                                                        <Col>{order.amount}</Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td className="text-center">
                                            <DeleteOrder order={order} onDelete={loadOrders}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    );
}
