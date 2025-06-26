'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import SigninForm from '@/components/auth/SigninForm';

import { SigninFormData } from '@/types/auth';
const ChatPage = () => {
  const router = useRouter();
  const handleLogin = (data: SigninFormData) => {
    console.log('로그인 성공:', data);
    router.push('/');
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SigninForm onLogin={handleLogin} />
    </div>
  );
};

export default ChatPage;
