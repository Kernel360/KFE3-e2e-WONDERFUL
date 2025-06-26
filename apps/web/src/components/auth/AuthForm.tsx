import React, { useState } from 'react';

import { User, Lock, Eye, EyeOff, Mail } from 'lucide-react';

import InputIcon from '@/components/common/input-icon';
import { Button } from '@/components/ui/button';

import { AuthErrorType, AuthFormData, FormType } from '@/types/auth';

import {
  getAuthErrorMessage,
  getFormConfig,
  getInitialFormData,
  validateSignin,
  validateSignup,
  validateEmail,
  validatePassword,
  validateUsername,
} from '@/utils/auth';

interface AuthFormProps<T extends AuthFormData = AuthFormData> {
  formType: FormType;
  onSubmit?: (data: T) => void;
  onToggleForm?: () => void;
  initialData?: Partial<T>;
}

const AuthForm = <T extends AuthFormData>({
  formType,
  onSubmit,
  onToggleForm,
  initialData,
}: AuthFormProps<T>) => {
  const config = getFormConfig(formType);
  const [formData, setFormData] = useState(() => ({
    ...getInitialFormData(formType),
    ...initialData,
  }));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<AuthErrorType>(null);
  const [fieldError, setFieldError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (fieldId: string, value: string | boolean) => {
    if (fieldId === 'agreeToTerms') {
      setAgreeToTerms(value as boolean);
      return;
    }

    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (error) {
      setError(null);
      setFieldError('');
    }
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const setIndividualFieldErrors = () => {
    const newFieldErrors: Record<string, string> = {};

    config.fields.forEach((field) => {
      const value = getFieldValue(field.id);
      let errorMessage = '';

      switch (field.id) {
        case 'email':
          errorMessage = validateEmail(value) || '';
          break;
        case 'password':
          errorMessage = validatePassword(value) || '';
          break;
        case 'username':
          errorMessage = validateUsername(value) || '';
          break;
      }

      if (errorMessage) {
        newFieldErrors[field.id] = errorMessage;
      }
    });

    setFieldErrors(newFieldErrors);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPassword = () => {
    console.log('비밀번호 찾기');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setFieldError('');
    setFieldErrors({});
    setTimeout(() => {
      let validationResult;

      if (formType === 'signin') {
        validationResult = validateSignin(formData as any);
      } else {
        if (!agreeToTerms) {
          setError('validation_error');
          setFieldError('서비스 약관에 동의해주세요.');
          setIsLoading(false);
          return;
        }
        validationResult = validateSignup(formData as any);
      }

      if (!validationResult.isValid) {
        setError(validationResult.error);
        setFieldError(validationResult.fieldError || '');
        setIndividualFieldErrors();
        setIsLoading(false);
        return;
      }

      console.log(`${formType} 성공!`, formData);
      onSubmit?.(formData as T);
      setIsLoading(false);
    }, 1000);
  };

  const renderIcon = (iconType: string) => {
    const iconProps = {
      className: error ? 'text-danger-600' : 'text-neutral-900',
    };

    switch (iconType) {
      case 'user':
        return <User {...iconProps} />;
      case 'email':
        return <Mail {...iconProps} />;
      case 'lock':
        return <Lock {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  const isFormValid = () => {
    if (formType === 'signin') {
      return formData.username && formData.password;
    }
    return formData.name && formData.email && formData.password && agreeToTerms;
  };

  const hasFieldError = (fieldId: string) => {
    if (fieldErrors[fieldId]) return true;
    if (formType === 'signin') {
      if (fieldId === 'username') return error === 'invalid_account';
      if (fieldId === 'password')
        return error === 'invalid_account' || error === 'password_mismatch';
    } else {
      if (fieldId === 'email') return error === 'email_exists';
    }
    return false;
  };

  const getFieldValue = (fieldId: string): string => {
    return (formData as any)[fieldId] || '';
  };

  return (
    <div className="flex w-full flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="space-y-3">
          {config.fields.map((field) => (
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
                type={field.type === 'password' && showPassword ? 'text' : field.type}
                placeholder={field.placeholder}
                value={getFieldValue(field.id)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(field.id, e.target.value)
                }
                className={
                  hasFieldError(field.id) ? 'text-danger-600 placeholder:text-danger-600/60' : ''
                }
              >
                {renderIcon(field.icon)}
                {field.type === 'password' && (
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className={`p-1 transition-colors focus:outline-none ${
                      hasFieldError(field.id)
                        ? 'text-danger-600 hover:text-danger-600/80'
                        : 'text-neutral-900 hover:text-neutral-600'
                    }`}
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                )}
              </InputIcon>
            </div>
          ))}
        </div>

        {(config.showRememberMe || config.showTermsAgreement) && (
          <div className="mt-5 flex w-[327px] items-center justify-between pl-8">
            {config.showRememberMe && (
              <>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formType === 'signin' ? (formData as any).rememberMe || false : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('rememberMe', e.target.checked)
                    }
                    className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
                  />
                  <span className="text-sm text-neutral-600">자동 로그인</span>
                </label>
                {config.showForgotPassword && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="hover:text-primary-500 text-sm text-neutral-600 transition-colors"
                  >
                    암호가 기억나지 않나요?
                  </button>
                )}
              </>
            )}

            {config.showTermsAgreement && (
              <div className="flex w-full justify-end">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('agreeToTerms', e.target.checked)
                    }
                    className="text-primary-500 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2"
                  />
                  <span className="text-sm">
                    <span className="text-primary-500">서비스 약관</span>
                    <span className="text-neutral-600">에 동의합니다</span>
                  </span>
                </label>
              </div>
            )}
          </div>
        )}

        <div className="mt-[68px] flex h-[26px] items-center justify-center">
          {(error || Object.keys(fieldErrors).length > 0) && (
            <div className="text-danger-600 flex items-center gap-2 text-sm">
              <div className="border-danger-600 flex h-4 w-4 items-center justify-center rounded-full border">
                <span className="text-xs">!</span>
              </div>
              <span>
                {fieldError ||
                  Object.values(fieldErrors)[0] ||
                  getAuthErrorMessage(error, formType)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-[26px]">
          <Button
            type="submit"
            size="lg"
            color={isFormValid() ? 'primary' : 'secondary'}
            fullWidth={false}
            disabled={isLoading || !isFormValid()}
            className="h-[60px] w-[326px]"
          >
            {isLoading ? 'Loading...' : config.submitText}
          </Button>
        </div>
      </form>

      {config.footerText && config.footerLinkText && onToggleForm && (
        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">{config.footerText} </span>
          <span
            onClick={onToggleForm}
            className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
          >
            {config.footerLinkText}
          </span>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
