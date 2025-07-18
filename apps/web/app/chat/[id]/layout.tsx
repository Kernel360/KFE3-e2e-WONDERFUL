import { ChatRoomHeader, Container } from '@/components/layout';

const layoutChatRoom = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChatRoomHeader />
      <Container>{children}</Container>
    </>
  );
};

export default layoutChatRoom;
