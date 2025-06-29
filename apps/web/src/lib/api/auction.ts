import { AuctionDetailResponse, AuctionListResponse } from '@/types/auction';
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

// 경매 상세페이지 조회
export const getAuctionDetail = async (
  id: string,
  userId?: string
): Promise<AuctionDetailResponse> => {
  const params: Record<string, any> = {};

  // 사용자 ID가 있다면, 찜 여부 확인용으로 전달
  if (userId) {
    params.userId = userId;
  }

  const response = await apiClient.get(`/auctions/${id}`, { params });
  return response.data;
};
