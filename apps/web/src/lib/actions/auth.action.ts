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

// 회원가입 액션
export const signUpAction = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return {
      success: false,
      error: '모든 필드를 입력해주세요.',
      field: undefined,
    };
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

    // Supabase Auth로 회원가입
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      console.error('회원가입 에러:', error);

      // Supabase 에러 코드별 처리
      if (
        error.message.includes('User already registered') ||
        error.message.includes('already registered') ||
        error.message.includes('already been registered') ||
        error.code === 'user_already_exists'
      ) {
        return {
          success: false,
          error: '이미 사용 중인 이메일입니다.',
          field: 'email',
        };
      }

      if (
        error.message.includes('Password should be') ||
        error.message.includes('Password must be') ||
        error.code === 'weak_password'
      ) {
        return {
          success: false,
          error: '비밀번호는 6자 이상이어야 합니다.',
          field: 'password',
        };
      }

      if (
        error.message.includes('Invalid email') ||
        error.message.includes('email') ||
        error.code === 'invalid_email'
      ) {
        return {
          success: false,
          error: '올바른 이메일 형식이 아닙니다.',
          field: 'email',
        };
      }

      return {
        success: false,
        error: error.message || '회원가입에 실패했습니다. 다시 시도해주세요.',
        field: undefined,
      };
    }
    if (data.user) {
      console.log('회원가입 성공:', data.user.email);

      // 회원가입 성공 - 즉시 로그인 완료
      revalidatePath('/', 'layout');
      return {
        success: true,
        message: '회원가입이 완료되었습니다!',
        user: data.user,
      };
    }

    return {
      success: false,
      error: '회원가입에 실패했습니다.',
    };
  } catch (error) {
    console.error('회원가입 예외:', error);
    return {
      success: false,
      error: '회원가입 중 오류가 발생했습니다.',
    };
  }
};

// 구글 로그인 액션
export const signInWithGoogleAction = async () => {
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

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error('구글 로그인 에러:', error);
      return { success: false, error: '구글 로그인에 실패했습니다.' };
    }

    if (data.url) {
      return { success: true, redirectUrl: data.url };
    }

    return { success: false, error: '구글 로그인 URL 생성에 실패했습니다.' };
  } catch (error) {
    console.error('구글 로그인 예외:', error);
    return { success: false, error: '구글 로그인 중 오류가 발생했습니다.' };
  }
};
