import { Suspense } from 'react';

import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form';

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
      <div className="mt-[80px] flex w-full flex-col items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
