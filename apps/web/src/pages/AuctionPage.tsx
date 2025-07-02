'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { MessageSquareMore } from 'lucide-react';

import BidForm from '@/components/auction-detail/bid-form';
import BidTable from '@/components/auction-detail/bid-table';
import ItemImages from '@/components/auction-detail/item-images';
import ItemInformation, { Item } from '@/components/auction-detail/item-information';
import { ProfileCard } from '@/components/common/profile-card';
import Tab from '@/components/common/tab';
import { Button } from '@/components/ui/button';

interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

const AuctionPage = () => {
  const param = useParams();
  // const { id } = param!;
  const id = param?.id;

  if (!id) {
    return <div>Loading...</div>;
  }

  const endTime = new Date(Date.now() + 30 * 60 * 60 * 1000);
  const description: string =
    '직접 기른 캣닢을 한잎한잎 갈아 만든 캣휠입니다.\n' + '입찰 안 하면 손해니까 빨리 하세요';

  const item: Item = {
    title: '캣닢향이 나는 캣휠 가져가세요~',
    status: '경매중',
    endTime: `${endTime}`,
  };

  const tabItem: TabItem[] = [
    { key: 'description', label: '상세 설명', content: `${description}` },
    { key: 'table', label: '입찰 테이블', content: <BidTable /> },
  ];

  return (
    <main className="w-full">
      <section className="flex flex-col items-center gap-1 px-0">
        <ItemImages />
        <ProfileCard
          nickname="user1234"
          profileImg="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
        >
          <Button variant="outline">
            <MessageSquareMore />
            채팅하기
          </Button>
        </ProfileCard>
        <ItemInformation item={item} />
        <Tab tabs={tabItem} />
      </section>
      <footer className="sticky bottom-0 z-50 w-full bg-white">
        <BidForm />
      </footer>
    </main>
  );
};
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export const dynamic = 'force-dynamic';
export default AuctionPage;
