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
  const [isNicknameValid, setIsNicknameValid] = useState(true); // 초기값 true

  const handleInputChange = createInputHandler(setFormData);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAgreeToTerms = (agreed: boolean) => {
    setAgreeToTerms(agreed);
  };

  // 닉네임 유효성 변경 핸들러 - 에러 메시지도 함께 처리
  const handleNicknameValidationChange = (isValid: boolean, message?: string) => {
    setIsNicknameValid(isValid);

    if (isValid) {
      // 유효하면 기존 에러 메시지 제거
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    } else if (message) {
      // 유효하지 않으면 에러 메시지 설정
      setFieldErrors((prev) => ({
        ...prev,
        name: message,
      }));
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitFormData = new FormData(event.currentTarget);
    const name = (submitFormData.get('name') as string) || '';
    const email = (submitFormData.get('email') as string) || '';
    const password = (submitFormData.get('password') as string) || '';

    // 클라이언트 유효성 검사 - name 검증 제외
    const errors = validateForm({ email, password }, ['email', 'password']);

    // 닉네임 별도 검증
    if (!name.trim()) {
      errors.name = '닉네임을 입력해주세요.';
      setIsNicknameValid(false);
    } else if (!isNicknameValid) {
      // 이미 에러 메시지가 fieldErrors에 설정되어 있음
      errors.name = fieldErrors.name || '사용할 수 없는 닉네임입니다.';
    }

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
          setIsNicknameValid(false);
        } else {
          serverErrors.email = result.error || '회원가입에 실패했습니다.';
        }

        setFieldErrors(serverErrors);
        throw new Error(result.error || '회원가입에 실패했습니다.');
      }
    });
  };

  // 폼 유효성 검사
  const isFormValid = (): boolean => {
    return !!(
      formData.name &&
      formData.email &&
      formData.password &&
      agreeToTerms &&
      isNicknameValid
    );
  };

  return {
    formData,
    showPassword,
    agreeToTerms,
    isSubmitting,
    fieldErrors,
    isNicknameValid,
    handleInputChange,
    handleTogglePassword,
    handleAgreeToTerms,
    handleNicknameValidationChange,
    handleFormSubmit,
    isFormValid,
  };
};
