import { Suspense } from 'react';

import Link from 'next/link';

import FindEmailForm from '@/components/auth/find-email/find-email-form';

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-[154px] pt-[131px]">
      <h1 className="text-h3 leading-h3 whitespace-nowrap text-center font-bold text-neutral-900">
        이메일 찾기
      </h1>

      <div className="mt-[80px] flex w-full flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <FindEmailForm />
        </Suspense>

        <div className="mt-6 whitespace-nowrap text-center">
          <span className="text-sm text-neutral-600">혹시 아직 이메일이 없으신가요? </span>
          <Link
            href="/auth/signup"
            className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
