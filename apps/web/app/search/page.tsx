import { SearchLog } from '@/components/search/search-log';
import SearchResult from '@/components/search/search-result';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    return <SearchLog />;
  }

  // q 입력하기
  return <SearchResult query={`${query}`} />;
};

export default Page;
