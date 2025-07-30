import { createClient } from '@/lib/supabase/server';

// 현재 인증된 사용자 정보를 가져오는 함수(서버용 함수)
export const getCurrentUser = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // AuthSessionMissingError는 정상적인 상황 (로그인하지 않은 사용자)
    if (error?.message === 'Auth session missing!') {
      return null;
    }

    if (error) {
      console.error('사용자 정보 조회 에러:', error);
      return null;
    }

    return user;
  } catch (error: any) {
    // AuthSessionMissingError는 로그 출력하지 않음
    if (error?.message !== 'Auth session missing!') {
      console.error('사용자 정보 조회 예외:', error);
    }
    return null;
  }
};

// 인증된 사용자 여부 확인 함수
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};
