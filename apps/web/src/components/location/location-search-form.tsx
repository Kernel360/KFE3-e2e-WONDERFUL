'use client';

import React, { useState, useEffect } from 'react';

import { X } from 'lucide-react';

import KakaoMap from '@/components/location/kakao-map';
import LocationSearchResults from '@/components/location/location-search-results';
import SearchInput from '@/components/location/search-input';
import { Button } from '@/components/ui/button';

import { useGeolocation } from '@/hooks/common/useGeolocation';

import { searchAddressByKeyword, convertCoordinatesToDisplayAddress } from '@/lib/api/kakao-search';

// 타입 정의들
interface UserLocation {
  latitude: number;
  longitude: number;
}

interface SearchResultItem {
  id: string;
  address_name: string;
  road_address_name?: string;
  latitude: number;
  longitude: number;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  display_name: string;
  place_name?: string;
  category_name?: string;
}

// 지도에서 위치 선택 화면
const MapLocationPicker = ({
  currentLocation,
  onLocationSelect,
  onClose,
}: {
  currentLocation: UserLocation | null;
  onLocationSelect: (location: UserLocation, address: string) => void;
  onClose: () => void;
}) => {
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(currentLocation);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [mapSearchTerm, setMapSearchTerm] = useState('');
  const [isMapSearching, setIsMapSearching] = useState(false);

  const handleLocationSelect = async (location: UserLocation) => {
    setSelectedLocation(location);
    setIsLoadingAddress(true);

    try {
      const address = await convertCoordinatesToDisplayAddress(
        location.longitude,
        location.latitude
      );
      setSelectedAddress(address);
    } catch (error) {
      console.error('주소 변환 실패:', error);
      setSelectedAddress('주소 확인 실패');
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleMapSearch = async () => {
    if (!mapSearchTerm.trim()) return;

    setIsMapSearching(true);
    try {
      const results = await searchAddressByKeyword(mapSearchTerm);
      if (results.length > 0 && results[0]) {
        const firstResult = results[0];
        const newLocation = {
          latitude: firstResult.latitude,
          longitude: firstResult.longitude,
        };

        setSelectedLocation(newLocation);
        setSelectedAddress(firstResult.display_name);

        console.log('지도 검색 결과:', firstResult);
      } else {
        alert('검색 결과가 없습니다.');
      }
    } catch (error) {
      console.error('지도 검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setIsMapSearching(false);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation && selectedAddress) {
      onLocationSelect(selectedLocation, selectedAddress);
    }
  };

  useEffect(() => {
    if (currentLocation) {
      handleLocationSelect(currentLocation);
    }
  }, [currentLocation]);

  if (!currentLocation) {
    return (
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">지도에서 위치 선택</h2>
          <div className="w-8"></div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-neutral-600">현재 위치를 확인할 수 없습니다.</p>
            <Button onClick={onClose} size="medium" color="secondary" className="mt-4">
              돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-neutral-200 p-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">지도에서 위치 선택</h2>
        <div className="w-8"></div>
      </div>

      {/* 지도 영역 - 분리된 컴포넌트 사용 */}
      <div className="flex-1">
        <KakaoMap
          location={selectedLocation || currentLocation}
          onLocationSelect={handleLocationSelect}
          height="100%"
          level={3}
        />
      </div>

      {/* 지도 하단 검색 영역 */}
      <div className="border-t border-neutral-200 bg-neutral-50 p-4">
        {/* 분리된 SearchInput 컴포넌트 사용 */}
        <SearchInput
          value={mapSearchTerm}
          onChange={setMapSearchTerm}
          onSearch={handleMapSearch}
          placeholder="동명으로 검색 (ex. 서초동, 역삼동)"
          isSearching={isMapSearching}
          className="mb-3"
        />

        {/* 선택 버튼 */}
        <Button
          onClick={handleConfirm}
          disabled={!selectedLocation || isLoadingAddress}
          size="medium"
          color={selectedLocation && !isLoadingAddress ? 'primary' : 'disabled'}
          fullWidth={true}
        >
          선택된 위치로 저장하기
        </Button>
      </div>
    </div>
  );
};

// 검색 기반 위치 선택 화면
const SearchLocationPicker = ({
  onLocationSelect,
  onShowMapPicker,
}: {
  onLocationSelect: (location: UserLocation, address: string) => void;
  onShowMapPicker: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { error, retry } = useGeolocation();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchAddressByKeyword(searchTerm);
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (item: SearchResultItem) => {
    const location = { latitude: item.latitude, longitude: item.longitude };
    const address = item.display_name;
    onLocationSelect(location, address);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="text-center text-lg font-semibold">위치 정보 설정</h2>
      </div>

      {/* 검색 영역 */}
      <div className="space-y-3 p-4">
        {/* 분리된 SearchInput 컴포넌트 사용 */}
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
          isSearching={isSearching}
        />

        {/* 지도에서 검색하기 버튼 */}
        <Button
          onClick={onShowMapPicker}
          size="medium"
          color="primary"
          fullWidth={true}
          className="gap-3"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          지도에서 검색하기
        </Button>
      </div>

      {/* 위치 오류 메시지 */}
      {error && (
        <div className="mx-4 mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
          <Button onClick={retry} size="sm" color="negative" variant="outline" className="mt-2">
            다시 시도
          </Button>
        </div>
      )}

      {/* 분리된 LocationSearchResults 컴포넌트 사용 */}
      <div className="flex-1 overflow-y-auto px-4">
        <LocationSearchResults
          results={searchResults}
          isSearching={isSearching}
          hasSearched={hasSearched}
          onLocationSelect={handleLocationSelect}
        />
      </div>
    </div>
  );
};

// 메인 LocationSearchForm 컴포넌트
const LocationSearchForm = ({
  onLocationSelect,
  onClose,
}: {
  onLocationSelect?: (location: UserLocation, address: string) => void;
  onClose?: () => void;
}) => {
  const { location: currentLocation } = useGeolocation();
  const [currentView, setCurrentView] = useState<'search' | 'map'>('search');

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
