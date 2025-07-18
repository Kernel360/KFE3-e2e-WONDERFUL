'use client';

import { useState, useEffect } from 'react';

import { convertCoordinatesToDisplayAddress } from '@/lib/api/kakao';
import type { UserLocation, GeolocationOptions } from '@/lib/types/location';

import { useGeolocation } from './useGeolocation';

interface UseLocationWithAddressReturn {
  location: UserLocation | null;
  address: string;
  error: string;
  isLoading: boolean;
  retry: () => void;
  isReady: boolean;
  displayText: string;
}

/**
 * 위치 정보 + 주소 변환을 함께 제공하는 훅
 */
export const useLocationWithAddress = (
  options: GeolocationOptions = {}
): UseLocationWithAddressReturn => {
  const { location, error: geoError, isLoading: geoLoading, retry } = useGeolocation(options);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  // 주소 변환 처리
  useEffect(() => {
    if (!location) {
      setAddress('');
      return;
    }

    const fetchAddress = async () => {
      try {
        const addressResult = await convertCoordinatesToDisplayAddress(
          location.longitude,
          location.latitude
        );
        setAddress(addressResult);
        setAddressError('');
      } catch (error) {
        console.error('주소 변환 실패:', error);
        setAddress('주소 확인 실패');
        setAddressError('주소 변환에 실패했습니다.');
      }
    };

    fetchAddress();
  }, [location]);

  const combinedError = geoError || addressError;
  const isReady = !geoLoading && !combinedError && !!location && !!address;
  const displayText = address || '위치 정보 없음';

  return {
    location,
    address,
    error: combinedError,
    isLoading: geoLoading,
    retry,
    isReady,
    displayText,
  };
};
