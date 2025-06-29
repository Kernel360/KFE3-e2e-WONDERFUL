import { NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// 미들웨어용 Supabase 클라이언트 생성 유틸리티
/**
 * @param request - Next.js 요청 객체
 * @returns Supabase 클라이언트와 응답 객체
 */
export const createMiddlewareClient = (request: NextRequest) => {
  // 응답 객체를 한 번만 생성
  const response = NextResponse.next({
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
        // 요청과 응답 모두에 쿠키 설정 (동일한 응답 객체 재사용)
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  return { supabase, response };
};

/**
 * 사용자 인증 상태를 확인하고 적절한 응답을 반환합니다.
 * @param request - Next.js 요청 객체
 * @returns 처리된 응답 또는 null (계속 진행)
 */
export const handleAuthRoutes = async (
  request: NextRequest,
  user: any, // Supabase 사용자 객체
  authRoutes: string[]
): Promise<NextResponse | null> => {
  const { pathname } = request.nextUrl;

  // 인증된 사용자가 인증 페이지 접근 시 리다이렉트
  if (authRoutes.some((route) => pathname.startsWith(route)) && user) {
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get('redirectTo');
    const destination = redirectTo || '/';

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 [Authenticated Redirect] ${pathname} → ${destination}`);
    }

    return NextResponse.redirect(new URL(destination, request.url));
  }

  return null;
};
