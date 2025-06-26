import React from 'react';

import AuthForm from '@/components/auth/AuthForm';

import { SignupFormData } from '@/types/auth';

interface SignupFormProps {
  onSignup?: (data: SignupFormData) => void;
  onToggleToSignin?: () => void;
  initialData?: Partial<SignupFormData>;
}

const SignupForm = ({ onSignup, onToggleToSignin, initialData }: SignupFormProps) => {
  const handleSubmit = (data: SignupFormData) => {
    onSignup?.(data);
  };

  const handleToggleToSignin = () => {
    console.log('로그인 페이지로 이동');
    onToggleToSignin?.();
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1
        className="whitespace-nowrap text-center"
        style={{
          color: 'var(--color-neutral-900)',
          fontSize: 'var(--text-h3)',
          fontStyle: 'normal',
          fontWeight: 'var(--font-weight-bold)',
          lineHeight: 'var(--line-height-h3)',
        }}
      >
        회원 가입
      </h1>

      <div className="mt-[80px]">
        <AuthForm
          formType="signup"
          onSubmit={handleSubmit}
          onToggleForm={handleToggleToSignin}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default SignupForm;
