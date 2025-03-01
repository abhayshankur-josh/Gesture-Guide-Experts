import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import { AppRootState } from "../../store/store";
import { IRequest, IResponse } from "../../constants/apiDataTypes";

// Function to dynamically add the Authorization header
const baseQueryWithAuthForLogout = fetchBaseQuery({
    baseUrl: API_ROUTES.BASE_URL + API_ROUTES.VERSIONS.V1,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AppRootState).authSlice.token || localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const logoutApi = createApi({
    reducerPath: 'logoutApi',
    baseQuery: baseQueryWithAuthForLogout,
    endpoints: (builder) => ({
        logout: builder.mutation<IResponse, void>({
            query: () => ({
                url: API_ROUTES.AUTH.LOGOUT,
                method: 'DELETE',
            })
        })
    })
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_ROUTES.BASE_URL+API_ROUTES.VERSIONS.V1 }),
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, IAuthLoginRequest>({
            query: (body) => ({
                url: API_ROUTES.AUTH.LOGIN,
                method: 'POST',
                body,
            }),
        }),
        signup: builder.mutation<IAuthResponse, IAuthSignupRequest>({
            query: (body) => ({
                url: API_ROUTES.AUTH.SIGNUP,
                method: 'POST',
                body,
            }),
        })
    }),
});

export const {
    useSignupMutation,
    useLoginMutation
} = authApi;

export const { useLogoutMutation } = logoutApi;