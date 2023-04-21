import { Copy } from '../../models/states/Copy';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createCopy: builder.mutation<Copy, { game: string; store: string }>({
      query: (copyToCreate) => ({
        url: '/copy',
        method: 'POST',
        body: copyToCreate,
      }),
    }),
    getAllCopies: builder.query<Copy[], void>({
      query: () => ({
        url: '/copy',
      }),
    }),
    getCopyById: builder.query<Copy, { _id: string | Copy }>({
      query: (game) => ({
        url: `/copy/${game._id}`,
      }),
    }),
    updateCopy: builder.mutation<Copy, Copy>({
      query: (copyToUpdate) => ({
        url: `/copy/${copyToUpdate._id}`,
        method: 'PUT',
        body: copyToUpdate,
      }),
    }),
    deleteCopy: builder.mutation<Copy, { _id: string }>({
      query: (copyToDelete) => ({
        url: `/copy/${copyToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCopyMutation,
  useUpdateCopyMutation,
  useDeleteCopyMutation,
  useGetAllCopiesQuery,
  useGetCopyByIdQuery,
} = extendedApi;
