'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SigninForm from '@/components/auth/signin-form';
import { signInAction } from '@/lib/actions/auth.action';
import { SigninFormData, ServerErrorInfo } from '@/lib/types/auth';

const SigninPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInfo | null>(null);

  const parseServerError = (errorMessage: string): ServerErrorInfo => {
    // Supabase 로그인 실패 (이메일 또는 비밀번호 오류)
    if (
      errorMessage.includes('이메일 또는 비밀번호가 잘못되었습니다') ||
      errorMessage.includes('Invalid login credentials')
    ) {
      return {
        type: 'invalid_password',
        message: '이메일 또는 비밀번호를 확인해주세요.',
        field: 'password',
      };
    }

    if (errorMessage.includes('비밀번호')) {
      return {
        type: 'invalid_password',
        message: '비밀번호가 일치하지 않습니다.',
        field: 'password',
      };
    }

    // 기본 에러
    return {
      type: 'validation_error',
      message: errorMessage,
    };
  };

  const handleLogin = async (data: SigninFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const result = await signInAction(formData);

      // 성공 시 홈페이지로 이동
      if (result && result.success) {
        router.push('/');
        return;
      }

      // 에러 처리
      if (result && !result.success && result.error) {
        const errorInfo = parseServerError(result.error);
        setServerError(errorInfo);
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setServerError({
        type: 'validation_error',
        message: '로그인 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SigninForm onLogin={handleLogin} isSubmitting={isSubmitting} serverError={serverError} />
    </div>
  );
};

export default SigninPage;
