'use client';

import React from 'react';

import Image from 'next/image';

import { signInWithGoogleAction } from '@/lib/actions/auth.action';

interface GoogleLoginButtonProps {
  className?: string;
  disabled?: boolean;
}

const GoogleLoginButton = ({ className, disabled }: GoogleLoginButtonProps) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogleAction();

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
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 transition-all hover:bg-neutral-300 focus-visible:ring-2 focus-visible:ring-neutral-400/50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Image
        src="/icon/Google.svg"
        alt="Google 로그인"
        width={20}
        height={20}
        className="h-5 w-5"
      />
    </button>
  );
};

export default GoogleLoginButton;
