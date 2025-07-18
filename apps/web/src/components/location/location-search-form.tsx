'use client';

import React, { useState } from 'react';

import MapLocationPicker from '@/components/location/map-location-picker';
import SearchLocationPicker from '@/components/location/search-location-picker';

import { useGeolocation } from '@/hooks/common/useGeolocation';

import type { UserLocation } from '@/lib/types/location';

interface LocationSearchFormProps {
  onLocationSelect?: (location: UserLocation, address: string) => void;
  onClose?: () => void;
}

type ViewType = 'search' | 'map';

const LocationSearchForm = ({ onLocationSelect, onClose }: LocationSearchFormProps) => {
  const { location: currentLocation } = useGeolocation();
  const [currentView, setCurrentView] = useState<ViewType>('search');

  const handleLocationSelect = (location: UserLocation, address: string) => {
    console.log('위치 선택됨:', { location, address });
    onLocationSelect?.(location, address);
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
    />
  );
};

export default LocationSearchForm;
