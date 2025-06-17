import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
export default [
  // Global ignores - 다른 속성이 없으면 전역 무시로 동작
  {
    ignores: ['next.config.ts'],
  },
  ...nextJsConfig,
];
