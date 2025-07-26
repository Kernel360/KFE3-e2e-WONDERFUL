import apiClient from '@/lib/api/client';

import { ChatRoomsResponse } from '@/types/chat';

export const getChatRooms = async (): Promise<ChatRoomsResponse> => {
  const response = await apiClient.get<ChatRoomsResponse>('/chat');
  return response.data;
};
