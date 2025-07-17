'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface FindEmailSuccessProps {
  userInfo: {
    username: string;
    email: string;
  };
}

const FindEmailSuccess = ({ userInfo }: FindEmailSuccessProps) => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push('/auth/signin');
  };

  const handleGoToResetPW = () => {
    router.push('/auth/reset-password');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <p className="text-base text-neutral-600">
          <span className="font-medium text-neutral-900">{userInfo.username}</span>님이 가입하신
          이메일은
        </p>
        <p className="text-primary-500 mt-1 text-lg font-semibold">{userInfo.email}</p>
        <p className="mt-1 text-base text-neutral-600">입니다.</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">!</span>
        </div>
        <span className="ml-2 text-sm text-neutral-600">
          전체 이메일은 보안상의 이유로 보이지 않습니다.
        </span>
      </div>

      <div className="mt-[40px] flex w-[327px] flex-col space-y-3">
        <Button onClick={handleGoToLogin} size="lg" fullWidth className="h-[54px]">
          로그인
        </Button>

        <Button
          onClick={handleGoToResetPW}
          variant="outline"
          size="lg"
          fullWidth
          className="h-[54px]"
        >
          비밀번호 찾기
        </Button>
      </div>
    </div>
  );
};

export default FindEmailSuccess;
