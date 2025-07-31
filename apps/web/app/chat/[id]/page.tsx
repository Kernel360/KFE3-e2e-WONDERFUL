import { ChatContainer, ChatInputBar, ProductInfoCard } from '@/components/chat';

import { getAuctionStatus } from '@/lib/actions/auction';

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ auctionId: string }>;
}) => {
  const { id } = await params;
  const { auctionId } = await searchParams;

  const roomId = id;

  const status = await getAuctionStatus(auctionId);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ProductInfoCard auctionId={auctionId} status={status} />
      <ChatContainer roomId={roomId} />
      <ChatInputBar roomId={roomId} />
    </div>
  );
};

export default Page;
