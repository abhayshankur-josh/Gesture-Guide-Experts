// src/features/Signup/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../constants/apiConstants';

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface SignupResponse {
  token: string;
}

export const signupApi = createApi({
  reducerPath: 'signupApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROUTES.BASE_URL+API_ROUTES.VERSIONS.V1 }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (body) => ({
        url: API_ROUTES.AUTH.SIGNUP,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation } = signupApi;
