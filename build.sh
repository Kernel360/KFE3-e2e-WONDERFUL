#!/bin/bash

# 터보레포 빌드 스크립트
echo "🚀 Starting Turborepo build..."

# 의존성 설치
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Prisma 클라이언트 생성
echo "🗄️ Generating Prisma Client..."
pnpm db:generate

# 전체 프로젝트 빌드
echo "🔧 Building project..."
pnpm build

echo "✅ Build completed successfully!"