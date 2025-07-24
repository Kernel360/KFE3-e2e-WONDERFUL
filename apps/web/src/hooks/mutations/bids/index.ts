import { useMutation, useQueryClient } from '@tanstack/react-query';

import { auctionKeys } from '@/hooks/queries/auction/keys';
import { bidKeys } from '@/hooks/queries/bids/keys';

import { createBid } from '@/lib/api/bid';
import { createClient } from '@/lib/supabase/client';
import { AuctionDetailResponse } from '@/lib/types/auction-prisma';
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
    // 🔧 즉시 캐시 업데이트 (Optimistic)
    onMutate: async ({ auctionId, bidPrice }) => {
      console.log('🔧 [Optimistic] 시작:', { auctionId, bidPrice });

      // 실제 사용자 정보 가져오기
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.log('❌ 사용자 정보 없음');
        return { previousAuction: null, previousBids: null };
      }

      // 🔍 캐시에 있는 모든 쿼리 확인
      const allQueries = queryClient.getQueryCache().getAll();
      console.log(
        '📦 [Cache] 전체 쿼리들:',
        allQueries.map((q) => ({
          queryKey: q.queryKey,
          hasData: !!q.state.data,
        }))
      );

      // 🔍 정확한 쿼리 키로 데이터 찾기
      const auctionQueries = allQueries.filter(
        (q) => q.queryKey[0] === 'auction' && q.queryKey[1] === 'detail'
      );
      console.log('🎯 [Cache] 경매 쿼리들:', auctionQueries);

      const auctionQueryKey = auctionKeys.detail(auctionId);

      await queryClient.cancelQueries({ queryKey: auctionQueryKey });

      const previousAuction = queryClient.getQueryData<AuctionDetailResponse>(auctionQueryKey);

      if (previousAuction) {
        queryClient.setQueryData(auctionQueryKey, (old: AuctionDetailResponse) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              auctionPrice: {
                ...old.data.auctionPrice,
                currentPrice: bidPrice,
              },
            },
          };
        });
        console.log('✅ [Optimistic] 현재가 업데이트:', bidPrice);
      }
      // 🔧 2. 입찰 목록도 낙관적 업데이트
      // const bidQueryKey = bidKeys.list(auctionId, 10);
      // await queryClient.cancelQueries({ queryKey: bidQueryKey });

      // const previousBids = queryClient.getQueryData(bidQueryKey);
      // console.log('📊 [Optimistic] 입찰 목록 기존 데이터:', previousBids);

      // queryClient.setQueryData<BidListResponse>(bidQueryKey, (oldBids) => {
      //   if (!oldBids?.data) {
      //     console.log('⚠️ [Optimistic] 입찰 데이터 없음, 스킵');
      //     return oldBids;
      //   }

      //   // 임시 입찰 데이터 생성:
      //   const optimisticBid: BidType = {
      //     id: `temp-${Date.now()}`, // 임시 ID
      //     item_id: auctionId,
      //     bidder_id: user.id, // 실제 사용자 ID
      //     price: bidPrice.toString(),
      //     createdAt: new Date().toISOString(),
      //     bidder: {
      //       id: user.id,
      //       nickname: user.user_metadata?.nickname || '나',

      //       profileImg: user.user_metadata?.profileImg || null,
      //     },
      //   };

      //   console.log('🚀 [Optimistic] 실제 사용자 정보로 입찰 추가:', optimisticBid.bidder);

      //   return {
      //     ...oldBids,
      //     data: [optimisticBid, ...oldBids.data],
      //   };
      // });

      return {
        previousAuction,
        // previousBids,
      };
    },
    onSuccess: (data, variables) => {
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
      const errorMessage = err instanceof Error ? err.message : '입찰 중 오류가 발생했습니다.';
      console.error('입찰 실패:', errorMessage);
    },
  });
};
