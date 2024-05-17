import NavBar from "../NavBar";
import { Col, Container, Row } from "react-bootstrap";
import QRCode from 'qrcode.react';
import { savePayment } from "../../services/API";

const ReturnPage = () => {
    const parsedUrl = new URL(window.location.href);
    const queryParams = parsedUrl.searchParams;
    if (queryParams.get('vnp_TransactionStatus') == '00') {
        const qr = localStorage.getItem('order');
        savePayment(qr);
        localStorage.removeItem('order');
        return (
            <Container>
                <NavBar />
                <Container>
                    <Container>
                        <div>
                            <h2>Thanh toán thành công!</h2>
                            <p>Cảm ơn bạn đã mua hàng. Dưới đây là thông tin vé của bạn:</p>
                        </div>
                    </Container>
                    <Row className="justify-content-center mt-3">
                        <Col className="col-md-9">
                            <QRCode value={qr}></QRCode>
                        </Col>
                        <Col className="col-md-9">
                            <Row>
                                
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
                    <h2>Thanh toán thất bại!</h2>
                    <p>Hãy kiểm tra và thử lại sau nhé</p>
                </Container>
            </Container>
        )
    }
}

export default ReturnPage;