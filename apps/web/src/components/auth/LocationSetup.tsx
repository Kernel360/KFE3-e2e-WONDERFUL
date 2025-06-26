import React from 'react';

import { Button } from '@/components/ui/button';

interface LocationSetupProps {
  onSaveLocation: () => void;
  onSkipLocation: () => void;
}

const LocationSetup = ({ onSaveLocation, onSkipLocation }: LocationSetupProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 px-6">
        <div className="mt-[151px]">
          <h1 className="mb-[14px] text-3xl font-bold text-black">
            회원님의 위치를
            <br />
            알려주세요
          </h1>

          <p className="mb-10 text-sm font-medium text-neutral-600">
            모든 회원은 거래를 위해 사용자 위치를
            <br />
            설정해야합니다.
          </p>

          <div className="bg-primary-500 mx-auto flex min-h-[90px] w-[327px] flex-col items-start gap-2 overflow-hidden rounded-2xl p-2 pb-3">
            <div className="flex h-full w-full flex-1 items-center justify-center">
              <span className="text-xl font-medium text-white">지도 API</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[137px] px-6">
        <div className="space-y-3">
          <Button
            onClick={onSaveLocation}
            size="lg"
            color="primary"
            fullWidth={true}
            className="h-14"
          >
            위치 저장
          </Button>

          <Button
            onClick={onSkipLocation}
            size="lg"
            color="secondary"
            fullWidth={true}
            className="h-14"
          >
            다음에 설정하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSetup;
