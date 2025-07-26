import { Avatar, AvatarImage } from '@/components/ui/avatar';

const BidderAvatar = ({
  userId,
  profileImg,
  nickname,
}: {
  userId: string;
  profileImg: string;
  nickname: string;
}) => {
  return (
    <>
      {userId && (
        // 유저 아이디가 있을 때만 아바타 표시
        // 프로필 이미지가 없으면 기본 아바타 이미지 사용
        <Avatar className="border-primary-500 shadow-primary-200 size-8 border-2 bg-white shadow-md">
          <AvatarImage src={profileImg || '/avatar-female.svg'} alt={nickname} />
        </Avatar>
      )}
    </>
  );
};

export default BidderAvatar;
