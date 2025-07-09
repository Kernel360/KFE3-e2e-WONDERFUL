import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} width={40} height={40} className="object-cover" />
    </Avatar>
  );
};

export default ProfileImage;
