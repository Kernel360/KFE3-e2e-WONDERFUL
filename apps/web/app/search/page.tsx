import SearchLog, { Log } from '@/components/search/search-log';
import SearchResult from '@/components/search/search-result';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
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

const Page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    return <SearchLog logs={dummy} />;
  }

  // q 입력하기
  return <SearchResult query={`${query}`} />;
};

export default Page;
