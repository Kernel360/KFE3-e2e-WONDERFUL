import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfileImage = ({ src, alt, className }: ProfileImageProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
    </Avatar>
  );
};

export default ProfileImage;
