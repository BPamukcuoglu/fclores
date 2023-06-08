import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';
import LatexGenerator from './pages/dashboard/LatexGenerator';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Authentication pages
const Login = Loadable(lazy(() => import('./pages/authentication/Login')));

// Dashboard pages

const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const Analytics = Loadable(lazy(() => import('./pages/dashboard/Analytics')));
const ReportDetails = Loadable(lazy(() => import('./pages/dashboard/ReportDetails')));
const ReportList = Loadable(lazy(() => import('./pages/dashboard/ReportList')));
const PCWeights = Loadable(lazy(() => import('./pages/dashboard/PCWeights')));

// Error pages
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes: PartialRouteObject[] = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'login-unguarded',
        element: <Login />
      }
    ]
  },
  {
    path: '',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Analytics />
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'latexGenerator',
        element: <LatexGenerator />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: '',
        element: <Analytics />
      },
      {
        path: 'reports',
        children: [
          {
            path: '/',
            element: <ReportList />
          },
          {
            path: ':reportId',
            element: <ReportDetails />
          }
        ]
      },
      {
        path: 'pcweights',
        children: [
          {
            path: '/',
            element: <PCWeights />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '500',
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
