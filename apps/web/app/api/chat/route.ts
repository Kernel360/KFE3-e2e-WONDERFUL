import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 현재 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: '로그인이 필요합니다.',
          message: 'Authentication required',
        },
        { status: 401 }
      );
    }

    // 사용자가 참여한 채팅방들 조회
    const chatRooms = await prisma.chatRoom.findMany({
      where: {
        OR: [{ sellerId: user.id }, { buyerId: user.id }],
        isDeleted: false,
      },
      include: {
        // 경매 정보 포함
        auction: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            status: true,
          },
        },
        // 마지막 메시지 정보 (1개만)
        messages: {
          orderBy: { sentAt: 'desc' },
          take: 1,
          select: {
            id: true,
            content: true,
            sentAt: true,
            senderId: true,
          },
        },
        // 채팅 참여자 정보
        seller: {
          select: {
            id: true,
            nickname: true,
            profileImg: true,
          },
        },
        buyer: {
          select: {
            id: true,
            nickname: true,
            profileImg: true,
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc', // 최근 메시지 순
      },
    });

    const optimizedChatRooms = chatRooms.map((room) => {
      // seller, buyer는 계산용으로만 사용하고 최종 응답에서 제외
      const { sellerId, buyerId, seller, buyer, ...cleanRoom } = room;

      return {
        ...cleanRoom, // id, auctionId, createdAt, lastMessageAt, isDeleted, auction, messages
        myRole: user.id === sellerId ? 'seller' : 'buyer',
        otherUser: user.id === sellerId ? buyer : seller, // 대화 상대방 데이터
      };
    });

    return NextResponse.json({
      data: optimizedChatRooms,
      total: optimizedChatRooms.length,
    });
  } catch (error) {
    console.error('채팅방 목록 조회 에러:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        message: '채팅방 목록을 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
