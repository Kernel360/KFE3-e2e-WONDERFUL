'use client';

import React from 'react';

import {
  ResetPasswordComplete,
  ResetPasswordEmail,
  ResetPasswordInput,
  ResetPasswordNew,
} from '@/components/auth/reset-password';

import { useResetPasswordForm, useResetPasswordFlow } from '@/hooks/auth';

const ResetPasswordForm = () => {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    isSubmitting,
    fieldErrors,
    handleInputChange,
    handleTogglePassword,
    handleToggleConfirmPassword,
    handleStep1Submit,
    handleStep3Submit,
    isStep1Valid,
    isStep3Valid,
  } = useResetPasswordForm();

  const { currentStep, goToEmailSent, goToNewPassword, goToComplete } = useResetPasswordFlow();

  // Step 1 제출 핸들러
  const handleStep1 = async (event: React.FormEvent<HTMLFormElement>) => {
    const result = await handleStep1Submit(event);
    if (result.success) {
      goToEmailSent();
    }
  };

  // Step 2: 이메일 전송 확인
  const handleStep2Next = () => {
    goToNewPassword();
  };

  // Step 3 제출 핸들러
  const handleStep3 = async (event: React.FormEvent<HTMLFormElement>) => {
    const result = await handleStep3Submit(event);
    if (result.success) {
      goToComplete();
    }
  };

  // 현재 단계에 따른 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h1 className="text-h3 leading-h3 mb-[80px] whitespace-nowrap text-center font-bold text-neutral-900">
              비밀번호 찾기
            </h1>
            <ResetPasswordInput
              formData={{ name: formData.name, email: formData.email }}
              fieldErrors={fieldErrors}
              isSubmitting={isSubmitting}
              onInputChange={handleInputChange}
              onSubmit={handleStep1}
              isFormValid={isStep1Valid}
            />
          </>
        );
      case 2:
        return (
          <>
            <h1 className="text-h3 leading-h3 mb-[80px] whitespace-nowrap text-center font-bold text-neutral-900">
              비밀번호 찾기
            </h1>
            <ResetPasswordEmail email={formData.email} onNext={handleStep2Next} />
          </>
        );
      case 3:
        return (
          <>
            <h1 className="text-h3 leading-h3 mb-[80px] whitespace-nowrap text-center font-bold text-neutral-900">
              비밀번호 재설정
            </h1>
            <ResetPasswordNew
              formData={{
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
              }}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              fieldErrors={fieldErrors}
              isSubmitting={isSubmitting}
              onInputChange={handleInputChange}
              onTogglePassword={handleTogglePassword}
              onToggleConfirmPassword={handleToggleConfirmPassword}
              onSubmit={handleStep3}
              isFormValid={isStep3Valid}
            />
          </>
        );
      case 4:
        return <ResetPasswordComplete />;
      default:
        return (
          <>
            <ResetPasswordInput
              formData={{ name: formData.name, email: formData.email }}
              fieldErrors={fieldErrors}
              isSubmitting={isSubmitting}
              onInputChange={handleInputChange}
              onSubmit={handleStep1}
              isFormValid={isStep1Valid}
            />
          </>
        );
    }
  };

  return renderCurrentStep();
};

export default ResetPasswordForm;
