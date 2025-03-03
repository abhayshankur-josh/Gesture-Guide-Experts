import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import baseQueryWithReauth from "../../shared/baseQueryWithReauth";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<IProfile, void>({
            query: () => API_ROUTES.AUTH.PROFILE,
            providesTags: ['Profile']
        }),
    }),
});

export const {
    useGetProfileQuery
} = profileApi;