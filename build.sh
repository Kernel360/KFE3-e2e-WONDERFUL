#!/bin/sh

# 오류 발생 시 스크립트 중단
set -e

echo "🏗️  Starting build for Next.js App Router with monorepo..."

# 전체 workspace 의존성 설치
echo "📦 Installing workspace dependencies..."
pnpm install --no-frozen-lockfile

# packages 먼저 빌드 (의존성 순서)
echo "🔧 Building workspace packages..."
pnpm --filter "./packages/*" build

# web 앱 빌드
echo "🎯 Building web application..."
cd apps/web
pnpm build
cd ../..

echo "✅ Build completed successfully!"

# 빌드 결과 검증
echo "🔍 Build verification:"
if [ -d "apps/web/.next" ]; then
  echo "✅ Next.js build output exists"
  echo "📁 Build output contents:"
  ls -la apps/web/.next/
  
  # App Router 특정 파일들 확인
  if [ -f "apps/web/.next/server/app-paths-manifest.json" ]; then
    echo "✅ App Router build detected"
  fi
  
  if [ -d "apps/web/.next/static" ]; then
    echo "✅ Static assets generated"
  fi
  
  if [ -d "apps/web/.next/server" ]; then
    echo "✅ Server components built"
  fi
else
  echo "❌ Build failed - .next directory not found"
  exit 1
fi

# 패키지 의존성 확인
echo "📦 Package dependencies verification:"
echo "✅ UI package: $([ -d "packages/ui/dist" ] && echo "BUILT" || echo "NOT BUILT")"
echo "✅ DB package: $([ -d "packages/db/dist" ] && echo "BUILT" || echo "NOT BUILT")"

echo "🎉 Ready for Vercel deployment!"