'use client';

import { User } from 'lucide-react';

import { checkNickname } from '@/lib/api/nickname';

interface SignupNicknameInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: (isValid: boolean, message?: string) => void;
  placeholder?: string;
  className?: string;
}

const SignupNicknameInput = ({
  id,
  name,
  value,
  onChange,
  onValidationChange,
  placeholder = '닉네임',
  className = '',
}: SignupNicknameInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    // 입력이 변경되면 유효성 상태 초기화
    onValidationChange?.(true);
  };

  const handleBlur = async () => {
    if (!value.trim()) {
      onValidationChange?.(false, '닉네임을 입력해주세요.');
      return;
    }

    if (value.trim().length < 2) {
      onValidationChange?.(false, '닉네임은 2자 이상이어야 합니다.');
      return;
    }

    // 포커스가 벗어났을 때 자동으로 중복 확인
    try {
      const result = await checkNickname(value);
      onValidationChange?.(result.available, result.message);
    } catch (error) {
      onValidationChange?.(false, '닉네임 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      <div className="shadow-xs flex h-[54px] w-full min-w-0 items-center justify-between rounded-[33px] border bg-transparent px-4 py-1 text-base text-neutral-400 transition-[color,box-shadow] focus-within:border-neutral-400 focus-within:ring-[2px] focus-within:ring-neutral-400/50 md:text-sm">
        <div className="flex items-center gap-2 [&>svg]:h-5 [&>svg]:w-5">
          <User className="text-neutral-900" />
          <input
            id={id}
            name={name}
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={12}
            className={`selection:bg-primary selection:text-primary-foreground file:text-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive w-[270px] text-black file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupNicknameInput;
