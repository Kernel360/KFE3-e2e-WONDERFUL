'use client';

import { useState, useEffect } from 'react';

import { convertCoordinatesToDisplayAddress } from '@/lib/api/kakao-search';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface GeolocationState {
  location: UserLocation | null;
  address: string; // 추가: "서울시 서초구 서초동" 형태 주소
  error: string;
  isLoading: boolean;
  isLoadingAddress: boolean; // 추가: 주소 로딩 상태
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  autoFetchAddress?: boolean; // 추가: 자동으로 주소 가져올지 여부
}

export const useGeolocation = (options: GeolocationOptions = {}) => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    address: '',
    error: '',
    isLoading: true,
    isLoadingAddress: false,
  });

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 600000,
    autoFetchAddress: true, // 기본값: 자동으로 주소 가져오기
    ...options,
  };

  // 주소 가져오기 함수
  const fetchAddress = async (location: UserLocation) => {
    if (!defaultOptions.autoFetchAddress) return;

    setState((prev) => ({ ...prev, isLoadingAddress: true }));

    try {
      const address = await convertCoordinatesToDisplayAddress(
        location.longitude,
        location.latitude
      );
      setState((prev) => ({
        ...prev,
        address,
        isLoadingAddress: false,
      }));
    } catch (error) {
      console.error('주소 변환 실패:', error);
      setState((prev) => ({
        ...prev,
        address: '주소 확인 실패',
        isLoadingAddress: false,
      }));
    }
  };

  const getCurrentLocation = () => {
    console.log('Geolocation: 위치 정보 요청 시작');

    if (!navigator.geolocation) {
      console.error('Geolocation: 브라우저에서 지원하지 않음');
      setState((prev) => ({
        ...prev,
        location: null,
        address: '',
        error: '이 브라우저에서는 위치 서비스를 지원하지 않습니다.',
        isLoading: false,
        isLoadingAddress: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: '',
      address: '',
      isLoadingAddress: false,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };

        console.log('Geolocation 성공:', {
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
        });

        setState((prev) => ({
          ...prev,
          location: newLocation,
          error: '',
          isLoading: false,
        }));

        // 주소 자동 가져오기
        fetchAddress(newLocation);
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

        setState((prev) => ({
          ...prev,
          location: null,
          address: '',
          error: errorMessage,
          isLoading: false,
          isLoadingAddress: false,
        }));
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

  // 수동으로 주소 다시 가져오기
  const refetchAddress = () => {
    if (state.location) {
      fetchAddress(state.location);
    }
  };

  return {
    ...state,
    retry,
    refetchAddress,
    // 편의 속성들
    isReady: !state.isLoading && !state.error && !!state.location,
    displayText: state.isLoadingAddress ? '위치 확인 중...' : state.address || '위치 정보 없음',
  };
};
