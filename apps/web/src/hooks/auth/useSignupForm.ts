'use client';

import { useState } from 'react';

import { signUp } from '@/lib/actions/auth';

import { useAuthCommon } from './useAuthCommon';

export const useSignupForm = () => {
  const {
    isSubmitting,
    fieldErrors,
    setFieldErrors,
    createInputHandler,
    validateForm,
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
      setFieldErrors(errors);
      return { success: false };
    }

    return withSubmission(async () => {
      // 회원가입 플로우 시작 표시 (1시간 유효)
      document.cookie = 'signup-flow=active; path=/; max-age=3600; SameSite=Lax';
      // Server Action 호출
      const result = await signUp(submitFormData);

      // 서버 응답 처리
      if (result.success) {
        console.log('회원가입 성공:', result.message);
        return { success: true, result };
      } else {
        // 실패시 플로우 상태 제거
        document.cookie = 'signup-flow=; path=/; max-age=0';
        const serverErrors: Record<string, string> = {};

        if (result.field === 'email') {
          serverErrors.email = result.error || '회원가입에 실패했습니다.';
        } else if (result.field === 'password') {
          serverErrors.password = result.error || '회원가입에 실패했습니다.';
        } else if (result.field === 'name') {
          serverErrors.name = result.error || '회원가입에 실패했습니다.';
        } else {
          serverErrors.email = result.error || '회원가입에 실패했습니다.';
        }

        setFieldErrors(serverErrors);
        throw new Error(result.error || '회원가입에 실패했습니다.');
      }
    });
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
