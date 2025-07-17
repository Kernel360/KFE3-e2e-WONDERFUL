'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';

import { signOut } from '@/lib/actions/auth';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await signOut();

      if (result && result.success) {
        router.push('/auth/signin');
      } else {
        console.error('로그아웃 실패:', result.error);
      }
    } catch (err) {
      console.error('로그아웃 오류:', err);
    }
  };

  return (
    <div className="px-6">
      <Button variant={'solid'} color={'secondary'} onClick={handleLogout} className="h-11 w-full">
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
