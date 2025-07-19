'use client';

import React, { useState } from 'react';

import { Map, X } from 'lucide-react';

import LocationSearchResults from '@/components/location/location-search-results';
import SearchInput from '@/components/location/search-input';
import { Button } from '@/components/ui/button';

import { useGeolocation } from '@/hooks/common/useGeolocation';

import { searchAddressByKeyword } from '@/lib/api/kakao';
import type { UserLocation, SearchResultItem } from '@/lib/types/location';

interface SearchLocationPickerProps {
  onLocationSelect: (location: UserLocation, address: string) => void;
  onShowMapPicker: () => void;
  onClose?: () => void;
}

const SearchLocationPicker = ({
  onLocationSelect,
  onShowMapPicker,
  onClose,
}: SearchLocationPickerProps) => {
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
      setHasSearched(true);
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
      <div className="flex items-center justify-between border-b border-neutral-200 p-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">위치 정보 설정</h2>
        <div className="w-8"></div>
      </div>

      {/* 검색 영역 */}
      <div className="space-y-3 p-4">
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
          color="secondary"
          fullWidth={true}
          className="gap-3"
        >
          <Map />
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

      {/* 검색 결과 */}
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

export default SearchLocationPicker;
