import React from 'react';

import { useRouter } from 'next/navigation';

import ErrorMessage from '@/components/auth/error-message';
import SignupFields from '@/components/auth/signup/signup-fields';
import SubmitButton from '@/components/auth/submit-button';

interface SignupFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  showPassword: boolean;
  agreeToTerms: boolean;
  isSubmitting: boolean;
  fieldErrors: Record<string, string>;
  onInputChange: (fieldId: string, value: string | boolean) => void;
  onTogglePassword: () => void;
  onAgreeToTerms: (agreed: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isFormValid: () => boolean;
}

const SignupForm = ({
  formData,
  showPassword,
  agreeToTerms,
  isSubmitting,
  fieldErrors,
  onInputChange,
  onTogglePassword,
  onAgreeToTerms,
  onSubmit,
  isFormValid,
}: SignupFormProps) => {
  const router = useRouter();

  const handleToggleToSignin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        회원 가입
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <SignupFields
            formData={formData}
            showPassword={showPassword}
            fieldErrors={fieldErrors}
            onInputChange={onInputChange}
            onTogglePassword={onTogglePassword}
          />

          {/* 약관 동의 체크박스 */}
          <div className="mt-5 flex w-[327px] items-center justify-end pl-8">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onAgreeToTerms(e.target.checked)
                }
                className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
              />
              <span className="text-sm">
                <span className="text-primary-500">서비스 약관</span>
                <span className="text-neutral-600">에 동의합니다</span>
              </span>
            </label>
          </div>

          <ErrorMessage errors={fieldErrors} />

          {/* 제출 버튼 */}
          <div className="mt-[26px]">
            <SubmitButton isFormValid={isFormValid()} isSubmitting={isSubmitting}>
              회원가입
            </SubmitButton>
          </div>
        </form>

        {/* 로그인으로 이동 */}
        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">이미 계정이 있으신가요? </span>
          <span
            onClick={handleToggleToSignin}
            className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
          >
            로그인
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
