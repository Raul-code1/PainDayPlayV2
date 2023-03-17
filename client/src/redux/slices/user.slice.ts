import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { UserAppState, UserEmptyState } from '../../models/user.types';
import { authApi } from '../services/authApi';

function getUserFromLocalStorage(): UserAppState {
  const isUserLoggedIn = localStorage.getItem('user');
  return isUserLoggedIn ? JSON.parse(localStorage.getItem('user') as string) : UserEmptyState;
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: { user: getUserFromLocalStorage() },
  reducers: {
    userLogout: (state) => {
      state.user = UserEmptyState;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    /* Register */
    builder
      .addMatcher(authApi.endpoints.userRegisterRequest.matchFulfilled, (state, { payload }) => {
        state.user = { ...payload, isAuthenticated: true };
        localStorage.setItem('user', JSON.stringify(state.user));
        toast.success(`Welcome! ${state.user.name} `);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addMatcher(authApi.endpoints.userRegisterRequest.matchRejected, (_) => {
        toast.loading('Loading');
      })
      .addMatcher(authApi.endpoints.userRegisterRequest.matchRejected, (state) => {
        state.user = { ...UserEmptyState, isAuthenticated: false };
        toast.error('Email already registered');
      });
    /* Login */
    builder
      .addMatcher(authApi.endpoints.userLoginRequest.matchFulfilled, (state, { payload }) => {
        state.user = { ...payload, isAuthenticated: true };
        localStorage.setItem('user', JSON.stringify(state.user));
        toast.success(`Hello  ${state.user.name}👋 `);
      })
      .addMatcher(authApi.endpoints.userLoginRequest.matchRejected, (state) => {
        state.user = { ...UserEmptyState, isAuthenticated: false };
        toast.error('Invalid Email or Password');
      });
  },
});

export const { userLogout } = userSlice.actions;
