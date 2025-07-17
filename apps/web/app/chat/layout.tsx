import { ChatHeader, Container } from '@/components/layout';

const layoutChat = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChatHeader />
      <Container>{children}</Container>
    </>
  );
};

export default layoutChat;
