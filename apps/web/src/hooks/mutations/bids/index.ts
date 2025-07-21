import { useMutation, useQueryClient } from '@tanstack/react-query';

import { auctionKeys } from '@/hooks/queries/auction/keys';
import { bidKeys } from '@/hooks/queries/bids/keys';

import { createBid } from '@/lib/api/bid';
import { BidCreateResponse } from '@/lib/types/bid';

interface BidRequest {
  auctionId: string;
  bidPrice: number;
}

// 입찰 생성 뮤테이션 훅
export const useBidMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ auctionId, bidPrice }: BidRequest): Promise<BidCreateResponse> => {
      return await createBid(auctionId, bidPrice);
    },

    onSuccess: (data, variables) => {
      console.log('✅ [Optimistic] 입찰 성공, 실제 데이터로 갱신');

      // 성공 시 실제 데이터로 갱신
      queryClient.invalidateQueries({
        queryKey: auctionKeys.detail(variables.auctionId),
      });

      queryClient.invalidateQueries({
        queryKey: bidKeys.list(variables.auctionId, 10),
      });

      console.log('입찰성공: ', data.message);
    },

    onError: (err, variables, context) => {
      console.log('❌ [Optimistic] 입찰 실패, 롤백 시작');

      const errorMessage = err instanceof Error ? err.message : '입찰 중 오류가 발생했습니다.';
      console.error('입찰 실패:', errorMessage);
    },
  });
};
