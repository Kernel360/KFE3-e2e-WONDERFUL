'use server';

import { createClient } from '@/lib/supabase/client';

interface CreateChatRoomParams {
  auctionId: string;
  sellerId: string;
  buyerId: string;
}

export const createChatRoom = async (params: CreateChatRoomParams) => {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 기존 채팅방이 존재하는지 확인
    const { data: existingRoom, error: error } = await supabase
      .from('chat_rooms') // 테이블명 확인 필요
      .select('id')
      .eq('auction_id', params.auctionId)
      .eq('seller_id', params.sellerId)
      .eq('buyer_id', params.buyerId)
      .eq('is_deleted', false)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116은 "no rows returned" 에러 (정상)
      console.error('기존 채팅방 확인 에러:', error);
      throw new Error(`기존 채팅방 확인 실패: ${error.message}`);
    }

    if (existingRoom) {
      return existingRoom.id;
    }

    // 새 채팅방 생성
    const { data: newRoom, error: createError } = await supabase
      .from('chat_rooms') // 테이블명 확인 필요
      .insert({
        auction_id: params.auctionId,
        seller_id: params.sellerId,
        buyer_id: params.buyerId,
        room_type: 'private',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (createError) {
      console.error('채팅방 생성 에러:', createError);
      throw new Error(`채팅방 생성 실패: ${createError.message}`);
    }

    return newRoom.id;
  } catch (error) {
    console.error('createChatRoom 전체 에러:', error);
    throw error;
  }
};
