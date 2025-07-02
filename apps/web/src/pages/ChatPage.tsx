import ChatListItem from '@/components/chat/chat-list-item';

const ChatPage = () => {
  return (
    <div className="flex h-full w-full">
      <ChatListItem />
    </div>
  );
};
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export const dynamic = 'force-dynamic';
export default ChatPage;
