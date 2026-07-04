import type { THEMES, COLOR_SCHEMES } from '@/config/theme';

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export type ResolvedColorScheme = 'light' | 'dark';

export type Theme = (typeof THEMES)[number];
