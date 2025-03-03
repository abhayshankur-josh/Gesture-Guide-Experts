import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../../constants/apiConstants";
import { IResponse } from "../../constants/apiDataTypes";
import baseQueryWithReauth from "../../shared/baseQueryWithReauth";

export const submissionsApi = createApi({
    reducerPath: 'submissionsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Submissions', 'SubmissionsView', 'Activities'],
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
            invalidatesTags: ['SubmissionsView','Submissions', 'Activities'],
        }),
        createSubmission: builder.mutation<IResponse, FormData>({
            query: (body: FormData) => ({
                url: API_ROUTES.SUBMISSIONS.CREATE,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SubmissionsView','Submissions','Activities'],
        }),
        getActivity: builder.query<IResponse, void>({
            query: () => API_ROUTES.SUBMISSIONS.ACTIVITY,
            providesTags: ['Activities']
        })
    }),
});

export const {
    useSubmissionsQuery,
    useSubmissionsViewQuery,
    useSubmissionsViewForQuery,
    useActionSubmissionMutation,
    useCreateSubmissionMutation,
    useGetActivityQuery
} = submissionsApi
