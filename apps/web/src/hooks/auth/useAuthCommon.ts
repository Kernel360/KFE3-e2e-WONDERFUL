'use client';

import { useState } from 'react';

import { validateEmail, validatePassword, validateName } from '@/lib/utils/validation';

export const useAuthCommon = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // 공통 입력 핸들러
  const createInputHandler = <T extends Record<string, any>>(
    setFormData: React.Dispatch<React.SetStateAction<T>>
  ) => {
    return (fieldId: string, value: string | boolean) => {
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
  };

  // 공통 유효성 검사
  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'password':
      case 'newPassword':
        return validatePassword(value);
      default:
        return null;
    }
  };

  // 공통 폼 유효성 검사
  const validateForm = (
    formData: Record<string, any>,
    requiredFields: string[]
  ): Record<string, string> => {
    const errors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field];

      if (!value || (typeof value === 'string' && !value.trim())) {
        errors[field] = `${getFieldDisplayName(field)}을(를) 입력해주세요.`;
        return;
      }

      const validationError = validateField(field, value);
      if (validationError) {
        errors[field] = validationError;
      }
    });

    return errors;
  };

  // 필드명 한글 변환
  const getFieldDisplayName = (field: string): string => {
    const fieldNames: Record<string, string> = {
      name: '이름',
      email: '이메일',
      password: '비밀번호',
      newPassword: '새 비밀번호',
      confirmPassword: '비밀번호 확인',
    };
    return fieldNames[field] || field;
  };

  // 공통 에러 핸들링
  const handleServerError = (
    result: any,
    defaultMessage: string = '처리 중 오류가 발생했습니다.'
  ) => {
    if (result.field) {
      setFieldErrors({ [result.field]: result.error || defaultMessage });
    } else {
      setFieldErrors({ general: result.error || defaultMessage });
    }
  };

  // 공통 예외 처리
  const handleException = (error: any, message: string = '예상치 못한 오류가 발생했습니다.') => {
    console.error('Auth error:', error);
    setFieldErrors({ general: message });
  };

  // 공통 제출 래퍼
  const withSubmission = async <T>(
    submitFn: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: any) => void
  ): Promise<{ success: boolean; result?: T }> => {
    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const result = await submitFn();
      onSuccess?.(result);
      return { success: true, result };
    } catch (error) {
      onError?.(error);
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    fieldErrors,
    setFieldErrors,
    createInputHandler,
    validateField,
    validateForm,
    handleServerError,
    handleException,
    withSubmission,
  };
};
