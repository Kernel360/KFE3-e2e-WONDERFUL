'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';

import { useFavoriteToggle } from '@/hooks/mutations/favorites';
import { auctionKeys } from '@/hooks/queries/auction/keys';

import { AuctionDetailResponse } from '@/lib/types/auction-prisma';

interface ButtonFavoriteProps {
  auctionId: string;
}

const ButtonFavorite = ({ auctionId }: ButtonFavoriteProps) => {
  // 기존 캐시된 데이터에서 찜 상태 가져오기(추가 요청없어)
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<AuctionDetailResponse>(auctionKeys.detail(auctionId));
  const isFavorited = cachedData?.userFavorite?.isFavorite || false; // 찜 상태 기본값 설정

  // 찜 토글 뮤테이션
  const toggleFavorite = useFavoriteToggle();

  const fillColor = isFavorited ? '#f43f5e' : 'none';
  const strokeColor = isFavorited ? '#f43f5e' : '#a1a1a1';

  const handleClick = () => {
    toggleFavorite.mutate({ itemId: auctionId, isFavorited });
  };

  return (
    <button
      type="button"
      className="h-8 w-8 cursor-pointer transition-transform active:scale-95"
      onClick={handleClick}
      disabled={toggleFavorite.isPending}
    >
      <Heart className="h-6" fill={fillColor} stroke={strokeColor} />
    </button>
  );
};

export default ButtonFavorite;
