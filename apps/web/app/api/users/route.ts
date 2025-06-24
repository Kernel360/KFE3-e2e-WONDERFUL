// 백엔드 로직
// Next.js API 라우트를 사용하여 작성, 서버에서 실행되는 코드
// Prisma ORM을 사용하여 데이터베이스와 상호작용
// 이 API는 GET 요청을 처리하며, 데이터베이스에 연결하여 사용자 수를 반환하는 기능을 수행
// apps/web/app/api/users/route.ts

import { NextResponse } from 'next/server';

import { prisma } from '@repo/db';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      success: true,
      userCount,
      message: '데이터베이스 연결 성공!',
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        success: false,
        error: '데이터베이스 연결 실패',
      },
      { status: 500 }
    );
  }
}
