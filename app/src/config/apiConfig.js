const API_BASE_URL = 'http://localhost:5001/api';

export const apiConfig = {
    baseUrl: API_BASE_URL,
    endpoints: {
        products: {
            list: '/products',
            create: '/products/create',
            getById: (id) => `/products/${id}`,
            update: (id) => `/products/${id}`,
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