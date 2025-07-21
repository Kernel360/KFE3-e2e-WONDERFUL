import { AccountHeader, Container } from '@/components/layout';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AccountHeader />
      <Container className="p-3">{children}</Container>
    </>
  );
};

export default AccountLayout;
