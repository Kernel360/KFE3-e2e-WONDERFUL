import InputSearch from '@/components/search/input-search';
import HeaderWrapper from '@/components/layout/header/wrapper';

const SearchHeader = () => {
  return (
    <HeaderWrapper className="border-b-1 border-b-neutral-100 bg-white">
      <InputSearch id="search" />
    </HeaderWrapper>
  );
};

export default SearchHeader;
