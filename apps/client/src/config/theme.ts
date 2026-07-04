import type { ColorScheme, Theme } from '@/types/theme';

export const THEMES = ['default', 'claude'] as const;

export const COLOR_SCHEMES = ['system', 'light', 'dark'] as const;

export const DEFAULT_THEME: Theme = 'default';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'dark';

export const THEME_STORAGE_KEY = 'theme';

export const COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
