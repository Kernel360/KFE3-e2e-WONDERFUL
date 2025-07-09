import SearchLog, { Log } from '@/components/search/search-log';
import SearchResult from '@/components/search/search-result';

interface SearchPageProps {
  searchParams: { q?: string };
}

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

const Page = ({ searchParams }: SearchPageProps) => {
  const { q } = searchParams;

  if (!q) {
    return <SearchLog logs={dummy} />;
  }

  return <SearchResult query={`${q}`} />;
};

export default Page;
