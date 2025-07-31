import { createClient } from '../supabase/client';

// 클라이언트용 함수
export const getCurrentUserClient = async () => {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('클라이언트 사용자 정보 조회 에러:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('클라이언트 사용자 정보 조회 예외:', error);
    return null;
  }
};
