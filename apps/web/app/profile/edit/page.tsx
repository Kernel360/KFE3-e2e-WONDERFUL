import { ProfileEditForm } from '@/components/common';
import { ProfileHeader } from '@/components/layout';

const ProfileEditPage = () => {
  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-md flex-col bg-white">
      <ProfileHeader />
      <ProfileEditForm />
    </div>
  );
};

export default ProfileEditPage;
