// const API_BASE_URL = 'http://localhost:5001/api';
import {API_BASE_URL } from '../utils/constant.js'
export const apiConfig = {
    baseUrl: API_BASE_URL,
    endpoints: {
        products: {
            list: '/products',
            create: '/products/create',
            getById: (id) => `/products/${id}`,
            update: '/products/update',
            delete: (id) => `/products/${id}`
        },
        users: {
            list: '/profiles',
            create: '/profiles/create',
            getById: (id) => `/profiles/${id}`,
            update: (id) => `/profiles/${id}`,
            delete: (id) => `/profiles/${id}`
        }
    // other endpoints config here
    }
};