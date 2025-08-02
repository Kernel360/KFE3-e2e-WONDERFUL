import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  transpilePackages: ['@repo/db', '@repo/ui'],
  output: 'standalone', // 배포용
  swcMinify: true, // SWC 최적화 활성화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 프로덕션에서 console 제거
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    optimizePackageImports: [
      'lodash',
      'date-fns',
      'react-icons',
      'lucide-react',
      '@radix-ui',
      '@tanstack',
    ], // 패키지 트리쉐이킹
    webpackBuildWorker: true, // 빌드 속도 향상
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'autkdwezfwdduoqiadsc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    imageSizes: [28, 40, 46, 58, 104],
    deviceSizes: [150, 375, 500],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            //MIME 타입 보호
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            //클릭재킹 방지
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            //XSS 보호
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        //폰트 캐싱
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 정적 파일 캐싱
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });

      const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    // 번들 분석기 (프로덕션 빌드 시에만)
    if (!dev && !isServer && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-analyzer-report.html',
        })
      );
    }

    // 번들 크기 최적화 (클라이언트 사이드만)
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 200000, // 200KB 제한
          cacheGroups: {
            // React 관련
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 30,
            },
            // UI 라이브러리들
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|@formkit)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 25,
            },
            // 쿼리/상태관리
            query: {
              test: /[\\/]node_modules[\\/](@tanstack|zustand)[\\/]/,
              name: 'query',
              chunks: 'all',
              priority: 20,
            },
            // Firebase/Supabase
            backend: {
              test: /[\\/]node_modules[\\/](firebase|@supabase)[\\/]/,
              name: 'backend',
              chunks: 'all',
              priority: 15,
            },
            // 기타 vendor
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              maxSize: 150000, // 150KB 제한
            },
            common: {
              minChunks: 2,
              chunks: 'all',
              name: 'common',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    config.watchOptions = {
      ignored: ['**/supabase/functions/**', '**/node_modules/**', '**/.next/**'],
    };

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
