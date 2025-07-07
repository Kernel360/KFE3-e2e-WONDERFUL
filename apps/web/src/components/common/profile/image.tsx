import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
    </Avatar>
  );
};

export default ProfileImage;
