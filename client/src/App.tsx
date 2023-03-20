import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//?Is correct lazy loading like this in new react router dom version?

import { AdminProtectedRoute, UserProfileProtectedRoute } from './pages/Protected-routes';

const MainLayout = lazy(() => import('./pages/Main/MainLayout'));
const HomePage = lazy(() => import('./pages/Main/Home/HomePage'));
const AboutUsPage = lazy(() => import('./pages/Main/about-us/AboutUsPage'));
const CompaniesPage = lazy(() => import('./pages/Main/companies/CompaniesPage'));
const SingleCompanyPage = lazy(() => import('./pages/Main/companies/single-company/SingleCompanyPage'));

const AuthLayout = lazy(() => import('./pages/auth/AuthLayout'));
const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage'));
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));

const UserProfilePage = lazy(() => import('./pages/user/UserProfilePage'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AllAdminCompanies = lazy(() => import('./pages/admin/all-admin-companies/AllAdminCompanies'));
const AddAdminCompany = lazy(() => import('./pages/admin/add-company/AdminAddCompany'));
const AdminEditCompany = lazy(() => import('./pages/admin/edit-company/AdminEditCompany'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<h1>Loading..</h1>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutUsPage />,
      },
      {
        path: '/companies',
        element: <CompaniesPage />,
      },
      {
        path: '/company/:companyId',
        element: <SingleCompanyPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<div>Loading..</div>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<div>Loading..</div>}>
        <UserProfileProtectedRoute>
          <UserProfilePage />
        </UserProfileProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/admin-dashboard',
    element: (
      <Suspense fallback={<div>Loading..</div>}>
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AllAdminCompanies />,
      },
      {
        path: '/admin-dashboard/add-company',
        element: <AddAdminCompany />,
      },
      {
        path: '/admin-dashboard/edit-company/:companyIdEdit',
        element: <AdminEditCompany />,
      },
    ],
  },
]);

export default appRouter;
