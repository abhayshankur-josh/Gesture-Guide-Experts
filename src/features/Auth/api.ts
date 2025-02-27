import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import { AppRootState } from "../../store/store";
import { profileApi } from "../Profile/api";

// Function to dynamically add the Authorization header
const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_ROUTES.BASE_URL + API_ROUTES.VERSIONS.V1,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AppRootState).authSlice.token || localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const getProfileApiTrigger = async (_: any, { dispatch, queryFulfilled }: any) => {
    try {
        await queryFulfilled;
        dispatch(profileApi.util.invalidateTags(['Profile']));
    } catch (err) {
        // Handle error if needed
        alert('Failed to get User.');
        console.log(err);
    }
}

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
            onQueryStarted: getProfileApiTrigger,
        }),
        signup: builder.mutation<IAuthResponse, IAuthSignupRequest>({
            query: (body) => ({
                url: API_ROUTES.AUTH.SIGNUP,
                method: 'POST',
                body,
            }),
            onQueryStarted: getProfileApiTrigger,
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_ROUTES.AUTH.LOGOUT,
                method: 'DELETE',
                prepareHeaders: (headers: Headers, { getState }: { getState: () => AppRootState }) => {
                    const token = (getState() as AppRootState).authSlice.token || localStorage.getItem('token');
                            if (token) {
                                headers.set('Authorization', `Bearer ${token}`);
                            }
                    return headers
                },
            }),
        }),
      }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi;