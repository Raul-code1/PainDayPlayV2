import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './slices/user.slice';
import { authApi } from './services/authApi';
import { companiesApi } from './services/companiesApi';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,

    [authApi.reducerPath]: authApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(companiesApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
