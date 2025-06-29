import { AuctionListResponse } from '@/types/auction';
import apiClient from './client';

// 경매 목록 조회
export const getAuctions = async (
  location_id?: string,
  category_id?: string,
  sort?: string
): Promise<AuctionListResponse> => {
  const params: Record<string, any> = {};

  if (location_id) {
    params.location_id = location_id;
  }

  if (category_id) {
    params.category_id = category_id;
  }

  if (sort) {
    params.sort = sort;
  }

  const response = await apiClient.get('/auctions', { params });
  return response.data;
};
