import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// 클라이언트 컴포넌트용 (브라우저)
export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });
};

// 🔧 **[추가]** 기존 방식 호환성을 위한 default export
export const supabase = createClient();

// 개발용 로깅
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Supabase Auth 클라이언트 초기화 완료');
}
