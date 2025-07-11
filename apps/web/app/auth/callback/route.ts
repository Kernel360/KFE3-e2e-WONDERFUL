import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    try {
      console.log('인증 코드 처리 시작...');

      const cookieStore = await cookies();

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch (error) {
                console.warn('쿠키 설정 실패:', error);
              }
            },
          },
        }
      );

      // 인증 코드를 토큰으로 교환
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('소셜 로그인 콜백 에러:', error);
        const errorUrl = `${origin}/auth/signin?error=auth_callback_error&message=${encodeURIComponent(error.message)}`;
        return NextResponse.redirect(errorUrl);
      }

      if (data.user) {
        console.log('소셜 로그인 성공:', {
          id: data.user.id,
          email: data.user.email,
          provider: data.user.app_metadata?.provider,
        });

        // 성공 시 홈으로 리다이렉트
        const successUrl = `${origin}${next}`;
        return NextResponse.redirect(successUrl);
      } else {
        console.error('사용자 데이터 없음');
        return NextResponse.redirect(`${origin}/auth/signin?error=no_user_data`);
      }
    } catch (error) {
      console.error('소셜 로그인 콜백 예외:', error);
      const exceptionUrl = `${origin}/auth/signin?error=callback_exception&message=${encodeURIComponent(String(error))}`;
      return NextResponse.redirect(exceptionUrl);
    }
  }

  // 코드가 없거나 처리 실패 시 로그인 페이지로
  const noCodeUrl = `${origin}/auth/signin?error=no_auth_code`;

  return NextResponse.redirect(noCodeUrl);
}
