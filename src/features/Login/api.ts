import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../constants/apiConstants';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROUTES.BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: API_ROUTES.AUTH.LOGIN,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
