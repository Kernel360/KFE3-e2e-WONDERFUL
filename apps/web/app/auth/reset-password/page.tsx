import { Suspense } from 'react';

import Link from 'next/link';

import { ResetPasswordForm } from '@/components/auth/reset-password';
const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        비밀번호 찾기
      </h1>
      <div className="mt-20 flex w-full max-w-md flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
      <div className="mt-6 whitespace-nowrap text-center">
        <span className="text-sm text-neutral-600">계정이 기억나지 않으신가요? </span>
        <Link
          href="/auth/find-email"
          className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
        >
          이메일 찾기
        </Link>
      </div>
    </div>
  );
};

export default Page;
