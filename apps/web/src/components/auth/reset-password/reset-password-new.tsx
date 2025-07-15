'use client';

import React from 'react';

import { Lock } from 'lucide-react';

import ErrorMessage from '@/components/auth/error-message';
import PasswordToggle from '@/components/auth/password-toggle';
import SubmitButton from '@/components/auth/submit-button';
import { InputIcon } from '@/components/common';

interface ResetPasswordNewProps {
  formData: {
    newPassword: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
  fieldErrors: Record<string, string>;
  isSubmitting: boolean;
  onInputChange: (fieldId: string, value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isFormValid: () => boolean;
}

const ResetPasswordNew = ({
  formData,
  showPassword,
  showConfirmPassword,
  fieldErrors,
  isSubmitting,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  isFormValid,
}: ResetPasswordNewProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center space-y-3">
      {/* 새 비밀번호 */}
      <div
        className={`h-[54px] w-[327px] ${
          fieldErrors.newPassword
            ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
            : ''
        }`}
      >
        <InputIcon
          id="newPassword"
          name="newPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="새 비밀번호 입력"
          value={formData.newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('newPassword', e.target.value)
          }
          className={
            fieldErrors.newPassword ? 'text-danger-600 placeholder:text-danger-600/60' : ''
          }
        >
          <Lock className={fieldErrors.newPassword ? 'text-danger-600' : 'text-neutral-900'} />
          <PasswordToggle
            showPassword={showPassword}
            onToggle={onTogglePassword}
            hasError={!!fieldErrors.newPassword}
          />
        </InputIcon>
      </div>

      {/* 비밀번호 확인 */}
      <div
        className={`h-[54px] w-[327px] ${
          fieldErrors.confirmPassword
            ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
            : ''
        }`}
      >
        <InputIcon
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="새 비밀번호 확인"
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('confirmPassword', e.target.value)
          }
          className={
            fieldErrors.confirmPassword ? 'text-danger-600 placeholder:text-danger-600/60' : ''
          }
        >
          <Lock className={fieldErrors.confirmPassword ? 'text-danger-600' : 'text-neutral-900'} />
          <PasswordToggle
            showPassword={showConfirmPassword}
            onToggle={onToggleConfirmPassword}
            hasError={!!fieldErrors.confirmPassword}
          />
        </InputIcon>
      </div>

      <ErrorMessage errors={fieldErrors} />

      <div className="mt-[26px]">
        <SubmitButton isFormValid={isFormValid()} isSubmitting={isSubmitting}>
          비밀번호 변경
        </SubmitButton>
      </div>
    </form>
  );
};

export default ResetPasswordNew;
