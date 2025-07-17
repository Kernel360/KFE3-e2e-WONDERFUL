//apps/web/src/components/user/other-profile.tsx
'use client';
// 상대방 프로필 페이지

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import { AuctionItemList, ProfileCard, TabListFilter } from '@/components/common';
import { Button } from '@/components/ui/button';

import { AUCTION_TABS_BASIC, TAB_STATUS_MAP, TabId } from '@/lib/constants/tabs';

import ButtonChat from './button-chat';

const OtherProfilePage = () => {
  // 탭 상태 관리
  const [selectedTab, setSelectedTab] = useState<TabId>(AUCTION_TABS_BASIC[0]?.id || 'all');
  const handleTabChange = (tabId: string) => setSelectedTab(tabId as TabId);

  return (
    <div className="w-full bg-white">
      {/* 1. 상단 프로필 카드 */}
      <div className="border-b-4 border-neutral-200 bg-white">
        <ProfileCard
          nickname="민돌멩이"
          profileImg="https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/0bf0d884-38e1-4cf9-8663-5f65d0685233/1751631153830_jfii5z.jpeg"
        >
          <ButtonChat />
        </ProfileCard>
      </div>
      <div className="p-4">
        {/* 2. 탭 필터 */}
        <TabListFilter
          items={AUCTION_TABS_BASIC}
          selectedCategoryId={selectedTab}
          onCategoryChange={handleTabChange}
        />

        {/* 3. 경매 리스트 */}
        <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
      </div>
    </div>
  );
};

export default OtherProfilePage;
