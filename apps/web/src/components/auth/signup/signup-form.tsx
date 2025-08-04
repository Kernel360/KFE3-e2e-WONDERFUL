import React from 'react';

import ErrorMessage from '@/components/auth/error-message';
import { SignupFields } from '@/components/auth/signup';
import { Button } from '@/components/ui';

interface SignupFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  showPassword: boolean;
  isSubmitting: boolean;
  fieldErrors: Record<string, string>;
  onInputChange: (fieldId: string, value: string | boolean) => void;
  onTogglePassword: () => void;
  onNicknameValidationChange: (isValid: boolean, message?: string) => void; // 메시지 파라미터 추가
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isFormValid: () => boolean;
}

const SignupForm = ({
  formData,
  showPassword,
  isSubmitting,
  fieldErrors,
  onInputChange,
  onTogglePassword,
  onNicknameValidationChange,
  onSubmit,
  isFormValid,
}: SignupFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col items-center justify-center gap-4 p-6"
    >
      <SignupFields
        formData={formData}
        showPassword={showPassword}
        fieldErrors={fieldErrors}
        onInputChange={onInputChange}
        onTogglePassword={onTogglePassword}
        onNicknameValidationChange={onNicknameValidationChange}
      />

      <ErrorMessage errors={fieldErrors} />

      <Button
        type="submit"
        size="xl"
        color={isFormValid() ? 'primary' : 'disabled'}
        fullWidth={true}
        disabled={isSubmitting || !isFormValid}
      >
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
