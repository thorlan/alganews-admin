import { Col, Row } from "antd";
import usePageTitle from "../../core/hooks/usePageTitle";
import PaymentList from "../features/PaymentList";

export default function PaymentListView() {
    usePageTitle('Pagamentos');
    return <Row>
        <Col xs={24}>
            <PaymentList />
        </Col>
    </Row>;
}

