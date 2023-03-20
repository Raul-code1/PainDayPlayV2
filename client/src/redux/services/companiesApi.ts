/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/named */
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';

import { CompaniesResponse, SingleCompanyResponse } from '../../models/companies.types';
import { API_ROOT_URL } from './helpers';
import { RootState } from '../store';
import { CompanyInfo } from '../../pages/admin/components/AddAndEditForm';
import { CustomErrorResponse } from './commentsApi';

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
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
  tagTypes: ['Company'],
  endpoints: (build) => ({
    getAllCompanies: build.query<CompaniesResponse, { category: string; pricing: string }>({
      query: ({ category, pricing }) => `/api/v1/companies?category=${category}&price=${pricing}`,
      providesTags: ['Company'],
    }),
    getSingleCompany: build.query<SingleCompanyResponse, string>({
      query: (companyId) => `/api/v1/company/${companyId}`,
      providesTags: ['Company'],
    }),
    createAdminCompany: build.mutation<SingleCompanyResponse, Partial<CompanyInfo>>({
      query: (company) => ({
        url: `/api/v1/company`,
        method: 'POST',
        body: { ...company },
      }),
      invalidatesTags: ['Company'],
    }),
    uploadImageCompany: build.mutation<{ imageUrl: string }, Partial<globalThis.FormData>>({
      query: (formData) => ({
        url: `/api/v1/company/upload-image`,
        method: 'POST',
        body: formData,
      }),
    }),
    updateAdminCompany: build.mutation<SingleCompanyResponse, { company: CompanyInfo; id: string }>({
      query: ({ company, id }) => ({
        url: `/api/v1/company/${id}`,
        method: 'PATCH',
        body: { ...company },
      }),
      invalidatesTags: ['Company'],
    }),
    deleteAdminCompany: build.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/api/v1/company/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetSingleCompanyQuery,
  useCreateAdminCompanyMutation,
  useUploadImageCompanyMutation,
  useUpdateAdminCompanyMutation,
  useDeleteAdminCompanyMutation,
} = companiesApi;
