import { NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
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
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  return { supabase, supabaseResponse };
};

/**
 * 사용자 정보를 헤더에 추가하는 유틸리티
 * @param response - NextResponse 객체
 * @param user - Supabase 사용자 객체
 */
export const addUserHeaders = (response: NextResponse, user: User) => {
  if (user) {
    response.headers.set('x-user-id', user.id);
    response.headers.set('x-user-email', user.email || '');
    response.headers.set('x-user-verified', user.email_confirmed_at ? 'true' : 'false');
  }
  return response;
};

/**
 * 라우트 매칭 유틸리티
 * @param pathname - 현재 경로
 * @param routes - 확인할 라우트 배열
 * @returns 매칭 여부
 */
export const matchesRoutes = (pathname: string, routes: string[]): boolean => {
  return routes.some((route) => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname.startsWith(route);
  });
};

/**
 * 리다이렉션 URL 생성 유틸리티
 * @param targetPath - 목표 경로
 * @param baseUrl - 기본 URL
 * @param params - 추가 쿼리 파라미터
 * @returns 완성된 URL
 */
export const createRedirectUrl = (
  targetPath: string,
  baseUrl: string,
  params?: Record<string, string>
): URL => {
  const url = new URL(targetPath, baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url;
};
