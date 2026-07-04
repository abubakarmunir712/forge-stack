import * as React from 'react';

import type { ColorScheme, ResolvedColorScheme, Theme } from '@/types/theme';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;

  themeStorageKey?: string;
  colorSchemeStorageKey?: string;

  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  colorScheme: ColorScheme;

  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
};

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined);

function getSystemColorScheme(): ResolvedColorScheme {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light';
}

function disableTransitionsTemporarily() {
  const style = document.createElement('style');

  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;transition:none!important}',
    ),
  );

  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove();
      });
    });
  };
}

export function ThemeProvider({
  children,

  defaultTheme = 'default',
  defaultColorScheme = 'system',

  themeStorageKey = 'theme',
  colorSchemeStorageKey = 'color-scheme',

  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    return (localStorage.getItem(themeStorageKey) as Theme | null) ?? defaultTheme;
  });

  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(() => {
    return (
      (localStorage.getItem(colorSchemeStorageKey) as ColorScheme | null) ?? defaultColorScheme
    );
  });

  React.useEffect(() => {
    localStorage.setItem(themeStorageKey, theme);
  }, [theme, themeStorageKey]);

  React.useEffect(() => {
    localStorage.setItem(colorSchemeStorageKey, colorScheme);
  }, [colorScheme, colorSchemeStorageKey]);

  React.useEffect(() => {
    const root = document.documentElement;

    const resolvedColorScheme = colorScheme === 'system' ? getSystemColorScheme() : colorScheme;

    const restore = disableTransitionOnChange ? disableTransitionsTemporarily() : undefined;

    root.dataset.theme = theme;
    root.dataset.colorScheme = resolvedColorScheme;

    restore?.();
  }, [theme, colorScheme, disableTransitionOnChange]);

  React.useEffect(() => {
    if (colorScheme !== 'system') return;

    const media = window.matchMedia(COLOR_SCHEME_QUERY);

    const listener = () => {
      document.documentElement.dataset.colorScheme = getSystemColorScheme();
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [colorScheme]);

  const value = React.useMemo(
    () => ({
      theme,
      colorScheme,

      setTheme,
      setColorScheme,
    }),
    [theme, colorScheme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}
