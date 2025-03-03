import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../constants/apiConstants';
import { AppRootState } from '../store/store';
import { logoutApi, useLogoutMutation } from '../features/Auth/api';
import { removeProfileDetails } from '../features/Profile/slice';
import { clearAuthToken } from '../features/Auth/slice';
import { useEffect } from 'react';

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_ROUTES.BASE_URL + API_ROUTES.VERSIONS.V1,
    prepareHeaders: (headers, { getState }) => {
        // const token = (getState() as AppRootState).authSlice.token || localStorage.getItem('token');
        const token = (getState() as AppRootState).authSlice.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Assuming 401 status code is for token expiration
    const { error } = await api.dispatch(logoutApi.endpoints.logout.initiate());

    if (!error) {
      // Logout was successful, remove profile details and clear auth token
      api.dispatch(removeProfileDetails());
      api.dispatch(clearAuthToken());

      // Optionally, you can show an alert here
      alert('Token has expired! Please login again.');

      // Redirect to login page
      window.location.href = '/login';
    } else {
      // Handle logout error if needed
      console.error('Logout failed:', error);
    }
  }
  
  return result;
};

export default baseQueryWithReauth;
