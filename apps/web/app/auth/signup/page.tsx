import { Suspense } from 'react';

import { SignupFlow } from '@/components/auth/signup';

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFlow />
    </Suspense>
  );
};

export default SignupPage;
