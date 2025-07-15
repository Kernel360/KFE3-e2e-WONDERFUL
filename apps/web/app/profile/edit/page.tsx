import ProfileEditForm from '@/components/common/profile/edit/form-edit';
import ProfileHeader from '@/components/layout/header/profile';

const ProfileEditPage = () => {
  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-md flex-col bg-white">
      <ProfileHeader />
      <ProfileEditForm />
    </div>
  );
};

export default ProfileEditPage;
