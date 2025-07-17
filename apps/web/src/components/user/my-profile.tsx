//apps/web/src/components/user/my-profile.tsx
import Link from 'next/link';

import { Pen } from 'lucide-react';

import { MenuList, ProfileCard } from '@/components/common/profile';
import { Button } from '@/components/ui/button';

import { signOutAction } from '@/lib/actions/auth.action';

import ButtonEdit from './button-edit';
import ButtonSignOut from './button-sign-out';

const ProfilePage = () => {
  return (
    <div className="height-auto w-full bg-white">
      {/* Profile Card */}
      <div className="border-b-4 border-neutral-200">
        <ProfileCard
          nickname="킹갓제너럴판매자"
          profileImg="https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/0bf0d884-38e1-4cf9-8663-5f65d0685233/1751631153830_jfii5z.jpeg"
        >
          <ButtonEdit />
        </ProfileCard>
      </div>

      {/* Menu List */}
      <div className="mt-8">
        <MenuList />
      </div>

      <ButtonSignOut />
    </div>
  );
};

export default ProfilePage;
