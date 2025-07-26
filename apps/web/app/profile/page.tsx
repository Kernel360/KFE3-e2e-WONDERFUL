import Link from 'next/link';

import { Pen } from 'lucide-react';

import { MenuList, ProfileCard } from '@/components/common';
import { LogoutButton } from '@/components/common/profile';
import { Button } from '@/components/ui';

import { getMyProfile } from '@/lib/actions/profile';

export const dynamic = 'force-dynamic';
const ProfilePage = async () => {
  try {
    const profile = await getMyProfile();
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
  } catch (error) {
    console.error('프로필 페이지 로드 중 오류:', error);

    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return (
      <div className="flex h-96 items-center justify-center">
        <p>프로필을 불러올 수 없습니다: {errorMessage}</p>
      </div>
    );
  }
};

export default ProfilePage;
