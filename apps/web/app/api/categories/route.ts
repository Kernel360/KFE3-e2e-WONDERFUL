import { prisma } from '@repo/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🚀 카테고리 목록 API 호출');

    // 모든 카테고리 조회
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    console.log(`✅ 카테고리 조회 성공: ${categories.length}개`);

    return NextResponse.json({
      data: categories,
      total: categories.length,
    });
  } catch (error) {
    console.error('🚨 카테고리 조회 에러:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        message: '카테고리 목록을 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
