import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiConfig } from '../../config/apiConfig';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.baseUrl,
        prepareHeaders: (headers) => {
            // const token = localStorage.getItem('token');
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`);
            // }
            return headers;
        }
    }),
    tagTypes: ['Products'],
    endpoints: () => ({})
});
