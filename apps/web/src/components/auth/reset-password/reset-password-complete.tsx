'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ResetPasswordComplete = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary-100 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <div className="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-full">
          <Check className="h-5 w-5 stroke-[2.5px] text-white" />
        </div>
      </div>

      <div className="mb-6 text-center">
        <h3 className="mb-2 text-4xl font-semibold text-neutral-900">비밀번호 설정 완료</h3>
        <div className="mt-[40px]">
          <p className="text-base text-neutral-600">비밀번호 재설정을 완료하였습니다.</p>
          <p className="text-base text-neutral-600">안전을 위해 재로그인이 필요합니다.</p>
        </div>
      </div>

      <div className="mt-[40px]">
        <Button onClick={handleGoToLogin} size="lg" fullWidth className="h-[54px] w-[327px]">
          로그인
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordComplete;
