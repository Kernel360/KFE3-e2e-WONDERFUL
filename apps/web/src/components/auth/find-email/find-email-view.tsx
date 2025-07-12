'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import FindEmailForm from '@/components/auth/find-email/find-email-form';
import { Button } from '@/components/ui/button';

const FindEmailView = () => {
  const router = useRouter();
  const [showSuccessButtons, setShowSuccessButtons] = useState(false);

  const handleFindEmailSuccess = (userInfo: { username: string; email: string }) => {
    console.log('이메일 찾기 성공:', userInfo);
    setShowSuccessButtons(true);
  };

  const handleGoToLogin = () => {
    router.push('/auth/signin');
  };

  const handleGoToSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        이메일 찾기
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <FindEmailForm onSuccess={handleFindEmailSuccess} />

        {/* 성공 시 버튼들 */}
        {showSuccessButtons && (
          <div className="mt-[40px] flex w-[327px] flex-col space-y-3">
            <Button onClick={handleGoToLogin} size="lg" fullWidth className="h-[54px]">
              바로 로그인 하기
            </Button>

            <Button
              onClick={handleGoToSignup}
              variant="outline"
              size="lg"
              fullWidth
              className="h-[54px]"
            >
              회원가입
            </Button>
          </div>
        )}

        {/* 하단 안내 텍스트 */}
        <div className="mt-6 whitespace-nowrap text-center">
          {showSuccessButtons ? (
            <span className="text-sm text-neutral-600">
              위의 이메일로 로그인하시거나 새로 회원가입 하실수 있습니다.
            </span>
          ) : (
            <>
              <span className="text-sm text-neutral-600">혹시 아직 이메일이 없으신가요? </span>
              <span
                onClick={handleGoToSignup}
                className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
              >
                회원가입
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindEmailView;
