import React from 'react';

import { Lock, Mail, User } from 'lucide-react';

import PasswordToggle from '@/components/auth/password-toggle';
import { InputIcon } from '@/components/common';

interface SignupFieldsProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  showPassword: boolean;
  fieldErrors: Record<string, string>;
  onInputChange: (fieldId: string, value: string | boolean) => void;
  onTogglePassword: () => void;
}

const SignupFields = ({
  formData,
  showPassword,
  fieldErrors,
  onInputChange,
  onTogglePassword,
}: SignupFieldsProps) => {
  const hasNameError = !!fieldErrors.name;
  const hasEmailError = !!fieldErrors.email;
  const hasPasswordError = !!fieldErrors.password;

  return (
    <div className="space-y-3">
      <div
        className={`h-[54px] ${
          hasNameError
            ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
            : ''
        }`}
      >
        <InputIcon
          id="name"
          name="name"
          type="text"
          placeholder="닉네임"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('name', e.target.value)
          }
          className={hasNameError ? 'text-danger-600 placeholder:text-danger-600/60' : ''}
        >
          <User className={hasNameError ? 'text-danger-600' : 'text-neutral-900'} />
        </InputIcon>
      </div>

      <div
        className={`h-[54px] ${
          hasEmailError
            ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
            : ''
        }`}
      >
        <InputIcon
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('email', e.target.value)
          }
          className={hasEmailError ? 'text-danger-600 placeholder:text-danger-600/60' : ''}
        >
          <Mail className={hasEmailError ? 'text-danger-600' : 'text-neutral-900'} />
        </InputIcon>
      </div>

      <div
        className={`h-[54px] ${
          hasPasswordError
            ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
            : ''
        }`}
      >
        <InputIcon
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('password', e.target.value)
          }
          className={hasPasswordError ? 'text-danger-600 placeholder:text-danger-600/60' : ''}
        >
          <Lock className={hasPasswordError ? 'text-danger-600' : 'text-neutral-900'} />
          <PasswordToggle
            showPassword={showPassword}
            onToggle={onTogglePassword}
            hasError={hasPasswordError}
          />
        </InputIcon>
      </div>
    </div>
  );
};

export default SignupFields;
