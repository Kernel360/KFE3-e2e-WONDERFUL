import { ProfileImage } from '@/components/common';

interface ProfileCardProps {
  nickname: string;
  profileImg?: string;
  location?: string | null;
  children: React.ReactNode;
}

const ProfileCard = ({ nickname, profileImg, location, children }: ProfileCardProps) => (
  <div className="flex w-full items-center gap-3 bg-white px-4 py-3">
    <ProfileImage
      src={profileImg || '/avatar-male.svg'}
      alt={`${nickname} 프로필 이미지`}
      className="size-10"
    />
    <div className="flex flex-col">
      <span className="text-base font-medium">{nickname}</span>
      {location && <span className="text-sm text-neutral-600">{location}</span>}
    </div>
    <div className="ml-auto">{children}</div>
  </div>
);

export default ProfileCard;
