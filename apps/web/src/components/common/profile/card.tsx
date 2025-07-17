import { ProfileImage } from '@/components/common';

interface ProfileCardProps {
  nickname: string;
  profileImg?: string;
  children: React.ReactNode;
}

const ProfileCard = ({ nickname, profileImg, children }: ProfileCardProps) => (
  <div className="flex w-full items-center gap-3 bg-white px-4 py-3">
    <ProfileImage
      src={profileImg || '/avatar-male.svg'}
      alt={`${nickname} 프로필 이미지`}
      className="size-10"
    />
    <span className="text-base font-medium">{nickname}</span>
    <div className="ml-auto">{children}</div>
  </div>
);

export default ProfileCard;
