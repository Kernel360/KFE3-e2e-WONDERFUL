'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import BottomModal from '@/components/auth/bottom-modal';
import LocationSetup from '@/components/auth/location-setup';
import SignupDone from '@/components/auth/signup-done';
import SignupForm from '@/components/auth/signup/signup-form';

import { signUp } from '@/lib/actions/auth';
import { validateEmail, validateName, validatePassword } from '@/lib/utils/validation';

const SignupView = () => {
  const router = useRouter();

  // 🔥 플로우 상태
  const [currentStep, setCurrentStep] = useState<'signup' | 'modal' | 'location' | 'start'>(
    'signup'
  );

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string | boolean) => {
    if (fieldId === 'agreeToTerms') {
      setAgreeToTerms(value as boolean);
      return;
    }

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

  const handleAgreeToTerms = (agreed: boolean) => {
    setAgreeToTerms(agreed);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    const submitFormData = new FormData(event.currentTarget);

    // 클라이언트 유효성 검사
    const newFieldErrors: Record<string, string> = {};

    const name = submitFormData.get('name') as string;
    const email = submitFormData.get('email') as string;
    const password = submitFormData.get('password') as string;

    const nameError = validateName(name);
    if (nameError) newFieldErrors.name = nameError;

    const emailError = validateEmail(email);
    if (emailError) newFieldErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newFieldErrors.password = passwordError;

    if (!agreeToTerms) {
      newFieldErrors.terms = '서비스 약관에 동의해주세요.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Server Action 호출
      const result = await signUp(submitFormData);

      if (result.success) {
        console.log('회원가입 성공:', result.message);
        // 🔥 성공 시 모달 단계로 이동
        setCurrentStep('modal');
      } else {
        // 서버 에러를 필드별로 설정
        if (result.field === 'email') {
          setFieldErrors({ email: result.error || '회원가입에 실패했습니다.' });
        } else if (result.field === 'password') {
          setFieldErrors({ password: result.error || '회원가입에 실패했습니다.' });
        } else if (result.field === 'name') {
          setFieldErrors({ name: result.error || '회원가입에 실패했습니다.' });
        } else {
          setFieldErrors({ email: result.error || '회원가입에 실패했습니다.' });
        }
      }
    } catch (error) {
      console.error('회원가입 예외:', error);
      setFieldErrors({ email: '회원가입 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔥 플로우 핸들러들
  const handleCloseModal = () => {
    setCurrentStep('location');
  };

  const handleSaveLocation = () => {
    console.log('위치 저장 완료');
    setCurrentStep('start');
  };

  const handleSkipLocation = () => {
    console.log('위치 설정 건너뛰기');
    setCurrentStep('start');
  };

  const handleStartActivity = () => {
    router.push('/');
  };

  const isFormValid = (): boolean => {
    return !!(formData.name && formData.email && formData.password && agreeToTerms);
  };

  // 🔥 단계별 렌더링
  if (currentStep === 'start') {
    return <SignupDone onStartActivity={handleStartActivity} />;
  }

  if (currentStep === 'location') {
    return (
      <LocationSetup onSaveLocation={handleSaveLocation} onSkipLocation={handleSkipLocation} />
    );
  }

  // signup 또는 modal 단계
  return (
    <>
      <SignupForm
        formData={formData}
        showPassword={showPassword}
        agreeToTerms={agreeToTerms}
        isSubmitting={isSubmitting}
        fieldErrors={fieldErrors}
        onInputChange={handleInputChange}
        onTogglePassword={handleTogglePassword}
        onAgreeToTerms={handleAgreeToTerms}
        onSubmit={handleFormSubmit}
        isFormValid={isFormValid}
      />

      {/* 🔥 모달 - modal 단계에서만 표시 */}
      <BottomModal isOpen={currentStep === 'modal'} onClose={handleCloseModal} />
    </>
  );
};

export default SignupView;
