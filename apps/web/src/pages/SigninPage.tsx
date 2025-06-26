'use client';
import React from 'react';

import SigninForm from '@/components/auth/SigninForm';

import { SigninFormData } from '@/types/auth';

const ChatPage = () => {
  const handleLogin = (data: SigninFormData) => {
    console.log('로그인 성공:', data);
    // 실제 로그인 처리 로직
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SigninForm onLogin={handleLogin} />
    </div>
  );
};

export default ChatPage;
