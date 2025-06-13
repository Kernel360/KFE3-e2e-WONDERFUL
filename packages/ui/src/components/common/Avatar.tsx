export interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  variant: 'circle' | 'rounded';
  imgUrl: string;
  alt: string;
  className?: string;
}

// 사이즈 매핑
const SizeClassMap: Record<AvatarProps['size'], string> = {
  xs: 'w-6 h-6', // 24px
  sm: 'w-8 h-8', // 32px
  md: 'w-[44px] h-[44px]', // 44px
  lg: 'w-[56px] h-[56px]', // 56px
  xl: 'w-[76px] h-[76px]', // 76px
  xxl: 'w-[90px] h-[90px]', // 90px
};

// variant에 따른 border-radius 클래스 반환 함수
const getRadiusClass = (variant: AvatarProps['variant']): string => {
  return variant === 'circle' ? 'rounded-full' : 'rounded-[10px]';
};

const Avatar = ({
  size,
  variant,
  imgUrl,
  alt,
  className = '',
}: AvatarProps) => {
  const sizeClass = SizeClassMap[size];
  const radiusClass = getRadiusClass(variant);

  return (
    <div
      className={`${sizeClass} ${radiusClass} bg-contain bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${imgUrl})` }}
      role='img'
      aria-label={alt}
    >
      아바타
    </div>
  );
};

export default Avatar;

// 예시
{
  /* 
  <ProfileImg
    size='md'
    variant='circle'
    imgUrl='https://fastly.picsum.photos/id/80/100/100.jpg?hmac=UnJ24iTImZRE67j2jQSm-kB3w4j3iJ-U_6SxLFnhX4g'
    alt='사용자 프로필 이미지'
  />; 
*/
}
