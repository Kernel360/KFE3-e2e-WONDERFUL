'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthForm from '@/components/auth/auth-form';

import { signUpAction } from '@/lib/actions/auth.action';
import { SignupFormData, ServerErrorInfo } from '@/lib/types/auth';

interface SignupFormProps {
  onSignup?: (data: SignupFormData) => void;
  onToggleToSignin?: () => void;
  initialData?: Partial<SignupFormData>;
}

const SignupForm = ({ onSignup, onToggleToSignin, initialData }: SignupFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInfo | null>(null);

  const handleSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Server Action 호출
      const result = await signUpAction(formData);

      if (result.success) {
        // 회원가입 성공 - 즉시 다음 단계로 (이메일 인증 없음)
        console.log('회원가입 성공:', result.message);
        onSignup?.(data);
      } else {
        // 회원가입 실패 - 서버 에러 설정
        setServerError({
          type: result.field === 'email' ? 'email_exists' : 'validation_error',
          message: result.error || '회원가입에 실패했습니다.',
          field: result.field as 'email' | 'password' | undefined,
        });
      }
    } catch (error) {
      console.error('회원가입 중 예외 발생:', error);
      setServerError({
        type: 'validation_error',
        message: '회원가입 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleToSignin = () => {
    router.push('/auth/signin');
    onToggleToSignin?.();
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        회원 가입
      </h1>

      <div className="mt-[80px]">
        <AuthForm
          formType="signup"
          onSubmit={handleSubmit}
          onToggleForm={handleToggleToSignin}
          initialData={initialData}
          isSubmitting={isSubmitting}
          serverError={serverError}
        />
      </div>
    </div>
  );
};

export default SignupForm;
