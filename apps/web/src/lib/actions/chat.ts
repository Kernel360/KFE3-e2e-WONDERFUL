'use server';

import { createClient } from '@/lib/supabase/client';
import { getCurrentUser } from '@/lib/utils/auth-server';

import { CreateChatRoomProps } from '@/types/chat';

type CreateChatRoomSuccess = {
  success: boolean;
  data?: {
    roomId: string;
    auctionId: string;
    interlocutor: string;
  };
  error?: string;
};

export const createChatRoom = async ({
  auctionId,
  seller,
}: CreateChatRoomProps): Promise<CreateChatRoomSuccess> => {
  try {
    const supabase = createClient();

    const user = await getCurrentUser();

    // 기존 채팅방 확인
    const { data: existingRoom, error: error } = await supabase
      .from('chat_rooms') // 테이블명 확인 필요
      .select('id')
      .eq('auction_id', auctionId)
      .eq('seller_id', seller.id)
      .eq('buyer_id', user!.id)
      .eq('is_deleted', false)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116은 "no rows returned" 에러;
      return {
        success: false,
        error: `기존 채팅방 확인 실패: ${error.message}`,
      };
    }

    if (existingRoom) {
      return {
        success: true,
        data: {
          roomId: existingRoom.id,
          auctionId: auctionId,
          interlocutor: seller.nickname,
        },
      };
    }

    // 새 채팅방 생성
    const { data: newRoom, error: createError } = await supabase
      .from('chat_rooms')
      .insert({
        auction_id: auctionId,
        seller_id: seller.id,
        buyer_id: user!.id,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (createError) {
      return {
        success: false,
        error: `채팅방 생성 실패: ${createError.message}`,
      };
    }

    return {
      success: true,
      data: {
        roomId: newRoom.id,
        auctionId: auctionId,
        interlocutor: seller.nickname,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '예상치 못한 오류가 발생했습니다.',
    };
  }
};
