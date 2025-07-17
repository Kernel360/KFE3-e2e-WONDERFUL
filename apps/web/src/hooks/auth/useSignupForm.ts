'use client';

import { useState } from 'react';

import { signUp } from '@/lib/actions/auth';

import { useAuthCommon } from './useAuthCommon';

export const useSignupForm = () => {
  const {
    isSubmitting,
    fieldErrors,
    createInputHandler,
    validateForm,
    handleServerError,
    handleException,
    withSubmission,
  } = useAuthCommon();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = createInputHandler(setFormData);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAgreeToTerms = (agreed: boolean) => {
    setAgreeToTerms(agreed);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitFormData = new FormData(event.currentTarget);
    const name = submitFormData.get('name') as string;
    const email = submitFormData.get('email') as string;
    const password = submitFormData.get('password') as string;

    // 클라이언트 유효성 검사
    const errors = validateForm({ name, email, password }, ['name', 'email', 'password']);

    // 약관 동의 체크
    if (!agreeToTerms) {
      errors.terms = '서비스 약관에 동의해주세요.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false };
    }

    return withSubmission(
      async () => {
        const result = await signUp(submitFormData);
        if (!result.success) {
          handleServerError(result, '회원가입에 실패했습니다.');
          return { success: false };
        }
        return { success: true };
      },
      undefined,
      (error) => handleException(error, '회원가입 중 오류가 발생했습니다.')
    );
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
