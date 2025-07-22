'use client';

import React from 'react';

import { LocationDisplay } from '@/components/auth/signup';
import { Button } from '@/components/ui/button';

import { useLocationModalStore } from '@/lib/zustand/store/location-modal-store';
interface LocationSetupProps {
  onSaveLocation: () => void;
}

const LocationSetup = ({ onSaveLocation }: LocationSetupProps) => {
  // 위치 저장 시 처리
  const handleSaveLocation = () => {
    const { openLocationModal } = useLocationModalStore.getState();
    openLocationModal();

    // 실제 저장 로직 추가 가능
    onSaveLocation();
  };

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

          <LocationDisplay showAddressText={true} mapHeight="130px" />
        </div>
      </div>

      <div className="mb-[137px] px-6">
        <div className="space-y-3">
          <Button
            onClick={handleSaveLocation}
            size="lg"
            color="primary"
            fullWidth={true}
            className="h-14"
          >
            위치 저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSetup;
