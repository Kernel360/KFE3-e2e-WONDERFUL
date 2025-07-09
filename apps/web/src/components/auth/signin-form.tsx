'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthForm from '@/components/auth/auth-form';
import { FloatButton } from '@/components/ui/float-button';

import { signInWithGoogleAction } from '@/lib/actions/auth.action';
import { SigninFormData, ServerErrorInfo } from '@/lib/types/auth';

interface SigninFormProps {
  onLogin?: (data: SigninFormData) => void;
  initialData?: Partial<SigninFormData>;
  isSubmitting?: boolean;
  serverError?: ServerErrorInfo | null;
}

const SigninForm = ({ onLogin, initialData, isSubmitting, serverError }: SigninFormProps) => {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = (data: SigninFormData) => {
    onLogin?.(data);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const result = await signInWithGoogleAction();

      if (result.success && result.redirectUrl) {
        // 구글 로그인 페이지로 리다이렉트
        window.location.href = result.redirectUrl;
      } else {
        console.error('구글 로그인 실패:', result.error);
      }
    } catch (error) {
      console.error('구글 로그인 예외:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        로그인
      </h1>

      <div className="mt-[80px]">
        <AuthForm
          formType="signin"
          onSubmit={handleSubmit}
          initialData={initialData}
          isSubmitting={isSubmitting}
          serverError={serverError}
        />
      </div>

      <div className="mt-[40px] flex items-center justify-center gap-6 px-[98px]">
        <FloatButton variant="solid" color="secondary" size="medium" onClick={handleGoogleLogin}>
          <Image
            src="/icon/Google.svg"
            alt="Google 로그인"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </FloatButton>

        <FloatButton variant="solid" color="secondary" size="medium">
          <Image
            src="/icon/kakao.svg"
            alt="Kakao 로그인"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </FloatButton>

        <FloatButton variant="solid" color="secondary" size="medium">
          <Image
            src="/icon/Apple.svg"
            alt="Apple 로그인"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </FloatButton>
      </div>

      <div className="mt-6 whitespace-nowrap text-center">
        <span className="text-sm text-neutral-600">계정이 없으신가요? </span>
        <span
          onClick={handleSignUp}
          className="text-primary-500 hover:text-primary-600 cursor-pointer text-sm font-medium transition-colors"
        >
          회원 가입
        </span>
      </div>
    </div>
  );
};

export default SigninForm;
