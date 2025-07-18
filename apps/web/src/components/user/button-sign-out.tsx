'use client';
import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { signOut } from '@/lib/actions/auth';

const ButtonSignOut: FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await signOut();
      if (result && result.success) {
        router.push('/auth/signin');
      }
    } catch (err) {
      console.error('로그아웃 오류:', err);
    }
  };
  return (
    <Button variant="outline" color="secondary" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default ButtonSignOut;
