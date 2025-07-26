import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

import { AuctionListResponse, SortOption } from '@/types/auction-prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 경매 목록 API 호출');

    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출
    const locationName = searchParams.get('locationName');
    const category_id = searchParams.get('category_id');
    const sort = (searchParams.get('sort') as SortOption) || 'latest';
    const includeCompleted = searchParams.get('includeCompleted') === 'true'; // 종료된 경매 포함 여부

    // 만료된 경매들의 상태를 먼저 업데이트
    await updateExpiredAuctions();

    // 필터 조건 구성
    const where: any = {};

    // 상태 필터 (기본적으로는 활성 경매만, 옵션으로 전체 포함 가능)
    if (!includeCompleted) {
      where.status = 'ACTIVE';
    }

    // 지역 필터 추가
    if (locationName) {
      where.location = {
        locationName: locationName,
      };
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

    // 응답 데이터 구성 (상태 변환 제거 - 프론트엔드에서 처리)
    const response: AuctionListResponse = {
      data: auctions,
      total,
    };

    console.log(`✅ 성공: 총 ${total}개 중 ${auctions.length}개 반환`);

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

// 만료된 경매들의 상태를 업데이트하는 함수
async function updateExpiredAuctions() {
  try {
    const now = new Date();

    // 현재 시간보다 종료 시간이 이전이면서 상태가 ACTIVE인 경매들을 찾아서 업데이트
    const updatedAuctions = await prisma.auctionItem.updateMany({
      where: {
        endTime: {
          lt: now, // 종료 시간이 현재 시간보다 이전
        },
        status: 'ACTIVE', // 상태가 아직 ACTIVE인 것들만
      },
      data: {
        status: 'COMPLETED', // 상태를 COMPLETED로 변경
      },
    });

    if (updatedAuctions.count > 0) {
      console.log(`🔄 만료된 경매 ${updatedAuctions.count}개의 상태를 업데이트했습니다.`);
    }
  } catch (error) {
    console.error('🚨 만료된 경매 상태 업데이트 에러:', error);
  }
}
