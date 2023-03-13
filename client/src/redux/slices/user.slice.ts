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
    showSomeErrorToast: (_, { payload }: { payload: string }) => {
      toast.error(payload);
    },
  },
  extraReducers: (builder) => {
    /* Register */
    builder
      .addMatcher(authApi.endpoints.userRegisterRequest.matchFulfilled, (state, { payload }) => {
        state.user = { ...payload, isAuthenticated: true };
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addMatcher(authApi.endpoints.userRegisterRequest.matchRejected, (state) => {
        state.user = { ...UserEmptyState, isAuthenticated: false };
        userSlice.caseReducers.showSomeErrorToast(state, { payload: 'Email already registered' });
      });
    /* Login */
    builder
      .addMatcher(authApi.endpoints.userLoginRequest.matchFulfilled, (state, { payload }) => {
        state.user = { ...payload, isAuthenticated: true };
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addMatcher(authApi.endpoints.userLoginRequest.matchRejected, (state) => {
        state.user = { ...UserEmptyState, isAuthenticated: false };
        userSlice.caseReducers.showSomeErrorToast(state, { payload: 'Invalid Email or Password' });
      });
  },
});

export const { showSomeErrorToast } = userSlice.actions;
