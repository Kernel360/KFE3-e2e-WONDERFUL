'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { signUp } from '@/lib/actions/auth';
import { validateEmail, validateName, validatePassword } from '@/lib/utils/validation';

export const useSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      return { success: false };
    }

    try {
      // Server Action 호출
      const result = await signUp(submitFormData);
      const result = await signUpAction(submitFormData);

      if (result.success) {
        console.log('회원가입 성공:', result.message);
        return { success: true };
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
        return { success: false };
      }
    } catch (error) {
      console.error('회원가입 예외:', error);
      setFieldErrors({ email: '회원가입 중 오류가 발생했습니다.' });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = (): boolean => {
    return !!(formData.name && formData.email && formData.password && agreeToTerms);
  };

  return {
    formData,
    showPassword,
    agreeToTerms,
    isSubmitting,
    fieldErrors,
    handleInputChange,
    handleTogglePassword,
    handleAgreeToTerms,
    handleFormSubmit,
    isFormValid,
  };
};
