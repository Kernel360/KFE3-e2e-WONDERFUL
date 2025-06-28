// 요청이 완료되기 전에 서버에서 실행되는 코드
// 들어오는 요청에 따라 응답을 수정하거나 리다이렉트, 헤더 수정, 직접 응답 등을 할 수 있음

import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 보호된 라우트 정의 (예: 프로필, 경매, 채팅 등)
//const protectedRoutes = ['/profile', '/auction', '/chat'];

// 인증된 사용자가 접근할 수 없는 라우트 (예: 로그인, 회원가입 등)
const authRoutes = ['/auth/signin', '/auth/signup'];

export async function middleware(request: NextRequest) {
  // Supabase 클라이언트 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // 사용자 인증 상태 확인 (예: 로그인 여부)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 개발 환경 디버깅
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 [Middleware] ${pathname} | User: ${user?.email || '❌ Anonymous'}`);
  }

  // 보호된 라우트 접근 제어
  //   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
  //     if (!user || error) {
  //       console.log(`🚫 [Auth Required] ${pathname}`);

  //       const redirectUrl = new URL('/auth/signin', request.url);
  //       redirectUrl.searchParams.set('redirectTo', pathname);

  //       return NextResponse.redirect(redirectUrl);
  //     }
  //   }

  // 인증된 사용자의 인증 페이지 접근 제어
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (user && !error) {
      console.log(`🔄 [Authenticated Redirect] ${pathname} → /`);

      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // API 라우트에 사용자 정보 헤더 추가
  if (pathname.startsWith('/api/')) {
    if (user && !error) {
      response.headers.set('x-user-id', user.id);
      response.headers.set('x-user-email', user.email || '');
      response.headers.set('x-user-verified', user.email_confirmed_at ? 'true' : 'false');
    }
  }

  // 경매 관련 특별 처리
  if (pathname.startsWith('/auction/')) {
    const auctionId = pathname.split('/')[2];
    if (auctionId && user) {
      response.headers.set('x-auction-id', auctionId);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로와 매칭:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - manifest.json (PWA 매니페스트)
     * - service-worker.js (서비스 워커)
     * - 이미지 파일들 (svg, png, jpg, jpeg, gif, webp)
     * - certificates 폴더 (인증서 관련 파일)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|service-worker.js|certificates|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
