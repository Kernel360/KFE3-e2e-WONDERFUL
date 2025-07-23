'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/lib/zustand/user-store';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { initialize, isInitialized } = useUserStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return <>{children}</>;
};

export default UserProvider;
