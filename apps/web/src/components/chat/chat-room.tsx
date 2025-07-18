import { ChatContainer, ChatInputBar } from '@/components/chat/index';

const ChatRoom = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatContainer />
      <ChatInputBar />
    </div>
  );
};

export default ChatRoom;
