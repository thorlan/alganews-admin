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
        return user.active
            ? UserService.deactivateExistingUser(user.id)
            : UserService.activateExistingUser(user.id)
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