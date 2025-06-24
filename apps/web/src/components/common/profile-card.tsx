import ProfileImage from '@/components/common/profile-image';

interface ProfileCardProps {
  nickname: string;
  profileImg: string;
  children: React.ReactNode;
}

export const ProfileCard = ({ nickname, profileImg, children }: ProfileCardProps) => (
  <div className="flex items-center gap-3 bg-white p-4">
    <ProfileImage src={profileImg} alt={`${nickname} 프로필 이미지`} />
    <span className="text-base font-medium">{nickname}</span>
    <div className="ml-auto">{children}</div>
  </div>
);
