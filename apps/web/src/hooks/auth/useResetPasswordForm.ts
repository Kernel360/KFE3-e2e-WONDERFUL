'use client';

import { useState } from 'react';

import { useAuthCommon } from './useAuthCommon';

export const useResetPasswordForm = () => {
  const {
    isSubmitting,
    fieldErrors,
    setFieldErrors,
    createInputHandler,
    validateForm,
    handleException,
    withSubmission,
  } = useAuthCommon();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = createInputHandler(setFormData);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Step 1: 이름과 이메일 입력
  const handleStep1Submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm({ name: formData.name, email: formData.email }, ['name', 'email']);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return { success: false };
    }

    return withSubmission(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const isSuccess = Math.random() > 0.5;

        if (isSuccess) {
          return { success: true };
        } else {
          throw new Error('사용자를 찾을 수 없습니다.');
        }
      },
      undefined,
      (error) => handleException(error, '비밀번호 찾기 중 오류가 발생했습니다.')
    );
  };

  // Step 3: 새 비밀번호 입력
  const handleStep3Submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(
      {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      },
      ['newPassword', 'confirmPassword']
    );

    // 비밀번호 일치 확인
    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return { success: false };
    }

    return withSubmission(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { success: true };
      },
      undefined,
      (error) => handleException(error, '비밀번호 변경 중 오류가 발생했습니다.')
    );
  };

  // 폼 유효성 검사
  const isStep1Valid = () => !!(formData.name.trim() && formData.email.trim());
  const isStep3Valid = () => !!(formData.newPassword && formData.confirmPassword);

  return {
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
  };
};
