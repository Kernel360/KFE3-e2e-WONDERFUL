//apps/web/src/components/user/my-profile.tsx
'use client';
// 내 프로필
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Pen } from 'lucide-react';

import { MenuList, ProfileCard } from '@/components/common/profile';
import { Button } from '@/components/ui/button';

import { signOutAction } from '@/lib/actions/auth.action';

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await signOutAction();
      // 성공 시 로그인 페이지로 이동
      if (result && result.success) {
        router.push('/auth/signin');
      }
    } catch (err) {
      console.error('로그아웃 오류:', err);
    }
  };

  return (
    <div className="height-auto w-full bg-white">
      {/* Profile Card */}
      <div className="border-b-4 border-neutral-200">
        <ProfileCard
          nickname="킹갓제너럴판매자"
          profileImg="https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/0bf0d884-38e1-4cf9-8663-5f65d0685233/1751631153830_jfii5z.jpeg"
        >
          <Link href="/profile/edit">
            <Button variant="outline" size={'sm'}>
              <Pen />
              프로필수정
            </Button>
          </Link>
        </ProfileCard>
      </div>

      {/* Menu List */}
      <div className="mt-8">
        <MenuList />
      </div>

      <Button variant={'outline'} color={'secondary'} onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  );
};

export default ProfilePage;
