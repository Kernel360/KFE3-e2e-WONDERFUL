import HeaderSearch from '@/components/search/header-search';
import SearchLog, { Log } from '@/components/search/search-log';

const dummy: Log[] = [
  {
    id: '1',
    content: '라이즈 손수건',
  },
  {
    id: '2',
    content: '캣휠',
  },
  {
    id: '3',
    content: '휘낭시에',
  },
];

const SearchPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <HeaderSearch />
      <SearchLog logs={dummy} />
    </div>
  );
};

export default SearchPage;
