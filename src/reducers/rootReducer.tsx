import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from '../features/Login/slice';
import { loginApi } from '../features/Login/api';
import signupReducer from '../features/Signup/slice'
import { signupApi } from '../features/Signup/api';
import submissionsReducer from '../features/Approval/slice';
import { submissionsApi } from "../features/Approval/api";

export const rootReducer = combineReducers({
    login: loginReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    signup: signupReducer,
    [signupApi.reducerPath]: signupApi.reducer,
    submissionSlice: submissionsReducer,
    [submissionsApi.reducerPath]: submissionsApi.reducer,
});