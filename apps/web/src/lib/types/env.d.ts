// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // Firebase 환경변수
    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: string;

    // 기존 환경변수들
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    DATABASE_URL: string;
    DIRECT_URL: string;

    // 기타
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_KAKAO_MAP_API_KEY: string;
    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
  }
}

// 글로벌 window 객체 확장 (필요시)
declare global {
  interface Window {
    __ENV__?: Record<string, string>;
  }
}
