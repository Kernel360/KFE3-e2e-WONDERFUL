import { BidCreateResponse, BidListResponse } from '@/lib/types/bid';

import apiClient from './client';

// 입찰 생성 클라이언트 API
export const createBid = async (
  auctionId: string,
  bidPrice: number
): Promise<BidCreateResponse> => {
  const response = await apiClient.post('/bids', {
    auctionId,
    bidPrice,
  });
  return response.data;
};

// 특정 경매의 입찰 목록 조회
export const getBidsByAuction = async (
  auctionId: string,
  limits?: number
): Promise<BidListResponse> => {
  const params: Record<string, any> = { auctionId };
  if (limits) {
    params.limits = limits.toString();
  }
  const response = await apiClient.get(`/bids`, { params });
  return response.data;
};
