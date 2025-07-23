import { useUserStore } from '@/lib/zustand/store/user-store';

export const useUser = () => {
  const { user, isInitialized } = useUserStore();

  const userId = user?.id;
  const isLoggedIn = !!user;

  return {
    user,
    userId,
    isLoggedIn,
    isInitialized,
  };
};
