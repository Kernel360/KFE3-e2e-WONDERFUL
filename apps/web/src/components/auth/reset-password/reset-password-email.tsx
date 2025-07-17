'use client';

import React from 'react';

interface ResetPasswordEmailProps {
  email: string;
  onNext: () => void;
}

const ResetPasswordEmail = ({ email, onNext }: ResetPasswordEmailProps) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <p className="mb-2 text-base text-neutral-600">
          <span className="text-primary-500 font-medium">{email}</span>로
        </p>
        <p className="mb-1 text-base text-neutral-600">비밀번호 재설정 링크를 전송했습니다.</p>
      </div>

      <div className="mb-6 flex items-center justify-center">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">!</span>
        </div>
        <span className="ml-2 text-sm text-neutral-600">
          이메일을 확인하고 링크를 클릭해주세요.
        </span>
      </div>

      <div className="mt-[26px]">
        <button
          onClick={handleNext}
          className="bg-primary-500 hover:bg-primary-600 h-[60px] w-[326px] rounded-md font-medium text-white transition-colors"
        >
          링크를 클릭했습니다
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
