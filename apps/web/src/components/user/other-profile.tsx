'use client';
// 상대방 프로필 페이지

import { useState } from 'react';

import { AuctionItemList, ProfileCard, FilterTab } from '@/components/common';

import { AUCTION_TABS_BASIC, TAB_STATUS_MAP } from '@/lib/constants/tabs';
import { TabId } from '@/lib/types/filter';

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
        <FilterTab filterKey="otherHistory" items={AUCTION_TABS_BASIC} />

        {/* 3. 경매 리스트 */}
        <AuctionItemList selectedStatuses={TAB_STATUS_MAP[selectedTab]} includeCompleted={true} />
      </div>
    </div>
  );
};

export default OtherProfilePage;
