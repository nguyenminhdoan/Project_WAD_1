import { apiSlice } from '../api/apiSlice';
import { apiConfig } from '../../config/apiConfig';


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => apiConfig.endpoints.products.list,
            providesTags: ['Products']
        }),
        getProductById: builder.query({
            query: (id) => apiConfig.endpoints.products.getById(id),
            providesTags: (result, error, id) => [{ type: 'Products', id }]
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: apiConfig.endpoints.products.create,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...product }) => ({
                url: apiConfig.endpoints.products.update(id),
                method: 'PUT',
                body: product
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: apiConfig.endpoints.products.delete(id),
                method: 'DELETE'
            }),
            invalidatesTags: ['Products']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApiSlice;
