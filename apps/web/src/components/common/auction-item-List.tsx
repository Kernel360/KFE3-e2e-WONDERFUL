const AUCTION_ITEMS: AuctionItemProps[] = [
  {
    id: '1',
    title: '빛나는 아이폰 부품',
    status: '경매중',
    originalPrice: 300000,
    currentPrice: 320000,
    deadline: 'Sat July 10 2025 13:58:01 GMT+0900 ',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: '폴라로이드 정품! 뜯지도 않은 새상품입니다. 거져 가져가세요. ',
    status: '경매종료',
    originalPrice: 70000,
    currentPrice: 93000,
    deadline: 'Sat Jun 24 2025 13:58:01 GMT+0900 ',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
  },
];

import AuctionItemCard from '@/components/common/auction-item-card';

import { AuctionItemProps } from '@/types/auction';

const AuctionItemList = () => {
  return (
    <section className="flex flex-col gap-3">
      {AUCTION_ITEMS.map(
        ({ id, title, status, originalPrice, currentPrice, deadline, thumbnailUrl }) => {
          return (
            <AuctionItemCard
              key={id}
              title={title}
              thumbnailUrl={thumbnailUrl}
              id={id}
              status={status}
              originalPrice={originalPrice}
              currentPrice={currentPrice}
              deadline={deadline}
            />
          );
        }
      )}
    </section>
  );
};

export default AuctionItemList;
