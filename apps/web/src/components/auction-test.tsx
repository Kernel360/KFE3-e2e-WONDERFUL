// apps/web/app/auction-list-test/page.tsx
'use client';

import { useAuctions } from '@/hooks/queries/auction/useAuctions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Badge } from './ui/badge';

export default function TestAuctionsPage() {
  const [locationId, setLocationId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [sort, setSort] = useState<string>('latest');

  const router = useRouter();

  const {
    data: auctionsData,
    isLoading,
    error,
  } = useAuctions(locationId, categoryId || undefined, sort);

  // 경매 아이템 클릭 핸들러
  const handleAuctionClick = (auctionId: string) => {
    router.push(`/auction/detail/${auctionId}`);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>경매 목록 테스트</h1>

      {/* 필터 컨트롤 */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <label>정렬: </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="ending_soon">마감 임박순</option>
          <option value="price_low">낮은 가격순</option>
          <option value="price_high">높은 가격순</option>
          <option value="popular">인기순</option>
        </select>
      </div>

      {/* 결과 표시 */}
      <div>
        <h3>총 {auctionsData?.total || 0}개의 경매</h3>

        {auctionsData?.data && auctionsData.data.length > 0 ? (
          <div>
            {auctionsData.data.map((auction) => (
              <div
                key={auction.id}
                style={{
                  border: '1px solid #ddd',
                  margin: '10px 0',
                  padding: '15px',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                }}
                onClick={() => handleAuctionClick(auction.id)}
              >
                {/* 화면에 보여질 필드들: 카테고리, 아이템 썸네일, 타이틀, 경매상태, 시작가, 시작시간, 마감시간, 현재 가격 */}

                <h4>📦 {auction.title}</h4>

                <p>
                  <strong>🏷️ 카테고리:</strong> {auction.category?.name || 'N/A'}
                </p>

                <p>
                  <strong>🖼️ 썸네일:</strong> {auction.thumbnailUrl || '이미지 없음'}
                </p>

                <p>
                  <strong>📊 경매상태:</strong>
                  {/* 🔄 status 조건부 렌더링 수정 (48번째 라인 근처) */}
                  <Badge className="rounded-sm px-1.5 py-0 text-xs">
                    {auction.status === 'ACTIVE' || auction.status === '경매중'
                      ? '경매중'
                      : '경매종료'}
                  </Badge>
                </p>

                <p>
                  <strong>💰 경매 타입:</strong> {auction.auctionType}
                </p>

                <div style={{ backgroundColor: '#e8f4f8', padding: '10px', margin: '10px 0' }}>
                  <strong>💵 가격 정보:</strong>
                  <ul>
                    <li>시작가: {auction.auctionPrice?.startPrice?.toLocaleString() || 'N/A'}원</li>
                    <li>
                      현재가: {auction.auctionPrice?.currentPrice?.toLocaleString() || 'N/A'}원
                    </li>
                    <li>
                      즉시구매가: {auction.auctionPrice?.instantPrice?.toLocaleString() || 'N/A'}원
                    </li>
                    <li>
                      최소 입찰 단위: {auction.auctionPrice?.minBidUnit?.toLocaleString() || 'N/A'}
                      원
                    </li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#f0f8e8', padding: '10px', margin: '10px 0' }}>
                  <strong>⏰ 시간 정보:</strong>
                  <ul>
                    <li>
                      시작 시간:{' '}
                      {auction.startTime ? new Date(auction.startTime).toLocaleString() : 'N/A'}
                    </li>
                    <li>
                      마감 시간:{' '}
                      {auction.endTime ? new Date(auction.endTime).toLocaleString() : 'N/A'}
                    </li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#f8f0e8', padding: '10px', margin: '10px 0' }}>
                  <strong>🔧 경매 설정:</strong>
                  <ul>
                    <li>
                      즉시구매 가능:{' '}
                      {auction.auctionPrice?.isInstantBuyEnabled ? '✅ 가능' : '❌ 불가능'}
                    </li>
                    <li>
                      연장 경매: {auction.auctionPrice?.isExtendedAuction ? '✅ 가능' : '❌ 불가능'}
                    </li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#f5f5f5', padding: '10px', margin: '10px 0' }}>
                  <strong>📈 통계:</strong>
                  <ul>
                    <li>입찰 수: {auction._count?.bids || 0}건</li>
                    <li>찜 수: {auction._count?.favoriteItems || 0}명</li>
                  </ul>
                </div>

                <p>
                  <strong>📅 생성일:</strong> {new Date(auction.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>경매 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
