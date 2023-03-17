import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserResponse, UserRegisterInput, UserLoginInput } from '../../models/user.types';
import { API_ROOT_URL } from './helpers';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT_URL }),
  endpoints: (build) => ({
    userRegisterRequest: build.mutation<UserResponse, UserRegisterInput>({
      query: (userRegister) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: { ...userRegister },
      }),
    }),
    userLoginRequest: build.mutation<UserResponse, UserLoginInput>({
      query: (userLogin) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: { ...userLogin },
      }),
    }),
  }),
});

export const { useUserRegisterRequestMutation, useUserLoginRequestMutation } = authApi;
