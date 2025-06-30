import apiClient from './client';

export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategoryListResponse {
  data: CategoryItem[];
  total: number;
}

// 카테고리 목록 조회
export const getCategories = async (): Promise<CategoryListResponse> => {
  const response = await apiClient.get('/categories');
  return response.data;
};
