import { SettingsHeader, Container } from '@/components/layout';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SettingsHeader />
      <Container>{children}</Container>
    </>
  );
};

export default SettingsLayout;
