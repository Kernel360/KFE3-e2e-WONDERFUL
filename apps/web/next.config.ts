import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // optimizeFonts: true, (Next.js 15에서 자동으로 최적화됨)
  // experimental: {
  //   serverComponentsExternalPackages: ['@repo/db', '@prisma/client'],
  // },
  // Next.js 15에서 변경된 설정
  serverExternalPackages: ['@prisma/client'], // experimental.serverComponentsExternalPackages 대신

  // Turborepo 모노레포에서 workspace 패키지 transpile
  transpilePackages: ['@repo/db', '@repo/ui'],

  // Vercel 배포를 위한 standalone 출력 설정 추가
  output: 'standalone',

  // 클라이언트 사이드에서 Prisma 실행 방지를 위한 추가 설정
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    // 서버 사이드에서 Prisma 바이너리 처리 추가
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });

      // Prisma 모노레포 워크어라운드 플러그인 추가 (require 방식)
      const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'wonderful-team',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
