'use client';

import React, { useState } from 'react';

import {
  ResetPasswordComplete,
  ResetPasswordEmail,
  ResetPasswordInput,
  ResetPasswordNew,
} from '@/components/auth/reset-password';

type Step = 1 | 2 | 3 | 4;

const ResetPasswordForm = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // 폼 데이터
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  // UI 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // 해당 필드 에러 초기화
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Step 1: 이름과 이메일 입력
  const handleStep1Submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFieldErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newFieldErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newFieldErrors.email = '이메일을 입력해주세요.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isSuccess = Math.random() > 0.5; //임시 성공/실패 로직

      if (isSuccess) {
        setCurrentStep(2);
      } else {
        setFieldErrors({
          name: '사용자를 찾을 수 없습니다.',
          email: '이메일이 일치하지 않습니다.',
        });
      }
    } catch (error) {
      setFieldErrors({ name: '비밀번호 찾기 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: 이메일 전송 확인
  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  // Step 3: 새 비밀번호 입력
  const handleStep3Submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFieldErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newFieldErrors.newPassword = '새 비밀번호를 입력해주세요.';
    }

    if (!formData.confirmPassword) {
      newFieldErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    }

    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      newFieldErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep(4);
    } catch (error) {
      setFieldErrors({ newPassword: '비밀번호 변경 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 유효성 검사
  const isStep1Valid = () => !!(formData.name.trim() && formData.email.trim());
  const isStep3Valid = () => !!(formData.newPassword && formData.confirmPassword);

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
              onSubmit={handleStep1Submit}
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
              onSubmit={handleStep3Submit}
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
              onSubmit={handleStep1Submit}
              isFormValid={isStep1Valid}
            />
          </>
        );
    }
  };

  return renderCurrentStep();
};

export default ResetPasswordForm;
