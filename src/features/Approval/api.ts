import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import { AppRootState } from "../../store/store";
import { Submission, SubmissionView } from "./types/approvalTypes";

// Function to dynamically add the Authorization header
const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_ROUTES.BASE_URL + API_ROUTES.VERSIONS.V1,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AppRootState).login.token || (getState() as AppRootState).signup.token || localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const submissionsApi = createApi({
    reducerPath: 'submissionsApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        submissions: builder.query<Submission[], void>({
            query: () => API_ROUTES.SUBMISSIONS.LIST,
        }),
        submissionsView: builder.query<SubmissionView[], void>({
            query: () => API_ROUTES.SUBMISSIONS.VIEW,
        }),
    }),
});

export const {
    useSubmissionsQuery,
    useSubmissionsViewQuery
} = submissionsApi
