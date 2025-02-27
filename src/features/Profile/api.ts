import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import { AppRootState } from "../../store/store";

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

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<IProfile, void>({
            query: () => API_ROUTES.AUTH.PROFILE,
            providesTags: ['Profile'],
        })
    }),
});

export const {
    useGetProfileQuery
} = profileApi;