'use client';

import React from 'react';

import KakaoMap from '@/components/location/kakao-map';
import { Button } from '@/components/ui/button';

import { useLocationWithAddress } from '@/hooks/common/useLocationWithAddress';

interface LocationDisplayProps {
  showAddressText?: boolean;
  mapHeight?: string | number;
  className?: string;
}

const LocationDisplay = ({
  showAddressText = true,
  mapHeight = '130px',
  className = '',
}: LocationDisplayProps) => {
  const { location, address, error, isLoading, retry, displayText } = useLocationWithAddress();

  return (
    <div className={`rounded-lg bg-neutral-100 ${className}`}>
      {location && !isLoading && !error ? (
        <div className="relative p-2 pb-0">
          <KakaoMap
            location={location}
            height={mapHeight}
            width="100%"
            level={3}
            showMarker={true}
            showInfoWindow={false}
            className="rounded-[10px] border-0"
          />
        </div>
      ) : (
        <div className="p-2 pb-0">
          <div
            className="flex w-full items-center justify-center rounded-[10px] bg-white"
            style={{ height: mapHeight }}
          >
            <div className="text-center">
              {isLoading ? (
                <>
                  <div className="border-primary-500 mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                  <p className="text-sm text-neutral-600">위치를 가져오는 중...</p>
                </>
              ) : error ? (
                <span className="text-danger-600 text-sm">지도를 불러올 수 없습니다</span>
              ) : (
                <span className="text-sm text-neutral-500">지도를 불러올 수 없습니다</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-2">
        <div className="rounded-[10px] bg-white p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-black">Home</h3>
          </div>

          <div>
            {showAddressText && (
              <p className="text-sm text-neutral-700">{error ? '위치 확인 실패' : displayText}</p>
            )}
          </div>

          {error && (
            <div className="mt-3">
              <Button onClick={retry} size="sm" color="primary" className="text-xs">
                다시 시도
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;
