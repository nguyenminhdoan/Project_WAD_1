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
        }
    // other endpoints config here
    }
};