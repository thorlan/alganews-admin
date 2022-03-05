import { User, UserService } from "orlandini-sdk";
import { useCallback, useState } from "react";

export default function useUser() {
    const [user, setUser] = useState<User.Detailed>();

    const fetchUser = useCallback((id: number) => {
        UserService.getDetailedUser(id).then(setUser);
    }, [])

    return {
        user,
        fetchUser
    }
}