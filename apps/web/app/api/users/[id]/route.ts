import { NextRequest, NextResponse } from 'next/server';

import { getUserProfile } from '@/lib/api/users';
import { ErrorResponse, UserProfile } from '@/lib/types';

type ApiResponse = UserProfile | ErrorResponse;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await params;

    const profile = await getUserProfile(id);

    if (!profile) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('사용자 조회 에러:', error);
    return NextResponse.json({ error: '사용자 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
