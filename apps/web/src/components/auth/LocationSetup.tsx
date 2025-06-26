import React from 'react';

import { Button } from '@/components/ui/button';

interface LocationSetupProps {
  onSaveLocation: () => void;
  onSkipLocation: () => void;
}

const LocationSetup = ({ onSaveLocation, onSkipLocation }: LocationSetupProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 상단 컨텐츠 */}
      <div className="flex-1 px-6">
        {/* 제목 - 상단에서 151px */}
        <div style={{ marginTop: '151px' }}>
          <h1
            style={{
              color: '#000',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '38px',
              fontFamily: 'var(--font-heading)',
              marginBottom: '14px',
            }}
          >
            회원님의 위치를
            <br />
            알려주세요
          </h1>

          {/* 설명 텍스트 - 제목 아래 14px */}
          <p
            style={{
              color: 'var(--Neutral-70, #656565)',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '22px',
              fontFamily: 'var(--font-body)',
              marginBottom: '40px',
            }}
          >
            모든 회원은 거래를 위해 사용자 위치를
            <br />
            설정해야합니다.
          </p>

          {/* 지도 영역 - 설명 아래 40px */}
          <div
            className="bg-primary-500 mx-auto overflow-hidden rounded-2xl"
            style={{
              display: 'flex',
              width: '327px',
              minHeight: '90px',
              padding: '8px 8px 12px 8px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            {/* 지도 API 텍스트 */}
            <div className="flex h-full w-full flex-1 items-center justify-center">
              <span
                className="text-white"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                지도 API
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 - 137px 간격 */}
      <div className="px-6" style={{ marginBottom: '137px' }}>
        <div className="space-y-3">
          {/* 위치 저장 버튼 */}
          <Button
            onClick={onSaveLocation}
            size="lg"
            color="primary"
            fullWidth={true}
            className="h-14"
          >
            위치 저장
          </Button>

          {/* 다음에 설정하기 버튼 */}
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
