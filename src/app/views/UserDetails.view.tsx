import { Avatar, Button, Card, Col, Descriptions, Divider, Progress, Row, Skeleton, Space, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect } from "react";
import { Link, Redirect, useParams } from 'react-router-dom';
import useUser from "../../core/hooks/useUser";

export default function UserDetailsView() {

    const params = useParams<{ id: string }>()
    const { user, fetchUser, notFound } = useUser();
    const { lg } = useBreakpoint();

    useEffect(() => {

        if (!isNaN(Number(params.id))) {
            fetchUser(Number(params.id));
        }

    }, [fetchUser, params.id])

    if (notFound) {
        return <Card>
            Usuário não encontrado
        </Card>
    }

    if (!user) return <Skeleton />

    if (isNaN(Number(params.id))) {
        return <Redirect to={'/usuarios'} />
    }

    return <Row gutter={24}>
        <Col xs={24} lg={4}>
            <Row justify='center'>
                <Avatar src={user.avatarUrls.small} size={120} />
            </Row>
        </Col>
        <Col xs={24} lg={20}>
            <Space style={{ width: '100%' }} direction="vertical" align={lg ? 'start' : 'center'}>
                <Typography.Title level={2}> {user.name}</Typography.Title>
                <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ textAlign: lg ? 'left' : 'center' }}> {user.bio}</Typography.Paragraph>
                <Space>
                    <Link to={`/usuarios/edicao/${user.id}`}> <Button type={'primary'}>Editar Usuário</Button> </Link>
                    <Button type={'primary'}>Remover</Button>
                </Space>
            </Space>
        </Col>
        <Divider />
        <Col xs={24} lg={12}>
            <Space direction='vertical' style={{ width: '100%' }}>
                {
                    user.skills?.map(skill => {
                        return <div key={skill.name}>
                            <Typography.Text>{skill.name}</Typography.Text>
                            <Progress percent={skill.percentage} success={{ percent: 0 }} />
                        </div>
                    })
                }
            </Space>
        </Col>
        <Col xs={24} lg={12}>
            <Descriptions column={1} bordered size={'small'}>
                <Descriptions.Item label={'País'}>{user.location.country}</Descriptions.Item>
                <Descriptions.Item label={'Estado'}>{user.location.state}</Descriptions.Item>
                <Descriptions.Item label={'Cidade'}>{user.location.city}</Descriptions.Item>
                <Descriptions.Item label={'Telefone'}>{user.phone}</Descriptions.Item>
            </Descriptions>
        </Col>
    </Row>;
}