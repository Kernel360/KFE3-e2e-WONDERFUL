import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

import { getCurrentUser } from '@/lib/utils/auth-server';

import { ProfileAuctionResponse } from '@/constants/profile';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type');
    const statusesParam = searchParams.get('statuses');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const statuses = statusesParam
      ? statusesParam.split(',')
      : ['ACTIVE', 'COMPLETED', 'CANCELLED'];

    const where: any = {
      status: {
        in: statuses,
      },
    };

    // 타입에 따른 필터링
    if (type === 'sales') {
      // 내가 등록한 경매
      where.sellerId = currentUser.id;
    } else if (type === 'purchases') {
      // 내가 입찰한 경매 (입찰 테이블과 조인)
      where.bids = {
        some: {
          bidderId: currentUser.id,
        },
      };
    } else {
      return NextResponse.json(
        { error: '잘못된 타입입니다. sales 또는 purchases를 사용하세요.' },
        { status: 400 }
      );
    }

    // 전체 개수 조회
    const totalCount = await prisma.auctionItem.count({ where });

    // 페이지네이션 계산
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;

    // 경매 목록 조회
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
        // 구매 내역인 경우 입찰 정보도 포함
        ...(type === 'purchases' && {
          bids: {
            where: {
              bidderId: currentUser.id,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
            select: {
              price: true,
              createdAt: true,
            },
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const response: ProfileAuctionResponse = {
      data: auctions,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNext,
      },
    };

    console.log(`✅ ${type} 조회 성공: 페이지 ${page}, ${auctions.length}개 반환`);

    return NextResponse.json(response);
  } catch (error) {
    console.error('🚨 프로필 경매 목록 조회 에러:', error);
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
