import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { CreateAddressRequest } from '@/lib/types/address';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const body: CreateAddressRequest = await request.json();
    const { label, name, phone, address1, address2, postalCode, isPrimary } = body;

    // 필수 필드 검증
    if (!address1) {
      return NextResponse.json({ error: '주소는 필수 입력 항목입니다.' }, { status: 400 });
    }

    // 기본 주소로 설정하는 경우, 기존 기본 주소 해제
    if (isPrimary) {
      await supabase
        .from('addresses')
        .update({ isPrimary: false })
        .eq('userId', user.id)
        .eq('isPrimary', true);
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        userId: user.id,
        label,
        name,
        phone,
        address1,
        address2,
        postalCode,
        isPrimary: isPrimary || false,
      })
      .select()
      .single();

    if (error) {
       
      console.error('주소 등록 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
     
    console.error('주소 등록 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('userId', user.id)
      .order('isPrimary', { ascending: false })
      .order('createdAt', { ascending: false });

    if (error) {
       
      console.error('주소 조회 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
     
    console.error('주소 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
