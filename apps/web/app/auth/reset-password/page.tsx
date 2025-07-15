import { Suspense } from 'react';

import { ResetPasswordForm } from '@/components/auth/reset-password';

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-[154px] pt-[131px]">
      <div className="mt-20 flex w-full max-w-md flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
