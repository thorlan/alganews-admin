import { createAsyncThunk, createReducer, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { User, UserService } from "orlandini-sdk";

interface UserState {
    list: User.Summary[],
    fetching: boolean
}

const initialState: UserState = {
    fetching: false,
    list: []
}

export const toggleUserStatus = createAsyncThunk(
    'user/toggleUserStatus',
    async (user: User.Summary | User.Detailed) => {
        user.active
            ? await UserService.deactivateExistingUser(user.id)
            : await UserService.activateExistingUser(user.id)

        return user;
    })

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    return UserService.getAllUsers();
});

export default createReducer(initialState, (builder => {

    const success = isFulfilled(getAllUsers, toggleUserStatus);
    const error = isRejected(getAllUsers, toggleUserStatus);
    const loading = isPending(getAllUsers, toggleUserStatus);

    builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.list = action.payload;
        })
        // .addCase(toggleUserStatus.fulfilled, (state, action) => {
        //     state.list = state.list.map(user => {
        //         if (user.id === action.payload.id) {
        //             return { ...user, active: !user.active }
        //         }
        //         return user
        //     });
        // })
        .addMatcher(success, (state) => {
            state.fetching = false;
        })
        .addMatcher(error, (state) => {
            state.fetching = false;
        })
        .addMatcher(loading, (state) => {
            state.fetching = true;
        })
}));