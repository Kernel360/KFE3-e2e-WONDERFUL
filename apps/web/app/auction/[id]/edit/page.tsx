import EditAuctionPage from '@/pages/EditAuctionPage';

const Page = ({ params }: { params: { id: string } }) => {
  return <EditAuctionPage itemId={params.id} />;
};

export default Page;
