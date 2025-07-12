'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';

import InputIcon from '@/components/common/input/icon';
import SubmitButton from '@/components/auth/submit-button';
import ErrorMessage from '@/components/auth/error-message';
import PasswordToggle from '@/components/auth/password-toggle';

type Step = 1 | 3 | 4 | 5;

interface ResetPasswordFormProps {
  onSuccess?: () => void;
}

const ResetPasswordForm = ({ onSuccess }: ResetPasswordFormProps) => {
  // 단계 관리
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
      // 임시 로딩
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 50% 확률로 성공/실패
      const isSuccess = Math.random() > 0.3;

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

  // Step 3: 링크 전송 확인
  const handleStep3Next = () => {
    setCurrentStep(4);
  };

  // Step 4: 새 비밀번호 입력
  const handleStep4Submit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      setCurrentStep(5);
      onSuccess?.();
    } catch (error) {
      setFieldErrors({ newPassword: '비밀번호 변경 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 다시 시도
  const handleRetry = () => {
    setCurrentStep(1);
    setFormData({ name: '', email: '', newPassword: '', confirmPassword: '' });
    setFieldErrors({});
  };

  // 폼 유효성 검사
  const isStep1Valid = () => !!(formData.name.trim() && formData.email.trim());
  const isStep4Valid = () => !!(formData.newPassword && formData.confirmPassword);

  // Step 1: 이름과 이메일 입력
  const renderStep1 = () => (
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
          onChange={(e) => handleInputChange('name', e.target.value)}
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
          onChange={(e) => handleInputChange('email', e.target.value)}
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
  );

  // Step 3: 링크 전송 안내
  const renderStep3 = () => (
    <div className="flex flex-col items-center">
      <div className="bg-primary-50 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <Mail className="text-primary-500 h-8 w-8" />
      </div>

      <div className="mb-6 text-center">
        <p className="mb-2 text-base text-neutral-600">
          <span className="text-primary-500 font-medium">{formData.email}</span>로
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
        <SubmitButton isFormValid={true} isSubmitting={false}>
          <span onClick={handleStep3Next}>링크를 클릭했습니다</span>
        </SubmitButton>
      </div>
    </div>
  );

  // Step 4: 새 비밀번호 입력
  const renderStep4 = () => (
    <form onSubmit={handleStep4Submit} className="flex flex-col items-center space-y-3">
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
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
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
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className={
            fieldErrors.confirmPassword ? 'text-danger-600 placeholder:text-danger-600/60' : ''
          }
        >
          <Lock className={fieldErrors.confirmPassword ? 'text-danger-600' : 'text-neutral-900'} />
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
          비밀번호 찾기
        </SubmitButton>
      </div>
    </form>
  );

  // Step 5: 완료
  const renderStep5 = () => (
    <div className="flex flex-col items-center">
      <div className="bg-success-50 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <CheckCircle className="text-success-500 h-8 w-8" />
      </div>

      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-neutral-900">비밀번호 설정 완료</h3>
        <p className="text-base text-neutral-600">
          변경된 비밀번호로 새롭게 로그인하실 수 있습니다.
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">!</span>
        </div>
        <span className="ml-2 text-sm text-neutral-600">
          로그인 페이지로 이동하여 새 비밀번호로 로그인하세요.
        </span>
      </div>
    </div>
  );

  // 현재 단계에 따른 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return renderCurrentStep();
};

export default ResetPasswordForm;
