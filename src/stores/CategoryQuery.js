import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryTagType = 'Category';

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: [categoryTagType],
  endpoints: (builder) => ({
    getCategoryById: builder.query({
      query: (id) => `categories/${id}`,
      providesTags: (result, error, id) => [{ type: categoryTagType, id }],
    }),
    getCategories: builder.query({
      query: () => `categories`,
      providesTags: (result) =>
      // is result available?
      result
        ? // successful query
          [
            ...result.map(({ id }) => ({ type: categoryTagType, id })),
            { type: categoryTagType, id: 'LIST' },
          ]
        : // an error occurred, but we still want to refetch this query when `{ type: categoryTagType, id: 'LIST' }` is invalidated
          [{ type: categoryTagType, id: 'LIST' }],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [categoryTagType],
    }),
    editCategory: builder.mutation({
      query: (body) => {
        console.log(body._id);
        return {
          url: `categories/${body._id}`,
          method: "PUT",
          body,
        }
      },
      invalidatesTags: [categoryTagType],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoriesQuery, useGetCategoryByIdQuery, useAddCategoryMutation, useEditCategoryMutation} = categoryApi;
