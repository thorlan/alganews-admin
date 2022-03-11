import { Col, Row } from "antd";
import usePageTitle from "../../core/hooks/usePageTitle";
import UserList from "../features/UserList";

export default function UserListView() {

    usePageTitle('Usuários');

    return <Row>
        <Col xs={24}>
            <UserList />
        </Col>
    </Row>;
}