import { type RouteObject } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
];
