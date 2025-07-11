import ChatInput from '@/components/chat/chat-input';
import ChatListItem from '@/components/chat/chat-list-item';

const ChatPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <ChatListItem />
      <ChatInput />
    </div>
  );
};

export default ChatPage;
