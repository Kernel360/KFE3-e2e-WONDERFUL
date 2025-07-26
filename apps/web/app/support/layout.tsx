import { SupportHeader, Container } from '@/components/layout';

const SupportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SupportHeader />
      <Container>{children}</Container>
    </>
  );
};

export default SupportLayout;
