import React from 'react';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SignupSuccessProps {
  handleLocationSetup: () => void;
}

const SignupSuccess = ({ handleLocationSetup }: SignupSuccessProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 px-6">
        <div className="mt-[250px] flex justify-center">
          <div className="relative">
            <div className="bg-primary-300 flex h-16 w-16 items-center justify-center rounded-full">
              <div className="bg-primary-500 flex h-12 w-12 items-center justify-center rounded-full">
                <Check className="h-6 w-6 stroke-[3px] text-white" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-center text-3xl font-bold text-neutral-900">가입 성공</h2>

        <p className="mt-10 text-center text-xl font-medium text-neutral-600">
          축하합니다. 이제 서비스를 이용하실 수 있습니다.
        </p>
      </div>

      <div className="mb-[94px] px-6">
        <Button
          onClick={handleLocationSetup}
          size="lg"
          color="primary"
          fullWidth={true}
          className="h-14"
        >
          지역 설정하기
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccess;
