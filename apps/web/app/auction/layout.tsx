import { AuctionHeader, Container, Navigation } from '@/components/layout';

const AuctionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuctionHeader />
      <Container>{children}</Container>
      <Navigation />
    </>
  );
};

export default AuctionLayout;
