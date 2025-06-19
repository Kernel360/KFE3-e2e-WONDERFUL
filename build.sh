#!/bin/sh

# 오류 발생 시 스크립트 중단
set -e

echo "🏗️  Starting build process..."

# web 앱 디렉토리로 이동
cd apps/web || exit 1

echo "📦 Installing dependencies..."
pnpm install

echo "🔨 Building application..."
pnpm build

# 루트로 돌아가기
cd ../..

echo "📁 Preparing output directory..."
# 기존 output 디렉토리 제거 후 새로 생성
rm -rf output
mkdir -p output

# 필요한 파일들 복사
echo "📋 Copying build files..."
cp -R apps/web/.next output/.next
cp -R apps/web/public output/public
cp apps/web/package.json output/package.json
cp apps/web/next.config.ts output/next.config.ts

# pnpm-lock.yaml 파일이 있으면 복사
if [ -f "apps/web/pnpm-lock.yaml" ]; then
  cp apps/web/pnpm-lock.yaml output/pnpm-lock.yaml
elif [ -f "pnpm-lock.yaml" ]; then
  cp pnpm-lock.yaml output/pnpm-lock.yaml
fi

# Vercel 설정 파일 복사 (있다면)
if [ -f "apps/web/vercel.json" ]; then
  cp apps/web/vercel.json output/vercel.json
fi

echo "✅ Build completed successfully!"
echo "📦 Output directory contents:"
ls -la output/