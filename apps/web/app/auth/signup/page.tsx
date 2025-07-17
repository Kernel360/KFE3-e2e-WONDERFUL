import { Suspense } from 'react';

import { Metadata } from 'next';

import { SignupFlow } from '@/components/auth/signup';

export const metadata: Metadata = {
  title: '회원가입 | 앱이름',
  description: '새로운 계정을 만들어 서비스를 시작하세요.',
};

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFlow />
    </Suspense>
  );
};

export default SignupPage;
