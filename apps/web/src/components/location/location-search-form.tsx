'use client';

import React, { useState } from 'react';

import MapLocationPicker from '@/components/location/map-location-picker';
import SearchLocationPicker from '@/components/location/search-location-picker';

import { useGeolocation } from '@/hooks/common/useGeolocation';

import { createLocation } from '@/lib/actions/location';
import type { UserLocation } from '@/lib/types/location';

interface LocationSearchFormProps {
  onClose?: () => void;
}

type ViewType = 'search' | 'map';

const LocationSearchForm = ({ onClose }: LocationSearchFormProps) => {
  const { location: currentLocation } = useGeolocation();
  const [currentView, setCurrentView] = useState<ViewType>('search');

  const handleLocationSelect = async (location: UserLocation, address: string) => {
    // 위치 정보 서버에 저장
    try {
      const result = await createLocation({
        location_name: address,
        latitude: location.latitude,
        longitude: location.longitude,
        is_primary: true,
      });

      if (result.success) {
        onClose?.();
      } else {
        alert(result.error || '위치 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ 위치 저장 중 오류:', error);
    }
  };

  const handleShowMapPicker = () => {
    setCurrentView('map');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
  };

  if (currentView === 'map') {
    return (
      <MapLocationPicker
        currentLocation={currentLocation}
        onLocationSelect={handleLocationSelect}
        onClose={handleBackToSearch}
      />
    );
  }

  return (
    <SearchLocationPicker
      onLocationSelect={handleLocationSelect}
      onShowMapPicker={handleShowMapPicker}
      onClose={onClose}
    />
  );
};

export default LocationSearchForm;
