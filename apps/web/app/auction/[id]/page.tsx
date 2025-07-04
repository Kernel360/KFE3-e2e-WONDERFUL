import AuctionPage from '@/views/AuctionPage';

const Page = ({ params }: { params: { id: string } }) => {
  return <AuctionPage auctionId={params.id} />;
};

export default Page;
