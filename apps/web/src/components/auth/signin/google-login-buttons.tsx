'use client';

import Image from 'next/image';

import { signInWithGoogle } from '@/lib/actions/auth';

interface GoogleLoginButtonProps {
  className?: string;
  disabled?: boolean;
}

const GoogleLoginButton = ({ className, disabled }: GoogleLoginButtonProps) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        console.error('구글 로그인 실패:', result.error);
      }
    } catch (error) {
      console.error('구글 로그인 예외:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={disabled}
      className={`text-primary-500 relative box-border flex h-[60px] w-[360px] cursor-pointer items-center justify-center rounded-[99px] border border-neutral-100 bg-white px-5 text-lg transition-all hover:bg-neutral-100 ${className}`}
    >
      <Image
        src="/icon/Google.svg"
        alt="Google 로그인"
        width={24}
        height={24}
        className="absolute left-5"
      />
      <span className="text-neutral-600">Google로 시작하기</span>
    </button>
  );
};

export default GoogleLoginButton;
