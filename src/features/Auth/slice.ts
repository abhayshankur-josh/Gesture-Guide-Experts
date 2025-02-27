import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthState = {
    token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearAuthToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    }
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;