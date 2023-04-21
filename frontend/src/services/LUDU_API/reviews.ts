import { CreateReviewPayload, Review } from '../../models/states/Review';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, CreateReviewPayload>({
      query: (reviewToCreate) => ({
        url: '/review',
        method: 'POST',
        body: reviewToCreate,
      }),
    }),
    getAllReviews: builder.query<Review[], void>({
      query: () => ({
        url: '/review',
      }),
    }),
    getReviewById: builder.query<Review, { _id: string }>({
      query: (review) => ({
        url: `/review/${review._id}`,
      }),
    }),
    updateReview: builder.mutation<Review, Review>({
      query: (reviewToUpdate) => ({
        url: `/review/${reviewToUpdate._id}`,
        method: 'PUT',
        body: reviewToUpdate,
      }),
    }),
    deleteReview: builder.mutation<Review, { _id: string }>({
      query: (reviewToDelete) => ({
        url: `/review/${reviewToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
} = extendedApi;
