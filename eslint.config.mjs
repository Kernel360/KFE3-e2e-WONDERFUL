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
    rules: {
      // 상대 경로 부모 디렉토리 임포트 허용
      'import/no-relative-parent-imports': 'off',
    },
  },
];
