'use client';

import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { bidKeys } from '@/hooks/queries/bids/keys';

import type { BidListResponse } from '@/types/bid';

export const useCurrentPrice = (auctionId: string, fallbackPrice: number) => {
  const queryKey = bidKeys.list(auctionId, 10);

  const {
    data: bidsData,
    refetch,
    isFetching,
  } = useQuery<BidListResponse>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/bids?auctionId=${auctionId}&limit=1`);
      if (!res.ok) throw new Error('Failed to fetch bids');
      return (await res.json()) as BidListResponse;
    },
    staleTime: 0,
  });

  const currentPrice = useMemo(() => {
    const bids = bidsData?.data ?? [];
    return bids.length === 0 ? fallbackPrice : Math.max(...bids.map((b) => Number(b.price)));
  }, [bidsData, fallbackPrice]);

  return { currentPrice, refetchCurrentPrice: refetch, isFetching };
};
