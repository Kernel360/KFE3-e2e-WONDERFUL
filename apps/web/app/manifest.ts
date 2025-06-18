import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: '지역 경매 서비스',
    short_name: '경매앱',
    description: '지역 기반 실시간 경매 플랫폼',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff', // 로딩 시 배경색
    theme_color: '#5758FE', // 브라우저 UI 색상
    icons: [
      {
        // generateImageMetadata의 medium id 참조
        src: '/icon/medium',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/large',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
};

export default manifest;
