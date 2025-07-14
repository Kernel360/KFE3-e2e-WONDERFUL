import AuctionList from '@/components/auction/auction-list';
import { CreateAuctionButton } from '@/components/common';
import { MainHeader } from '@/components/layout';
import Container from '@/components/layout/container';

const Page = () => {
  return (
    <>
      <MainHeader />
      <Container className="px-4">
        <AuctionList />
        <CreateAuctionButton />
      </Container>
    </>
  );
};

export default Page;
