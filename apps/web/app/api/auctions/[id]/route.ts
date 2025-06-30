import { AuctionDetailResponse } from '@/lib/types/auction-prisma';
import { prisma } from '@repo/db';
import { NextRequest, NextResponse } from 'next/server';

// 경매 상세페이지 조회 api
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // 사용자 ID (찜한 상태 확인용)
    const auctionId = (await params).id;

    // 경매아이템 상세 정보조회
    const auctionItem = await prisma.auctionItem.findUnique({
      where: {
        id: auctionId,
      },
      include: {
        // 판매자
        seller: {
          select: {
            id: true,
            nickname: true,
            profileImg: true,
            isVerified: true,
          },
        },
        // 카테고리
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        // 가격
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
        // 이미지 관계 추가
        auctionImages: {
          select: {
            id: true,
            urls: true,
          },
        },
        // 통계
        _count: {
          select: {
            bids: true,
            favoriteItems: true,
          },
        },
      },
    });

    // 경매 아이템이 존재하지 않는 경우
    if (!auctionItem) {
      return NextResponse.json(
        {
          error: 'Auction item not found',
          message: '해당 경매 아이템을 찾을 수 없읍니다.',
        },
        { status: 404 }
      );
    }

    // 디버깅: 실제 이미지 데이터 확인
    console.log('🖼️ 원본 이미지 데이터:', {
      thumbnailUrl: auctionItem.thumbnailUrl,
      auctionImages: auctionItem.auctionImages,
      auctionImagesCount: auctionItem.auctionImages.length,
    });

    // 사용자가 찜하기 했는지 확인
    let isFavorite = false;
    if (userId) {
      const favoriteItem = await prisma.favoriteItem.findUnique({
        where: {
          // userId와 itemId로 찜 여부 확인
          // 복합 유니크 제약조건을 사용하여 중복 찜 방지
          userId_itemId: {
            userId: userId,
            itemId: auctionId,
          },
        },
      });
      isFavorite = !!favoriteItem;
    }

    // 응답 데이터 구조
    const response: AuctionDetailResponse = {
      data: {
        ...auctionItem,
        status: auctionItem.status === 'ACTIVE' ? '경매중' : '경매종료',
      },
      userFavorite: {
        isFavorite,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching auction detail page:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error...',
        message: '경매 아이템 정보를 불러오는 도중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
