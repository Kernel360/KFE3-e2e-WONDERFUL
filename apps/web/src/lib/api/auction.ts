import { AuctionDetailResponse, AuctionListResponse } from '@/types/auction-prisma';

import apiClient from './client';

// 경매 목록 조회
export const getAuctions = async (
  locationName?: string,
  category_id?: string,
  sort?: string,
  includeCompleted?: boolean
): Promise<AuctionListResponse> => {
  const params: Record<string, any> = {};

  if (locationName) {
    params.locationName = locationName;
  }

  if (category_id) {
    params.category_id = category_id;
  }

  if (sort) {
    params.sort = sort;
  }

  if (includeCompleted !== undefined) {
    params.includeCompleted = includeCompleted.toString();
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

// 위치 정보 조회
export const getLocationById = async (locationId: string): Promise<AuctionDetailResponse> => {
  const response = await apiClient.get(`/locations/${locationId}`);
  return response.data;
};
