import { useMutation, useQueryClient } from '@tanstack/react-query';

import { auctionKeys } from '@/hooks/queries/auction/keys';

import { toggleFavorite } from '@/lib/api/favorites';
import { AuctionDetailResponse } from '@/lib/types/auction-prisma';

export const useFavoriteToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, isFavorited }: { itemId: string; isFavorited: boolean }) => {
      // 실제 서버요청 실행
      return await toggleFavorite(itemId, isFavorited);
    },

    onMutate: async ({ itemId, isFavorited }) => {
      const queryKey = auctionKeys.detail(itemId); // 경매 상세 페이지 쿼리 키

      await queryClient.cancelQueries({ queryKey }); // 진행 중인 쿼리들 취소

      const previousData = queryClient.getQueryData<AuctionDetailResponse>(queryKey); // 이전 데이터 저장

      // 낙관적 업데이트 - UI 즉시 반영
      queryClient.setQueryData<AuctionDetailResponse>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          userFavorite: {
            isFavorite: !isFavorited,
          },
          // 찜 개수도 업데이트
          data: {
            ...oldData.data,
            _count: {
              ...oldData.data._count,
              // 찜 개수 업데이트
              favoriteItems: isFavorited
                ? oldData.data._count.favoriteItems - 1
                : oldData.data._count.favoriteItems + 1,
            },
          },
        };
      });

      return { previousData, itemId };
    },

    // 실패시 롤백
    onError: (err, variables, context) => {
      if (context?.previousData) {
        const queryKey = auctionKeys.detail(context.itemId);
        queryClient.setQueryData<AuctionDetailResponse>(queryKey, context.previousData);
      }
      console.error('찜 토글 실패:', err);
    },

    onSuccess: (data, variables) => {
      // 성공시 로그 출력
      console.log('찜하기 처리 성공:', variables.isFavorited ? '찜 해제' : '찜 추가');
    },

    // 성공/실패 상관없이 최신 데이터로 동기화(쿼리 무효화)
    onSettled: (data, error, variables) => {
      const queryKey = auctionKeys.detail(variables.itemId);
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export type UseFavoriteToggleReturn = ReturnType<typeof useFavoriteToggle>;
