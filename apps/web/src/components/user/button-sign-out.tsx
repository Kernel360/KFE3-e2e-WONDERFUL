'use client';
import { FC } from 'react';

import { useRouter } from 'next/navigation';

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
    <button
      className="mt-10 mb-6 px-8 text-sm font-bold text-neutral-400 underline"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
};

export default ButtonSignOut;
