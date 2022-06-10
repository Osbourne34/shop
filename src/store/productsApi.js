import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getProducts: build.query({
            query: (page) => ({ url: `/products?_page=${page}&_limit=12` }),
            transformResponse(apiResponse, meta) {
                return {
                    apiResponse,
                    totalCount: Number(
                        meta.response.headers.get('X-Total-Count'),
                    ),
                };
            },
        }),
        getAllProducts: build.query({
            query: () => ({
                url: '/products',
            }),
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `/products/${id}`,
            }),
        }),
    }),
});

export const {
    useLazyGetProductsQuery,
    useGetAllProductsQuery,
    useGetProductQuery,
} = productsApi;
