'use client';

import React, { useState } from 'react';

import LocationSearchResults from '@/components/location/location-search-results';
import SearchInput from '@/components/location/search-input';
import { Button } from '@/components/ui/button';

import { useGeolocation } from '@/hooks/common/useGeolocation';

import { searchAddressByKeyword } from '@/lib/api/kakao';
import type { UserLocation, SearchResultItem } from '@/lib/types/location';

interface SearchLocationPickerProps {
  onLocationSelect: (location: UserLocation, address: string) => void;
  onShowMapPicker: () => void;
}

const SearchLocationPicker = ({ onLocationSelect, onShowMapPicker }: SearchLocationPickerProps) => {
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
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="text-center text-lg font-semibold">위치 정보 설정</h2>
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
