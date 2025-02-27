import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import { IResponse } from "../../constants/apiDataTypes";
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

export const submissionsApi = createApi({
    reducerPath: 'submissionsApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Submissions', 'SubmissionsView'],
    endpoints: (builder) => ({
        submissions: builder.query<ISubmission[], void>({
            query: () => API_ROUTES.SUBMISSIONS.LIST,
            providesTags: ['Submissions'],
        }),
        submissionsView: builder.query<ISubmissionView[], void>({
            query: () => API_ROUTES.SUBMISSIONS.VIEW,
            providesTags: ['SubmissionsView'],
        }),
        submissionsViewFor: builder.query<ISubmissionView, string>({
            query: (id: string) => API_ROUTES.SUBMISSIONS.VIEW_DETAILS(id)
        }),
        actionSubmission: builder.mutation<IResponse, IActionSubmissionRequest>({
            query: (body) => ({
                url: API_ROUTES.SUBMISSIONS.UPDATE_ACTION,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SubmissionsView'],
        }),
    }),
});

export const {
    useSubmissionsQuery,
    useSubmissionsViewQuery,
    useSubmissionsViewForQuery,
    useActionSubmissionMutation,
} = submissionsApi
