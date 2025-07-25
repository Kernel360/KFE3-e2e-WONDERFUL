import { ChatContainer, ChatInputBar, ProductInfoCard } from '@/components/chat';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ProductInfoCard roomId={id} />
      <ChatContainer roomId={id} />
      <ChatInputBar roomId={id} />
    </div>
  );
};

export default Page;
