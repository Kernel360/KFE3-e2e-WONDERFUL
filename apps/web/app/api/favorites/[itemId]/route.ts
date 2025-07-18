import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

// 찜하기 API
import { createClient } from '@/lib/supabase/server';
export async function POST(request: NextRequest, { params }: { params: { itemId: string } }) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    // 이미 찜한 상태인지 확인
    const existingFavorite = await prisma.favoriteItem.findUnique({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId: params.itemId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { success: false, message: '이미 찜한 아이템입니다.' },
        { status: 400 }
      );
    }

    // 찜하기 추가
    await prisma.favoriteItem.create({
      data: {
        userId: user.id,
        itemId: params.itemId,
      },
    });
    return NextResponse.json({ success: true, message: '찜하기 성공', action: 'added' });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '찜하기 추가 실패',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// 찜하기 취소 API
export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 });
  }

  try {
    // 찜한 상태인지 확인
    const existingFavorite = await prisma.favoriteItem.findUnique({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId: params.itemId,
        },
      },
    });

    if (!existingFavorite) {
      return NextResponse.json(
        { success: false, message: '찜한 아이템이 아닙니다.' },
        { status: 400 }
      );
    }

    // 찜하기 취소
    await prisma.favoriteItem.delete({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId: params.itemId,
        },
      },
    });
    return NextResponse.json({ success: true, message: '찜하기 취소 성공', action: 'removed' });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '찜하기 취소 실패',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
