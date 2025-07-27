import { AuctionStatus } from '@/types/filter';

import { ProfileAuctionResponse, PROFILE_PAGE_SIZE } from '@/constants/profile';

import apiClient from './client';

// 사용자 프로필 조회
export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

// 내가 등록한 경매 목록 조회
export const getMySales = async (
  statuses?: AuctionStatus[],
  page: number = 1
): Promise<ProfileAuctionResponse> => {
  const params: Record<string, any> = {
    type: 'sales',
    page: page.toString(),
    limit: PROFILE_PAGE_SIZE.toString(),
  };

  if (statuses && statuses.length > 0) {
    params.statuses = statuses.join(',');
  }

  const response = await apiClient.get('/profile/auctions', { params });
  return response.data;
};

// 내가 입찰한 경매 목록 조회
export const getMyPurchases = async (
  statuses?: AuctionStatus[],
  page: number = 1
): Promise<ProfileAuctionResponse> => {
  const params: Record<string, any> = {
    type: 'purchases',
    page: page.toString(),
    limit: PROFILE_PAGE_SIZE.toString(),
  };

  if (statuses && statuses.length > 0) {
    params.statuses = statuses.join(',');
  }

  const response = await apiClient.get('/profile/auctions', { params });
  return response.data;
};

// 내가 찜한 경매 목록 조회
export const getMyWishlist = async (
  statuses?: AuctionStatus[],
  page: number = 1
): Promise<ProfileAuctionResponse> => {
  const params: Record<string, any> = {
    type: 'wishlist',
    page: page.toString(),
    limit: PROFILE_PAGE_SIZE.toString(),
  };

  if (statuses && statuses.length > 0) {
    params.statuses = statuses.join(',');
  }

  const response = await apiClient.get('/profile/auctions', { params });
  return response.data;
};
