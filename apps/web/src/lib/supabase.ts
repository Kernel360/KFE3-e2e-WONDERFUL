// apps/web/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트 생성 (Realtime 기본 활성화)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    // Realtime 연결 설정
    params: {
      eventsPerSecond: 10, // 초당 이벤트 제한
    },
  },
});

// Realtime 연결 상태 로깅 (개발용)
if (process.env.NODE_ENV === 'development') {
  // Supabase Realtime은 연결 상태를 직접 모니터링하는 API가 제한적
  // 대신 channel 구독 시 상태를 확인할 수 있습니다
  console.log('🔧 Supabase Realtime 클라이언트 초기화 완료');
}
