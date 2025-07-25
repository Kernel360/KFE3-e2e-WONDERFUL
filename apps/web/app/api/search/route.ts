import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

import { getCurrentUser } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q');
    const status = searchParams.get('status'); // 'all', 'active', 'completed'
    const sort = searchParams.get('sort') || 'latest';

    // 검색어가 없으면 빈 결과 반환
    if (!query || !query.trim()) {
      return NextResponse.json({
        data: [],
        total: 0,
        message: '검색어를 입력해주세요.',
      });
    }

    const searchQuery = query.trim();
    const currentUser = await getCurrentUser();

    // 검색 조건 구성
    const whereConditions: any = {
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
      ],
    };

    // 상태별 필터링
    if (status === 'active') {
      whereConditions.status = 'ACTIVE';
    } else if (status === 'completed') {
      whereConditions.status = 'COMPLETED';
    }
    // status가 'all'이거나 없으면 모든 상태 포함

    // 정렬 조건
    let orderBy: any = {};
    switch (sort) {
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
        orderBy = { _count: { favoriteItems: 'desc' } };
        break;
      case 'latest':
      default:
        orderBy = { createdAt: 'desc' };
        break;
    }

    // 검색 실행
    const auctions = await prisma.auctionItem.findMany({
      where: whereConditions,
      include: {
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
            instantPrice: true,
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
        // 현재 사용자의 찜 여부 확인
        ...(currentUser && {
          favoriteItems: {
            where: {
              userId: currentUser.id,
            },
            select: {
              id: true,
            },
          },
        }),
      },
      orderBy,
      take: 100, // 검색 결과 최대 100개
    });

    // 응답 데이터 가공
    const processedAuctions = auctions.map((auction) => ({
      ...auction,
      userFavorite: {
        isFavorite: currentUser ? auction.favoriteItems?.length > 0 : false,
      },
    }));

    return NextResponse.json({
      data: processedAuctions,
      total: processedAuctions.length,
      query: searchQuery,
    });
  } catch (error) {
    console.error('검색 API 에러:', error);
    return NextResponse.json(
      {
        error: '검색 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
