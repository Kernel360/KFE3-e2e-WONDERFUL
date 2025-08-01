import { tv } from 'tailwind-variants';

import { ProfileImage } from '@/components/common';

const BidderAvatar = ({
  profileImg,
  nickname,
  isAuthor,
}: {
  profileImg: string;
  nickname: string;
  isAuthor: boolean;
}) => {
  const authorStyle = tv({
    base: 'shrink-0',
    variants: {
      author: {
        true: 'border-2 border-primary-500 shadow-md shadow-primary-200 bg-white',
        false: '',
      },
    },
  });

  return (
    <ProfileImage
      src={profileImg}
      alt={nickname}
      size={'small'}
      className={authorStyle({ author: isAuthor })}
    />
  );
};

export default BidderAvatar;

// return (
//   <>
//     {userId && (
//       // 유저 아이디가 있을 때만 아바타 표시
//       // 프로필 이미지가 없으면 기본 아바타 이미지 사용
//       <Avatar className="border-primary-500 shadow-primary-200 size-8 border-2 bg-white shadow-md">
//         <AvatarImage src={profileImg || '/avatar-female.svg'} alt={nickname} />
//       </Avatar>
//     )}
//   </>
// );
