import { config as baseConfig } from './packages/eslint-config/base.js';

export default [
  ...baseConfig,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      'pnpm-lock.yaml',
      'turbo.json',
    ],
  },
];
