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

  // Firebase 환경변수를 브라우저에서 접근 가능하게 설정
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

  // 클라이언트 사이드에서 Prisma 실행 방지를 위한 추가 설정
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // 클라이언트 사이드에서 Firebase 환경변수 접근 가능하도록 설정
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NEXT_PUBLIC_FIREBASE_API_KEY': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_API_KEY
          ),
          'process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
          ),
          'process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
          ),
          'process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
          ),
          'process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
          ),
          'process.env.NEXT_PUBLIC_FIREBASE_APP_ID': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_APP_ID
          ),
          'process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY': JSON.stringify(
            process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
          ),
        })
      );
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
    // watchOptions 설정 추가
    // Supabase Functions와 node_modules 디렉토리를 무시하여 불필요한 파일 변경 감지를 방지
    config.watchOptions = {
      ignored: ['**/supabase/functions/**', '**/node_modules'],
    };

    return config;
  },
};

export default nextConfig;
