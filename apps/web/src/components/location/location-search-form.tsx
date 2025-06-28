import React, { useState } from 'react';

import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LocationSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const seoulDistricts = [
    '서울시 중로구',
    '서울시 중구',
    '서울시 용산구',
    '서울시 성동구',
    '서울시 광진구',
    '서울시 동대문구',
    '서울시 중랑구',
    '서울시 성북구',
    '서울시 강북구',
    '서울시 도봉구',
    '서울시 노원구',
    '서울시 은평구',
    '서울시 서대문구',
    '서울시 마포구',
    '서울시 양천구',
    '서울시 강서구',
    '서울시 구로구',
    '서울시 금천구',
    '서울시 영등포구',
    '서울시 동작구',
    '서울시 관악구',
    '서울시 서초구',
    '서울시 강남구',
    '서울시 송파구',
    '서울시 강동구',
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = seoulDistricts.filter(
        (district) =>
          district.toLowerCase().includes(searchTerm.toLowerCase()) || district.includes(searchTerm)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(seoulDistricts);
    }
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[345px]"
        />
      </div>

      <div className="mb-6">
        <Button onClick={handleSearch} size="medium" color="primary" className="w-[345px]">
          <MapPin className="h-4 w-4" />
          검색하기
        </Button>
      </div>

      {hasSearched && (
        <div className="w-[345px]">
          {filteredResults.length > 0 ? (
            filteredResults.map((district, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center px-4 py-2 text-base font-normal text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                {district}
              </div>
            ))
          ) : (
            <div className="flex items-center px-4 py-2 text-base font-normal text-neutral-400">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearchForm;
