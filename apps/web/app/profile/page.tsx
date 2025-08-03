import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Pen } from 'lucide-react';

import { MenuList, ProfileCard } from '@/components/common';
import { ProfileShortcutMenu } from '@/components/common/profile';
import { Container } from '@/components/layout';
import ButtonSignOut from '@/components/user/button-sign-out';

import { getMyProfile } from '@/lib/actions/profile';

export const dynamic = 'force-dynamic';
const ProfilePage = async () => {
  const profile = await getMyProfile();
  if (!profile) {
    redirect('/auth/signin?redirectTo=/profile');
  }

  return (
    <Container className="w-fulle flex h-full flex-col space-y-2 bg-neutral-100 px-4 [&>div]:rounded-sm [&>div]:shadow-[0px_2px_8px_0px_rgba(0,0,0,.08)]">
      <ProfileCard
        nickname={profile.nickname || '사용자'}
        profileImg={profile.profileImg || '/avatar-male.svg'}
      >
        <Link href="/profile/edit" className="flex h-10 items-center gap-2 text-sm">
          <Pen size={16} />
          프로필 수정
        </Link>
      </ProfileCard>
      <ProfileShortcutMenu />
      <MenuList />
      <span className="block w-full">
        <ButtonSignOut />
      </span>
    </Container>
  );
};

export default ProfilePage;
