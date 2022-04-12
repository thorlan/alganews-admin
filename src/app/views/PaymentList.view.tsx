import { Col, Row } from "antd";
import useBreadcrumb from "../../core/hooks/useBreadcrumb";
import usePageTitle from "../../core/hooks/usePageTitle";
import PaymentList from "../features/PaymentList";

export default function PaymentListView() {
    usePageTitle('Pagamentos');
    useBreadcrumb('Pagamentos/Consulta');
    return <Row>
        <Col xs={24}>
            <PaymentList />
        </Col>
    </Row>;
}

