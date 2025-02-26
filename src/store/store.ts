import { configureStore } from '@reduxjs/toolkit'
import { loginApi } from '../features/Login/api';
import { rootReducer } from '../reducers/rootReducer';
import { signupApi } from '../features/Signup/api';
import { submissionsApi } from '../features/Approval/api';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            loginApi.middleware,
            signupApi.middleware,
            submissionsApi.middleware
        ]),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;