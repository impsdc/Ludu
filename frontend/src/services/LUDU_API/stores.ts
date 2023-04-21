import { CreateStorePayload, Store } from '../../models/states/Store';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation<Store, CreateStorePayload>({
      query: (storeToCreate) => ({
        url: '/store',
        method: 'POST',
        body: storeToCreate,
      }),
    }),
    getAllStores: builder.query<Store[], void>({
      query: () => ({
        url: '/store',
      }),
    }),
    getStoreById: builder.query<Store, { _id: string }>({
      query: (store) => ({
        url: `/store/${store._id}`,
      }),
    }),
    updateStore: builder.mutation<Store, Store>({
      query: (storeToUpdate) => ({
        url: `/store/${storeToUpdate._id}`,
        method: 'PUT',
        body: storeToUpdate,
      }),
    }),
    deleteStore: builder.mutation<Store, { _id: string }>({
      query: (storeToDelete) => ({
        url: `/store/${storeToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
  useGetAllStoresQuery,
  useGetStoreByIdQuery,
} = extendedApi;
