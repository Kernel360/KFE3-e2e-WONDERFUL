import { createClient } from '@/lib/supabase/server';

export const getCurrentUser = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('사용자 정보 조회 에러:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('사용자 정보 조회 예외:', error);
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};
