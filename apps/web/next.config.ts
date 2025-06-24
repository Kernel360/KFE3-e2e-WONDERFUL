import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // optimizeFonts: true, (Next.js 15에서 자동으로 최적화됨)
  // experimental: {
  //   serverComponentsExternalPackages: ['@repo/db', '@prisma/client'],
  // },
  // Next.js 15에서 변경된 설정
  serverExternalPackages: ['@repo/db', '@prisma/client'], // experimental.serverComponentsExternalPackages 대신

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
    return config;
  },
};

export default nextConfig;
