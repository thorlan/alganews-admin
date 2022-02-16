import { User, UserService } from 'orlandini-sdk';
import { useCallback, useState } from 'react';

export default function useUsers() {
    const [users, setUsers] = useState<User.Summary[]>([]);

    const fetchUsers = useCallback(() => {
        UserService.getAllUsers().then(setUsers);
    }, []);

    return {
        fetchUsers,
        users,
    };
}