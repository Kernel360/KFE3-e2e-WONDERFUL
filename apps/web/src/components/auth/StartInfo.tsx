import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface StartInfoProps {
  onStartActivity: () => void;
}

const StartInfo = ({ onStartActivity }: StartInfoProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 px-6">
        <div className="mt-[110px] flex justify-center">
          <div className="flex h-[375px] w-[375px] items-center justify-center rounded-2xl">
            <Image
              src="/icon/Megaphone.svg"
              alt="축하 일러스트"
              width={375}
              height={375}
              priority
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="mb-[14px] mt-[14px] text-center text-3xl font-bold text-neutral-900">
          축하합니다!
        </h1>

        <p className="text-center text-sm font-medium text-neutral-600">
          회원가입이 성공적으로 완료되었습니다.
        </p>
      </div>

      <div className="mb-[94px] px-6">
        <Button
          onClick={onStartActivity}
          size="lg"
          color="primary"
          fullWidth={true}
          className="h-14"
        >
          활동 시작하기
        </Button>
      </div>
    </div>
  );
};

export default StartInfo;
