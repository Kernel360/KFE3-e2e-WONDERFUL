import { Container, SearchHeader } from '@/components/layout';

const layoutSearch = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchHeader />
      <Container className="px-4">{children}</Container>
    </>
  );
};

export default layoutSearch;
