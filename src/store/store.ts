import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../reducers/rootReducer';
import { submissionsApi } from '../features/Approval/api';
import { authApi } from '../features/Auth/api';
import { profileApi } from '../features/Profile/api';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            profileApi.middleware,
            submissionsApi.middleware,
        ]),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;