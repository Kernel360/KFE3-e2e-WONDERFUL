'use client';

import { useState, useEffect } from 'react';

import type { UserLocation, GeolocationOptions } from '@/lib/types/location';

interface UseGeolocationReturn {
  location: UserLocation | null;
  error: string;
  isLoading: boolean;
  retry: () => void;
  isReady: boolean;
}

/**
 * 순수 위치 정보만 관리하는 훅
 * 주소 변환은 별도 훅에서 처리
 */
export const useGeolocation = (options: GeolocationOptions = {}): UseGeolocationReturn => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const defaultOptions: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 600000,
    ...options,
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError('');
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '위치 접근 권한이 거부되었습니다.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            errorMessage = '위치 요청 시간이 초과되었습니다.';
            break;
          default:
            errorMessage = '위치를 가져오는 중 오류가 발생했습니다.';
            break;
        }
        setLocation(null);
        setError(errorMessage);
        setIsLoading(false);
      },
      defaultOptions
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const retry = () => {
    getCurrentLocation();
  };

  const isReady = !isLoading && !error && !!location;

  return {
    location,
    error,
    isLoading,
    retry,
    isReady,
  };
};
