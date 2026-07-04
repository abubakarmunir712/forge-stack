import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme';
import {
  COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
} from '@/config/theme';
import { router } from '@/router';
import { Toaster } from '@/components/ui/sonner';

export default function AppProviders() {
  return (
    <ThemeProvider
      defaultTheme={DEFAULT_THEME}
      defaultColorScheme={DEFAULT_COLOR_SCHEME}
      themeStorageKey={THEME_STORAGE_KEY}
      colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
    >
      <RouterProvider router={router} />
      <Toaster position="bottom-right" closeButton />
    </ThemeProvider>
  );
}
