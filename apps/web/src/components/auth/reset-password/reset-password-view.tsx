'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form';
import { Button } from '@/components/ui/button';

const ResetPasswordView = () => {
  const router = useRouter();
  const [showSuccessButton, setShowSuccessButton] = useState(false);

  const handleResetSuccess = () => {
    console.log('비밀번호 재설정 성공');
    setShowSuccessButton(true);
  };

  const handleGoToLogin = () => {
    router.push('/auth/signin');
  };

  const handleGoToFindEmail = () => {
    router.push('/auth/find-email');
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        비밀번호 찾기
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <ResetPasswordForm onSuccess={handleResetSuccess} />

        {/* 완료 시 로그인 버튼 */}
        {showSuccessButton && (
          <div className="mt-[40px]">
            <Button onClick={handleGoToLogin} size="lg" fullWidth className="h-[54px] w-[327px]">
              로그인
            </Button>
          </div>
        )}

        {/* 하단 안내 텍스트 */}
        <div className="mt-6 whitespace-nowrap text-center">
          {showSuccessButton ? (
            <span className="text-sm text-neutral-600">
              로그인 페이지로 이동하여 새 비밀번호로 로그인하세요.
            </span>
          ) : (
            <>
              <span className="text-sm text-neutral-600">계정이 기억나지 않으신가요? </span>
              <span
                onClick={handleGoToFindEmail}
                className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
              >
                이메일 찾기
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordView;
