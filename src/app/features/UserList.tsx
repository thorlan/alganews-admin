import { Table, Tag, Switch, Button, Typography, Space, Avatar } from "antd";
import { format } from "date-fns";
import { User } from "orlandini-sdk";
import { useEffect } from "react";
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

import useUsers from "../../core/hooks/useUsers"

export default function UserList() {

    const { users, fetchUsers, toggleUserStatus } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    return <>
        <Table<User.Summary>
            dataSource={users}
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Nome',
                    width: 160,
                    render(name: string, row) {
                        return <Space>
                            <Avatar size={'small'} src={row.avatarUrls.small} />
                            <Typography.Text
                                ellipsis
                                style={{ maxWidth: 120 }}
                            >
                                {name}
                            </Typography.Text>
                        </Space>
                    }
                },
                {
                    dataIndex: 'email',
                    title: 'Email',
                    ellipsis: true,
                    width: 240,
                },
                {
                    dataIndex: 'role',
                    title: 'Perfil',
                    align: 'center',
                    render(role) {
                        return <Tag color={role === 'MANAGER' ? 'red' : 'blue'}>
                            {role === 'EDITOR'
                                ? 'Editor'
                                : role === 'MANAGER'
                                    ? 'Gerente'
                                    : 'Assistente'}
                        </Tag>;
                    }
                },
                {
                    dataIndex: 'createdAt',
                    title: 'Criação',
                    align: 'center',
                    render(createdAt: string) {
                        return format(new Date(createdAt), 'dd/MM/yyyy')
                    }
                },
                {
                    dataIndex: 'active',
                    title: 'Ativo',
                    align: 'center',
                    render(active: boolean, user) {
                        return <Switch onChange={() => toggleUserStatus(user)} defaultChecked={active} />
                    }
                },
                {
                    dataIndex: 'id',
                    title: 'Ações',
                    align: 'center',
                    render() {
                        return <>
                            <Button size='small' icon={<EyeOutlined />} />
                            <Button size='small' icon={<EditOutlined />} />
                        </>
                    }
                },
            ]}
        />
    </>
}