import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  // supabaseResponse 변수로 관리
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          //새로운 response 객체 생성
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  //개발 환경 디버깅
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 [Middleware] ${pathname} | User: ${user?.email || '❌ Anonymous'}`);
  }

  //로그인한 사용자가 인증 페이지 접근 시 리다이렉트
  if (user && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get('redirectTo');
    const destination = redirectTo || '/';

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 [Authenticated Redirect] ${pathname} → ${destination}`);
    }

    const redirectResponse = NextResponse.redirect(new URL(destination, request.url));

    //쿠키 복사
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  //로그인 안된 사용자는 auth 페이지로 리다이렉트
  if (!user && !pathname.startsWith('/auth') && !pathname.startsWith('/api/auth') && !error) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin';

    //redirectTo 파라미터 추가
    url.searchParams.set('redirectTo', pathname);

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔐 [Protected Route] ${pathname} → /auth/signin`);
    }

    const redirectResponse = NextResponse.redirect(url);

    //쿠키 복사
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  return supabaseResponse; // 최종 supabaseResponse 반환
}
