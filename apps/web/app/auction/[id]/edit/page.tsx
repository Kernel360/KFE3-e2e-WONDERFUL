import EditAuctionPage from '@/pages/EditAuctionPage';
import { updateAuction } from '@/lib/actions/auction.action';

// const Page = ({ params }: { params: { id: string } }) => {
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // return <EditAuctionPage itemId={params.id} />;
  return <EditAuctionPage itemId={id} />;
};

export default Page;
