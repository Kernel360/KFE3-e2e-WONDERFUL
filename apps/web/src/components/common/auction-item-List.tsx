'use client';

import { useState } from 'react';

import AuctionItemCard from '@/components/common/auction-item-card';

import { AuctionItemProps } from '@/types/auction';
import { useAuctions } from '@/hooks/queries/auction/useAuctions';
import { SortOption } from '@/lib/types/auction';


interface AuctionItemListProps {
  selectedCategoryId?: string;
  sortOption?: SortOption;
}

const AuctionItemList = ({
  selectedCategoryId = '',
  sortOption = 'latest',
}: AuctionItemListProps) => {
  // 필터 상태 (추후 확장 가능)
  const [locationId, setLocationId] = useState<string>('');

  // useAuctions 훅을 사용하여 경매 목록 조회 (카테고리 ID로 필터링)
  const {
    data: auctionsData,
    isLoading,
    error,
    refetch,
  } = useAuctions(locationId, selectedCategoryId || undefined, sortOption);

  // 데이터를 AuctionItemCard에서 사용할 수 있는 형태로 변환
  const convertToAuctionItemProps = (auction: any): AuctionItemProps => {
    return {
      id: auction.id,
      title: auction.title,
      status: auction.status === 'ACTIVE' ? '경매중' : '경매종료',
      originalPrice: auction.auctionPrice?.startPrice || 0,
      currentPrice: auction.auctionPrice?.currentPrice || 0,
      deadline: auction.endTime || new Date().toISOString(),
      thumbnailUrl: auction.thumbnailUrl || '',
    };
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-lg text-neutral-600">경매 목록을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="text-danger-600 text-lg">경매 목록을 불러오는 중 오류가 발생했습니다.</div>
        <button
          onClick={() => refetch()}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <section className="px-4 py-6">
      {/* 총 경매 개수만 표시 (정렬은 헤더에서 처리) */}
      <div className="mb-6 flex items-center justify-end">
        <div className="text-sm text-neutral-600">
          총 <span className="text-primary-600 font-semibold">{auctionsData?.total || 0}</span>개의
          경매
        </div>
      </div>

      {/* 경매 목록 */}
      {auctionsData?.data && auctionsData.data.length > 0 ? (
        <div className="space-y-4">
          {auctionsData.data.map((auction) => {
            const auctionItemProps = convertToAuctionItemProps(auction);
            return (
              <div
                key={auction.id}
                className="rounded-lg border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <AuctionItemCard {...auctionItemProps} />
              </div>
            );
          })}
        </div>
      ) : (
        // 데이터 없음 상태
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-2 text-neutral-400">
            <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-medium text-neutral-900">경매가 없습니다</h3>
          <p className="text-neutral-600">현재 진행 중인 경매가 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default AuctionItemList;
