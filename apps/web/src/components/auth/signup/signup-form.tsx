import React from 'react';

import ErrorMessage from '@/components/auth/error-message';
import { SignupFields } from '@/components/auth/signup';
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
  onNicknameValidationChange: (isValid: boolean, message?: string) => void; // 메시지 파라미터 추가
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
  onNicknameValidationChange,
  onSubmit,
  isFormValid,
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <SignupFields
        formData={formData}
        showPassword={showPassword}
        fieldErrors={fieldErrors}
        onInputChange={onInputChange}
        onTogglePassword={onTogglePassword}
        onNicknameValidationChange={onNicknameValidationChange}
      />

      {/* 약관 동의 체크박스 */}
      <div className="mt-5 flex w-[327px] items-center justify-end pl-8">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={agreeToTerms}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAgreeToTerms(e.target.checked)}
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
      <div className="mt-[26px] w-[360px]">
        <SubmitButton isFormValid={isFormValid()} isSubmitting={isSubmitting}>
          회원가입
        </SubmitButton>
      </div>
    </form>
  );
};

export default SignupForm;
