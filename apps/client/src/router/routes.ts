import { authRoutes } from '@/features/auth';
import { landingPageRoutes } from '@/features/landing-page';

export const routes = [...authRoutes, ...landingPageRoutes];
