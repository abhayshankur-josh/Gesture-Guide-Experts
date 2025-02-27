import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/slice";
import { authApi } from "../features/Auth/api";
import submissionsReducer from '../features/Approval/slice';
import { submissionsApi } from "../features/Approval/api";
import profileReducer from '../features/Profile/slice';
import { profileApi } from "../features/Profile/api";

export const rootReducer = combineReducers({
    authSlice: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    profileSlice: profileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    submissionSlice: submissionsReducer,
    [submissionsApi.reducerPath]: submissionsApi.reducer,
});