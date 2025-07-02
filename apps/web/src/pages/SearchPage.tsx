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
    <>
      <HeaderSearch />
      <main className="flex flex-col items-center justify-start pt-3">
        <SearchLog logs={dummy} />
      </main>
    </>
  );
};
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export const dynamic = 'force-dynamic';
export default SearchPage;
