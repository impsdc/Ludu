import { UserLoged, LoginPayload, UserCreate } from '../../models/states/User';
import { emptySplitApi } from './api';

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserLoged, UserCreate>({
      query: (userToSubscribe) => ({
        url: '/local/register',
        method: 'POST',
        body: userToSubscribe,
      }),
    }),
    login: builder.mutation<UserLoged, LoginPayload>({
      query: (userToLogin) => ({
        url: '/local/login',
        method: 'POST',
        body: userToLogin,
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: '/local/refresh',
        method: 'GET',
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/local/logout',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshQuery,
  useLogoutQuery,
  useLazyLogoutQuery,
} = extendedApi;
