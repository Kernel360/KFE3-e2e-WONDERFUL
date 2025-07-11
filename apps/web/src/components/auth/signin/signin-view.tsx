'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import SigninForm from '@/components/auth/signin/signin-form';
import GoogleLoginButton from '@/components/auth/signin/google-login-buttons';

const SigninView = () => {
  const router = useRouter();

  const handleSigninSuccess = () => {
    // 로그인 성공 시 홈으로 리다이렉트
    router.push('/');
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        로그인
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <SigninForm onSuccess={handleSigninSuccess} />

        <div className="mt-[40px] flex items-center justify-center gap-6 px-[98px]">
          <GoogleLoginButton />

          <GoogleLoginButton />

          <GoogleLoginButton />
        </div>

        {/* 회원가입으로 이동 */}
        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">계정이 없으신가요? </span>
          <span
            onClick={handleSignUp}
            className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
          >
            회원 가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninView;
