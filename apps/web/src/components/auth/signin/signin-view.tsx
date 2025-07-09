'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import SigninFields from '@/components/auth/signin/signin-fields';
import SocialLoginButtons from '@/components/auth/signin/social-login-buttons';
import SubmitButton from '@/components/auth/submit-button';
import ErrorMessage from '@/components/auth/error-message';

import { signInAction, signInWithGoogleAction } from '@/lib/actions/auth.action';
import { validateEmail, validatePassword } from '@/lib/utils/auth';

const SigninView = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string | boolean) => {
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

  const handleForgotPassword = () => {
    console.log('비밀번호 찾기');
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    const submitFormData = new FormData(event.currentTarget);

    // 클라이언트 유효성 검사
    const newFieldErrors: Record<string, string> = {};

    const email = submitFormData.get('email') as string;
    const password = submitFormData.get('password') as string;

    const emailError = validateEmail(email);
    if (emailError) newFieldErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newFieldErrors.password = passwordError;

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Server Action 호출
      const result = await signInAction(submitFormData);

      if (result.success) {
        // 로그인 성공 시 홈으로 리다이렉트
        router.push('/');
      } else {
        // 서버 에러를 필드별로 설정
        if (result.field === 'password') {
          setFieldErrors({ password: result.error || '로그인에 실패했습니다.' });
        } else {
          setFieldErrors({ email: result.error || '로그인에 실패했습니다.' });
        }
      }
    } catch (error) {
      console.error('로그인 예외:', error);
      setFieldErrors({ email: '로그인 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const result = await signInWithGoogleAction();

      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        console.error('구글 로그인 실패:', result.error);
      }
    } catch (error) {
      console.error('구글 로그인 예외:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  const isFormValid = (): boolean => {
    return !!(formData.email && formData.password);
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        로그인
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
          <SigninFields
            formData={formData}
            showPassword={showPassword}
            fieldErrors={fieldErrors}
            onInputChange={handleInputChange}
            onTogglePassword={handleTogglePassword}
          />

          {/* 자동 로그인 및 비밀번호 찾기 */}
          <div className="mt-5 flex w-[327px] items-center justify-between pl-8">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('rememberMe', e.target.checked)
                }
                className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
              />
              <span className="text-sm text-neutral-600">자동 로그인</span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="hover:text-primary-500 text-sm text-neutral-600 transition-colors"
            >
              암호가 기억나지 않나요?
            </button>
          </div>

          <ErrorMessage errors={fieldErrors} />

          {/* 제출 버튼 */}
          <div className="mt-[26px]">
            <SubmitButton isFormValid={isFormValid()} isSubmitting={isSubmitting}>
              로그인
            </SubmitButton>
          </div>
        </form>

        <SocialLoginButtons onGoogleLogin={handleGoogleLogin} googleLoading={googleLoading} />

        {/* 회원가입으로 이동 */}
        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">계정이 없으신가요? </span>
          <span
            onClick={handleSignUp}
            className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
          >
            회원 가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninView;
