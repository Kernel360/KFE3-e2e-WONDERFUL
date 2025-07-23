import { useUserStore } from '@/lib/zustand/user-store';

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
