import { Category } from '../../models/states/Category';
import { emptySplitApi } from './api';

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, { name: string }>({
      query: (categoryToCreate) => ({
        url: '/category',
        method: 'POST',
        body: categoryToCreate,
      }),
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (categoryToUpdate) => ({
        url: `/category/${categoryToUpdate._id}`,
        method: 'PUT',
        body: categoryToUpdate,
      }),
    }),
    deleteCategory: builder.mutation<Category, { _id: string }>({
      query: (categoryToDelete) => ({
        url: `/category/${categoryToDelete._id}`,
        method: 'DELETE',
      }),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: '/category',
      }),
    }),
    getCategoryById: builder.query<Category, { _id: string }>({
      query: (category) => ({
        url: `/category/${category._id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = extendedApi;
