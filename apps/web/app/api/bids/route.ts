import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

import { createClient } from '@/lib/supabase/server';

// 입찰하기 백엔드 API
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log('👤 [BID API] 사용자 인증 결과:', {
      userId: user?.id,
      userEmail: user?.email,
      hasAuthError: !!authError,
    });

    if (authError || !user) {
      console.log('❌ [BID API] 인증 실패:', authError);
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();

    console.log('📝 [BID API] 요청 데이터:', body);

    const { auctionId, bidPrice } = body;

    if (!auctionId || !bidPrice) {
      console.log('❌ [BID API] 필수 데이터 누락:', { auctionId, bidPrice });
      return NextResponse.json({ error: '경매 ID와 입찰 가격이 필요합니다.' }, { status: 400 });
    }

    console.log('🔍 [BID API] 경매 정보 조회 시작:', auctionId);

    // 경매 정보 조회
    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId },
      include: {
        auctionPrice: true,
      },
    });

    console.log('🏛️ [BID API] 경매 정보 조회 결과:', {
      found: !!auction,
      auctionId,
      currentPrice: auction?.auctionPrice?.currentPrice,
      endTime: auction?.endTime,
    });

    if (!auction) {
      console.log('❌ [BID API] 경매를 찾을 수 없음:', auctionId);
      return NextResponse.json({ error: '존재하지 않는 경매입니다.' }, { status: 404 });
    }

    // 경매 종료 시간 확인
    const now = new Date();
    const isExpired = now > auction.endTime;
    console.log('⏰ [BID API] 시간 검증:', {
      now: now.toISOString(),
      endTime: auction.endTime.toISOString(),
      isExpired,
    });

    if (isExpired) {
      console.log('❌ [BID API] 경매 종료됨');
      return NextResponse.json({ error: '경매가 종료되었습니다.' }, { status: 400 });
    }

    // 최소 입찰 단위 확인
    const { currentPrice } = auction.auctionPrice!;
    const { minBidUnit } = auction.auctionPrice!;
    const minBidAmount = currentPrice + minBidUnit;

    console.log('💰 [BID API] 가격 검증:', {
      bidPrice,
      currentPrice,
      minBidUnit,
      minBidAmount,
      isValidPrice: bidPrice >= minBidAmount,
    });

    if (bidPrice < minBidAmount) {
      console.log('❌ [BID API] 최소 입찰 금액 미달');
      console.log('입찰 금액:', bidPrice, '최소 입찰 금액:', minBidAmount);
      return NextResponse.json(
        { error: `최소 입찰 금액은 ${minBidAmount.toLocaleString()}원입니다.` },
        { status: 400 }
      );
    }

    // 본인 경매 입찰 방지
    const isSelfBid = auction.sellerId === user.id;
    console.log('🚫 [BID API] 본인 입찰 검증:', {
      sellerId: auction.sellerId,
      bidderId: user.id,
      isSelfBid,
    });

    if (isSelfBid) {
      console.log('❌ [BID API] 본인 경매 입찰 시도');
      return NextResponse.json({ error: '본인의 경매에는 입찰할 수 없습니다.' }, { status: 400 });
    }

    // 트랜잭션으로 입찰 처리
    const result = await prisma.$transaction(async (tx) => {
      console.log('📝 [BID API] 입찰 생성 중...');
      // 입찰 생성
      const newBid = await tx.bid.create({
        data: {
          itemId: auctionId,
          bidderId: user.id,
          price: bidPrice,
        },
        include: {
          bidder: {
            select: {
              id: true,
              nickname: true,
              profileImg: true,
            },
          },
        },
      });

      console.log('✅ [BID API] 입찰 생성 완료:', newBid.id);

      console.log('🔄 [BID API] 현재 가격 업데이트 중...');

      // 현재 가격 업데이트
      await tx.auctionPrice.update({
        where: { itemId: auctionId },
        data: { currentPrice: bidPrice },
      });

      console.log('✅ [BID API] 가격 업데이트 완료');

      return newBid;
    });

    console.log('🎉 [BID API] 트랜잭션 완료, 응답 전송');

    return NextResponse.json({
      success: true,
      data: result,
      message: '입찰이 완료되었습니다.',
    });
  } catch (error) {
    console.error('입찰 처리 중 오류:', error);
    return NextResponse.json({ error: '입찰 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 입찰 목록 조회 API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const auctionId = searchParams.get('auctionId');

    if (!auctionId) {
      return NextResponse.json({ error: '경매 ID가 필요합니다.' }, { status: 400 });
    }

    const bids = await prisma.bid.findMany({
      where: { itemId: auctionId },
      include: {
        bidder: {
          select: {
            id: true,
            nickname: true,
            profileImg: true,
          },
        },
      },
      orderBy: {
        price: 'desc',
      },
      take: (() => {
        const url = new URL(request.url);
        const limitParam = url.searchParams.get('limit');
        const limit = limitParam ? parseInt(limitParam, 10) : 10;
        return isNaN(limit) ? 10 : limit;
      })(),
    });

    return NextResponse.json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error('💥 [BID API] 입찰 처리 중 상세 오류:');
    console.error('Error Name:', error?.constructor?.name);
    console.error('Error Message:', error instanceof Error ? error.message : error);
    console.error('Error Stack:', error instanceof Error ? error.stack : '스택 없음');

    // Prisma 에러인 경우 추가 정보
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma Error Code:', (error as any).code);
      console.error('Prisma Error Meta:', (error as any).meta);
    }

    console.error('입찰 목록 조회 중 오류:', error);
    return NextResponse.json(
      {
        error: '입찰 처리 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    );
  }
}
