import { ProfileHeader } from '@/components/layout';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
};

export default ProfileLayout;
