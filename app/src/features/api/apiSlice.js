import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiConfig } from '../../config/apiConfig';
import { logout } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.log('401 error, authentication failed');
        api.dispatch(logout());
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Products', 'User', 'Auth', 'Profile'],
    endpoints: () => ({})
});