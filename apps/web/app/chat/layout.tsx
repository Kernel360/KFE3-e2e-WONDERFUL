import { ChatHeader, Container, Navigation } from '@/components/layout';

const layoutChat = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChatHeader />
      <Container>{children}</Container>
      <Navigation />
    </>
  );
};

export default layoutChat;
