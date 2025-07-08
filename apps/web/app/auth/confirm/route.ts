import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

import { createServerComponentClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash'); // 인증 토큰
  const type = searchParams.get('type') as EmailOtpType | null; //인증 타입
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createServerComponentClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash, // 토큰으로 실제 인증 처리
    });

    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next); // 인증 성공 -> next 파라미터 경로 또는 홈으로
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error'); // 인증 실패 -> 에러페이지
}
