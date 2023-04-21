import { CreateGamePayload, Game } from '../../models/states/Game';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation<Game, CreateGamePayload>({
      query: (gameToCreate) => ({
        url: '/game',
        method: 'POST',
        body: gameToCreate,
      }),
    }),
    getAllGames: builder.query<Game[], void>({
      query: () => ({
        url: '/game',
      }),
    }),
    randomGame: builder.query<Game[], void>({
      query: () => ({
        url: `/game/random`,
        method: 'GET',
      }),
    }),
    getGameById: builder.query<Game, { _id: string }>({
      query: (game) => ({
        url: `/game/${game._id}`,
      }),
    }),
    updateGame: builder.mutation<Game, Game>({
      query: (gameToUpdate) => ({
        url: `/game/${gameToUpdate._id}`,
        method: 'PUT',
        body: gameToUpdate,
      }),
    }),
    deleteGame: builder.mutation<Game, { _id: string }>({
      query: (gameToDelete) => ({
        url: `/game/${gameToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
  useGetAllGamesQuery,
  useRandomGameQuery,
  useGetGameByIdQuery,
} = extendedApi;
