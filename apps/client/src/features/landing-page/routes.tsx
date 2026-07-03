import { type RouteObject } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPageLayout from '@/layouts/LandingPageLayout';

export const landingPageRoutes: RouteObject[] = [
  {
    element: <LandingPageLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
];
