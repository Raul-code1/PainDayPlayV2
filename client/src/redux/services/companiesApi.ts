import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CompaniesResponse, SingleCompanyResponse } from '../../models/companies.types';
import { API_ROOT_URL } from './helpers';

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT_URL }),
  endpoints: (build) => ({
    getAllCompanies: build.query<CompaniesResponse, { category: string; pricing: string }>({
      query: ({ category, pricing }) => `/api/v1/companies?category=${category}&price=${pricing}`,
    }),
    getSingleCompany: build.query<SingleCompanyResponse, string>({
      query: (companyId) => `/api/v1/company/${companyId}`,
    }),
  }),
});

export const { useGetAllCompaniesQuery, useGetSingleCompanyQuery } = companiesApi;
