/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';

import { API_ROOT_URL } from './helpers';
import {
  CommentsResponse,
  CreateCommentsResponse,
  DeleteCommentsResponse,
  UpdateCommentsResponse,
} from '../../models/comments.types';
import { RootState } from '../store';

export interface CustomErrorResponse {
  status: number;
  data: {
    msg: string;
  };
}

export const commentsAPI = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErrorResponse, any>,
  tagTypes: ['Comments'],
  endpoints: (build) => ({
    getAllCommentsForCompany: build.query<CommentsResponse, string>({
      query: (companyId) => `/api/v1/comments/${companyId}`,
      providesTags: ['Comments'],
    }),
    createComment: build.mutation<CreateCommentsResponse, { text: string; companyId: string }>({
      query: ({ text, companyId }) => ({
        url: `api/v1/comment`,
        method: 'POST',
        body: { text, companyId },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: build.mutation<DeleteCommentsResponse, string>({
      query: (commentId) => ({
        url: `/api/v1/comment/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: build.mutation<UpdateCommentsResponse, { text: string; commentId: string }>({
      query: ({ text, commentId }) => ({
        url: `/api/v1/comment/${commentId}`,
        method: 'PATCH',
        body: { text },
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetAllCommentsForCompanyQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentsAPI;
