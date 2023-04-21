import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { isTokenExpired } from '../jwtService';

export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://13.39.77.202',
    // baseUrl: 'http://192.168.1.131:3000',
    prepareHeaders: async (headers) => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (accessToken && !isTokenExpired(accessToken)) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      if (accessToken && isTokenExpired(accessToken)) {
        if (refreshToken && !isTokenExpired(refreshToken)) {
          try {
            const response = await fetch('http://13.39.77.202/local/refresh', {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });
            const data = await response.json();
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;
            await SecureStore.setItemAsync('accessToken', newAccessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);
            headers.set('Authorization', `Bearer ${newAccessToken}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
