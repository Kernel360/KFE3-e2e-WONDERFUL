import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@repo/db';

export async function POST(request: NextRequest) {
  try {
    const { nickname } = await request.json();

    if (!nickname || typeof nickname !== 'string') {
      return NextResponse.json(
        {
          available: false,
          message: '닉네임을 입력해주세요.',
        },
        { status: 400 }
      );
    }

    const trimmedNickname = nickname.trim();

    // 닉네임 길이 검증
    if (trimmedNickname.length < 2 || trimmedNickname.length > 12) {
      return NextResponse.json({
        available: false,
        message: '닉네임은 2자 이상 12자 이하로 입력해주세요.',
      });
    }

    // 대소문자를 구분하지 않는 중복 확인
    const existingUser = await prisma.user.findFirst({
      where: {
        nickname: {
          equals: trimmedNickname,
          mode: 'insensitive',
        },
      },
    });

    if (existingUser) {
      return NextResponse.json({
        available: false,
        message: '이미 사용 중인 닉네임입니다.',
      });
    }

    return NextResponse.json({
      available: true,
      message: '사용 가능한 닉네임입니다.',
    });
  } catch (error) {
    console.error('닉네임 중복 확인 에러:', error);
    return NextResponse.json(
      {
        available: false,
        message: '닉네임 확인 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
