import { AuctionHeader, Container } from '@/components/layout';

const AuctionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuctionHeader />
      <Container className="scrollbar-hide-y">{children}</Container>
    </>
  );
};

export default AuctionLayout;
