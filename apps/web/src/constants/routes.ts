export const ROUTES = {
  // 메인 하단 탭
  HOME: '/',
  SEARCH: '/search',
  CHAT: '/chat',
  PROFILE: '/profile',

  // 경매 관련
  AUCTION_DETAIL: '/auction',

  // 인증 관련
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',

  // 기타 페이지
} as const;

export type NavMenuItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type RouteValues = (typeof ROUTES)[keyof typeof ROUTES];
