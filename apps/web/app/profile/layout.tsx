import Navigation from '@/components/layout/navigation';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
};

export default ProfileLayout;
