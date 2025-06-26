import React from 'react';

import { useRouter } from 'next/navigation';

import AuthForm from '@/components/auth/AuthForm';

import { SignupFormData } from '@/types/auth';
interface SignupFormProps {
  onSignup?: (data: SignupFormData) => void;
  onToggleToSignin?: () => void;
  initialData?: Partial<SignupFormData>;
}

const SignupForm = ({ onSignup, onToggleToSignin, initialData }: SignupFormProps) => {
  const router = useRouter();
  const handleSubmit = (data: SignupFormData) => {
    onSignup?.(data);
  };

  const handleToggleToSignin = () => {
    router.push('/auth/signin');
    onToggleToSignin?.();
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
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
