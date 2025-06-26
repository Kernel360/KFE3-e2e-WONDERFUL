import React, { useState } from 'react';

import { User, Lock, Eye, EyeOff } from 'lucide-react';

import InputIcon from '@/components/common/input-icon';
import { Button } from '@/components/ui/button';

interface SigninFormData {
  username: string;
  password: string;
}

interface SigninFormProps {
  onLogin?: (data: SigninFormData) => void;
  initialData?: Partial<SigninFormData>;
}

// 임시 로그인 정보
const TEMP_SIGNIN_DATA = {
  username: 'user123',
  password: '123456',
};

type ErrorType = 'invalid_account' | 'password_mismatch' | null;

const SigninForm = ({ onLogin, initialData }: SigninFormProps) => {
  const [username, setUsername] = useState(initialData?.username || '');
  const [password, setPassword] = useState(initialData?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (error) setError(null);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPassword = () => {
    console.log('비밀번호 찾기');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      if (username !== TEMP_SIGNIN_DATA.username) {
        setError('invalid_account');
        setIsLoading(false);
        return;
      }
      if (password !== TEMP_SIGNIN_DATA.password) {
        setError('password_mismatch');
        setIsLoading(false);
        return;
      }

      console.log('로그인 성공!');
      onLogin?.({ username, password });
      setIsLoading(false);
    }, 1000);
  };

  const isFormValid = username && password;
  const hasUsernameError = error === 'invalid_account';
  const hasPasswordError = error === 'invalid_account' || error === 'password_mismatch';

  const getErrorMessage = () => {
    switch (error) {
      case 'invalid_account':
        return '계정 정보가 올바르지 않습니다.';
      case 'password_mismatch':
        return '비밀번호가 일치하지 않습니다.';
      default:
        return '';
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="space-y-3">
          <div
            className={`h-[54px] w-[327px] ${
              hasUsernameError
                ? '[&_.shadow-xs]:focus-within:ring-[var(--color-danger-650)]/50 [&_.shadow-xs]:border-[var(--color-danger-650)] [&_.shadow-xs]:bg-[var(--color-danger-70)] [&_.shadow-xs]:focus-within:border-[var(--color-danger-650)]'
                : ''
            }`}
          >
            <InputIcon
              id="username"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsernameChange}
              className={
                hasUsernameError
                  ? 'placeholder:text-[var(--color-danger-650)]/60 text-[var(--color-danger-650)]'
                  : ''
              }
            >
              <User
                className={
                  hasUsernameError
                    ? 'text-[var(--color-danger-650)]'
                    : 'text-[var(--color-neutral-900)]'
                }
              />
            </InputIcon>
          </div>

          <div
            className={`h-[54px] w-[327px] ${
              hasPasswordError
                ? '[&_.shadow-xs]:focus-within:ring-[var(--color-danger-650)]/50 [&_.shadow-xs]:border-[var(--color-danger-650)] [&_.shadow-xs]:bg-[var(--color-danger-70)] [&_.shadow-xs]:focus-within:border-[var(--color-danger-650)]'
                : ''
            }`}
          >
            <InputIcon
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className={
                hasPasswordError
                  ? 'placeholder:text-[var(--color-danger-650)]/60 text-[var(--color-danger-650)]'
                  : ''
              }
            >
              <Lock
                className={
                  hasPasswordError
                    ? 'text-[var(--color-danger-650)]'
                    : 'text-[var(--color-neutral-900)]'
                }
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className={`p-1 transition-colors focus:outline-none ${
                  hasPasswordError
                    ? 'hover:text-[var(--color-danger-650)]/80 text-[var(--color-danger-650)]'
                    : 'text-[var(--color-neutral-900)] hover:text-neutral-600'
                }`}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </InputIcon>
          </div>
        </div>

        <div className="mt-5 flex w-[327px] items-center justify-between pl-8">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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

        <div className="mt-[68px] flex h-[26px] items-center justify-center">
          {error && (
            <div className="flex items-center gap-2 text-sm text-[var(--color-danger-650)]">
              <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-danger-650)]">
                <span className="text-xs">!</span>
              </div>
              <span>{getErrorMessage()}</span>
            </div>
          )}
        </div>

        <div className="mt-[26px]">
          <Button
            type="submit"
            size="lg"
            color={isFormValid ? 'primary' : 'secondary'}
            fullWidth={false}
            disabled={isLoading || !isFormValid}
            className="h-[60px] w-[326px]"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
