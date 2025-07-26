'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Address, CreateAddressRequest } from '@/lib/types/address';

// 주소 목록 조회
export async function getAddresses(): Promise<{ data?: Address[]; error?: string }> {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: '인증이 필요합니다.' };
    }

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('userId', user.id)
      .order('isPrimary', { ascending: false })
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('주소 조회 오류:', error);
      return { error: error.message };
    }

    return { data: data as Address[] };
  } catch (error) {
    console.error('주소 조회 중 오류:', error);
    return { error: '주소 조회 중 오류가 발생했습니다.' };
  }
}

// 주소 등록
export async function createAddress(
  addressData: CreateAddressRequest
): Promise<{ data?: Address; error?: string }> {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: '인증이 필요합니다.' };
    }

    const { label, userName, phone, address, addressDetail, isPrimary } = addressData;

    // 필수 필드 검증
    if (!address) {
      return { error: '주소는 필수 입력 항목입니다.' };
    }

    // 기본 주소로 설정하는 경우, 기존 기본 주소 해제
    if (isPrimary) {
      const { error: updateError } = await supabase
        .from('addresses')
        .update({ isPrimary: false })
        .eq('userId', user.id)
        .eq('isPrimary', true);

      if (updateError) {
        console.error('기존 기본 주소 해제 오류:', updateError);
      }
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        userId: user.id,
        label,
        userName,
        phone,
        address,
        addressDetail,
        isPrimary: isPrimary || false,
      })
      .select()
      .single();

    if (error) {
      console.error('주소 등록 오류:', error);
      return { error: error.message };
    }

    // 캐시 무효화
    revalidatePath('/chat');
    revalidatePath('/address');

    return { data: data as Address };
  } catch (error) {
    console.error('주소 등록 중 오류:', error);
    return { error: '주소 등록 중 오류가 발생했습니다.' };
  }
}

// 주소 수정
export async function updateAddress(
  id: string,
  addressData: Partial<CreateAddressRequest>
): Promise<{ data?: Address; error?: string }> {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: '인증이 필요합니다.' };
    }

    const { label, userName, phone, address, addressDetail, isPrimary } = addressData;

    // 기본 주소로 설정하는 경우, 기존 기본 주소 해제
    if (isPrimary) {
      const { error: updateError } = await supabase
        .from('addresses')
        .update({ isPrimary: false })
        .eq('userId', user.id)
        .eq('isPrimary', true)
        .neq('id', id);

      if (updateError) {
        console.error('기존 기본 주소 해제 오류:', updateError);
      }
    }

    const { data, error } = await supabase
      .from('addresses')
      .update({
        label,
        userName,
        phone,
        address,
        addressDetail,
        isPrimary,
      })
      .eq('id', id)
      .eq('userId', user.id) // RLS 정책: 자신의 주소만 수정 가능
      .select()
      .single();

    if (error) {
      console.error('주소 수정 오류:', error);
      return { error: error.message };
    }

    // 캐시 무효화
    revalidatePath('/chat');
    revalidatePath('/address');

    return { data: data as Address };
  } catch (error) {
    console.error('주소 수정 중 오류:', error);
    return { error: '주소 수정 중 오류가 발생했습니다.' };
  }
}

// 주소 삭제
export async function deleteAddress(id: string): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: '인증이 필요합니다.' };
    }

    const { error } = await supabase.from('addresses').delete().eq('id', id).eq('userId', user.id); // RLS 정책: 자신의 주소만 삭제 가능

    if (error) {
      console.error('주소 삭제 오류:', error);
      return { error: error.message };
    }

    // 캐시 무효화
    revalidatePath('/chat');
    revalidatePath('/address');

    return {};
  } catch (error) {
    console.error('주소 삭제 중 오류:', error);
    return { error: '주소 삭제 중 오류가 발생했습니다.' };
  }
}
