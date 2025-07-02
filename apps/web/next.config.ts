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

  // Vercel에서 Prisma 바이너리 파일 포함 보장
  outputFileTracingIncludes: {
    '/api/**/*': [
      '../../packages/db/src/generated/**',
      '../../packages/db/src/generated/libquery_engine-*',
      '../../packages/db/src/generated/query_engine-*',
    ],
  },
  // 서버리스 함수에서 바이너리 처리 개선
  serverComponentsExternalPackages: ['@prisma/engines'],

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
    }

    return config;
  },
};

export default nextConfig;
