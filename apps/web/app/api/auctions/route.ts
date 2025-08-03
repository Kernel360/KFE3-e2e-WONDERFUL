import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

import { AuctionListResponse, SortOption } from '@/types/auction-prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const locationName = searchParams.get('locationName');
    const categoryId = searchParams.get('category_id');
    const sort = (searchParams.get('sort') as SortOption) || 'latest';
    const includeCompleted = searchParams.get('includeCompleted') === 'true';

    const where: any = {};

    if (!includeCompleted) {
      where.status = 'ACTIVE';
    }

    if (locationName) {
      where.location = {
        locationName: locationName,
      };
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    let orderBy: any = {};

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

    const total = await prisma.auctionItem.count({ where });

    const auctions = await prisma.auctionItem.findMany({
      where,
      include: {
        location: {
          select: {
            id: true,
            locationName: true,
            latitude: true,
            longitude: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        auctionPrice: {
          select: {
            startPrice: true,
            currentPrice: true,
            instantPrice: true, // 즉시구매가
            minBidUnit: true,
            isInstantBuyEnabled: true,
            isExtendedAuction: true,
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

    // 응답 데이터 구성 (상태 변환 제거 - 프론트엔드에서 처리)
    const response: AuctionListResponse = {
      data: auctions,
      total,
    };

    return NextResponse.json(response);
  } catch (error) {
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

// 만료된 경매들의 상태를 업데이트하는 함수
export async function updateExpiredAuctions(request: NextRequest) {
  try {
    const { auctionId } = await request.json();
    if (!auctionId) {
      return Response.json({ success: false }, { status: 400 });
    }

    await prisma.auctionItem.update({
      where: { id: auctionId },
      data: {
        status: 'COMPLETED',
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('경매 종료 처리 실패:', error);
    return Response.json({ success: false }, { status: 500 });
  }
}
