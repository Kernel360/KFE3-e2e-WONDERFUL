import React from 'react';
import { Lock, Mail, User } from 'lucide-react';

import InputIcon from '@/components/common/input/icon';
import PasswordToggle from '@/components/auth/password-toggle';

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
  const renderIcon = (iconType: string) => {
    const hasError = fieldErrors[iconType];
    const iconProps = {
      className: hasError ? 'text-danger-600' : 'text-neutral-900',
    };

    switch (iconType) {
      case 'name':
        return <User {...iconProps} />;
      case 'email':
        return <Mail {...iconProps} />;
      case 'password':
        return <Lock {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  const hasFieldError = (fieldId: string) => {
    return !!fieldErrors[fieldId];
  };

  const fields = [
    {
      id: 'name',
      type: 'text',
      placeholder: '이름',
      icon: 'name',
    },
    {
      id: 'email',
      type: 'email',
      placeholder: '이메일',
      icon: 'email',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: '비밀번호',
      icon: 'password',
    },
  ];

  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <div
          key={field.id}
          className={`h-[54px] w-[327px] ${
            hasFieldError(field.id)
              ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
              : ''
          }`}
        >
          <InputIcon
            id={field.id}
            name={field.id}
            type={field.type === 'password' && showPassword ? 'text' : field.type}
            placeholder={field.placeholder}
            value={formData[field.id as keyof typeof formData] || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange(field.id, e.target.value)
            }
            className={
              hasFieldError(field.id) ? 'text-danger-600 placeholder:text-danger-600/60' : ''
            }
          >
            {renderIcon(field.id)}
            {field.type === 'password' && (
              <PasswordToggle
                showPassword={showPassword}
                onToggle={onTogglePassword}
                hasError={hasFieldError(field.id)}
              />
            )}
          </InputIcon>
        </div>
      ))}
    </div>
  );
};

export default SignupFields;
