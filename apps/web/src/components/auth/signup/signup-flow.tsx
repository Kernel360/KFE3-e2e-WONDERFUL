'use client';

import React from 'react';

import Link from 'next/link';

import { LocationSetup, SignupDone, SignupForm, SignupSuccess } from '@/components/auth/signup';

import { useSignupForm, useSignupFlow } from '@/hooks/auth';

const SignupFlow = () => {
  const signupForm = useSignupForm();
  const signupFlow = useSignupFlow();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const result = await signupForm.handleFormSubmit(event);
    if (result.success) {
      signupFlow.goToSuccess();
    }
  };

  // 단계별 렌더링
  if (signupFlow.currentStep === 'done') {
    return <SignupDone onStartActivity={signupFlow.handleStartActivity} />;
  }

  if (signupFlow.currentStep === 'location') {
    return <LocationSetup onSaveLocation={signupFlow.handleSaveLocation} />;
  }

  if (signupFlow.currentStep === 'success') {
    return <SignupSuccess handleLocationSetup={signupFlow.goToLocationSetup} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        회원 가입
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <SignupForm
          formData={signupForm.formData}
          showPassword={signupForm.showPassword}
          agreeToTerms={signupForm.agreeToTerms}
          isSubmitting={signupForm.isSubmitting}
          fieldErrors={signupForm.fieldErrors}
          onInputChange={signupForm.handleInputChange}
          onTogglePassword={signupForm.handleTogglePassword}
          onAgreeToTerms={signupForm.handleAgreeToTerms}
          onNicknameValidationChange={signupForm.handleNicknameValidationChange} // 추가
          onSubmit={handleFormSubmit}
          isFormValid={signupForm.isFormValid}
        />

        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">이미 계정이 있으신가요? </span>
          <Link
            href="/auth/signin"
            className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;
