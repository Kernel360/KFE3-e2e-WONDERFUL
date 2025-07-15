'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { User, Mail, Lock } from 'lucide-react';

import ErrorMessage from '@/components/auth/error-message';
import PasswordToggle from '@/components/auth/password-toggle';
import { ResetPasswordComplete, ResetPasswordEmail } from '@/components/auth/reset-password';
import SubmitButton from '@/components/auth/submit-button';
import InputIcon from '@/components/common/input/icon';

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
        setCurrentStep(3);
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

  // Step 2: 링크 전송 확인
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
  const isStep4Valid = () => !!(formData.newPassword && formData.confirmPassword);

  // Step 1: 이름과 이메일 입력
  const renderStep1 = () => (
    <>
      <h1 className="text-h3 leading-h3 mb-[80px] whitespace-nowrap text-center font-bold text-neutral-900">
        비밀번호 찾기
      </h1>

      <form onSubmit={handleStep1Submit} className="flex flex-col items-center space-y-3">
        {/* 이름 입력 */}
        <div
          className={`h-[54px] w-[327px] ${
            fieldErrors.name
              ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
              : ''
          }`}
        >
          <InputIcon
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('name', e.target.value)
            }
            className={fieldErrors.name ? 'text-danger-600 placeholder:text-danger-600/60' : ''}
          >
            <User className={fieldErrors.name ? 'text-danger-600' : 'text-neutral-900'} />
          </InputIcon>
        </div>

        {/* 이메일 입력 */}
        <div
          className={`h-[54px] w-[327px] ${
            fieldErrors.email
              ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
              : ''
          }`}
        >
          <InputIcon
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('email', e.target.value)
            }
            className={fieldErrors.email ? 'text-danger-600 placeholder:text-danger-600/60' : ''}
          >
            <Mail className={fieldErrors.email ? 'text-danger-600' : 'text-neutral-900'} />
          </InputIcon>
        </div>

        <ErrorMessage errors={fieldErrors} />

        <div className="mt-[26px]">
          <SubmitButton isFormValid={isStep1Valid()} isSubmitting={isSubmitting}>
            비밀번호 찾기
          </SubmitButton>
        </div>
      </form>

      <div className="mt-6 whitespace-nowrap text-center">
        <span className="text-sm text-neutral-600">계정이 기억나지 않으신가요? </span>
        <Link
          href="/auth/find-email"
          className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
        >
          이메일 찾기
        </Link>
      </div>
    </>
  );

  // Step 3: 새 비밀번호 입력
  const renderStep3 = () => (
    <>
      <h1 className="text-h3 leading-h3 mb-[80px] whitespace-nowrap text-center font-bold text-neutral-900">
        비밀번호 찾기
      </h1>

      <form onSubmit={handleStep3Submit} className="flex flex-col items-center space-y-3">
        {/* 새 비밀번호 */}
        <div
          className={`h-[54px] w-[327px] ${
            fieldErrors.newPassword
              ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
              : ''
          }`}
        >
          <InputIcon
            id="newPassword"
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('newPassword', e.target.value)
            }
            className={
              fieldErrors.newPassword ? 'text-danger-600 placeholder:text-danger-600/60' : ''
            }
          >
            <Lock className={fieldErrors.newPassword ? 'text-danger-600' : 'text-neutral-900'} />
            <PasswordToggle
              showPassword={showPassword}
              onToggle={handleTogglePassword}
              hasError={!!fieldErrors.newPassword}
            />
          </InputIcon>
        </div>

        {/* 비밀번호 확인 */}
        <div
          className={`h-[54px] w-[327px] ${
            fieldErrors.confirmPassword
              ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
              : ''
          }`}
        >
          <InputIcon
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Check new password"
            value={formData.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            className={
              fieldErrors.confirmPassword ? 'text-danger-600 placeholder:text-danger-600/60' : ''
            }
          >
            <Lock
              className={fieldErrors.confirmPassword ? 'text-danger-600' : 'text-neutral-900'}
            />
            <PasswordToggle
              showPassword={showConfirmPassword}
              onToggle={handleToggleConfirmPassword}
              hasError={!!fieldErrors.confirmPassword}
            />
          </InputIcon>
        </div>

        <ErrorMessage errors={fieldErrors} />

        <div className="mt-[26px]">
          <SubmitButton isFormValid={isStep4Valid()} isSubmitting={isSubmitting}>
            비밀번호 변경
          </SubmitButton>
        </div>
      </form>
    </>
  );

  // 현재 단계에 따른 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
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
        return renderStep3();
      case 4:
        return <ResetPasswordComplete />;
      default:
        return renderStep1();
    }
  };

  return renderCurrentStep();
};

export default ResetPasswordForm;
