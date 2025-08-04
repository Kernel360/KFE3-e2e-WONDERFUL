import CategoriesFilter from '@/components/auction/categories-filter';
import { CreateAuctionButton } from '@/components/common';
import { AuctionItemList } from '@/components/common';
import { MainHeader, Navigation } from '@/components/layout';
import Container from '@/components/layout/container';

const Page = () => {
  return (
    <>
      <MainHeader />
      <Container className="px-4">
        <CategoriesFilter />
        <AuctionItemList />
        <CreateAuctionButton />
      </Container>
      <Navigation />
    </>
  );
};

export default Page;
