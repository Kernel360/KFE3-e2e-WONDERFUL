import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Pen } from 'lucide-react';

import { MenuList, ProfileCard } from '@/components/common';
import { LogoutButton } from '@/components/common/profile';
import { Button } from '@/components/ui';

import { getMyProfile } from '@/lib/actions/profile';

export const dynamic = 'force-dynamic';
const ProfilePage = async () => {
  const profile = await getMyProfile();
  // 프로필이 없으면 (로그인하지 않았거나 에러) 로그인 페이지로 리다이렉트
  if (!profile) {
    redirect('/auth/signin?redirectTo=/profile');
  }
  return (
    <main className={`h-full overflow-auto bg-white`}>
      <div className="height-auto w-full bg-white">
        {/* Profile Card */}
        <div className="border-b-4 border-neutral-200">
          <ProfileCard
            nickname={profile.nickname || '사용자'}
            profileImg={profile.profileImg || '/avatar-male.svg'}
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
        <div className="mt-8 px-6">
          <MenuList />
        </div>

        <LogoutButton />
      </div>
    </main>
  );
};

export default ProfilePage;
