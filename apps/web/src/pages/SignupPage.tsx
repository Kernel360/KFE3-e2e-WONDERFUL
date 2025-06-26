'use client';
import React from 'react';

import SignupForm from '@/components/auth/SignupFrom';

import { SignupFormData } from '@/types/auth';

const ChatPage = () => {
  const handleSignup = (data: SignupFormData) => {
    console.log('회원가입 성공:', data);
  };

  const handleToggleToSignin = () => {
    console.log('로그인 페이지로 이동');
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignupForm onSignup={handleSignup} onToggleToSignin={handleToggleToSignin} />
    </div>
  );
};

export default ChatPage;
