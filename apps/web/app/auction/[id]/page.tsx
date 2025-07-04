import AuctionPage from '@/views/AuctionPage';

// const Page = ({ params }: { params: { id: string } }) => {
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // return <AuctionPage auctionId={params.id} />;
  return <AuctionPage auctionId={id} />;
};

export default Page;
