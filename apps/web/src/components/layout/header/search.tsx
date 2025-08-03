'use client';

import { useSearchParams } from 'next/navigation';

import { HeaderWrapper } from '@/components/layout';
import InputSearch from '@/components/search/input-search';

const SearchHeader = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <HeaderWrapper className="bg-white">
      <InputSearch id="search" defaultValue={query} />
    </HeaderWrapper>
  );
};

export default SearchHeader;
