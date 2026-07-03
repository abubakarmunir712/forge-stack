export default {
  'apps/client/**/*.{js,jsx,ts,tsx}': [
    'pnpm --filter @forgestack/client lint --fix',
    'prettier --write',
  ],

  'apps/server/**/*.{js,ts}': [
    'pnpm --filter @forgestack/server lint --fix',
    'prettier --write',
  ],

  '*.{css,scss,json,md,mdx,yml,yaml}': [
    'prettier --write',
  ],
}