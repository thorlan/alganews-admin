import { User, UserService } from "orlandini-sdk";
import { useCallback, useState } from "react";
import { ResourceNotFoundError } from 'orlandini-sdk/dist/errors/';

export default function useUser() {

    const [notFound, setNotFound] = useState(false);
    const [user, setUser] = useState<User.Detailed>();

    const fetchUser = useCallback(async (id: number) => {
        try {
            await UserService.getDetailedUser(id).then(setUser);
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                setNotFound(true);
            }
            throw (error);
        }
    }, [])

    return {
        user,
        fetchUser,
        notFound
    }
}