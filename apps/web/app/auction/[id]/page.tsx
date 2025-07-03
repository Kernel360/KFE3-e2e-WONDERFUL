import AuctionPage from '@/pages/AuctionPage';

const Page = ({ params }: { params: { id: string } }) => {
  return <AuctionPage auctionId={params.id} />;
};

export default Page;
