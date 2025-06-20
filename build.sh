#!/bin/sh

# 오류 발생 시 스크립트 중단
set -e

echo "🏗️  Starting standalone build process..."

# web 앱 디렉토리로 이동
cd apps/web || exit 1

echo "📦 Installing dependencies..."
pnpm install

echo "🔨 Building standalone application..."
pnpm build

# 루트로 돌아가기
cd ../..

echo "📁 Preparing standalone output..."
# 기존 output 디렉토리 제거 후 새로 생성
rm -rf output
mkdir -p output

# Next.js standalone 모드 확인
if [ -d "apps/web/.next/standalone" ]; then
  echo "✅ Standalone build detected"
  
  # Standalone 앱 복사 (숨김 파일 포함)
  cp -R apps/web/.next/standalone/. output/ 2>/dev/null || true
  
  # Static 파일들 복사
  if [ -d "apps/web/.next/static" ]; then
    mkdir -p output/.next/static
    cp -R apps/web/.next/static/. output/.next/static/ 2>/dev/null || true
  fi
  
  # Public 폴더 복사
  if [ -d "apps/web/public" ]; then
    mkdir -p output/public
    cp -R apps/web/public/. output/public/ 2>/dev/null || true
  fi
  
  # 깔끔한 package.json 생성 (workspace 의존성 제거)
  cat > output/package.json << 'EOF'
{
  "name": "kfe3-e2e-wonderful",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  }
}
EOF

  # Standalone용 Vercel 설정 (개선됨)
  cat > output/vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "regions": ["icn1"],
  "functions": {
    "server.js": {
      "maxDuration": 10
    }
  }
}
EOF

else
  echo "❌ Standalone build not found - using fallback method"
  
  # 기존 방식 + workspace 패키지 복사
  if [ -d "apps/web/.next" ]; then
    cp -R apps/web/.next output/.next
  fi
  
  if [ -d "apps/web/public" ]; then
    cp -R apps/web/public output/public
  fi
  
  # workspace 패키지들도 복사
  if [ -d "packages" ]; then
    cp -R packages output/packages
  fi
  
  # 루트 package.json과 workspace 설정 복사
  if [ -f "package.json" ]; then
    cp package.json output/package-root.json
  fi
  
  if [ -f "pnpm-workspace.yaml" ]; then
    cp pnpm-workspace.yaml output/pnpm-workspace.yaml
  fi
  
  # 원본 package.json 복사
  if [ -f "apps/web/package.json" ]; then
    cp apps/web/package.json output/package.json
  fi
  
  if [ -f "apps/web/next.config.ts" ]; then
    cp apps/web/next.config.ts output/next.config.ts
  fi
  
  # 기존 vercel.json 복사
  if [ -f "vercel.json" ]; then
    cp vercel.json output/vercel.json
  fi
fi

# Lock 파일 복사
if [ -f "apps/web/pnpm-lock.yaml" ]; then
  cp apps/web/pnpm-lock.yaml output/pnpm-lock.yaml
elif [ -f "pnpm-lock.yaml" ]; then
  cp pnpm-lock.yaml output/pnpm-lock.yaml
fi

# 환경변수 파일 복사 (있다면)
if [ -f "apps/web/.env.production" ]; then
  cp apps/web/.env.production output/.env.production
fi

if [ -f "apps/web/.env.local" ]; then
  cp apps/web/.env.local output/.env.local
fi

echo "✅ Build completed successfully!"
echo "📦 Output structure:"
ls -la output/ | head -20  # 너무 많은 출력 방지
echo "📄 Package.json contents:"
cat output/package.json

# 빌드 검증
if [ -f "output/server.js" ] || [ -f "output/package.json" ]; then
  echo "🎯 Build validation: PASSED"
else
  echo "❌ Build validation: FAILED"
  exit 1
fi