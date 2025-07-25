'use server';

import { createClient } from '@/lib/supabase/client';
import { getCurrentUser } from '@/lib/utils/auth';

import { CreateChatRoomProps } from '@/types/chat';

export const createChatRoom = async ({ auctionId, sellerId }: CreateChatRoomProps) => {
  try {
    const supabase = createClient();

    const user = await getCurrentUser();

    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    // 기존 채팅방 확인
    const { data: existingRoom, error: error } = await supabase
      .from('chat_rooms') // 테이블명 확인 필요
      .select('id')
      .eq('auction_id', auctionId)
      .eq('seller_id', sellerId)
      .eq('buyer_id', user.id)
      .eq('is_deleted', false)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116은 "no rows returned" 에러;
      console.error('기존 채팅방 확인 에러:', error);
      throw new Error(`기존 채팅방 확인 실패: ${error.message}`);
    }

    if (existingRoom) {
      return existingRoom.id;
    }

    // 새 채팅방 생성
    const { data: newRoom, error: createError } = await supabase
      .from('chat_rooms')
      .insert({
        auction_id: auctionId,
        seller_id: sellerId,
        buyer_id: user.id,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (createError) {
      console.error('채팅방 생성 에러:', createError);
      throw new Error(`채팅방 생성 실패: ${createError.message}`);
    }

    const data = { roomId: newRoom.id, auctionId: auctionId };

    return data;
  } catch (error) {
    console.error('createChatRoom 전체 에러:', error);
    throw error;
  }
};
