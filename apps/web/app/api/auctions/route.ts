import { AuctionListResponse, SortOption } from '@/types/auction-prisma';
import { prisma } from '@repo/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출
    const location_id = searchParams.get('location_id');
    const category_id = searchParams.get('category_id');
    const sort = (searchParams.get('sort') as SortOption) || 'latest';

    // 필터 조건 구성
    const where: any = {
      status: 'ACTIVE',
    };

    // 지역 필터 추가
    if (location_id) {
      where.locationId = location_id;
    }

    // 카테고리 필터 추가
    if (category_id) {
      where.categoryId = category_id;
    }

    // 정렬 조건
    let orderBy: any = {}; // 기본값은 최신순
    switch (sort) {
      case 'latest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'ending_soon':
        orderBy = { endTime: 'asc' };
        break;
      case 'price_low':
        orderBy = { auctionPrice: { currentPrice: 'asc' } };
        break;
      case 'price_high':
        orderBy = { auctionPrice: { currentPrice: 'desc' } };
        break;
      case 'popular':
        orderBy = { favoriteItems: { _count: 'desc' } };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // 전체 개수 조회
    const total = await prisma.auctionItem.count({ where });

    // 경매 목록 조회 (전체)
    // 화면에 보여질 필드들: 카테고리, 아이템 썸네일, 타이틀, 경매상태, 시작가, 시작시간, 마감시간, 현재 가격
    const auctions = await prisma.auctionItem.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        auctionPrice: {
          select: {
            startPrice: true, // 시작가 (start_price)
            currentPrice: true, // 현재 가격 (current_price)
            instantPrice: true, // 즉시구매가 (instant_price)
            minBidUnit: true, // 최소 입찰 단위 (min_bid_unit)
            isInstantBuyEnabled: true, // 즉시구매 가능 여부 (is_instant_buy_enabled)
            isExtendedAuction: true, // 연장 경매 여부 (is_extended_auction)
          },
        },
        _count: {
          select: {
            bids: true,
            favoriteItems: true,
          },
        },
      },
      orderBy,
    });

    // 응답 데이터 구성
    const response: AuctionListResponse = {
      data: auctions,
      total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
