'use client';

import React from 'react';

import { MapPin } from 'lucide-react';

import type { SearchResultItem } from '@/lib/types/location';

interface LocationSearchResultsProps {
  results: SearchResultItem[];
  isSearching: boolean;
  hasSearched: boolean;
  onLocationSelect: (item: SearchResultItem) => void;
}

const LocationSearchResults = ({
  results,
  isSearching,
  hasSearched,
  onLocationSelect,
}: LocationSearchResultsProps) => {
  if (!hasSearched) {
    return null;
  }

  if (isSearching) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <span className="ml-2 text-sm text-neutral-600">검색 중...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-neutral-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {results.map((item) => (
        <div
          key={item.id}
          onClick={() => onLocationSelect(item)}
          className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-50"
        >
          <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-medium text-neutral-900">{item.display_name}</p>
            <p className="truncate text-sm text-neutral-600">
              {item.road_address_name || item.address_name}
            </p>
            {item.place_name && <p className="truncate text-sm text-blue-600">{item.place_name}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchResults;
