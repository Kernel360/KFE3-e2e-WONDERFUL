import { Suspense } from 'react';

import Link from 'next/link';

import { GoogleLoginButton, SigninForm } from '@/components/auth/signin';

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        로그인
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <SigninForm />
        </Suspense>

        <div className="mt-[20px] flex w-[360px] items-center justify-center gap-6">
          <GoogleLoginButton />
        </div>

        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">계정이 없으신가요? </span>
          <Link
            href="/auth/signup"
            className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            회원 가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
