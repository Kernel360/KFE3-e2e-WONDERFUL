'use client';

import { useState, useEffect } from 'react';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  location: UserLocation | null;
  error: string;
  isLoading: boolean;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: '',
    isLoading: true,
  });

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 600000,
    ...options,
  };

  const getCurrentLocation = () => {
    console.log('Geolocation: 위치 정보 요청 시작');

    if (!navigator.geolocation) {
      console.error('Geolocation: 브라우저에서 지원하지 않음');
      setState({
        location: null,
        error: '이 브라우저에서는 위치 서비스를 지원하지 않습니다.',
        isLoading: false,
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: '' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Geolocation 성공:', {
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
        });
        setState({
          location: { latitude, longitude },
          error: '',
          isLoading: false,
        });
      },
      (error) => {
        console.error('Geolocation 에러:', {
          code: error.code,
          message: error.message,
          PERMISSION_DENIED: error.PERMISSION_DENIED,
          POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
          TIMEOUT: error.TIMEOUT,
        });

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
        setState({
          location: null,
          error: errorMessage,
          isLoading: false,
        });
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

  return {
    ...state,
    retry,
  };
};
