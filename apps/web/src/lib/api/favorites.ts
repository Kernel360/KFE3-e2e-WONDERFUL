import apiClient from './client';

export const addFavorite = async (itemId: string): Promise<{ success: boolean }> => {
  const response = await apiClient.post(`/favorites/${itemId}`);
  return response.data;
};

export const removeFavorite = async (itemId: string): Promise<{ success: boolean }> => {
  const response = await apiClient.delete(`/favorites/${itemId}`);
  return response.data;
};

export const toggleFavorite = async (
  itemId: string,
  isFavorited: boolean
): Promise<{ success: boolean }> => {
  if (isFavorited) {
    return await removeFavorite(itemId);
  } else {
    return await addFavorite(itemId);
  }
};
