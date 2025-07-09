import { ChatHeader, Container } from '@/components/layout';

const layoutSearch = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChatHeader />
      <Container className="px-4">{children}</Container>
    </>
  );
};

export default layoutSearch;
