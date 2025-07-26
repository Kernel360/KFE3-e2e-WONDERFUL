import { LocationHeader, Container } from '@/components/layout';

const LocationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LocationHeader />
      <Container>{children}</Container>
    </>
  );
};

export default LocationLayout;
