'use server';

import { revalidatePath } from 'next/cache';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 로그인 액션
export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: '이메일과 비밀번호를 입력해주세요.' };
  }

  try {
    // Server Action용 Supabase 클라이언트 직접 생성
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
            } catch {
              // Server Action에서는 쿠키 설정 무시
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('로그인 에러:', error);
      return { success: false, error: '이메일 또는 비밀번호가 잘못되었습니다.' };
    }

    if (data.user) {
      revalidatePath('/', 'layout');
      return { success: true };
    }

    return { success: false, error: '로그인에 실패했습니다.' };
  } catch (error) {
    console.error('로그인 예외:', error);
    return { success: false, error: '로그인 중 오류가 발생했습니다.' };
  }
};

// 로그아웃 액션
export const signOutAction = async () => {
  try {
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
            } catch {
              // Server Action에서는 쿠키 설정 무시
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 에러:', error);
      return { success: false, error: '로그아웃에 실패했습니다.' };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('로그아웃 예외:', error);
    return { success: false, error: '로그아웃 중 오류가 발생했습니다.' };
  }
};
