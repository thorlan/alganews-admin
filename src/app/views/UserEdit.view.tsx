import { Card, notification, Skeleton } from 'antd';
import moment from 'moment';
import { User, UserService } from 'orlandini-sdk';
import { useCallback, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom';
import useUser from "../../core/hooks/useUser";
import UserForm from "../features/UserForm";

export default function UserEditView() {

    const params = useParams<{ id: string }>()
    const { user, fetchUser, notFound } = useUser();

    useEffect(() => {

        if (!isNaN(Number(params.id))) {
            fetchUser(Number(params.id));
        }

    }, [fetchUser, params.id])


    const transformUserData = useCallback(
        (user: User.Detailed) => {
            return {
                ...user,
                createdAt: moment(user.createdAt),
                updatedAt: moment(user.updatedAt),
                birthdate: moment(user.birthdate),
            };
        },
        []
    );

    function handleUserUpdate(user: User.Input) {
        UserService.updateExistingUser(Number(params.id), user).then(() => {
            notification.success({
                message: 'Sucesso',
                description: 'usuário modificado com sucesso',
            });
        })
    }

    if (notFound) {
        return <Card>
            Usuário não encontrado
        </Card>
    }

    if (!user) return <Skeleton />

    if (isNaN(Number(params.id))) {
        return <Redirect to={'/usuarios'} />
    }

    return <>
        <UserForm onUpdate={handleUserUpdate} user={transformUserData(user)} />
    </>;
}