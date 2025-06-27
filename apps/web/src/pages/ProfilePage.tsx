'use client';
import { Pen } from 'lucide-react';

import { LogoutButton } from '@/components/common/logout-button';
import { MenuList } from '@/components/common/menu-list';
import { ProfileCard } from '@/components/common/profile-card';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  return (
    <div className="height-auto w-full bg-white">
      {/* Profile Card */}
      <div className="border-b-4 border-neutral-200">
        <ProfileCard nickname="킹갓제너럴판매자" profileImg="/myprofile.png">
          <Button variant="outline">
            <Pen />
            프로필수정
          </Button>
        </ProfileCard>
      </div>

      {/* Menu List */}
      <div className="mt-8">
        <MenuList />
      </div>

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;
