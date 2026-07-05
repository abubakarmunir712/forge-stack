import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme';
import { DEFAULT_COLOR_SCHEME, DEFAULT_THEME } from '@/config/theme';
import { THEME_CONSTANTS } from '@/constants/theme';
import { router } from '@/router';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function AppProviders() {
  return (
    <ThemeProvider
      defaultTheme={DEFAULT_THEME}
      defaultColorScheme={DEFAULT_COLOR_SCHEME}
      themeStorageKey={THEME_CONSTANTS.THEME_STORAGE_KEY}
      colorSchemeStorageKey={THEME_CONSTANTS.COLOR_SCHEME_STORAGE_KEY}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" closeButton />
      </Provider>
    </ThemeProvider>
  );
}
