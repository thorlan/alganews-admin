import { Card, notification, Skeleton } from 'antd';
import moment from 'moment';
import { User, UserService } from 'danielbonifacio-sdk';
import { useCallback, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import usePageTitle from '../../core/hooks/usePageTitle';
import useUser from "../../core/hooks/useUser";
import NotFoundError from '../components/NotFoundError';
import UserForm from "../features/UserForm";
import useBreadcrumb from '../../core/hooks/useBreadcrumb';

export default function UserEditView() {

    usePageTitle('Edição de Usuário');
    useBreadcrumb('Usuários/Edição');
    const params = useParams<{ id: string }>()
    const { user, fetchUser, notFound } = useUser();
    const history = useHistory();

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

    async function handleUserUpdate(user: User.Input) {
        await UserService.updateExistingUser(Number(params.id), user).then(() => {
            history.push('/usuarios');
            notification.success({
                message: 'Sucesso',
                description: 'usuário modificado com sucesso',
            });
        })
    }

    if (notFound) {
        return <Card>
            <NotFoundError
                title={'Usuário não encontrado'}
                actionDestination={'/usuarios'}
                actionTitle={'Voltar para lista de usuários'}
            />
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