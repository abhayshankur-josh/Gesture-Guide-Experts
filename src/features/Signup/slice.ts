// src/features/Signup/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupState {
  token: string | null;
}

const initialState: SignupState = {
  token: localStorage.getItem('token'),
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { setToken } = signupSlice.actions;
export default signupSlice.reducer;
