'use client';

import { useSearchParams } from 'next/navigation';

import HeaderWrapper from '@/components/layout/header/wrapper';
import InputSearch from '@/components/search/input-search';

const SearchHeader = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <HeaderWrapper className="border-b-1 border-b-neutral-100 bg-white">
      <InputSearch id="search" defaultValue={query} placeholder="경매 상품을 검색해보세요" />
    </HeaderWrapper>
  );
};

export default SearchHeader;
