import { LocationAPI } from '../../models/states/Location';
import { Store } from '../../models/states/Store';
import { emptySplitApi } from './api';
import { allCat } from '../../utils/categories';

type EntityByZipCode = Array<string> | Array<Store>;

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation<LocationAPI, { name: string; postalCode: number }>({
      query: (locationToCreate) => ({
        url: '/location',
        method: 'POST',
        body: locationToCreate,
      }),
    }),
    getAllLocations: builder.query<LocationAPI[], void>({
      query: () => ({
        url: '/location',
      }),
    }),
    getEntitiesByZipCode: builder.query<
      EntityByZipCode,
      { postalCode: number; entity: string; filteredCategories: []; gameId?: string }
    >({
      query: (arg) => {
        const { postalCode, filteredCategories } = arg;
        const categories = filteredCategories.length
          ? filteredCategories.map((fc) => allCat[fc])
          : [];
        return {
          url: `/location/${postalCode}${
            categories.length ? '?categories=' + categories.join(',') : ''
          }`,
        };
        // return {
        //   url: `/location/59000${categories.length ? '?categories=' + categories.join(',') : ''}`,
        // };
      },
      transformResponse: (response: Array<LocationAPI>, meta, arg) => {
        const { entity, gameId } = arg;
        const res = [];
        if (entity == 'copies') {
          for (const location of response) {
            for (const store of location['stores']) {
              for (const copy of store['copies']) {
                const gameAlreadyInResponse = res.some((el) => el.id === copy.game[0]._id);
                if (!gameAlreadyInResponse) res.push({ id: copy.game[0]._id });
              }
            }
          }
        } else {
          for (const location of response) {
            for (const store of location['stores']) {
              res.push(store);
            }
          }
          // res = res.filter((st) =>
          //   st.copies.find((copy) => copy.convertedGameId === gameId && copy.available),
          // );
        }
        return res;
      },
    }),
    getLocationById: builder.query<LocationAPI, { _id: string }>({
      query: (location) => ({
        url: `/location/${location._id}`,
      }),
    }),
    updateLocation: builder.mutation<LocationAPI, LocationAPI>({
      query: (locationToUpdate) => ({
        url: `/location/${locationToUpdate._id}`,
        method: 'PUT',
        body: locationToUpdate,
      }),
    }),
    deleteLocation: builder.mutation<LocationAPI, { _id: string }>({
      query: (locationToDelete) => ({
        url: `/location/${locationToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
  useGetEntitiesByZipCodeQuery,
} = extendedApi;
