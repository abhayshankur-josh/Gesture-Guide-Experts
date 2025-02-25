import { configureStore } from '@reduxjs/toolkit'
import { loginApi } from '../features/Login/api';
import loginReducer from '../features/Login/slice';
import { signupApi } from '../features/Signup/api';
import signupReducer from '../features/Signup/slice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        signup: signupReducer,
        [signupApi.reducerPath]: signupApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;