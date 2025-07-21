import { AddressHeader, Container } from '@/components/layout';

const AddressLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AddressHeader />
      <Container className="p-3">{children}</Container>
    </>
  );
};

export default AddressLayout;
