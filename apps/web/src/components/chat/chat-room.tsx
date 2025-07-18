import { ChatContainer, ChatInputBar, ProductInfoCard } from '@/components/chat/index';

const ChatRoom = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ProductInfoCard />
      <ChatContainer />
      <ChatInputBar />
    </div>
  );
};

export default ChatRoom;
