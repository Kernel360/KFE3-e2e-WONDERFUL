'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { AuthActionResult } from '@/lib/types/auth';

//로그인 액션
export const signIn = async (formData: FormData): Promise<AuthActionResult> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      success: false,
      error: '이메일과 비밀번호를 입력해주세요.',
      field: 'email',
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('로그인 에러:', error);

      // 로그인 실패는 주로 비밀번호 필드 에러로 처리
      return {
        success: false,
        error: '이메일 또는 비밀번호가 잘못되었습니다.',
        field: 'password',
      };
    }

    if (data.user) {
      revalidatePath('/', 'layout');
      return {
        success: true,
        message: '로그인 성공',
        user: data.user,
      };
    }

    return {
      success: false,
      error: '로그인에 실패했습니다.',
      field: 'password',
    };
  } catch (error) {
    console.error('로그인 예외:', error);
    return {
      success: false,
      error: '로그인 중 오류가 발생했습니다.',
      field: 'email',
    };
  }
};

// === 회원가입 액션 ===
export const signUp = async (formData: FormData): Promise<AuthActionResult> => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return {
      success: false,
      error: '모든 필드를 입력해주세요.',
      field: 'name',
    };
  }

  try {
    const supabase = await createClient();
    // Supabase Auth로 회원가입
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
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
        error: error.message || '회원가입에 실패했습니다.',
        field: 'email',
      };
    }

    if (data.user) {
      console.log('회원가입 성공:', data.user.email);
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
      field: 'email',
    };
  } catch (error) {
    console.error('회원가입 예외:', error);
    return {
      success: false,
      error: '회원가입 중 오류가 발생했습니다.',
      field: 'email',
    };
  }
};

//로그아웃 액션
export const signOut = async (): Promise<AuthActionResult> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 에러:', error);
      return {
        success: false,
        error: '로그아웃에 실패했습니다.',
      };
    }

    revalidatePath('/', 'layout');
    return {
      success: true,
      message: '로그아웃 성공',
    };
  } catch (error) {
    console.error('로그아웃 예외:', error);
    return {
      success: false,
      error: '로그아웃 중 오류가 발생했습니다.',
    };
  }
};

//구글 로그인 액션
export const signInWithGoogle = async (): Promise<AuthActionResult> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error('구글 로그인 에러:', error);
      return {
        success: false,
        error: '구글 로그인에 실패했습니다.',
      };
    }

    if (data.url) {
      return {
        success: true,
        redirectUrl: data.url,
      };
    }

    return {
      success: false,
      error: '구글 로그인 URL 생성에 실패했습니다.',
    };
  } catch (error) {
    console.error('구글 로그인 예외:', error);
    return {
      success: false,
      error: '구글 로그인 중 오류가 발생했습니다.',
    };
  }
};
