import { AuctionListResponse, SortOption } from '@/types/auction-prisma';
import { prisma } from '@repo/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 경매 목록 API 호출');

    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출
    const location_id = searchParams.get('location_id');
    const category_id = searchParams.get('category_id');
    const sort = (searchParams.get('sort') as SortOption) || 'latest';

    console.log('📋 파라미터:', { location_id, category_id, sort });

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
            startPrice: true, // 시작가
            currentPrice: true, // 현재 가격
            instantPrice: true, // 즉시구매가
            minBidUnit: true, // 최소 입찰 단위
            isInstantBuyEnabled: true, // 즉시구매 가능 여부
            isExtendedAuction: true, // 연장 경매 여부
          },
        },
        auctionImages: {
          select: {
            id: true,
            urls: true,
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

    // 경매 상태 처리
    const processedAuctions = auctions.map((auction) => ({
      ...auction,
      status: auction.status === 'ACTIVE' ? '경매중' : '경매종료',
    }));

    // 응답 데이터 구성
    const response: AuctionListResponse = {
      data: processedAuctions,
      total,
    };

    console.log(`✅ 성공: 총 ${total}개 중 ${processedAuctions.length}개 반환`);

    return NextResponse.json(response);
  } catch (error) {
    console.error('🚨 경매 목록 조회 에러:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        message: '경매 목록을 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
