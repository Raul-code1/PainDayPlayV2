import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//?Is correct lazy loading like this in new react router dom version?

const MainLayout = lazy(() => import('./pages/Main/components/MainLayout'));
const HomePage = lazy(() => import('./pages/Main/Home/HomePage'));
const AboutUsPage = lazy(() => import('./pages/Main/about-us/AboutUsPage'));
const CompaniesPage = lazy(() => import('./pages/Main/companies/CompaniesPage'));

const AuthLayout = lazy(() => import('./pages/auth/AuthLayout'));
const RegisterPage = lazy(() => import('./pages/auth/register/RegisterPage'));
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));

const UserProfilePage = lazy(() => import('./pages/user/UserProfilePage'));

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
        <UserProfilePage />
      </Suspense>
    ),
  },
]);

export default appRouter;
