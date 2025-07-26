import { SettingsHeader, Container } from '@/components/layout';

const SettiongsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SettingsHeader />
      <Container>{children}</Container>
    </>
  );
};

export default SettiongsLayout;
