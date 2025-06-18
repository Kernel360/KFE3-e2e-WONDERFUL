import { ImageResponse } from 'next/og';

export const runtime = 'edge';
//
export const generateImageMetadata = () => {
  return [
    {
      contentType: 'image/png',
      size: { width: 32, height: 32 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 192, height: 192 },
      id: 'medium',
    },
    {
      contentType: 'image/png',
      size: { width: 512, height: 512 },
      id: 'large',
    },
  ];
};

const Icon = ({ id }: { id: string }) => {
  // id에 따라 크기 결정
  const size = id === 'large' ? 512 : id === 'medium' ? 192 : 32;
  const iconSize = Math.floor(size * 0.6); // 아이콘 크기를 전체의 60%로 설정

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: size * 0.75,
          background: size >= 180 ? 'linear-gradient(135deg, #5758FE 0%, #2E29A0 100%)' : '#5758FE',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: size >= 180 ? '22%' : '20%',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-gavel-icon lucide-gavel"
        >
          <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
          <path d="m16 16 6-6" />
          <path d="m8 8 6-6" />
          <path d="m9 7 8 8" />
          <path d="m21 11-8-8" />
        </svg>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
};

export default Icon;
