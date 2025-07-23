import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { createClient } from '@/lib/supabase/client';
interface UserState {
  user: User | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  cleanup: () => void;
}

const supabase = createClient();

let authSubscription: { data: { subscription: any } } | null = null;

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isInitialized: false,

  setUser: (user) => set({ user }),

  cleanup: () => {
    if (authSubscription) {
      authSubscription.data.subscription.unsubscribe();
      authSubscription = null;
    }
  },

  // 앱 시작시 유저 정보 초기화
  initialize: async () => {
    if (get().isInitialized) return;

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ Session error:', error);
        set({ user: null, isInitialized: true });
        return;
      }

      set({
        user: session?.user || null,
        isInitialized: true,
      });

      // 기존 구독이 있다면 해제
      if (authSubscription) {
        authSubscription.data.subscription.unsubscribe();
      }

      // 인증 상태 변화 감지 및 구독 참조 저장
      authSubscription = supabase.auth.onAuthStateChange((event, session) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Auth state changed:', event, session?.user?.email);
        }

        set({ user: session?.user || null });
      });
    } catch (error) {
      console.error('🚨 User initialization error:', error);
      set({ user: null, isInitialized: true });
    }
  },
}));
